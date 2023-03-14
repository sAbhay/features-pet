import getpass

from helm.common.authentication import Authentication
from helm.common.perspective_api_request import PerspectiveAPIRequest, PerspectiveAPIRequestResult
from helm.common.request import Request, RequestResult
from helm.common.tokenization_request import TokenizationRequest, TokenizationRequestResult
from helm.proxy.accounts import Account
from helm.proxy.services.remote_service import RemoteService

import openai


# An example of how to use the request API.
api_key = getpass.getpass(prompt="Enter a valid API key: ")
openai.api_key = api_key
# auth = Authentication(api_key=api_key)
# service = RemoteService("https://crfm-models.stanford.edu")

# Access account and show my current quotas and usages
# account: Account = service.get_account(auth)
# print(account.usages)

PROMPT_TEMPLATE = """
Create a decodable text story of approximately {} words. Each word should have a maximum of {} syllables. The passage should help readers learn the following: {}. The following words are sight words: {}. The story should have a coherent and linear plot. The lexile level should be: {}. There should be absolutely no words that too difficult/long/complicated for a reader whose lexile level is {}. This is super important -- no words that are more complex than that."""

# TODO: finalise prompt
# TODO: add while loop to get to length
# TODO: cut off half-finished sentences
def generate_from_params(length, max_syllables, lexile_level, instruction_phonemes="", sight_words="", temperature=0.1,
                         system_message="You are a helpful assistant"):
  instruction_phonemes_str = ", ".join(instruction_phonemes)
  sight_words_str = ", ".join(sight_words)
  prompt = PROMPT_TEMPLATE.format(length, max_syllables, instruction_phonemes_str, sight_words_str, lexile_level, lexile_level)
  return generate_from_prompt(prompt, system_message=system_message, temperature=temperature, length=length)


def generate_from_prompt(prompt, system_message="You are a helpful assistant.", temperature=0.1, length=1024):
  # Make a request
  response = openai.ChatCompletion.create(
    model="gpt-3.5-turbo",
    messages=[
      {"role": "system", "content": system_message},
      {"role": "user", "content": prompt},
    ],
    temperature=temperature,
    max_tokens=length,
    top_p=1,
    frequency_penalty=0,
    presence_penalty=0
  )

  result = ''
  for choice in response.choices:
    result += choice.message.content
  return result


if __name__ == "__main__":
  text = generate_from_params(100, 10, 1000, "words with digraphs", "and, these, word", 0, "You are a helpful assistant")
  print(text)