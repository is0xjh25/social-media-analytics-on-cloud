import json
from mastodon import Mastodon, StreamListener

m = Mastodon(
    api_base_url='https://mastodon.au',
    access_token=os.environ['MASTODON_ACCESS_TOKEN']
)

class Listener(StreamListener):
    def on_update(self, status):
        if 'content' in status:
            status_id = status['id']
            account_id = status['account']['id']
            content = status['content']
            created_at = status['created_at']
            language = status.get('language', 'unknown')
            tags = [tag['name'] for tag in status.get('tags', [])]
            data = {
                'account_id': account_id,
                'content': content,
                'created_at': created_at,
                'language': language,
                'hashtags': tags
            }
            # Only include necessary keys in the JSON output
            keys_to_include = ['account_id', 'content', 'created_at', 'language', 'hashtags']
            filtered_data = {k: v for k, v in data.items() if k in keys_to_include}
            print(json.dumps(filtered_data, indent=2, sort_keys=True, default=str))

            # Check if the post has the desired hashtag
            if 'hashtag_to_search' in tags:
                # Search for posts containing the desired hashtag
                results = m.search('hashtags:' + 'hashtag_to_search')
                for post in results['statuses']:
                    post_data = {
                        'account_id': post['account']['id'],
                        'content': post['content'],
                        'created_at': post['created_at'],
                        'language': post.get('language', 'unknown'),
                        'hashtags': [tag['name'] for tag in post.get('tags', [])]
                    }
                    print(json.dumps(post_data, indent=2, sort_keys=True, default=str))

m.stream_public(Listener())