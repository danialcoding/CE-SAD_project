from fastapi import FastAPI
from pydantic import BaseModel
from models.User import User

app = FastAPI()

list = []

@app.get("/users/")
async def add_item():
    return list

@app.post("/users/")
async def create_item(item: User):
    list.append(item)
    return None

# Import the sqlite3 module