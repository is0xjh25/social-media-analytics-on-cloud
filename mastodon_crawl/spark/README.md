# Build and deployment of Spark on Docker

# Build and deployment of Spark on Docker

These are the steps to follow in order to simulate a Spark cluster on a single computer.

Note to MacOS users: the memory available to Docker (say, on Docker Desktop) has to be set at least to 4GB to run thw
workshop code.

# Building of a spark image

This step is needed to set the Docker user to `ROOT` in order to simplify the installation of Python packages
(do not do this on a production environment!)

```shell script
(
  cd spark
  docker build --tag spark:latest\
    --build-arg SPARK_VERSION=3.2.1\
     spark-image 
)
```

## Cluster creation and start (1 master, 2 workers)

```shell script
(
  cd spark
  docker-compose up
)  
```

## Word-count example on generated data

Open a new shell to execute these commands

```shell script
(
  cd spark
  docker cp data/wc.py spark_spark-master_1:/tmp
  docker cp data/wc.txt spark_spark-master_1:/tmp
  docker exec -ti spark_spark-master_1 /bin/bash pyspark
)
```

Once oin the PySpark shell, type:
```python
exec(open("/tmp/wc.py", "rb").read())
exit() 
```
`

To have a look at the cluster workers, point your browser to: `http://173.17.2.2:8080`
(`http://0.0.0.0:8080` on MacOS)


## Cluster stop and re-start

```shell script
(
  cd spark
  docker-compose stop
)  
```

```shell script
(
  cd spark
  docker-compose start
)  
```


## Topic Modelling

Topic modelling is a problem that can be solved by using clustring techniques such as Latent Dirichlet Allocation.

