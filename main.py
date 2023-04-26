# from mpi4py import MPI
import pandas as pd
import json, ijson, sys, os
import post

# Configuration!!!
data_url = '../twitter.json'
max_row = 12

def main():
	# Twitter
	# with open(data_url, "rb") as f:
	# 	# f = open(data_url, "r")
	# 	# print(f.read(200000))
	# 	res = []
	# 	count = 0
	# 	for tweet in ijson.items(f, 'rows.item', multiple_values=True):
	# 		count += 1
	# 		res.append(post.format_tweet(tweet))
	# 		if count == max_row: break
	# 	post.print_formatted(res)
		
	# Mastodon
	# post.streaming_mastodon()
	keyword = "cat"
	mastodons = post.retrieve_mastodon(keyword)
	post.txt_formatted(keyword, mastodons)

if __name__ == "__main__":
	main()
