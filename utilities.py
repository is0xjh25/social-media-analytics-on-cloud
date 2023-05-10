import json

divide_line = "________________________________________"

def print_formatted(posts) -> None:
	for post in posts:
		print(post)
		print(divide_line)
	return None

def txt_formatted(platform, keyword, posts) -> None:
	f = open("{} - {}.txt".format(platform, keyword), "w")
	for post in posts:
		f.write(json.dumps(post, indent=2))
		f.write('\n')
		f.write(divide_line)
		f.write('\n')
	f.close()
	return None