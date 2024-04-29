from ..database.db_connect import db
from ..Model.RecomendacionModel import Recomendacion
from ..Model.UsuarioModel import Usuario

import secrets
class UsuarioServices():
    @classmethod
    def findUsuario(cls, usuario,contrasena):
        usuario = Usuario.query.filter_by(usuario=usuario, contrasena=contrasena).all()
        a = "caac3c307a8dc042c4518d91"
        return usuario[0]
    @classmethod
    def getById(cls,id):
        estudiante = Usuario.query.filter_by(idusuario=id)

        json = {'id': estudiante[0].idusuario, 'usuario': estudiante[0].usuario,
                'contrasena': estudiante[0].contrasena, 'tipo': estudiante[0].tipo}
        return json
    @classmethod
    def obtenerTodos(cls):
        try:
            todos = Usuario.query.all()
            list = []
            for i in todos:
                json = {'idusuario':i.idusuario,'usuario':i.usuario,'contrasena':i.contrasena,'tipo':i.tipo}
                list.append(json)
            print(list)
            return list
        except Exception as exp:
            print(exp)
    @classmethod
    def agregarUsuario(cls, usuario, contrasena, tipo):
        try:
            usuario = Usuario(usuario=usuario,contrasena=contrasena,tipo=tipo)
            db.session.add(usuario)
            db.session.commit()
            return 1
        except Exception as exp:
            return 0
    @classmethod
    def editarUsuario(cls, id, usuario, contrasena, tipo):

        try:
            usuarioO = Usuario.query.get(id)
            usuarioO.usuario=usuario
            usuarioO.contrasena=contrasena
            usuarioO.tipo = tipo
            db.session.commit()
            return 1
        except Exception as e:
            return 0
    @classmethod
    def eliminarEstudiante(cls, id):
        try:
            usuario = Usuario.query.get(id)
            db.session.delete(usuario)
            db.session.commit()
            return 1
        except Exception as e:
            return 0