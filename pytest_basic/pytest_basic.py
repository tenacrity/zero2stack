def add(a,b):
    return a + b

def test_add():
    assert add(2, 3) == 5
    assert add(-1, 1) == 0
    assert add(0, 0) == 0

#sample 2
def multiply(a,b):
    return a*b
def test_multiply():
    assert multiply(5,2)==10
    assert multiply(5,5)==20
    assert multiply(2,3)==6

#sample 3
import pytest
@pytest.fixture
def sample_data():
    return[1,2,3,4,5]

def test_sum(sample_data):
    assert sum(sample_data)==15

#sample 4
#import pytest
@pytest.mark.parametrize("a,b,expected", [(2, 3, 5), (1, 1, 2), (0, 0, 0)])
def test_add_param(a, b, expected):
    assert a + b == expected
