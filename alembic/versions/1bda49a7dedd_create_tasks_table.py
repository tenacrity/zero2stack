"""create tasks table

Revision ID: 1bda49a7dedd
Revises: 
Create Date: 2025-07-09 13:00:56.897524

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '1bda49a7dedd'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    op.create_table(
        'tasks',
        sa.Column('id', sa.Integer, primary_key=True, autoincrement=True),
        sa.Column('title', sa.String, nullable=False),
        sa.Column('description', sa.String, nullable=True),
        sa.Column('is_completed', sa.Boolean, nullable=False, server_default=sa.text('false'))
    )


def downgrade():
    op.drop_table('tasks')
