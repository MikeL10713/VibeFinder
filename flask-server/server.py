from flask import Flask, request
from recommendations import data_for_front_end

app = Flask(__name__)

@app.route("/data")
def get_data():
  return data_for_front_end

@app.route('/search', methods = ['POST', 'GET'])
def search():
    if request.method == 'GET':
        return f"The URL /search is accessed directly. Try going to '/form' to submit form"
    if request.method == 'POST':
        form_data = request.form
        return {"test": ["test1", "test2", "test3"]}

if __name__ == "__main__":
  app.run(debug=True)