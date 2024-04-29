from ..Model.RecomendacionStudentModel import Recomendacion_student
from ..database.db_connect import db
from ..Model.RecomendacionModel import Recomendacion
from ..Model.StudentModel import Student
class RecomendacionesStudentServices():
    @classmethod
    def allRecomendacionesStudent(cls, id):
        try:
            query = Recomendacion.query.filter_by(id=id)
            list = []
            for i in query[0].r_student:
                jsn = {'id': i.id, 'celular': i.celular,'nombre':i.nombrecompleto}
                list.append(jsn)
            print(list)
            return list
        except Exception as exp:
            return 0
    @classmethod
    def students(cls, id):
        recomendacion_est = Recomendacion.query.filter_by(id=id).first()
        estudiantes = []
        for i in recomendacion_est.r_student:
            json = {'nombrecompleto':i.nombrecompleto, 'nombreuniversidad':i.nombreuniversidad,
                    'nombretitulo':i.nombretitulo,'id':i.id,'celular':i.celular,'edad_rango':i.edad_rango}
            estudiantes.append(json)
        return estudiantes
        #recomendacion_est.save()
    @classmethod
    def guardarEstudiantes(cls, estudiantes, id_recomendacion):
        for i in estudiantes:
            recomendacion_est = Recomendacion_student(student_fk=i.id,recomendacion_fk=id_recomendacion)
            recomendacion_est.save()