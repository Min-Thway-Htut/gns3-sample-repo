from sqlmodel import Session, select
from app.models import Task

def create_task(task: Task, session: Session):
    session.add(task)
    session.commit()
    session.refresh(task)
    return task

def get_tasks(session: Session):
    return session.exec(select(Task)).all()

def get_task(task_id: int, session: Session):
    return session.get(Task, task_id)

def delete_task(task_id: int, session: Session):
    task = session.get(Task, task_id)
    if task:
        session.delete(task)
        session.commit()
    return task

def update_task(task_id: int, task_data: dict, session: Session):
    task = session.get(Task, task_id)
    if task:
        for key, value in task_data.items():
            setattr(task, key, value)
        session.commit()
        session.refresh(task)
    return task
