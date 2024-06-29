from flask import Blueprint, jsonify, request
from ..services.StudentServices import StudentServices
from flask_jwt_extended import jwt_required

from ..services.AI_LLM import AI_LLM_Services
main = Blueprint('alumnos_blueprint', __name__)


@main.route('buscar', methods=['POST'])
@jwt_required()
def buscar():
    body = request.json
    print(body)
    listaEstudiantes, tipoEstudiante= AI_LLM_Services.obtener_respuesta(word=body)
    #StudentServices.getStudentsRecommendation(body)
    jsn = jsonify({'estudiantes': listaEstudiantes, 'tipo_estudiante':tipoEstudiante})
    return jsn, 200
@main.route('buscarTodos', methods=['GET'])
@jwt_required()
def buscarTodos():
    listaEstudiantes= StudentServices.obtenerTodos()
    #StudentServices.getStudentsRecommendation(body)
    jsn = jsonify({'estudiantes': listaEstudiantes})
    return jsn, 200
@main.route('findById/<id>', methods=['GET'])
@jwt_required()
def findById(id):
    estudiante = StudentServices.getById(id)
    jsn = jsonify({'estudiante':estudiante})
    return jsn, 200
@main.route('guardarEstudiante', methods=['POST'])
def agregar():
    body = request.json
    result = StudentServices.agregarEstudiante(body['nombreuniversidad']
                                      ,body['area'],body['nombretitulo'],body['nombrecompleto'],
                                      body['celular'],body['edad_rango'],body['rango_ano_titulacion'])
    if result==1:
        return {'res':'correcto'},200
    if result==2:
        return {'res':'id repetido'},200
    return {'res': 'no se pudo guardar'}, 500
@main.route('guardarEstudiantes', methods=['POST'])
@jwt_required()
def agregarEstudiantes():
    body = request.json
    for i in body:
        result = StudentServices.agregarEstudiante(i['nombreuniversidad']
                                      ,i['area'],i['nombretitulo'],i['nombrecompleto'],
                                      i['celular'],i['edad_rango'],i['rango_ano_titulacion'])
    return {'res':'correcto'},200
@main.route('editarEstudiante', methods=['POST'])
@jwt_required()
def editar():
    body = request.json

    idE,nombreU,area,titulo,nombreC,celular,edadR,titulacionR=atributes_json(body)

    result= StudentServices.editarEstudiante(idE,nombreU,area,titulo,nombreC,edadR,titulacionR,celular)
    if result==1:
        return {'res':'correcto'},200
    return {'res': 'no se pudo guardar'}, 500
@main.route('eliminarEstudiante/<id>', methods=['POST'])
@jwt_required()
def eliminar(id):
    result = StudentServices.eliminarEstudiante(id)
    if result == 1:
        return {'res': 'correcto'}, 200
    return {'res': 'no se pudo eliminar'}, 500

def atributes_json(body):
    id = body['id']
    nombreUniversidad =body['nombreuniversidad']
    area = body['area']
    titulo = body['nombretitulo']
    nombreCompleto = body['nombrecompleto']
    celular = body['celular']
    edad_rango = body['edad_rango']
    rango_titulacion = body['rango_ano_titulacion']
    return id,nombreUniversidad,area,titulo,nombreCompleto,celular,edad_rango,rango_titulacion
