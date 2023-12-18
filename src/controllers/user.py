from fastapi import FastAPI
from models.user import User
from services import unit_of_work


def add_controller(app: FastAPI, uof: unit_of_work):
    """
    docstring
    """
    list = []

    @app.get("/users/")
    async def add_item():
        return list

    @app.post("/users/")
    async def create_item(item: User):
        list.append(item)
        return None

    # Import the sqlite3 module
