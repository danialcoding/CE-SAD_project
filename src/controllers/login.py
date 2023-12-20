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
            uof.users.insert(user)
            uof.commit()
        except:
            return False

    
    @app.post("/api/users/login/check")
    async def check_login(login: Login):
        try:
            return uof.logins.check(login)
        except:
            return False
        
