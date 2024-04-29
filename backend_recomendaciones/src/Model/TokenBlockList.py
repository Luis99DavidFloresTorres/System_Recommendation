import datetime

from ..database.db_connect import db

class Token_block_list(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    idU = db.Column(db.String(), nullable=False)
    created_at = db.Column(db.DateTime(), default=datetime.datetime.utcnow)
    def save(self):
        db.session.add(self)
        db.session.commit()
    def delete(self):
        db.session.delete(self)
        db.session.commit()