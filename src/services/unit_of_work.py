from pickle import NONE
import sqlite3
from models.user import *
from repositories.logins import LoginRepository
from repositories.repo import Repo
from repositories.user import UserRepository


class UnitOfWork(object):
    """
    docstring
    """
    users: UserRepository
    logins: LoginRepository
    _conn: sqlite3.Connection
    _cur: sqlite3.Cursor

    def __init__(self, db_name: str) -> None:
        self._conn = sqlite3.connect(f"{db_name}.db")
        self._cur = self._conn.cursor()
        # initializing repos
        self.users = UserRepository(self._cur)
        self.users.create_table()
        self.logins = LoginRepository(self._cur, self.users)
        self.logins.create_table()

    def commit(self):
        self._conn.commit()

    def initialize(self, repo: Repo) -> Repo:
        """
        docstring
        """
        res: Repo
        res = repo(self._cur)
        res.create_table()
        return res


# print("testLogin")
uow = UnitOfWork("mydb")
# # uow.users.insert(User(name="sajjad", email="sde@ee.com", family="rezai",
# #                  phone_number="091903425319", user_name="saji5", birth_day=date(2003, 9, 2), id=0))
# # uow.commit()
print(uow.users.get(5))
# uow.logins.insert(Login(user_name="saji5", password="saj$%$%$"))
# uow.commit()
# print(uow.logins.get(5))
# print(uow.logins.check(Login(user_name="salman",password="1234")))
# print(uow.logins.check(Login(user_name="saji4",password="1234")))
# print(uow.logins.check(Login(user_name="saji4",password="saj$%$%$")))
# print(uow.logins.check(Login(user_name="saji4",password="saj@34s2")))
# # User()
