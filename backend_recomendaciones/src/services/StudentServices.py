from ..Model.StudentModel import Student
class StudentServices():
    @classmethod
    def getStudentsRecommendation(cls, body):
        try:
            con = Student.query.filter_by(id=body.id)
            list = []
            for i in con:
                print(i)
        except Exception as exp:
            print(exp)