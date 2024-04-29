from ..database.db_connect import db
class Tipo_estudiante_recomendado(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    universidad = db.Column(db.String(120), nullable=False)
    titulo = db.Column(db.String(120), nullable=False)
    area = db.Column(db.String(120), nullable=False)
    rango_ano_titulacion = db.Column(db.String(45), nullable=False)
    rango_edad = db.Column(db.String(45), nullable=False)
    recomendacion_fk = db.Column(db.String, db.ForeignKey("recomendacion.id"))
    def save(self):
        db.session.add(self)
        db.session.commit()
    def delete(self):
        db.session.delete(self)
        db.session.commit()