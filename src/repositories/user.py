import sqlite3
from typing import Union
from models.user import User
from repositories.repo import Repo


class UserRepository(Repo):
    """
    docstring
    """
    cur: sqlite3.Cursor
    tn = "Users"
    model = User

    def __init__(self, cur):
        self.cur = cur

    def create_table(self) -> None:
        self.cur.execute(f"""
                create table IF NOT EXISTS {self.tn}
                (
                    id integer primary key autoincrement,
                    user_name varchar(50) UNIQUE Not null,
                    name nvarchar(50),
                    family nvarchar(50),
                    phone_number nchar(11) UNIQUE Not null,
                    email varchar(50) UNIQUE Not null,
                    birth_day DATE
                );""")

    def insert(self, user: User) -> None:
        query = f"""
                insert into {self.tn}
                (user_name,name,family,phone_number,email,birth_day)
                values
                ('{user.user_name}','{user.name}','{user.family}','{user.phone_number}','{user.email}','{user.birth_day}')
                """
        self.cur.execute(query)

    def get(self, count: int, offset: int = 0) -> list[User]:
        query = f"SELECT * FROM {self.tn} LIMIT {count} OFFSET {offset}"
        results = self.cur.execute(query).fetchall()
        objects = []
        for row in results:
            model = self.model()
            for i, ant in enumerate(self.model.__annotations__.keys()):
                model.__setattr__(ant, row[i])
            objects.append(model)
        return objects

    def get_by_user_name(self, user_name: str) -> Union[User, None]:
        query = f"""SELECT * FROM {self.tn}
        where user_name='{user_name}'
        """
        result = self.cur.execute(query).fetchone()
        if result is None:
            return None
        model = self.model()
        for i, ant in enumerate(self.model.__annotations__.keys()):
            model.__setattr__(ant, result[i])
        return model

    def get_id_by_user_name(self, user_name: str) -> Union[int, None]:
        query = f"""SELECT * FROM {self.tn}
        where user_name='{user_name}'
        """
        result = self.cur.execute(query).fetchone()
        if result is None:
            return None
        model = self.model()
        for i, ant in enumerate(self.model.__annotations__.keys()):
            model.__setattr__(ant, result[i])
        return model.id

    def get_user_by_id(self, id: str) -> Union[int, None]:
        query = f"""SELECT * FROM {self.tn}
        where id='{id}'
        """
        result = self.cur.execute(query).fetchone()
        if result is None:
            return None
        model = self.model()
        for i, ant in enumerate(self.model.__annotations__.keys()):
            model.__setattr__(ant, result[i])
        return model

    def get_user_name_by_id(self, id: str) -> Union[int, None]:
        query = f"""SELECT * FROM {self.tn}
        where id='{id}'
        """
        result = self.cur.execute(query).fetchone()
        if result is None:
            return None
        model = self.model()
        for i, ant in enumerate(self.model.__annotations__.keys()):
            model.__setattr__(ant, result[i])
        return model.user_name

    def check_user_name(self, user_name: str) -> bool:
        """
        check if username available
        """
        query = f"""
        select 1 from {self.tn}
        where user_Name='{user_name}'
        """
        res = self.cur.execute(query).fetchone()
        return res is None

    def check_email(self, email: str) -> bool:
        """
        check if username available
        """
        query = f"""
        select 1 from {self.tn}
        where email='{email}'
        """
        res = self.cur.execute(query).fetchone()
        return res is None

    def check_phone_number(self, phone_number: str) -> bool:
        """
        check if username available
        """
        query = f"""
        select 1 from {self.tn}
        where phone_number='{phone_number}'
        """
        res = self.cur.execute(query).fetchone()
        return res is None
