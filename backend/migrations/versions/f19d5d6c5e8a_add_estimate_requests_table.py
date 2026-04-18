"""add estimate requests table

Revision ID: f19d5d6c5e8a
Revises: 174d0a67146d
Create Date: 2026-04-18 14:55:00.000000

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'f19d5d6c5e8a'
down_revision = '174d0a67146d'
branch_labels = None
depends_on = None


def upgrade():
    op.create_table(
        'estimate_requests',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('full_name', sa.String(length=120), nullable=False),
        sa.Column('email', sa.String(length=254), nullable=False),
        sa.Column('address', sa.String(length=255), nullable=False),
        sa.Column('service_type', sa.String(length=80), nullable=False),
        sa.Column('frequency', sa.String(length=80), nullable=False),
        sa.Column('comments', sa.Text(), nullable=False, server_default=''),
        sa.Column('created_at', sa.DateTime(), nullable=False),
        sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_estimate_requests_email'), 'estimate_requests', ['email'], unique=False)


def downgrade():
    op.drop_index(op.f('ix_estimate_requests_email'), table_name='estimate_requests')
    op.drop_table('estimate_requests')
