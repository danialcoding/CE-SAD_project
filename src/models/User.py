from datetime import date
from pydantic import BaseModel

class User(BaseModel):
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


class UserPassword(BaseModel):
    """
    docstring
    """

    id: int
    password: str


class Question(BaseModel):
    """
    docstring
    """

    id: int
    text: str


class UserQuestion(BaseModel):
    """
    docstring
    """

    id: int
    question_id: int
    answer: str
