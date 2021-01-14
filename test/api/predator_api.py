from typing import Optional

import fastapi
import httpx

from models.location import Location
from models.umbrella_status import UmbrellaStatus

router = fastapi.APIRouter()


@router.get('/api/umbrella', response_model=UmbrellaStatus)
async def do_i_need_an_umbrella(location: Location = fastapi.Depends()):
    url = f'https://weather.talkpython.fm/api/weather?city={location.city}&' \
          f'state={location.state}&country={location.country}&units=imperial'

    if location.state:
        url += f'state={location.state}'

        async with httpx.AsyncClient() as client:
            resp = await client.get(url)
            resp.raise_for_status()
            print(resp.status_code)
            print(resp.text)

    #         data = resp.json()
    #
    # print(data)
    return location
