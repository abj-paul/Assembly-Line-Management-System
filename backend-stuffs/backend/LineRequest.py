from pydantic import BaseModel

class LineRequest(BaseModel):
    machine_list: list = []
    line_id: int = 0
    camera_list: list = []

class LineResponse(BaseModel):
    congestion_statuses: list = []
    line_id: int = 0

class CongestionStatus(BaseModel):
    imageFileUrl : str = ""
    congestionStatus: bool = False
    machineId: int = 0