import os

from ..services.RecomendacionesServices import RecomendacionesServices
from ..services.UsuarioService import UsuarioServices
from flask import Blueprint, jsonify, request
from ..Model.TokenBlockList import Token_block_list
import requests
from dotenv import load_dotenv
import pandas as pd
import json
from ..Model.StudentModel import Student
from flask_jwt_extended import create_access_token, create_refresh_token, get_jwt, jwt_required, current_user
usuario = Blueprint('Usuario_blueprint', __name__)
load_dotenv()
@usuario.route('conectar',methods=['GET'])
@jwt_required()
def conectar():
    print(current_user['id'])
    response = requests.get(os.getenv('url_sistema_whats')+'conectar',params={'id': current_user['id']}, timeout=130)
    return {'mensaje':'exito'},200

@usuario.route('prueba',methods=['GET'])
def prueba():
    url = 'https://recomendaciones-cursos.cepi.bo/backend/alumnos/guardarEstudiante'
    json2 = pd.read_json('src/routes/estudiantes2.json')
    headers = {'Content-Type': 'application/json'}

    for i in range(121,len(json2)):
        estudiante = json2.iloc[i]
        dict = estudiante.to_dict()
        response = requests.post(url, json=dict, headers=headers, timeout=300)
    return{'mensaje':'prueba'},200
@usuario.route('login/<usuario>/<contrasena>', methods=['GET'])
def buscar(usuario, contrasena):
    usuario = UsuarioServices.findUsuario(usuario, contrasena)
    if usuario==0:
        return {'mensaje': 'error ingreso'}, 200
    if usuario==2:
        return {'mensaje': 'error base de datos'}, 500
    us = Token_block_list.query.filter_by(idU=usuario.idusuario).one_or_none()
    if us:
        us.delete()
    access_token = create_access_token(identity=usuario.idusuario)
    refresh_token =create_refresh_token(identity=usuario.idusuario)
    requests.get(os.getenv('url_sistema_whats')+'login',
                 params={'idusuario': usuario.idusuario}, timeout=10)
    jsn = jsonify({'tokens':{'access':access_token,
                             'refresh':refresh_token}})
    return jsn,200

@usuario.route('claims', methods=['GET'])
@jwt_required()
def claims():
    serializable_user = {key: value for key, value in current_user.items() if
                         isinstance(value, (int, float, str, list, dict))}
    jsn = jsonify({'user_details': serializable_user})
    return jsn, 200
@usuario.route('out', methods=['GET'])
@jwt_required()
def logout():
    id = current_user['id']
    tkn = Token_block_list(idU=id)
    tkn.save()
    return {'res':'exito'}, 200
@usuario.route('estadoUsuario', methods=['GET'])
@jwt_required()
def estadoUser():

    print(current_user)
    token = Token_block_list.query.filter_by(idU=current_user['id']).scalar()
    jsn = jsonify({'token':token})
    return jsn, 200

@usuario.route('buscarTodos', methods=['GET'])
@jwt_required()
def buscarTodos():
    listaEstudiantes= UsuarioServices.obtenerTodos()
    #StudentServices.getStudentsRecommendation(body)
    jsn = jsonify({'usuarios': listaEstudiantes})
    return jsn, 200
@usuario.route('findById/<id>', methods=['GET'])
@jwt_required()
def findById(id):
    estudiante = UsuarioServices.getById(id)
    jsn = jsonify({'usuario':estudiante})
    return jsn, 200

@usuario.route('eliminarUsuario/<id>', methods=['POST'])
@jwt_required()
def eliminar(id):
    result = UsuarioServices.eliminarEstudiante(id)
    if result == 1:
        return {'res': 'correcto'}, 200
    return {'res': 'no se pudo eliminar'}, 500
@usuario.route('guardarUsuario', methods=['POST'])
@jwt_required()
def agregar():
    body = request.json
    result = UsuarioServices.agregarUsuario(body['usuario'],body['contrasena'],body['tipo'])
    if result==1:
        return {'res':'correcto'},200
    if result==3:
        return {'res': 'repetido'}, 200
    return {'res': 'no se pudo guardar'}, 500
@usuario.route('editarUsuario', methods=['POST'])
@jwt_required()
def editar():
    body = request.json
    idE,usuario,contrasena,tipo=atributes_json(body)
    result= UsuarioServices.editarUsuario(idE,usuario,contrasena,tipo)
    if result==1:
        return {'res':'correcto'},200
    return {'res': 'no se pudo guardar'}, 500
def atributes_json(body):
    idE = body['idusuario']
    usuario =body['usuario']
    contrasena = body['contrasena']
    tipo = body['tipo']
    return idE,usuario,contrasena,tipo
