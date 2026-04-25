"""update

Revision ID: 3a0434b35559
Revises: f19d5d6c5e8a
Create Date: 2026-04-19 13:02:47.859103

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision = '3a0434b35559'
down_revision = 'f19d5d6c5e8a'
branch_labels = None
depends_on = None


def upgrade():
    bind = op.get_bind()
    inspector = sa.inspect(bind)

    if inspector.has_table('estimates'):
        op.drop_table('estimates')


def downgrade():
    bind = op.get_bind()
    inspector = sa.inspect(bind)

    if inspector.has_table('estimates'):
        return

    op.create_table('estimates',
    sa.Column('id', sa.INTEGER(), autoincrement=True, nullable=False),
    sa.Column('full_name', sa.VARCHAR(length=100), autoincrement=False, nullable=False),
    sa.Column('email', sa.VARCHAR(length=254), autoincrement=False, nullable=False),
    sa.Column('address', sa.VARCHAR(length=255), autoincrement=False, nullable=False),
    sa.Column('service_type', sa.VARCHAR(length=50), autoincrement=False, nullable=False),
    sa.Column('frequency', sa.VARCHAR(length=50), autoincrement=False, nullable=False),
    sa.Column('created_at', postgresql.TIMESTAMP(), autoincrement=False, nullable=False),
    sa.Column('comments', sa.TEXT(), autoincrement=False, nullable=True),
    sa.Column('status', sa.VARCHAR(length=40), server_default=sa.text("'new'::character varying"), autoincrement=False, nullable=False),
    sa.Column('admin_notes', sa.TEXT(), autoincrement=False, nullable=True),
    sa.Column('updated_at', postgresql.TIMESTAMP(), server_default=sa.text('CURRENT_TIMESTAMP'), autoincrement=False, nullable=False),
    sa.Column('phone_number', sa.VARCHAR(length=40), autoincrement=False, nullable=False),
    sa.PrimaryKeyConstraint('id', name=op.f('estimates_pkey'))
    )
