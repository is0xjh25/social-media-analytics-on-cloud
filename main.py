# from mpi4py import MPI
import pandas as pd
import json, ijson, sys, os
import twitter_tweet as tt
import mastodon_post as mp
import utilities as util

def main():
	# Twitter
	# tweets = tt.analyse()
	# util.print_formatted(tweets)
	# util.txt_formatted("Twitter", "No Idea", tweets)

	# Mastodon
	mp.streaming()
	# mastodon_keyword = "cat"
	# mastodons = mp.retrieve(mastodon_keyword)
	# util.print_formatted(mastodons)
	# util.txt_formatted("Mastodon", mastodon_keyword, mastodons)

if __name__ == "__main__":
	main()
