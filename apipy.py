from flask import Flask, request, jsonify

app = Flask(__name__)

# In-memory "database"
users = {
    "1": {"name": "Rohith", "mail": "rohith@gmail.com"},
    "2": {"name": "Reddy", "mail": "reddy@example.com"}
}

# GET: Retrieve a user by ID
@app.route("/users/<user_id>", methods=["GET"])
def get_user(user_id):
    user = users.get(user_id)
    if not user:
        return jsonify({"error": "User not found"}), 404
    return jsonify({"user_id": user_id, **user}), 200



if __name__ == "__main__":
    app.run(debug=True)