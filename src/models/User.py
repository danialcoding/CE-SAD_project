
from datetime import date


class User(object):
    """
    docstring
    """
    id: int
    user_Name: str
    name: str
    family: str
    phone_number: str
    email: str
    birth_day: date

class UserPassword(object):
    id: int
    password: str


class Question(object):
    id: int
    text: str


class UserQuestion(object):
    id: int
    question_id: int
    answer: str