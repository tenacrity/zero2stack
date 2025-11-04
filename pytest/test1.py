import pytest
from test import add,subtract

def test_add():
    assert add(5, 3) == 8

def test_subtract():
    assert subtract(10, 4) == 6

def test_add_negative_numbers():
    assert add(-2, -3) == -5
