from flask import Flask, render_template
from PasswordGenerator import pass_gen

app = Flask(__name__)

@app.route("/")
def hello():
    return render_template("PassGen.html", message=pass_gen())
