from services.unit_of_work import UnitOfWork
from fastapi import FastAPI
import controllers.user
import controllers.login
import controllers.dev

app = FastAPI()

uow = UnitOfWork("ce_database")


controllers.dev.add_controller(app, uow)
controllers.user.add_controller(app, uow)
controllers.login.add_controller(app, uow)
