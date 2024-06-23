import React, { useState } from 'react';
import axios from 'axios';
import Input from './Input'; // Assuming Input component handles form inputs
import FormAction from './formaction'; // Assuming this component includes the form submit button
import { toast } from 'react-hot-toast';
import { signupFields } from '../constant/FormFields'; // Assuming signupFields are defined elsewhere

const API_URL = 'http://localhost:4000/api/v1/auth';

const fields = signupFields;
let fieldsState = {};
fields.forEach(field => fieldsState[field.id] = '');

const Signup = () => {
    const [signupState, setSignupState] = useState(fieldsState);

    const handleChange = (e) => {
        setSignupState({ ...signupState, [e.target.id]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${API_URL}/signup`, {
                firstname: signupState.firstname,
                lastName: signupState.lastName,
                email: signupState.email,
                password: signupState.password,
            });

            console.log('Signup successful:', response.data);
            toast.success('Signup successful');
            // Redirect user to upload page or any other page upon successful signup
            // Example: history.push('/upload');
        } catch (error) {
            console.error('Signup failed:', error.response);
            if (error.response) {
                const { data } = error.response;
                // Display backend error message if available
                toast.error(data.message || 'Failed to create account. Please try again.');
            } else {
                // Handle other errors (e.g., network issues)
                toast.error('Failed to create account. Please try again later.');
            }
        }
    }

    return (
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="">
                {fields.map(field =>
                    <Input
                        key={field.id}
                        handleChange={handleChange}
                        value={signupState[field.id]}
                        labelText={field.labelText}
                        labelFor={field.labelFor}
                        id={field.id}
                        name={field.name}
                        type={field.type}
                        isRequired={field.isRequired}
                        placeholder={field.placeholder}
                    />
                )}
                <FormAction handleSubmit={handleSubmit} text="Signup" />
            </div>
        </form>
    )
}

export default Signup;
