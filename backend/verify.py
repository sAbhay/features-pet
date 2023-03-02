from speechbrain.pretrained import GraphemeToPhoneme
import eng_to_ipa as ipa

g2p = GraphemeToPhoneme.from_hparams("speechbrain/soundchoice-g2p")

def to_phoneme_list(text):
  sounds = g2p(text)
  return sounds


def to_phoneme_ipa(text):
  phonemes = ipa.convert(text)
  return phonemes