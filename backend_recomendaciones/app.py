#from flask import Flask

#from config import config
import init
#app = Flask(__name__)
##configuration = config['development']
app = init.init_app()
if __name__ == '__main__':
    app.run()
