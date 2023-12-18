from fastapi import FastAPI
from models.user import Login, User
from services.unit_of_work import UnitOfWork


def add_controller(app: FastAPI, uof: UnitOfWork):
    """
    docstring
    """

    @app.get("/api/users/")
    async def get_users(count: int, offset: int = 0):
        return uof.users.get(count, offset)

    @app.post("/api/users/")
    async def insert_users(user: User):
        uof.users.insert(user)
        uof.commit()

    @app.get("/api/users/check/username")
    async def user_check_user_name_available(user_name: str):
        return uof.users.check_user_name(user_name)

    @app.get("/api/users/check/email")
    async def user_check_email_available(email: str):
        return uof.users.check_email(email)

    @app.get("/api/users/check/phone_number")
    async def user_check_phone_number_available(phone_number: str):
        return uof.users.check_phone_number(phone_number)
