"""add password_hash column

Revision ID: 174d0a67146d
Revises: 5dd12b861214
Create Date: 2026-04-03 15:18:23.642477

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '174d0a67146d'
down_revision = '5dd12b861214'
branch_labels = None
depends_on = None


def upgrade():
    bind = op.get_bind()
    inspector = sa.inspect(bind)

    if not inspector.has_table('users'):
        return

    columns = {column['name'] for column in inspector.get_columns('users')}
    indexes = {index['name'] for index in inspector.get_indexes('users')}

    with op.batch_alter_table('users', schema=None) as batch_op:
        if 'email' not in columns:
            batch_op.add_column(sa.Column('email', sa.String(length=254), nullable=True))
        if 'password_hash' not in columns:
            batch_op.add_column(sa.Column('password_hash', sa.Text(), nullable=True))
        if 'created_at' not in columns:
            batch_op.add_column(
                sa.Column('created_at', sa.DateTime(), server_default=sa.text('CURRENT_TIMESTAMP'), nullable=False)
            )
        if 'updated_at' not in columns:
            batch_op.add_column(
                sa.Column('updated_at', sa.DateTime(), server_default=sa.text('CURRENT_TIMESTAMP'), nullable=False)
            )

    if 'ix_users_email' not in indexes:
        op.create_index(op.f('ix_users_email'), 'users', ['email'], unique=True)


def downgrade():
    bind = op.get_bind()
    inspector = sa.inspect(bind)

    if not inspector.has_table('users'):
        return

    columns = {column['name'] for column in inspector.get_columns('users')}
    indexes = {index['name'] for index in inspector.get_indexes('users')}

    with op.batch_alter_table('users', schema=None) as batch_op:
        if 'ix_users_email' in indexes:
            batch_op.drop_index(batch_op.f('ix_users_email'))
        if 'updated_at' in columns:
            batch_op.drop_column('updated_at')
        if 'created_at' in columns:
            batch_op.drop_column('created_at')
        if 'password_hash' in columns:
            batch_op.drop_column('password_hash')
        if 'email' in columns:
            batch_op.drop_column('email')
