import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from "../Nav/logo.png";
import './login.css';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    
    const handleSubmit = async (e:any) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
    
        try {
            const response = await fetch('http://127.0.0.1:5000/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Requested-With': 'XMLHttpRequest', // Anti-CSRF
                },
                body: JSON.stringify({ email, password }),
            });
    
            const result = await response.json();
            
            if (response.ok) {
                const { role ,user_id} = result;
                
                localStorage.setItem('userEmail', email);
                localStorage.setItem('userRole', role);
                localStorage.setItem("userId", user_id)
                
                // Redirect based on user role
                switch (role) {
                    case 'doctor':
                        navigate('/doctor');
                        break;
                    case 'nurse':
                        navigate('/nurse');
                        break;
                    case 'lab-staff':
                        navigate('/medicallab');
                        break;
                    case 'admin':
                        navigate('/admin');
                        break;
                    case 'receptionist':
                        navigate('/register');
                        break;
                    default:
                        navigate('/');
                        break;
                }
            } else {
                // Add a delay to prevent timing attacks
                await new Promise((resolve) => setTimeout(resolve, 1000));
                throw new Error(result.error || 'Login failed');
            }
        } catch (error:any) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-container cc">
            <div className="login-box card2">
                <h2>Login</h2>
                {error && <p className="error-message">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="textbox">
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email"
                            required
                        />
                    </div>
                    <div className="textbox">
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                            required
                        />
                    </div>
                    <button type="submit" className="btn" disabled={loading}>
                        {loading ? 'Loading...' : 'Login'}
                    </button>
                </form>
            </div>
            <img src={Logo} className='loginlogo'/>
        </div>
    );
};

export default LoginPage;
