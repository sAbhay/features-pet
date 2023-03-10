from flask import Flask, jsonify, request
import api_gen
import verify
from werkzeug.middleware.proxy_fix import ProxyFix

app = Flask(__name__)
app.wsgi_app = ProxyFix(
    app.wsgi_app, x_for=1, x_proto=1, x_host=1, x_prefix=1
)

@app.route('/v1/generate/<prompt>')
def generate_given_prompt(prompt):
    text = api_gen.generate_from_prompt(prompt)
    return text


@app.route('/v1/verify/<text>')
def text_to_phoneme(text):
    phoneme = verify.to_phoneme(text)
    return phoneme