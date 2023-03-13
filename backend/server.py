from flask import Flask, jsonify, request
import api_gen
import verify
from werkzeug.middleware.proxy_fix import ProxyFix
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
# app.wsgi_app = ProxyFix(
#     app.wsgi_app, x_for=1, x_proto=1, x_host=1, x_prefix=1
# )

@app.route('/v1/generate')
def generate_given_prompt():
    data = request.get_json()
    prompt = data['prompt']
    text = api_gen.generate_from_prompt(prompt)
    return jsonify({"text": text})


@app.route('/v1/verify')
def text_to_phoneme():
    data = request.get_json()
    text = data['text']
    phoneme = verify.to_phoneme_list(text)
    return jsonify(phoneme)


@app.errorhandler(404)
def page_not_found(error):
    return 'This route does not exist {}'.format(request.url), 404