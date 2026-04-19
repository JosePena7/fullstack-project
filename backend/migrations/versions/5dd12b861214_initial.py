"""initial

Revision ID: 5dd12b861214
Revises: 
Create Date: 2026-04-02 17:53:48.004076

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '5dd12b861214'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    bind = op.get_bind()
    inspector = sa.inspect(bind)

    if not inspector.has_table('users'):
        op.create_table(
            'users',
            sa.Column('id', sa.Integer(), nullable=False),
            sa.Column('name', sa.String(length=100), nullable=False),
            sa.Column('email', sa.String(length=254), nullable=False),
            sa.Column('password_hash', sa.Text(), nullable=False),
            sa.Column('is_active', sa.Boolean(), server_default=sa.text('true'), nullable=False),
            sa.Column('created_at', sa.DateTime(), server_default=sa.text('CURRENT_TIMESTAMP'), nullable=False),
            sa.Column('updated_at', sa.DateTime(), server_default=sa.text('CURRENT_TIMESTAMP'), nullable=False),
            sa.PrimaryKeyConstraint('id'),
        )
        op.create_index(op.f('ix_users_email'), 'users', ['email'], unique=True)
        return

    columns = {column['name'] for column in inspector.get_columns('users')}
    indexes = {index['name'] for index in inspector.get_indexes('users')}

    with op.batch_alter_table('users', schema=None) as batch_op:
        if 'is_active' not in columns:
            batch_op.add_column(
                sa.Column('is_active', sa.Boolean(), server_default=sa.text('true'), nullable=False)
            )
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

    indexes = {index['name'] for index in inspector.get_indexes('users')}
    if 'ix_users_email' in indexes:
        op.drop_index(op.f('ix_users_email'), table_name='users')

    op.drop_table('users')
