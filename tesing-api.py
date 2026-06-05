# API connection using Flask
from flask import Flask, request, jsonify

app = Flask(__name__)

# Dummy database
users = []

# GET -Read data
@app.route("/users", methods=["GET"])
def get_users():
    return jsonify(users)

@app.route("/users",methods=["POST"])
def add_user():
    data=request.json
    users.append(data)
    return jsonify({"msg":"user added", "data":data});

@app.route("/users/<int:index>", methods=["PUT"])
def update_user(index):
    data=request.json
    if index <len(users):
        users[index]=data
        return jsonify({"msg":"user updated", "data":data});
    return jsonify({"msg":"user not found"}),404

if __name__ == "__main__":
    app.run(debug=True)