from flask import Flask, jsonify, request
import api_gen
import verify

app = Flask(__name__)


@app.route('/v1/generate/<prompt>')
def generate_given_prompt(prompt):
    text = api_gen.generate_from_prompt(prompt)
    return text


@app.route('/v1/verify/<text>')
def text_to_phoneme(text):
    phoneme = verify.to_phoneme(text)
    return phoneme