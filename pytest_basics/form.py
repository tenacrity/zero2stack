def check_details(name, phone):
    """Check if name and phone are valid."""
    if " " in name and phone.startswith("+91") and len(phone) == 13:
        return True
    else:
        return False
