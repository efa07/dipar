import { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Container, Grid, Paper, Box, Card, CardContent, CardHeader, IconButton, Avatar } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { MoreVert as MoreVertIcon } from '@mui/icons-material';
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
                <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={8} lg={9}>
                            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: 240 }}>
                                <Typography variant="h6" gutterBottom>
                                    User Statistics
                                </Typography>
                                <Box sx={{ flexGrow: 1 }}>
                                    {/* Add your chart component here */}
                                </Box>
                            </Paper>
                        </Grid>
                        <Grid item xs={12} md={4} lg={3}>
                            <Card>
                                <CardHeader
                                    avatar={<Avatar aria-label="recipe">R</Avatar>}
                                    action={
                                        <IconButton aria-label="settings">
                                            <MoreVertIcon />
                                        </IconButton>
                                    }
                                    title="Recent Activity"
                                    subheader="September 14, 2023"
                                />
                                <CardContent>
                                    <Typography variant="body2" color="text.secondary">
                                        User John Doe updated his profile.
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        
                    </Grid>
                </Container>
            </Box>
        </div>
    );
};

export default AdminPanel;
