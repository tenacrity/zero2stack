from pydantic import BaseModel, Field, ConfigDict
from datetime import datetime
from typing import Optional


# ✅ Base schema with alias for input/output consistency
class TaskBase(BaseModel):
    title: str
    description: Optional[str] = None
    completed: Optional[bool] = Field(default=False, alias="is_completed")

    model_config = ConfigDict(
        validate_by_name=True,    # replaces allow_population_by_field_name
        from_attributes=True      # replaces orm_mode
    )


# ✅ Create schema (for POST input)
class TaskCreate(TaskBase):
    pass


# ✅ Update schema (for PUT input, allows partial updates)
class TaskUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    completed: Optional[bool] = Field(default=None, alias="is_completed")

    model_config = ConfigDict(
        validate_by_name=True
    )


# ✅ Response schema (for GET/POST/PUT output)
class TaskResponse(BaseModel):
    id: int
    title: str
    description: Optional[str] = None
    completed: bool = Field(..., alias="is_completed")
    created_at: datetime

    model_config = ConfigDict(
        from_attributes=True,
        validate_by_name=True
    )
