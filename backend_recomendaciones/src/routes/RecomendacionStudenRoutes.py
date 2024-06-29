import requests

from ..services.RecomendacionStudent import RecomendacionesStudentServices
from ..services.AI_LLM import AI_LLM_Services
from ..Model.RecomendacionModel import Recomendacion
from flask import Blueprint, jsonify, request
from ..Model.StudentModel import Student
from datetime import datetime, timedelta
from dotenv import load_dotenv
import os
from flask_jwt_extended import current_user, jwt_required
import json
recomendacionStudent = Blueprint('RecomendacionStudent_blueprint', __name__)
load_dotenv()
@recomendacionStudent.route('repetir',methods=['POST'])
@jwt_required()
def repetir():
    body = request.json
    alumnos = body['alumnos']
    mensaje = body['mensaje']
    tiempo = body['tiempo']
    repetidor = body['repetidor']
    celulares=[]
    for i in alumnos:
        celulares.append(i['celular'])
    response = requests.get(os.getenv('url_sistema_whats')+'repetir',params={'idusuario': current_user['id'],
                                                                             'mensaje': mensaje,
                                                                             'celulares':celulares,'tiempo':tiempo,
                                                                             'repetidor':repetidor}, timeout=130)
    return {'mensaje':'exito'},200
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
    for i in alumnos:
        celulares.append(i['celular'])
    response = requests.get(os.getenv('url_sistema_whats')+'enviarMensaje',
                            params={'idusuario': current_user['id'], 'mensaje': mensaje, 'celulares':celulares}, timeout=10)
    estudiantes = [Student(**estudiante_data) for estudiante_data in alumnos]
    agregarR= Recomendacion(fecha=fecha,mensaje=mensaje, curso=body['curso'],usuario=current_user['usuario'])
    agregarR.save()
    RecomendacionesStudentServices.guardarEstudiantes(estudiantes,agregarR.id, response.json())
    return {'mensaje':1}, 200