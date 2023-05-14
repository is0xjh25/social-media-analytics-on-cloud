from flask import Flask, request
import time
import threading

app = Flask(__name__)


@app.route("/start_task", methods=["POST"])
def start_task():
    data = request.get_json()

    def long_running_task(**kwargs):
        your_params = kwargs.get("post_data", {})
        print("Starting long task")
        print("Your params:", your_params)
        for _ in range(100):
            time.sleep(1)
            print(".")

    thread = threading.Thread(target=long_running_task, kwargs={"post_data": data})
    thread.start()
    return {"message": "Accepted"}, 202


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5050, debug=True)
