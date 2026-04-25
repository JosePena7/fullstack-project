"""add phone number to estimate requests

Revision ID: 9b1f0f6a2c4d
Revises: 3a0434b35559
Create Date: 2026-04-25 10:20:00.000000

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = "9b1f0f6a2c4d"
down_revision = "3a0434b35559"
branch_labels = None
depends_on = None


def upgrade():
    bind = op.get_bind()
    inspector = sa.inspect(bind)

    if not inspector.has_table("estimate_requests"):
        return

    columns = {column["name"] for column in inspector.get_columns("estimate_requests")}
    if "phone_number" in columns:
        return

    with op.batch_alter_table("estimate_requests", schema=None) as batch_op:
        batch_op.add_column(
            sa.Column("phone_number", sa.String(length=40), nullable=False, server_default="")
        )


def downgrade():
    bind = op.get_bind()
    inspector = sa.inspect(bind)

    if not inspector.has_table("estimate_requests"):
        return

    columns = {column["name"] for column in inspector.get_columns("estimate_requests")}
    if "phone_number" not in columns:
        return

    with op.batch_alter_table("estimate_requests", schema=None) as batch_op:
        batch_op.drop_column("phone_number")
