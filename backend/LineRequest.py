from pydantic import BaseModel

class LineRequest(BaseModel):
    machine_list: list = []
    line_id: int = 0