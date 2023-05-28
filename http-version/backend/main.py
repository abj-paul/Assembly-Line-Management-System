from fastapi import FastAPI
from LineRequest import CongestionStatus, LineRequest
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

@app.post("/congestion_status/line/image/", response_model=list[CongestionStatus])
def line_congestion_status_with_image(lineRequest:LineRequest):
    print("DEBUG: "+str(lineRequest))
    arr = []
    print(lineRequest)
    for index,machineId in enumerate(lineRequest.machine_list):
        createFolderForWorkstation(machineId)
        if lineRequest.camera_list[index] == None or lineRequest.camera_list[index]=='':
            #print("NULL DETECTED!---------------")
            img_path = getLatestImageForWorkstation(machineId)

            arr.append({
                "imageFileUrl": img_path.split("congestion-dataset")[1],
                "congestionStatus": wrap_response(getCongestionStatusForImage(img_path)),
                "machineId": machineId
                })
            print("DEBUG RESPONSE RANDOM:"+str(arr))
        else:
            img_path_list = getImagesFromCamera(machineId, lineRequest.camera_list[index])

            arr.append({
                "imageFileUrl": img_path_list[0].split("congestion-dataset")[1],
                "congestionStatus": wrap_response(getCongestionStatusFromImageList(img_path_list)),
                "machineId": machineId
                })
            print("DEBUG RESPONSE CAMERA:"+str(arr))
    return arr


def wrap_response(prediction):
    if prediction == 2: return False 
    return True
