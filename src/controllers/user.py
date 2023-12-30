import io
import os
from fastapi import FastAPI
from models.user import Login, User
from services.unit_of_work import UnitOfWork
from fastapi import FastAPI, File, UploadFile


def add_controller(app: FastAPI, uof: UnitOfWork):
    """
    docstring
    """

    @app.get("/api/users/")
    async def get_users(count: int, offset: int = 0):
        return uof.users.get(count, offset)

    @app.get("/api/users/{user_name}")
    async def get_users(user_name: str):
        return uof.users.get_by_user_name(user_name)

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

    @app.get("/api/users/get/question")
    async def user_get_question(email: str):
        return uof.users.get_question_by_email(email)

    @app.get("/api/users/validate/forgotpassword")
    async def user_validate_forgotpassword(email: str, answer: str):
        return uof.users.check_question_answer(email, answer)

    @app.get("/api/users/change-password")
    async def user_change_password(email: str, password: str):
        res = uof.logins.change_password(email, password)
        uof.commit()
        return res

    @app.post("/api/users/image")
    async def user_change_image(file: UploadFile,username:str ,extention: str):
        uid = uof.users.get_id_by_user_name(username)
        f = open(f"{uid}.{extention}",'wb')
        f.write(file.file.read())
        f.flush()
        f.close()
        return {"file_size": file.size}

    @app.get("/api/users/{user_name}/image")
    async def user_get_image(user_name:str):
        uid = uof.users.get_id_by_user_name(user_name)
        dir = os.listdir()
        for i in dir:
            if i.startswith(str(uid)):
                dir = i
        return res