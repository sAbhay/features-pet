# Features Pet
## Backend

### Files
* _api_gen.py_: query the CRFM API to generate text given a prompt \
* _verify.py_: verify the correctness of the generated text, currently contains functions to convert text to phonemes (either sound codes or IPA) \
* _prompt_engineering.ipynb_: notebook to use to prototype prompt engineering, calls functions in api_gen.py and verify.py \
* _server.py_: Flask server with endpoints to generate and verify text \
* _run_server.sh_: script to run the server

### Usage

Currently, the server needs to be set up, so only local use is possible. To run the notebook:
1. Set up the local environment: ```conda env create -n features-pet -f environment.yml```
2. Activate ```conda activate features-pet```
3. Run the notebook
4. Keep your CRFM token handy for the first log in to the API, and you're good to go