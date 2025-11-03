import pytest
import re

print("=== Enter Details to Test Form ===")
fname = input("Enter First Name: ")
mname = input("Enter Middle Name: ")
lname = input("Enter Last Name: ")
phone = input("Enter Phone Number: ")
submit = input("Do you want to submit? (yes/no): ").strip().lower()

#print(fname, mname, lname, phone, submit)

@pytest.fixture
def user_data():

    return {
        "fname": fname,
        "mname": mname,
        "lname": lname,
        "phone": phone,
        "submit": submit
    }

def test_first_name_format(user_data):
    name_pattern = r'^[A-Za-z]{1,15}$'
    assert re.match(name_pattern, user_data["fname"]), "Invalid First Name Format"


def test_middle_name_format(user_data):
    name_pattern = r'^[A-Za-z]{1,15}$'
    assert re.match(name_pattern, user_data["mname"]), "Invalid Middle Name Format"


def test_last_name_format(user_data):
    lname_pattern = r'^[A-Za-z0-9]{3,15}$'
    assert re.match(lname_pattern, user_data["lname"]), "Invalid Last Name Format"


def test_phone_format(user_data):
    phone_pattern = r'^[0-9]{10}$'
    assert re.match(phone_pattern, user_data["phone"]), "Invalid Phone Number Format"

def test_submit_form(user_data):

    name_pattern = r'^[A-Za-z]{1,15}$'
    lname_pattern = r'^[A-Za-z0-9]{3,15}$'
    phone_pattern = r'^[0-9]{10}$'

    valid_fname = re.match(name_pattern, user_data["fname"])
    valid_mname = re.match(name_pattern, user_data["mname"])
    valid_lname = re.match(lname_pattern, user_data["lname"])
    valid_phone = re.match(phone_pattern, user_data["phone"])
    submitted = user_data["submit"] == "yes"

    if valid_fname and valid_mname and valid_lname and valid_phone and submitted:
        assert True, "Form submitted successfully"
    elif user_data["submit"] == "no":
        assert False, "Form not submitted[You choose NO]"
    else:
        assert False, "Invalid Input Format"