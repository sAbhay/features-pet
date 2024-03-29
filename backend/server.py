from flask import Flask, jsonify, request
import api_gen
import verify
import process_request as pr
from werkzeug.middleware.proxy_fix import ProxyFix
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
# app.wsgi_app = ProxyFix(
#     app.wsgi_app, x_for=1, x_proto=1, x_host=1, x_prefix=1
# )


@app.route('/v1/generate', methods=['GET', 'POST'])
def generate_given_params():
    try:
        data = pr.validate_request_body_body(request.get_json(),
                                             ['length', 'max_syllables', 'lexile_level'], [])
    except Exception as e:
        return jsonify({"error": str(e)})

    text = api_gen.generate_from_params(**data)
    return jsonify({"text": text})


@app.route('/v1/generate/prompt', methods=['GET', 'POST'])
def generate_given_prompt():
    try:
        data = pr.validate_request_body_body(request.get_json(), ['prompt'], [])
    except Exception as e:
        return jsonify({"error": str(e)})

    prompt = data['prompt']
    text = api_gen.generate_from_prompt(prompt)
    return jsonify({"text": text})


@app.route('/v1/verify', methods=['GET', 'POST'])
def text_to_phoneme():
    try:
      data = pr.validate_request_body_body(request.get_json(), ['text'], [])
    except Exception as e:
      return jsonify({"error": str(e)})

    text = data['text']
    phoneme = verify.to_phoneme_list(text)
    return jsonify(phoneme)


@app.errorhandler(404)
def page_not_found(error):
    return 'This route does not exist {}'.format(request.url), 404