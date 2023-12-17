import sqlite3
from .UserRepository import UserRepository


class UnitOfWork(object):
    """
    docstring
    """
    users: UserRepository
    _conn: sqlite3.Connection
    _cur: sqlite3.Cursor

    def __init__(self, db_name: str) -> None:
        self._conn = sqlite3.connect(f"{db_name}.db")
        self._cur = self._conn.cursor()
        self.users = UserRepository(self._cur)

    def commit(self):
        self._conn.commit()
