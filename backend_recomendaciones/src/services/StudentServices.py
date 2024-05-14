from ..Model.StudentModel import Student
from ..database.db_connect import db
class StudentServices():
    @classmethod
    def getStudentsRecommendation(cls, titulo, area, rango_ano_titulacion, rango_edad):
        try:
            con = Student.query.filter_by(nombretitulo=titulo, area=area,rango_ano_titulacion=rango_ano_titulacion,edad_rango=rango_edad)
            list = []
            print("entra")

            for i in con:
                json = {'id':i.id,'nombrecompleto':i.nombrecompleto,'celular':i.celular,'nombretitulo':i.nombretitulo,
                 'nombreuniversidad':i.nombreuniversidad,'area':i.area, 'rango_ano_titulacion':i.rango_ano_titulacion,
                        'edad_rango':i.edad_rango}
                list.append(json)
            print(list)
            return list
        except Exception as exp:
            print(exp)
    @classmethod
    def getById(cls,id):
        estudiante = Student.query.filter_by(id=id)

        json = {'id': estudiante[0].id, 'nombrecompleto': estudiante[0].nombrecompleto,
                'celular': estudiante[0].celular, 'nombretitulo': estudiante[0].nombretitulo,
                'nombreuniversidad': estudiante[0].nombreuniversidad, 'area': estudiante[0].area,
                'rango_ano_titulacion': estudiante[0].rango_ano_titulacion,
                    'edad_rango': estudiante[0].edad_rango}
        print(json)
        return json
    @classmethod
    def obtenerTodos(cls):

        try:
            todos = Student.query.all()
            list = []

            for i in todos:
                json = {'id':i.id,'nombrecompleto':i.nombrecompleto,'celular':i.celular,'nombretitulo':i.nombretitulo,
                 'nombreuniversidad':i.nombreuniversidad,'area':i.area, 'rango_ano_titulacion':i.rango_ano_titulacion,
                        'edad_rango':i.edad_rango}
                list.append(json)
            return list
        except Exception as exp:
            print(exp)
    @classmethod
    def agregarEstudiante(cls, id, nombreu, area, titulo, nombrecompleto,celular,edad_rango,rango_titulacion):
        try:
            estudiante = Student.query.filter_by(id=id).first()
            if estudiante:
                print("entra")
                return 2
            estudiante = Student(id=id,nombreuniversidad=nombreu,
                                 area=area,nombretitulo=titulo,
                                 nombrecompleto=nombrecompleto,
                                 celular=celular,edad_rango=edad_rango,
                                 rango_ano_titulacion=rango_titulacion)
            db.session.add(estudiante)
            db.session.commit()
            return 1
        except Exception as exp:
            return 0
    @classmethod
    def fechasRango(cls, fechaNac, fechaTitulacion):
        edad = fechaNac.year
        rango_edad = cls.rangoEdad(edad)
        anotitulacion = fechaTitulacion.year
        rango_titulacion = cls.rango_titulacion_ano(anotitulacion)
        return rango_edad, rango_titulacion
    @classmethod
    def rango_titulacion_ano(ano):
        if ano >= 2017:
            return '2017-actual'
        if ano < 2017 and ano > 2009:
            return '2010-2016'
        if ano < 2010:
            return 'antiguo'
    @classmethod
    def rangoEdad(cls, edad):
        if edad < 33:
            return 'menor-32'
        if edad < 40:
            return '33-39'
        if edad < 47:
            return '40-46'
        if edad > 46:
            return '47-mayor'
    @classmethod
    def editarEstudiante(cls, id, nombreu, area, titulo, nombrecompleto, rangoEdad, rangoTitulacion, celular):
        try:
            estudiante = Student.query.get(id)
            estudiante.nombrecompleto=nombrecompleto
            estudiante.nombreuniversidad=nombreu
            estudiante.nombretitulo = titulo
            estudiante.edad_rango = rangoEdad
            estudiante.rango_ano_titulacion = rangoTitulacion
            estudiante.area = area
            estudiante.celular = celular
            db.session.commit()
            return 1
        except Exception as e:
            return 0
    @classmethod
    def eliminarEstudiante(cls, id):
        try:
            estudiante = Student.query.get(id)
            db.session.delete(estudiante)
            db.session.commit()
            return 1
        except Exception as e:
            return 0