import { useState, useEffect } from 'react';
import { useAuth } from '@/shared/hooks/useAuth.hook';

const initialFormState = {
    firstName: '',
    middleName: '',
    lastName: '',
    street: '',
    city: '',
    country: '',
    email: '',
    phone: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
};


export const useFormData = (fillDetails: boolean) => {
    const [formData, setFormData] = useState(initialFormState);
    const [formErrors, setFormErrors] = useState({} as Partial<typeof initialFormState>);
    const userDetails = useAuth().auth?.user;



    // Effect to fill form when checkbox is checked and user details are available
    useEffect(() => {
        if (fillDetails && userDetails) {
            setFormData((prevState) => ({
                ...prevState,
                firstName: userDetails.name_details.first_name || '',
                middleName: userDetails.name_details.middle_name || '',
                lastName: userDetails.name_details.last_name || '',
                street: userDetails.address.street || '',
                city: userDetails.address.city || '',
                country: userDetails.address.country || '',
                email: userDetails.email || '',
                phone: userDetails.phone || '',
            }));
        }
    }, [fillDetails, userDetails]);

    //Handler for form input changes
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
        // Clear the error for the field being edited
        setFormErrors((prevErrors) => ({
            ...prevErrors,
            [name]: '',
        }));
    };

    return {
        formData,
        setFormData,
        formErrors,
        setFormErrors,
        handleChange,
    };
};