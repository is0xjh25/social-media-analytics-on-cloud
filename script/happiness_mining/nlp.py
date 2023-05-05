import nltk
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
from nltk.stem import PorterStemmer
from bs4 import BeautifulSoup
import re

nltk.download("stopwords")
stemmer = PorterStemmer()

stop_words = stopwords.words("english")
filter_words = stop_words + [
    "'s",
    "#",
    "'",
    "``",
    "-",
    "(",
    ")",
    '"',
    "-",
    ":",
    "|",
    "/",
    "@",
]


def create_tokens(text):
    if type(text) == str:
        # process sentence
        tmp = BeautifulSoup(text, "html.parser").text
        tmp = re.sub(r"https?:\/\/[\S]*", "", tmp, flags=re.MULTILINE)

        # process words
        tokenized_words = word_tokenize(tmp)
        filtered_words = [
            word for word in tokenized_words if word.casefold() not in filter_words
        ]
        stemmed_words = [stemmer.stem(word) for word in filtered_words]
        return stemmed_words
    else:
        return []
