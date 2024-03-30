import { useNavigate } from 'react-router-dom';

const Protect = ({ children }) => {
    const isloggedin = localStorage.getItem('login');
    const navigate = useNavigate();

    if (isloggedin) {
        return children;
    } else {
        navigate('/');
        return null; 
    }
};

export default Protect;
