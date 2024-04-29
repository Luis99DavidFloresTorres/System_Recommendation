from typing import List

from ..database.db_connect import db
class Student(db.Model):
    id = db.Column(db.String, primary_key=True)
    nombreuniversidad = db.Column(db.String(80), nullable=True)
    area = db.Column(db.String(120), nullable=True)
    nombretitulo = db.Column(db.String(120),  nullable=True)
    nombrecompleto=db.Column(db.String(120), nullable=True)
    celular=db.Column(db.String(120), nullable=True)
    edad_rango = db.Column(db.String(120), nullable=True)
    rango_ano_titulacion = db.Column(db.String(120), nullable=True)
