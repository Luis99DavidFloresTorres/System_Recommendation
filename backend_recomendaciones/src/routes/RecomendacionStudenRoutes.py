import requests

from ..services.RecomendacionStudent import RecomendacionesStudentServices
from ..services.AI_LLM import AI_LLM_Services
from ..Model.RecomendacionModel import Recomendacion
from ..Model.Tipo_Estudiante_Recomendado import Tipo_estudiante_recomendado
from flask import Blueprint, jsonify, request
from ..Model.StudentModel import Student
from datetime import datetime, timedelta
from flask_jwt_extended import current_user, jwt_required
import json
recomendacionStudent = Blueprint('RecomendacionStudent_blueprint', __name__)


@recomendacionStudent.route('buscar', methods=['GET'])
@jwt_required()
def buscar():
    all = RecomendacionesStudentServices.allRecomendacionesStudent()
    jsn = jsonify({'recomendaciones':all})
    if all!=0:
        return jsn,200
    return '{mensaje:error base de datos}',500
@recomendacionStudent.route('buscarAlumnosRecomendacion/<id>', methods=['GET'])
@jwt_required()
def buscarEstudiantes(id):
    all = RecomendacionesStudentServices.students(id)
    jsn = jsonify({'estudiantes':all})
    if all!=0:
        return jsn,200
    return '{mensaje:error base de datos}',500
@recomendacionStudent.route('agregar',methods=['POST'])
@jwt_required()
def agregar():
    body = request.json
    fecha = datetime.now() + timedelta(hours=4)
    alumnos = body['alumnos']
    mensaje = body['mensaje']
    celulares=[]
    print(current_user)
    for i in alumnos:
        celulares.append(i['celular'])
    response = requests.get('http://localhost:3000/enviarMensaje',
                            params={'idusuario': current_user['id'], 'mensaje': mensaje, 'celulares':celulares}, timeout=10)
    estudiantes = [Student(**estudiante_data) for estudiante_data in alumnos]
    agregarR= Recomendacion(fecha=fecha,mensaje=mensaje, curso=body['curso'])
    agregarR.save()
    RecomendacionesStudentServices.guardarEstudiantes(estudiantes,agregarR.id, response)
    return {'mensaje':1}, 200