I took inspiraiton
from [this blog entry](https://medium.com/@connectwithghosh/topic-modelling-with-latent-dirichlet-allocation-lda-in-pyspark-2cb3ebd5678e)
to develop am LDA implementaiton in Python for Spark.

The corpus (1,000 bloggers) are taken from [this repository](https://u.cs.biu.ac.il/~koppel/BlogCorpus.htm)

### Cluster set-up for the LDA

```shell
(
  cd spark
  docker cp blogs.tar.gz spark_spark-master_1:/tmp
  docker exec spark_spark-master_1 /bin/bash -c '\
    cd /tmp;\
    tar xvfz blogs.tar.gz'
)    
```

Libraries installation on every node of the cluster:

```shell
(
  cd spark
  for s in $(docker ps --quiet); do
    echo ${s}
    docker exec ${s} bash -c '\
      pip install pandas numpy nltk lxml;\
      python -m nltk.downloader -d /usr/local/share/nltk_data stopwords;\
      python -m nltk.downloader -d /usr/local/share/nltk_data punkt;\
      python -m nltk.downloader -d /usr/local/share/nltk_data averaged_perceptron_tagger;\
    '
  done
)      
```


### Start of the PySpark session

Access the master container:

```shell
(
  cd spark
  docker exec -ti spark_spark-master_1 bash
)
```

Start an interactive PySpark session:

```shell
pyspark --master spark://0.0.0.0:7077 --deploy-mode client
```

### Topic modelling execution:

Package imports:

```python
import pandas as pd
import re 
import pyspark
import nltk
from os import listdir
from lxml import etree
from nltk.corpus import stopwords
from pyspark.ml.feature import CountVectorizer, IDF
from pyspark.mllib.linalg import Vector, Vectors
from pyspark.mllib.clustering import LDA, LDAModel
from nltk.stem import PorterStemmer
from nltk.tokenize import word_tokenize
```

Read corpus documents from XML files:

```python
corpusDir= '/tmp/blogs'
documents= []
for f in listdir(corpusDir):
  try:
    tree = etree.parse(corpusDir + '/' + f)
    for child in tree.getroot():
      if child.tag == 'post':
        documents.append(etree.tostring(child, method="text", encoding='utf-8')\
          .decode('utf-8').strip().lower())
  except etree.ParseError:      
    pass
```

Topic modelling parameters:

```python
minWordLength= 4 # Min length of a word
numTopics= 10
maxIterations= 100
wordNumbers= 5 # Min number of words per topic
vocabSize= 5000
minDF= 10.0 # Minimum number of docs the term has to appear in   
```

Initial text processing (plese note the partitioning in 12, which is more efficient than the default parittion in the
number of workers -2 in this setup):

As a rule-of-thumb, the number of partitions should be equal to 4 times the number of cores in the cluster.
By no means this is guarantee optimal results! Data size and complexity of the job may well force to
deviate from this number.

```python
stemmer= PorterStemmer()
engStopwords= stopwords.words('english')
tokens = sc.parallelize(documents, 12)\
    .map(lambda document: word_tokenize(document)) \
    .map(lambda document: [x[0] for x in nltk.pos_tag(document) if x[1][0:1] == 'N']) \
    .map(lambda document: [x for x in document if x.isalpha()]) \
    .map(lambda document: [x for x in document if len(x) >= minWordLength] ) \
    .map(lambda document: [x for x in document if x not in engStopwords]) \
    .map(lambda document: list(map(lambda token: stemmer.stem(token), document)))\
    .zipWithIndex()
```

To show the lazy evaluation of RDDs, let's rewrite the above text processing as a sequence of steps:

```python
tokens0 = sc.parallelize(documents, 12)
print("tokens0: {}".format(tokens0))
tokens1= tokens0.map(lambda document: word_tokenize(document)) 
print("tokens1: {}".format(tokens))
tokens2= tokens1.map(lambda document: [x[0] for x in nltk.pos_tag(document) if x[1][0:1] == 'N']) 
print("tokens2: {}".format(tokens))
tokens3= tokens2.map(lambda document: [x for x in document if x.isalpha()]) 
print("tokens3: {}".format(tokens))
tokens4= tokens3.map(lambda document: [x for x in document if len(x) >= minWordLength] ) 
print("tokens4: {}".format(tokens))
tokens5= tokens4.map(lambda document: [x for x in document if x not in engStopwords]) 
print("tokens5: {}".format(tokens))
tokens6= tokens5.map(lambda document: list(map(lambda token: stemmer.stem(token), document)))
print("tokens6: {}".format(tokens))
tokens7= tokens6.zipWithIndex()
print("tokens7: {}".format(tokens))
```

You can see that the evaluaiton is triggered only by the `zipWithIndex` statement, You could also go to the webadmin and
compare the two stages that were profiled `http://173.17.2.2:4040/` (`http://0.0.0.0:4040` on MacOS). Spoiler alert:
they are almost identical.

Compute metrics:

```python
df_txts = sqlContext.createDataFrame(tokens, ['list_of_words', 'index'])    
cv = CountVectorizer(inputCol='list_of_words', outputCol='raw_features',\
   vocabSize=vocabSize, minDF=minDF)
cvmodel = cv.fit(df_txts)
vocabArray= cvmodel.vocabulary
result_cv = cvmodel.transform(df_txts)  

idf = IDF(inputCol='raw_features', outputCol='features')
idfModel = idf.fit(result_cv)
result_tfidf = idfModel.transform(result_cv) 
```

Train the model:

```python
lda_model = LDA.train(result_tfidf[['index','features']].rdd\
   .mapValues(Vectors.fromML)\
   .map(list), k=numTopics, maxIterations=maxIterations)
```


### Display of results

Show processing in the Spark webamdin, point your browser to:

* `http://173.17.2.2:8080/` (`http://0.0.0.0:8080` on MacOS)
* `http://173.17.2.2:4040/` (`http://0.0.0.0:4040` on MacOS)
* `http://173.17.2.3:8081/` (It does not work under MacOS)
* `http://173.17.2.4:8081/` (It does not work under MacOS)

NOTE: the `4040` application is active only when a job is running (such as when there is a PySpark session active).

NOTE: `Skipped stages` means that data are already in the cache, hence a lower number of partitions would probably
be more efficient.

Describe the top topics and show their top (stemmed) words in the PySpark shell:

```python
topicIndices = sc.parallelize(lda_model.describeTopics(maxTermsPerTopic=wordNumbers), 12)

def topic_render(topic):
    terms = topic[0]
    result = []
    for i in range(wordNumbers):
      result.append(vocabArray[terms[i]])
    return result

topics_final = topicIndices.map(lambda topic: topic_render(topic)).collect()

for topic in range(len(topics_final)):
    print ('Topic {}: {}'.format(str(topic), topics_final[topic]))   
```

Given the probabilistic nature of LDA, different runs may yield slightly different topics.


