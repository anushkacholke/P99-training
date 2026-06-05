from math_utils import add, divide

def test_add():
    assert add(2, 3) == 5

def test_divide():
    assert divide(10, 2) == 5





'''
--for running test:
pytest

--for running specific test file:
pytest test_math_utils.py

--for running specific test:
pytest test_math_utils.py::test_add
'''