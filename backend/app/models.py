from typing import Optional
from sqlmodel import SQLModel, Field

class Task(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    title: str
    description: str
    category: str
    completed: bool = False