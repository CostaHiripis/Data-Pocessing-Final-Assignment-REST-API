import fastapi
import uvicorn

from api import predator_api
from views import home

api = fastapi.FastAPI()


def configure():
    api.include_router(home.router)


configure()
if __name__ == '__main__':
    uvicorn.run(api)

uvicorn.run(api)
