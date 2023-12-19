from fastapi import FastAPI
from models.user import Login, User
from services.unit_of_work import UnitOfWork


def add_controller(app: FastAPI, uof: UnitOfWork):
    """
    docstring
    """
    @app.post("/api/users/login")
    async def insert_login(user: Login):
        try:
            uof.logins.insert(user)
            uof.commit()
        except:
            return False
    
    @app.post("/api/users/login/check")
    async def check_login(login: Login):
        return uof.logins.check(login)
