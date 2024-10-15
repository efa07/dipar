from flask import Flask, render_template
from flask_socketio import SocketIO, send
import os

app = Flask(__name__)
app.config['SECRET_KEY'] = os.environ.get('App.secret_key')
socketio = SocketIO(app, cors_allowed_origins="*")

@app.route('/')
def index():
    return "Chat server is running"

# incoming messages
@socketio.on('message')
def handle_message(msg):
    print(f"Message: {msg}")
    send(msg, broadcast=True)

if __name__ == '__main__':
    # Using eventlet for async WebSocket support
    socketio.run(app, host='0.0.0.0', port=3000, debug=True)
