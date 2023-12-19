from fastapi import FastAPI
from models.user import Login, User
from services.unit_of_work import UnitOfWork
from fastapi.middleware.cors import CORSMiddleware

def add_controller(app: FastAPI, uof: UnitOfWork):
    """
    docstring
    """

    origins = [
    # "http://localhost:8000",
    # "https://localhost:8000",
    "*"
    ]

    app.add_middleware(
        CORSMiddleware,
        allow_origins=origins,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )
    @app.get("/")
    async def main():
        return {"message": "Hello World"}
    

    @app.get("/api/dev/connect")
    def connect():
        return True
    
    @app.options("/api/dev/get_option")
    def get_option():
        return True