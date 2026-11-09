
from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/animals')
def animals():
    return render_template('animals.html')

@app.route('/chatbot')
def chatbot():
    return render_template('chatbot.html')

@app.route('/quiz')
def quiz():
    return render_template('quiz.html')

@app.route('/conservation')
def conservation():
    return render_template('conservation.html')

@app.route('/about')
def about():
    return render_template('about.html')


if __name__ == '__main__':
    app.run(debug=True)
