
from pydantic import BaseModel


class Repo(object):
    """
    docstring
    """

    def __init__(self, cur):
        raise NotImplementedError

    def create_table(self):
        raise NotImplementedError

    def insert(self, model: BaseModel):
        raise NotImplementedError

    def get(self, count: int, offset: int = 0) -> list[BaseModel]:
        raise NotImplementedError

    def _find():
        raise NotImplementedError