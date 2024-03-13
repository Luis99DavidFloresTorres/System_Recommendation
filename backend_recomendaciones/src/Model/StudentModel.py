from ..database.db_connect import db
class Student(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nombreuniversidad = db.Column(db.String(80), unique=True, nullable=False)
    area = db.Column(db.String(120), unique=True, nullable=False)

    def __repr__(self):
        return '<Student(id={}, nombreuniversidad={}, area={})>'.format(self.id, self.nombreuniversidad, self.area)
