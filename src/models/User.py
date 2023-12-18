from datetime import date
from typing_extensions import Unpack
from pydantic import BaseModel
from pydantic.config import ConfigDict


class User(BaseModel):
    """
    docstring
    """
    id: int = 0
    user_name: str = ""
    name: str = ""
    family: str = ""
    phone_number: str = ""
    email: str = ""
    birth_day: date = date.today()


class Login(BaseModel):
    """
    docstring
    """

    user_id: int = 0
    password: str = ""
    user_name: str = ""


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
