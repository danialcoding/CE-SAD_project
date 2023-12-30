import io
import os
from typing import IO
from fastapi import FastAPI
from fastapi.responses import FileResponse
from models.user import Login, User
from services.unit_of_work import UnitOfWork
from fastapi import FastAPI, File, UploadFile


def add_controller(app: FastAPI, uof: UnitOfWork):
    """
    docstring
    """

    @app.get("/api/users/")
    async def get_users(count: int = 10, offset: int = 0):
        return uof.users.get(count, offset)

    @app.post("/api/users/")
    async def insert_users(user: User):
        uof.users.insert(user)
        uof.commit()

    @app.get("/api/users/{user_name}")
    async def get_user(user_name: str):
        return uof.users.get_by_user_name(user_name)

    @app.get("/api/users/check/username")
    async def user_check_user_name_available(user_name: str):
        return uof.users.check_user_name(user_name)

    @app.get("/api/users/check/email")
    async def user_check_email_available(email: str):
        return uof.users.check_email(email)

    @app.get("/api/users/check/phone_number")
    async def user_check_phone_number_available(phone_number: str):
        return uof.users.check_phone_number(phone_number)

    @app.get("/api/users/ckeck/forgotpassword")
    async def user_validate_forgotpassword(email: str, answer: str):
        return uof.users.check_question_answer(email, answer)

    @app.get("/api/users/question")
    async def user_get_question(email: str):
        return uof.users.get_question_by_email(email)

    @app.get("/api/users/change-password")
    async def user_change_password(email: str, password: str):
        res = uof.logins.change_password(email, password)
        uof.commit()
        return res

    _path = "src\images"

    def _findImage(user_name: str):
        uid = uof.users.get_id_by_user_name(user_name)
        for i in os.listdir(_path):
            if i.split(".")[0] == str(uid):
                return (uid, os.path.join(_path, i))
        return (uid, None)

    @app.get("/api/users/{user_name}/image", response_class=FileResponse)
    async def user_get_image(user_name: str):
        uid, path = _findImage(user_name)
        if path is None:
            path = os.path.join(_path, "0.png")
        f: io.TextIOWrapper = open(path, "r")
        # fr = FileResponse()
        # fr.filename = path

        return path

    @app.post("/api/users/{user_name}/image")
    async def user_change_image(file: UploadFile, user_name: str):
        extention = file.filename.split(".")[-1]
        uid, path = _findImage(user_name)
        if path is not None:
            os.remove(path)
        with open(f"src/images/{uid}.{extention}", "wb") as f:
            f.write(file.file.read())
            f.flush()
        return True
