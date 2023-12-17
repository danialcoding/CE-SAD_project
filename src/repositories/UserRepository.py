import sqlite3
from models.User import User


class UserRepository(object):
    """
    docstring
    """    
    cur: sqlite3.Cursor

    def __init__(self,cur):
        self.cur = cur

    def create_table(self):
        self.cur.execute("""
                 create table IF NOT EXISTS Users
                 (id int primary key,
                 user_Name varchar(50) UNIQUE Not null,
                 name nvarchar(50),
                 family nvarchar(50),
                 phone_number nchar(11) UNIQUE Not null,
                 email varchar(50) UNIQUE Not null,
                 birth_day DATE);
                 """)

    def insert(self, user: User):
        self.cur.execute(f"""
                        insert into Users
                        (user_Name,name,family,phone_number,email,birth_day)
                        values
                        ({user.user_Name},'{user.name}','{user.family}','{user.phone_number}','{user.email}','{user.birth_day}')
                        """)
        self.conn.commit()

    def getUsers(self, count: int, offset: int = 0) -> list[User]:
        query = f"SELECT * FROM Users LIMIT {count} OFFSET {offset}"
        results = self.cur.execute(query).fetchall()
        objects = []
        for row in results:
            user = User()
            for i, ant in enumerate(User.__annotations__.keys()):
                user.__setattr__(ant, row[i])
            objects.append(user)
        return objects

