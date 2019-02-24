import os
import json
import facebook

from TTemp import facebookToken


if __name__ == '__main__':
		token = facebookToken
		graph = facebook.GraphAPI(token)
		profile = graph.get_object('me', fields='id,name')

		print(json.dumps(profile, indent=4))
