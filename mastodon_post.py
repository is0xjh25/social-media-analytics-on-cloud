from mastodon import Mastodon, StreamListener
import csv, os, time, ijson, json, requests

def retrieve(keyword) -> []:
	url = 'https://mastodon.au/api/v2/search'
	headers = {
		'Authorization': f'Bearer {os.environ["MASTODON_ACCESS_TOKEN"]}',
		'Content-Type': 'application/json'
	}
	params = {
		'q': keyword
	}

	mastodons = []
	response = requests.get(url, headers=headers, params=params)
	for mastodon in ijson.items(response.text, 'accounts.item', multiple_values=True):
		temp = {}
		temp['author_id'] = mastodon['id'] 
		temp['content'] = mastodon['note']
		temp['created_at'] = mastodon['created_at']
		temp['language'] = mastodon.get('language', 'unknown')
		temp['hashtags'] = [tag['name'] for tag in mastodon.get('tags', [])]
		mastodons.append(temp)
	return mastodons

def streaming() -> None:
	m = Mastodon(api_base_url=f'https://mastodon.au', access_token=os.environ['MASTODON_ACCESS_TOKEN'])
	m.stream_public(Listener())
	return None

class Listener(StreamListener):
	def on_update(self, status):
		if 'content' in status:
			author_id = status['account']['id']
			content = status['content']
			created_at = status['created_at']
			language = status.get('language', 'unknown')
			tags = [tag['name'] for tag in status.get('tags', [])]
			data = {
				'author_id': author_id,
				'content': content,
				'created_at': created_at,
				'language': language,
				'hashtags': tags
			}
			# Only include necessary keys in the JSON output
			keys_to_include = ['account_id', 'content', 'created_at', 'language', 'hashtags']
			filtered_data = {k: v for k, v in data.items() if k in keys_to_include}
			print_formatted([json.dumps(filtered_data, indent=2, sort_keys=True, default=str)])
