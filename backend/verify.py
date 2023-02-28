from speechbrain.pretrained import GraphemeToPhoneme

g2p = GraphemeToPhoneme.from_hparams("speechbrain/soundchoice-g2p")

def to_phoneme(text):
  phonemes = g2p(text)
  return phonemes

# print(to_phoneme("To be or not to be, that is the question"))