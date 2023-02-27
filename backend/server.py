from flask import Flask, jsonify, request
import api_gen

app = Flask(__name__)


@app.route('/v1/generate/<prompt>')
def generate_given_prompt(prompt):
    text = api_gen.generate_from_prompt(prompt)
    return text