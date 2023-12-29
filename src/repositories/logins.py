from math import log
import sqlite3
from typing import Union
from models.user import Login, User
from repositories.repo import Repo
from repositories.user import UserRepository


class LoginRepository(Repo):
    """
    docstring
    """

    cur: sqlite3.Cursor
    tn = "Logins"
    model = Login
    user_repository: UserRepository

    def __init__(self, cur: sqlite3.Cursor, user_repository: UserRepository):
        self.cur = cur
        self.user_repository = user_repository

    def create_table(self) -> None:
        self.cur.execute(
            f"""
                create table IF NOT EXISTS {self.tn}
                (
                    user_id int primary key,
                    password nvarchar(11) Not null,
                    foreign key(user_id) references Users(id)
                );"""
        )

    def insert(self, login: Login) -> None:
        id = self.user_repository.get_id_by_user_name(login.user_name)
        if id is None:
            return
        query = f"""
                insert into {self.tn}
                (user_id,password)
                values
                ({id},'{login.password}')
                """
        self.cur.execute(query)

    def get(self, count: int, offset: int = 0) -> list[Login]:
        query = f"SELECT * FROM {self.tn} LIMIT {count} OFFSET {offset}"
        results = self.cur.execute(query).fetchall()
        print(results)
        objects = []
        for row in results:
            model = self.model()
            for i, ant in enumerate(self.model.__annotations__.keys()):
                if i > 1:
                    break
                model.__setattr__(ant, row[i])
            objects.append(model)
        return objects

    def check(self, login: Login) -> bool:
        """
        docstring
        """
        user_id = self.user_repository.get_id_by_user_name(login.user_name)
        lgn = self._find("user_id", user_id)
        return False if (login is None) else (login.password == lgn.password)

    def _find(self, field: str, value: Union[int, str]) -> Login:
        query = f"""SELECT * FROM {self.tn}
        where {field}='{value}'
        """
        result = self.cur.execute(query).fetchone()
        if result is None:
            return None
        model = self.model()
        for i, atr in enumerate(self.model.__annotations__.keys()):
            model.__setattr__(atr, result[i])
        return model
