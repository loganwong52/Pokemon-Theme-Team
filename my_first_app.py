import requests
from requests_oauthlib import OAuth1
import pprint
from dotenv import load_dotenv
import os

# public key and private key
auth = OAuth1("bc974f9209e6410f833f9a6b59ed687f", "35a69b760f7241ccb5da72cffe7ae980")
endpoint = "http://api.thenounproject.com/icon/1"

# only go 2 levels deep, so we get a general idea of the response without having to look at the whole thing
pp = pprint.PrettyPrinter(indent=2, depth=2)

response = requests.get(endpoint, auth=auth)
responseJSON = response.json()
pp.pprint(responseJSON)


# read the .env file
load_dotenv()  # take environment variables from .env.
# print(os.environ.apikey)      # os.environ is a dictionary
print(os.environ['apikey'])     # so to get apikey, you have to think of it like a key-value pair
