from ..Model.RecomendacionModel import Recomendacion
from ..database.db_connect import db
class RecomendacionesServices():
    @classmethod
    def allRecomendaciones(cls):
        try:
            query = Recomendacion.query.order_by(Recomendacion.fecha.desc()).all()
            list = []
            for i in query:
                jsn = {'id':i.id,'fecha':i.fecha,'mensaje':i.mensaje,'curso':i.curso,'usuario':i.usuario}
                list.append(jsn)
            return list
        except Exception as exp:
            return 0