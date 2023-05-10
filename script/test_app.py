from flask import Flask, jsonify
import requests

app = Flask(__name__)
emoji_server_url = 'http://localhost:5000'

@app.route('/emoji')
def get_emoji():
    response = requests.get(f'{emoji_server_url}/')
    return jsonify({'emoji': response.content.decode()})

if __name__ == '__main__':
    app.run(debug=True, port=8000)