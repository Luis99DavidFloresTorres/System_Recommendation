from typing import List

from ..database.db_connect import db
from sqlalchemy import DateTime
class Recomendacion(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    fecha = db.Column(DateTime)
    mensaje = db.Column(db.String(120))
    curso = db.Column(db.String(120))
    usuario = db.Column(db.String(120))
    r_student = db.relationship("Student", secondary="recomendacion_student", backref="recomendacion_students")
    def save(self):
        db.session.add(self)
        db.session.commit()
    def delete(self):
        db.session.delete(self)
        db.session.commit()
  #  student:db.Mapped[List["student"]] = db.relationship(back_populates="recomendacion")
   # student = db.relationship("StudentModel",secondary="recomendacion_student",back_populates="recomendacion")