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
    question: str = ""
    question_answer :str = ""

class Login(BaseModel):
    """
    docstring
    """

    user_id: int = 0
    password: str = ""
    user_name: str = ""
