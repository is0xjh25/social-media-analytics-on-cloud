# Mastodon API workshop


## Installation

* Register on a Mastodon server of your choice and add an Application (this action generates an API Key that can be used to access that Masotdon server).
* Create a `secrets.sh` file with this content:
```shell
export MASTODON_ACCESS_TOKEN="<access token>>"
```
* Go to [Mastodon.py installation page](https://pypi.org/project/Mastodon.py/#files) and download the WHL file version `1.8.x`;
* Unzip the downloaded file into this directory.
```shell
unzip /path/to/file.whl
```


## Mastodon API example with cURL 

```shell
# Set parameters
. ./secrets.sh
export URL='https://mastodon.au/api/v1'

# Test access 
curl --header "Authorization: Bearer ${MASTODON_ACCESS_TOKEN=}" \
     -XGET \
     -vvv \
  	 "${URL}/accounts/verify_credentials" | jq

# Stream the user timeline
curl --header "Authorization: Bearer ${MASTODON_ACCESS_TOKEN=}" \
     -XGET \
     -vvv \
     "${URL}/streaming/user"

# Post on the user timeline 
curl --header "Authorization: Bearer ${MASTODON_ACCESS_TOKEN=}" \
     -XPOST \
     -vvv \
     --header "Content-Type: application/json"\
     "${URL}/statuses"\
     --data '{"status": "Test 3"}' | jq

# Delete the post from the user timeline
STATUSID='<status id returned by the command above>'
curl --header "Authorization: Bearer ${MASTODON_ACCESS_TOKEN=}" \
     -XDELETE \
     -vvv \
     "${URL}/statuses/${STATUSID}" | jq

# Stream federated timeline 	
curl --header "Authorization: Bearer ${MASTODON_ACCESS_TOKEN=}" \
     -XGET \
     -vvv \
	 "${URL}/streaming/public" 

# Stream local timeline 	
curl --header "Authorization: Bearer ${MASTODON_ACCESS_TOKEN=}" \
     -XGET \
     -vvv \
 	 "${URL}/streaming/public/local"

# Stream federated timeline for a given hashtag (text search on streaming data is not supported)
curl --header "Authorization: Bearer ${MASTODON_ACCESS_TOKEN=}" \
     -XGET \
     -vvv \
     "${URL}/streaming/hashtag?tag=dogecoin" 	
```

Full-text search can be performed on `accounts`, `statuses` (posts), or `hashtags` 
(please  note it requires a different endpoint `v2`):

```shell
# Search
curl --header "Authorization: Bearer ${MASTODON_ACCESS_TOKEN=}" \
  -XGET \
  -vvv \
  -G \
  --data-urlencode "q=cats" \
  "https://mastodon.au/api/v2/search" 
```

However, this feature is not implemented by every server, and it is restricted to only 
the `statuses` the user has been mentioned in or has written.



## Mastodon API example with Python

### Mastodon login

Load the secrets file and start the Python interpreter:

```shell
. ./secrets.sh
python
```

```python
from mastodon import Mastodon
import os

mastodon = Mastodon(api_base_url='https://mastodon.online', access_token = os.environ['MASTODON_ACCESS_TOKEN'])
mastodon.retrieve_mastodon_version()
mastodon.status("109666136628267939")["content"]
```

### Streaming of Mastodon timelines

```python
from mastodon import Mastodon, MastodonNotFoundError, MastodonRatelimitError, StreamListener
import csv, os, time, json

m = Mastodon(
        api_base_url=f'https://mastodon.au',
        access_token=os.environ['MASTODON_ACCESS_TOKEN']
    )

class Listener(StreamListener):
    def on_update(self, status):
        print(json.dumps(status, indent=2, sort_keys=True, default=str))

m.stream_public(Listener())
```

If the Mastodon API version and the content of a post are printed out, the Mastodon library has been instaled
successfully and the
login on the Mastodon server has succeeded.

