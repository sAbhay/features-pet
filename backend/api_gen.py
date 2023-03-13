import getpass

from helm.common.authentication import Authentication
from helm.common.perspective_api_request import PerspectiveAPIRequest, PerspectiveAPIRequestResult
from helm.common.request import Request, RequestResult
from helm.common.tokenization_request import TokenizationRequest, TokenizationRequestResult
from helm.proxy.accounts import Account
from helm.proxy.services.remote_service import RemoteService


# An example of how to use the request API.
api_key = getpass.getpass(prompt="Enter a valid API key: ")
auth = Authentication(api_key=api_key)
service = RemoteService("https://crfm-models.stanford.edu")

# Access account and show my current quotas and usages
account: Account = service.get_account(auth)
print(account.usages)

PROMPT_TEMPLATE = """
Create a decodable text passage of approximately 21 words. Each word should have a maximum of 1 syllables. The passage should help readers learn the following: CVC words (1-syllable; up to 4 phonemes). The following words are sight words: is, has. The lexile level should be: 100. There should be absolutely no words that too difficult/long/complicated for a reader whose lexile level is 100. This is super important -- no words that are more complex than that.

Pip’s Cats

Pip is Kit’s pal.
Pip has six cats.
Pip’s cats got in mud.
Pip’s cats left mud on his rug.
Pip’s mom got mad.

Create a decodable text passage of approximately 25 words. Each word should have a maximum of 1 syllables. The lexile level should be: 100. There should be absolutely no words that too difficult/long/complicated for a reader whose lexile level is 100. This is super important -- no words that are more complex than that. The passage should help readers learn the following: Consonant blends in initial and final position (CCVC and CVCC words; 1-syllable; up to 4 phonemes). The following words are sight words: and. 

Vic Gets Lost 

Pip’s cat Vic got lost. 
Pip felt sad. 
Kit ran and got Vic. 
Kit set Vic on Pip’s lap. 
Pip felt glad.

Create a decodable text passage of approximately 34 words. Each word should have a maximum of 1 syllables. The lexile level should be: 100. There should be absolutely no words that too difficult/long/complicated for a reader whose lexile level is 100. This is super important -- no words that are more complex than that. The passage should help readers learn the following: Consonant blends in initial and final position (CCVC and CVCC words; 1-syllable; up to 5 phonemes). The following words are sight words: and, his. 

Fast Fred

Kit’s pal Fred gulps his milk. 
Fast Fred gulps and gulps. 
Fred gets milk on his desk. 
Fred gets milk on his pants.
Fred gets milk on Kit.
Kit gets mad at Fred.
“Stop it, Fred!”

Create a decodable text story of approximately {} words. Each word should have a maximum of {} syllables. The passage should help readers learn the following: {}. The following words are sight words: {}. The story should have a coherent and linear plot. The lexile level should be: {}. There should be absolutely no words that too difficult/long/complicated for a reader whose lexile level is {}. This is super important -- no words that are more complex than that."""


def generate_from_params(length, max_syllables, lexile_level, instruction_phonemes, sight_words, temperature, system_message):
  instruction_phonemes_str = ", ".join(instruction_phonemes)
  sight_words_str = ", ".join(sight_words)
  prompt = PROMPT_TEMPLATE.format(length, max_syllables, instruction_phonemes_str, sight_words_str, lexile_level, lexile_level)

  # Make a request
  request = Request(model="openai/text-davinci-003", prompt=prompt, echo_prompt=False, temperature=temperature)
  request_result: RequestResult = service.make_request(auth, request)
  return request_result.completions[0].text

def generate_from_prompt(prompt):
  # Make a request
  request = Request(model="openai/text-davinci-003", prompt=prompt, echo_prompt=False)
  request_result: RequestResult = service.make_request(auth, request)
  return request_result.completions[0].text