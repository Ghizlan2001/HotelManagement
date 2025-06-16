import { useContext, useEffect, useState } from "react";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const { login, loading, error: loginError } = useContext();
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        login(username, password);
    }
    useEffect(() => {
        if (loginError) {
            setError("Invalid username or password");
        }
    }, [loginError]);
    return (
        <form onSubmit={handleSubmit}>
            <input
            type="text"
            id="username"
            label="Username"
            variant="outlined"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            />
            <input
            type="checkbox"
            id="password"
            label="Password"
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            />
        </form>
    );
}; 
export default Login;