from ..database.db_connect import db
class Usuario(db.Model):
    idusuario = db.Column(db.Integer, primary_key=True, autoincrement=True)
    usuario = db.Column(db.String(80), nullable=False)
    contrasena = db.Column(db.String(120), nullable=False)
    tipo = db.Column(db.String(40), nullable=False)
    def save(self):
        db.session.add(self)
        db.session.commit()
    def delete(self):
        db.session.delete(self)
        db.session.commit()
