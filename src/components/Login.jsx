import React, { useState } from 'react';
import axios from 'axios';
import Input from './Input'; // Assuming Input component handles form inputs
import FormExtra from './formExtra'; // Assuming this component includes any additional form elements
import { toast } from 'react-hot-toast';
import { loginFields } from '../constant/FormFields'; // Assuming loginFields are defined elsewhere
import { useNavigate } from 'react-router-dom';

const API_URL = 'http://localhost:4000/api/v1/auth'; // API endpoint for authentication

const fields = loginFields;
let fieldsState = {};
fields.forEach(field => fieldsState[field.id] = '');

const Login = () => {
    const [loginState, setLoginState] = useState(fieldsState);
    const navigate = useNavigate()
    // Handle input change
    const handleChange = (e) => {
        setLoginState({ ...loginState, [e.target.id]: e.target.value });
    }

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${API_URL}/login`, {
                email: loginState.email,
                password: loginState.password
            });

            // Handle successful login response
            console.log('Login successful:', response.data);

            // Show success toast
            toast.success('Login successful');

            // Redirect upon successful login
            navigate('/upload');
            
        } catch (error) {
            // Handle login error
            console.error('Login failed:', error.response);

            // Show error toast with backend error message
            toast.error(error.response.data.message || 'Login failed. Please check your credentials.');
        }
    }

    return (
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="-space-y-px">
                {fields.map(field =>
                    <Input
                        key={field.id}
                        handleChange={handleChange}
                        value={loginState[field.id]}
                        labelText={field.labelText}
                        labelFor={field.labelFor}
                        id={field.id}
                        name={field.name}
                        type={field.type}
                        isRequired={field.isRequired}
                        placeholder={field.placeholder}
                    />
                )}
            </div>

            <FormExtra /> {/* Assuming FormExtra includes additional form elements */}
            
            <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 mt-10"
            >
                Login
            </button>
        </form>
    );
}

export default Login;
