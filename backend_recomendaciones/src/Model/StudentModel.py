from ..database.db_connect import db
class Student(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nombreuniversidad = db.Column(db.String(80), unique=True, nullable=False)
    area = db.Column(db.String(120), unique=True, nullable=False)
    nombretitulo = db.Column(db.String(120), unique=True, nullable=False)
    nombrecompleto=db.Column(db.String(120), unique=True, nullable=False)
    celular=db.Column(db.String(120), unique=True, nullable=False)
    edad_rango = db.Column(db.String(120), unique=True, nullable=False)
    rango_ano_titulacion = db.Column(db.String(120), unique=True, nullable=False)
    def __repr__(self):
        return 'id={}, nombreuniversidad={}, area={}, nombretitulo={},nombrecompleto={},celular={},edad_rango={},rango_ano_titulacion={}'.format(self.id, self.nombreuniversidad, self.area,self.nombretitulo,self.nombrecompleto, self.celular,self.edad_rango,self.rango_ano_titulacion)
