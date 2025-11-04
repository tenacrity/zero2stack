def get_username(user_id):
    users = {1: "Usha", 2: "gani"}
    return users.get(user_id, "Guest")