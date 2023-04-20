from fastapi import FastAPI
from LineRequest import LineRequest
from LineRequest import LineResponse
from camera import *
from nmf import *

app = FastAPI()

@app.get("/congestion_status/machine/{machine_id}", response_model=bool)
async def line_congestion_status(machine_id):
    return True 

@app.post("/congestion/create_workstation")
async def createWorkstationFolder(machineId: int):
    createFolderForWorkstation(machineId)
    getLatestImageForWorkstation(machineId)
    return "Successful"

@app.post("/congestion_status/line/", response_model=list[int])
def line_congestion_status(lineRequest:LineRequest):
    arr = []
    print(lineRequest)
    for machineId in lineRequest.machine_list:
        createFolderForWorkstation(machineId)
        img_path = getLatestImageForWorkstation(machineId)

        arr.append(getCongestionStatusForImage(img_path))
    return arr