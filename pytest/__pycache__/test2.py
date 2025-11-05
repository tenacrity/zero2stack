import pytest
from test2 import get_username

@pytest.fixture
def sample_user_id():
    return 1

def test_get_user(sample_user_id):
    assert get_username(sample_user_id) == "Usha"