from fastapi import FastAPI
import random

from LineRequest import LineRequest

app = FastAPI()

@app.get("/congestion_status/machine/{machine_id}", response_model=bool)
async def line_congestion_status(machine_id):
    return True 

@app.post("/congestion_status/line/", response_model=list)
async def line_congestion_status(lineRequest:LineRequest):
    arr = []
    for machineId in lineRequest.machine_list:
        randCongestionValue = random.randint(0,2)
        if randCongestionValue==0 or randCongestionValue==1: arr.append(True)
        else: arr.append(False)
    return arr