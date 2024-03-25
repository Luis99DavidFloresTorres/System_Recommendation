from ..Model.StudentModel import Student
class StudentServices():
    @classmethod
    def getStudentsRecommendation(cls, titulo, area, universidad, rango_ano_titulacion, rango_edad):
        try:
            con = Student.query.filter_by(nombretitulo=titulo, area=area, nombreuniversidad=universidad,rango_ano_titulacion=rango_ano_titulacion,edad_rango=rango_edad)
            list = []
            for i in con:
                json = {'id':i.id,'nombre_completo':i.nombrecompleto,'celular':i.celular,'titulo':i.nombretitulo,
                 'universidad':i.nombreuniversidad,'area':i.area, 'rango_ano_titulacion':i.rango_ano_titulacion,
                        'edad_rango':i.edad_rango}
                list.append(json)
            return list
        except Exception as exp:
            print(exp)