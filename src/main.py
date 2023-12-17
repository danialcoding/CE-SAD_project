from Services.UnitOfWork import UnitOfWork

ur = UnitOfWork("testSajjad")
ur.users.insert(User)
ur.users.getUsers(5)