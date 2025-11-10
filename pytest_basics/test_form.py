
from form import check_details

def test_valid_details():
    assert check_details("SINGAM USHASWINI", "+918179557859") == True

def test_invalid_name():
    assert check_details("USHAWINI", "+918179557859") == False

def test_invalid_phone():
    assert check_details("SINGAM USHASWINI", "8179557859") == False
