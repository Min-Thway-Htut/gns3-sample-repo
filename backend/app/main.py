from fastapi import FastAPI, Depends, HTTPException
from sqlmodel import Session
from app.database import create_db_and_tables, get_session
from app.models import Task
from app.crud import create_task, get_tasks, get_task, delete_task, update_task

app = FastAPI()

@app.on_event("startup")
def on_startup():
    create_db_and_tables()

@app.post("/tasks/", response_model=Task)
def add_task(task: Task, session: Session = Depends(get_session)):
    return create_task(task, session)

@app.get("/tasks/", response_model=list[Task])
def read_tasks(session: Session = Depends(get_session)):
    return get_tasks(session)

@app.get("/tasks/{task_id}", response_model=Task)
def read_task(task_id: int, session: Session = Depends(get_session)):
    task = get_task(task_id, session)
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    return task

@app.delete("/tasks/{task_id}", response_model=Task)
def remove_task(task_id: int, session: Session = Depends(get_session)):
    task = delete_task(task_id, session)
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    return task

@app.put("/tasks/{task_id}", response_model=Task)
def modify_task(task_id: int, task: Task, session: Session = Depends(get_session)):
    updated = update_task(task_id, task.dict(exclude_unset=True), session)
    if not updated:
        raise HTTPException(status_code=404, detail="Task not found")
    return updated
