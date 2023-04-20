from pydantic import BaseModel

class LineRequest(BaseModel):
    machine_list: list = []
    line_id: int = 0

class LineResponse(BaseModel):
    congestion_statuses: list = []
    line_id: int = 0
