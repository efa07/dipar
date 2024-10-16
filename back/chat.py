from flask import Flask, request
from flask_socketio import SocketIO, join_room, leave_room, send
import os

app = Flask(__name__)
app.config['SECRET_KEY'] = os.environ.get('App.secret_key')
socketio = SocketIO(app, cors_allowed_origins="*")

# Dictionary to track connected users and their rooms
users = {}

@app.route('/')
def index():
    return "Chat server is running"

# User joins a specific room
@socketio.on('join')
def handle_join(data):
    username = data['username']
    room = data['room']  # Room can be 'doctor', 'lab-staff', etc.
    join_room(room)
    users[request.sid] = {'username': username, 'room': room}
    send(f'{username} has joined the {room} room.', to=room)

# User leaves a room
@socketio.on('leave')
def handle_leave(data):
    username = data['username']
    room = data['room']
    leave_room(room)
    send(f'{username} has left the {room} room.', to=room)

# Handle incoming messages to specific rooms
@socketio.on('message')
def handle_message(data):
    room = data['room']  # Send the message to a specific room
    msg = data['message']
    send(msg, to=room)

# Clean up on disconnect
@socketio.on('disconnect')
def handle_disconnect():
    user = users.pop(request.sid, None)
    if user:
        send(f"{user['username']} has disconnected.", to=user['room'])

if __name__ == '__main__':
    socketio.run(app, host='0.0.0.0', port=3000, debug=True)
