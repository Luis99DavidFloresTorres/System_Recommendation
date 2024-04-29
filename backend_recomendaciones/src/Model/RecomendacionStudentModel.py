from ..database.db_connect import db
from sqlalchemy import Date
class Recomendacion_student(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    recomendacion_fk= db.Column(db.Integer,db.ForeignKey("recomendacion.id"))
    student_fk= db.Column(db.String,db.ForeignKey("student.id"))
    def save(self):
        db.session.add(self)
        db.session.commit()