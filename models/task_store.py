from typing import List, Optional
from .task import Task

class TaskStore:
    def __init__(self):
        self.tasks: List[Task] = []
        self.next_id: int = 1

    def get_all(self) -> List[Task]:
        return self.tasks.copy()

    def get_by_id(self, task_id: int) -> Optional[Task]:
        return next((task for task in self.tasks if task.id == task_id), None)

    def create(self, text: str) -> Task:
        task = Task(id=self.next_id, text=text)
        self.next_id += 1
        self.tasks.append(task)
        return task

    def delete(self, task_id: int) -> bool:
        task = self.get_by_id(task_id)
        if task:
            self.tasks.remove(task)
            return True
        return False

# Create a singleton instance
task_store = TaskStore() 