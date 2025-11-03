import pytest

def add(a, b):
    return a + b

def test_add_positive():
    assert add(2, 3) == 5
    assert add(-1, 1) == 0
    assert add (0, 0) == 0

# def test_add_negative():
#     assert add(2, 3) == 6
#     assert add(-1, 1) == 3
#     assert add (0, 0) == 1

# @pytest.fixture
# def sample_data():
#     return [1, 2, 3, 4, 5]

# def test_add(sample_data):
#     for data in sample_data:
#         assert add(data, data) == data + data

result = add(2, 3)
print(result)