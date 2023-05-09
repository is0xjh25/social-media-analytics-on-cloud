from flask import Flask, render_template
import random

app = Flask(__name__)

emojis = [
    "😀",
    "😁",
    "😂",
    "🤣",
    "😃",
    "😄",
    "😅",
    "😆",
    "😉",
    "😊",
    "😋",
    "😎",
    "😍",
    "😘",
    "😜",
    "😝",
    "😛",
    "🤑",
    "🤗",
    "🤔",
]


@app.route("/")
def index():
    return render_template("index.html", emoji=random.choice(emojis))


if __name__ == "__main__":
    app.run(debug=True, port=5000)
