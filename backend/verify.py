from speechbrain.pretrained import GraphemeToPhoneme
import eng_to_ipa as ipa

g2p = GraphemeToPhoneme.from_hparams("speechbrain/soundchoice-g2p")

def to_sounds(text):
  phonemes = g2p(text)
  return phonemes


def to_phoneme(text):
  phonemes = ipa.convert(text)
  return phonemes

# print(to_phoneme("To be or not to be, that is the question"))