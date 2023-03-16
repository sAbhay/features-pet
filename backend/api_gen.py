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


def create_prompt(length, max_syllables, lexile_level, instruction_focus="", sight_words=""):
  prompt = f"Create a decodable text story of approximately {length} words. The story should have a coherent and linear plot. "
  prompt += f"Each word should have a maximum of {max_syllables} syllables. "
  if instruction_focus != "":
    prompt += f"The passage should help readers learn the following: {instruction_focus}. "
  if sight_words != "":
    prompt += f"The following words are sight words: {sight_words}. "
  prompt += f"The lexile level should be: {lexile_level}. "
  prompt += f"There should be absolutely no words that too difficult/long/complicated for a reader whose lexile level is {lexile_level}. "
  return prompt


def prompt_safe(prompt):
  response = openai.Moderation.create(
    input=prompt
  )
  result = response.results[0]
  failed_categories = [category for category in result["categories"].keys() if result["categories"][category]]
  return result.flagged, failed_categories


def generate_from_params(length, max_syllables, lexile_level, instruction_phonemes="", sight_words="", temperature=0.1,
                         system_message="You are a helpful assistant"):
  instruction_phonemes_str = ", ".join(instruction_phonemes)
  sight_words_str = ", ".join(sight_words)
  prompt = create_prompt(length, max_syllables, lexile_level, instruction_phonemes_str, sight_words_str)
  safe, failed_categories = prompt_safe(prompt)
  if not safe:
    return f"The prompt is not safe due to: {', '.join(failed_categories)}. Please change your input."

  return generate_from_prompt(prompt, system_message=system_message, temperature=temperature)


def generate_from_prompt(prompt, system_message="You are a helpful assistant.", temperature=0.1):
  # Make a request
  response = openai.ChatCompletion.create(
    model="gpt-3.5-turbo",
    messages=[
      {"role": "system", "content": system_message},
      {"role": "user", "content": prompt},
    ],
    temperature=temperature,
    top_p=1,
    frequency_penalty=0,
    presence_penalty=0
  )

  result = ''
  for choice in response.choices:
    result += choice.message.content
  return result


if __name__ == "__main__":
  text = generate_from_params(300, 10, 100)
  print(text)