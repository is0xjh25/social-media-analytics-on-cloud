divide_line = "________________________________________"
def format_tweet(tweet) -> {}:
	temp = {}
	temp['post_id'] = tweet['id'] 
	temp['author_id'] = tweet['doc']['data']['author_id']
	temp['created_at'] = tweet['doc']['data']['created_at']
	temp['geo'] = tweet['doc']['data']['geo']
	temp['lang'] = tweet['doc']['data']['lang']
	temp['sentiment'] = str(tweet['doc']['data']['sentiment'])
	temp['tags'] = tweet['value']['tags']
	temp['tokens'] = tweet['value']['tokens']
	return temp

def print_format_tweet(tweets) -> None:
	for tweet in tweets:
		print(tweet)
		print(divide_line)
	return None
