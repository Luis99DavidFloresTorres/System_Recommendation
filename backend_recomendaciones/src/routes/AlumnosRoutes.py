from flask import Blueprint, jsonify, request
from ..services.StudentServices import StudentServices
main = Blueprint('alumnos_blueprint', __name__)


@main.route('buscar', methods=['POST'])
def buscar():
    body = request.json
    print(body)
    StudentServices.getStudentsRecommendation(body)
    jsn = jsonify({'message': 'hola'})
    return jsn, 200
