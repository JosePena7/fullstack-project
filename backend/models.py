from datetime import datetime, timezone
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import Mapped, mapped_column
from werkzeug.security import generate_password_hash, check_password_hash

db = SQLAlchemy()


class User(db.Model):
    __tablename__ = "users"

    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(db.String(100), nullable=False)
    email: Mapped[str] = mapped_column(db.String(254), unique=True, nullable=False, index=True)
    password_hash: Mapped[str] = mapped_column(db.Text, nullable=False)
    is_active: Mapped[bool] = mapped_column(default=True)
    created_at: Mapped[datetime] = mapped_column(default=lambda: datetime.now(timezone.utc))
    updated_at: Mapped[datetime] = mapped_column(
        default=lambda: datetime.now(timezone.utc),
        onupdate=lambda: datetime.now(timezone.utc)
    )

    def set_password(self, password: str) -> None:
        if not password or len(password) < 8:
            raise ValueError("Password must be at least 8 characters.")
        self.password_hash = generate_password_hash(password)

    def check_password(self, password: str) -> bool:
        return check_password_hash(self.password_hash, password)

    def serialize(self) -> dict:
        return {
            "id": self.id,
            "name": self.name,
            "email": self.email,
            "is_active": self.is_active,
            "created_at": self.created_at.isoformat(),
            "updated_at": self.updated_at.isoformat(),
        }

    def __repr__(self) -> str:
        return f"<User id={self.id} name={self.name!r}>"


class EstimateRequest(db.Model):
    __tablename__ = "estimate_requests"

    id: Mapped[int] = mapped_column(primary_key=True)
    full_name: Mapped[str] = mapped_column(db.String(120), nullable=False)
    email: Mapped[str] = mapped_column(db.String(254), nullable=False, index=True)
    address: Mapped[str] = mapped_column(db.String(255), nullable=False)
    service_type: Mapped[str] = mapped_column(db.String(80), nullable=False)
    frequency: Mapped[str] = mapped_column(db.String(80), nullable=False)
    comments: Mapped[str] = mapped_column(db.Text, default="")
    created_at: Mapped[datetime] = mapped_column(default=lambda: datetime.now(timezone.utc), nullable=False)

    def serialize(self) -> dict:
        return {
            "id": self.id,
            "full_name": self.full_name,
            "email": self.email,
            "address": self.address,
            "service_type": self.service_type,
            "frequency": self.frequency,
            "comments": self.comments,
            "created_at": self.created_at.isoformat(),
        }
