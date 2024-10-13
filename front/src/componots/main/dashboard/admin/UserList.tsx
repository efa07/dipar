import React, { useEffect, useState } from 'react';
import { TextField, Button, Typography, Container, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import "./userlist.css"

interface User {
    id: number;
    first_name: string;
    last_name: string;
    age: number;
    email: string;
    role: string;
}

const UsersList: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [editingUser, setEditingUser] = useState<User | null>(null);
    const [formData, setFormData] = useState<User>({
        id: 0,
        first_name: '',
        last_name: '',
        age: 0,
        email: '',
        role: 'doctor',
    });

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        const response = await fetch('http://127.0.0.1:5000/api/users');
        if (response.ok) {
            const data = await response.json();
            setUsers(data);
        } else {
            console.error('Failed to fetch users');
        }
    };

    const handleEdit = (user: User) => {
        setEditingUser(user);
        setFormData(user);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        const response = await fetch(`http://127.0.0.1:5000/api/users/${formData.id}`, {
            method: 'PUT', // Use PUT for updating
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        if (response.ok) {
            alert('User updated successfully!');
            fetchUsers(); // Refresh the list after updating
            setEditingUser(null); // Close the edit form
        } else {
            alert('Failed to update user');
        }
    };

    return (
        <Container component="main" maxWidth="lg">
            <Box sx={{ mt: 8, mb: 2 }}>
                <Typography variant="h5" align="center">User List</Typography>
            </Box>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>First Name</TableCell>
                            <TableCell>Last Name</TableCell>
                            <TableCell>Age</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Role</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map((user) => (
                            <TableRow key={user.id}>
                                <TableCell>{user.first_name}</TableCell>
                                <TableCell>{user.last_name}</TableCell>
                                <TableCell>{user.age}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>{user.role}</TableCell>
                                <TableCell>
                                    <Button variant="contained" color="primary" onClick={() => handleEdit(user)}>Edit</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {editingUser && (
                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 4 }}>
                    <Typography variant="h6">Edit User</Typography>
                    <TextField
                        name="first_name"
                        label="First Name"
                        value={formData.first_name}
                        onChange={handleChange}
                        fullWidth
                        required
                        margin="normal"
                    />
                    <TextField
                        name="last_name"
                        label="Last Name"
                        value={formData.last_name}
                        onChange={handleChange}
                        fullWidth
                        required
                        margin="normal"
                    />
                    <TextField
                        name="age"
                        label="Age"
                        type="number"
                        value={formData.age}
                        onChange={handleChange}
                        fullWidth
                        required
                        margin="normal"
                    />
                    <TextField
                        name="email"
                        label="Email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        fullWidth
                        required
                        margin="normal"
                    />
                    <TextField
                        select
                        name="role"
                        label="Role"
                        value={formData.role}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                    >
                        <option value="doctor">Doctor</option>
                        <option value="nurse">Nurse</option>
                        <option value="lab-staff">Lab Staff</option>
                        <option value="receptionist">Receptionist</option>
                    </TextField>
                    <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
                        Update User
                    </Button>
                </Box>
            )}
        </Container>
    );
};

export default UsersList;
