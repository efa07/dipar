import { useState } from 'react';
import { AppBar, Toolbar, Typography, Container, Grid, Paper, Box, Card, CardContent, CardHeader, IconButton, Avatar } from '@mui/material';
import {  GridColDef } from '@mui/x-data-grid';

import "./admin.css";

// Define the row type for TypeScript
interface UserRow {
    id: number;
    name: string;
    role: string;
}

const AdminPanel: React.FC = () => {
    const [users, setUsers] = useState<UserRow[]>([]);

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 90 },
        { field: 'name', headerName: 'Name', width: 150 },
        { field: 'role', headerName: 'Role', width: 150 },
    ];

    
    return (
        <div className="admincontainer">
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            Admin Panel
                        </Typography>
                    </Toolbar>
                </AppBar>
                
            </Box>
        </div>
    );
};

export default AdminPanel;
