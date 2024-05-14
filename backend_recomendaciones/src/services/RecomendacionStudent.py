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
                jsn = {'id': i.id, 'celular': i.celular,'nombre':i.nombrecompleto,'estado':i.estado}
                list.append(jsn)
            print(list)
            return list
        except Exception as exp:
            return 0
    @classmethod
    def students(cls, id):
        recomendacion = Recomendacion.query.filter_by(id=id).first()
        estudiantes = []
        for i in recomendacion.r_student:
            recomendacion_est = Recomendacion_student.query.filter_by(recomendacion_fk=recomendacion.id,student_fk=i.id).first()
            json = {'nombrecompleto':i.nombrecompleto, 'nombreuniversidad':i.nombreuniversidad,
                    'nombretitulo':i.nombretitulo,'id':i.id,'celular':i.celular,'edad_rango':i.edad_rango,'estado':recomendacion_est.estado}
            estudiantes.append(json)
        return estudiantes
        #recomendacion_est.save()
    @classmethod
    def guardarEstudiantes(cls, estudiantes, id_recomendacion, noenviados):
        for i in estudiantes:
            if i.celular in noenviados:

                recomendacion_est = Recomendacion_student(student_fk=i.id,recomendacion_fk=id_recomendacion,estado=0)
            else:
                recomendacion_est = Recomendacion_student(student_fk=i.id, recomendacion_fk=id_recomendacion, estado=1)
            recomendacion_est.save()