from ..services.RecomendacionStudent import RecomendacionesStudentServices
from ..services.AI_LLM import AI_LLM_Services
from ..Model.RecomendacionModel import Recomendacion
from ..Model.Tipo_Estudiante_Recomendado import Tipo_estudiante_recomendado
from flask import Blueprint, jsonify, request
from ..Model.StudentModel import Student
from datetime import datetime, timedelta
import json
recomendacionStudent = Blueprint('RecomendacionStudent_blueprint', __name__)


@recomendacionStudent.route('buscar', methods=['GET'])
def buscar():
    all = RecomendacionesStudentServices.allRecomendacionesStudent()
    jsn = jsonify({'recomendaciones':all})
    if all!=0:
        return jsn,200
    return '{mensaje:error base de datos}',500
@recomendacionStudent.route('buscarAlumnosRecomendacion/<id>', methods=['GET'])
def buscarEstudiantes(id):
    all = RecomendacionesStudentServices.students(id)
    jsn = jsonify({'estudiantes':all})
    if all!=0:
        return jsn,200
    return '{mensaje:error base de datos}',500
@recomendacionStudent.route('agregar',methods=['POST'])
def agregar():
    body = request.json
    fecha = datetime.now() + timedelta(hours=4)
    print(fecha)
    recomendacion = body['recomendacion'][0]
    recomendacion = json.loads(recomendacion)
    alumnos = body['alumnos']
    mensaje = body['mensaje']

    tipo_estudiante_recomendado = Tipo_estudiante_recomendado(universidad=recomendacion['universidad'],
                                                              titulo=recomendacion['titulo'], area=recomendacion['area'],
                                                              rango_edad=recomendacion['rango_edad'], rango_ano_titulacion=recomendacion['rango_ano_titulacion'])
    estudiantes = [Student(**estudiante_data) for estudiante_data in alumnos]
    agregarR= Recomendacion(fecha=fecha,mensaje=mensaje, curso=body['curso'],t_student=[tipo_estudiante_recomendado])
    agregarR.save()
    print(agregarR.id)
    RecomendacionesStudentServices.guardarEstudiantes(estudiantes,agregarR.id)
    return {'mensaje':1}, 200