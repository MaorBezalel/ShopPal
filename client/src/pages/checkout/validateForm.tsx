type FormData = {
    firstName: string;
    middleName: string;
    lastName: string;
    street: string;
    city: string;
    country: string;
    email: string;
    phone: string;
    cardNumber: string;
    expiryDate: string;
    cvv: string;
};



export const validateShippingInfo = (formData: FormData) => {
    const errors = {} as Partial<FormData>;

    // Validate first name
    if (!formData.firstName) {
        errors.firstName = 'First name is required';
    } else if (!/^[a-zA-Z]+$/.test(formData.firstName)) {
        errors.firstName = 'First name must contain only letters';
    } else if (formData.firstName.length < 2 || formData.firstName.length > 32) {
        errors.firstName = 'First name must be between 2 and 32 characters long';
    }

    // Validate middle name
    // Middle name is optional, so it's not required
    if (formData.middleName && !/^[a-zA-Z]+$/.test(formData.middleName)) {
        errors.middleName = 'Middle name must contain only letters';
    } else if (formData.middleName && (formData.middleName.length < 2 || formData.middleName.length > 32)) {
        errors.middleName = 'Middle name must be between 2 and 32 characters long';
    }

    // Validate last name
    if (!formData.lastName) {
        errors.lastName = 'Last name is required';
    } else if (!/^[a-zA-Z]+$/.test(formData.lastName)) {
        errors.lastName = 'Last name must contain only letters';
    } else if (formData.lastName.length < 2 || formData.lastName.length > 32) {
        errors.lastName = 'Last name must be between 2 and 32 characters long';
    }

    // Validate street
    if (!formData.street) {
        errors.street = 'Street is required';
    } else if (formData.street.length < 2 || formData.street.length > 32) {
        errors.street = 'Street must be between 2 and 32 characters long';
    } else if (!/^[a-zA-Z0-9\s]+$/.test(formData.street)) {
        errors.street = 'Street must contain only letters, numbers and spaces';
    }

    // Validate city
    if (!formData.city) {
        errors.city = 'City is required';
    } else if (!/^[a-zA-Z]+$/.test(formData.city)) {
        errors.city = 'City must contain only letters';
    } else if (formData.city.length < 2 || formData.city.length > 32) {
        errors.city = 'City must be between 2 and 32 characters long';
    }

    // Validate country
    if (!formData.country) {
        errors.country = 'Country is required';
    } else if (!/^[a-zA-Z]+$/.test(formData.country)) {
        errors.country = 'Country must contain only letters';
    } else if (formData.country.length < 2 || formData.country.length > 32) {
        errors.country = 'Country must be between 2 and 32 characters long';
    }

    return errors;
};

export const validatePaymentInfo = (formData: FormData) => {
    const errors = {} as Partial<FormData>;

    // Validate card number for presence and format (simplified regex for example)
    if (!formData.cardNumber) {
        errors.cardNumber = 'Card number is required';
    } else if (!/^\d{16}$/.test(formData.cardNumber)) {
        errors.cardNumber = 'Card number must be 16 digits';
    }

    // Validate expiry date for presence and if it's in the future
    if (!formData.expiryDate) {
        errors.expiryDate = 'Expiry date is required';

        //TO DO  once we change billing info from being a string to an object
        // } else {
        //     const currentDate = new Date();
        //     const expiryDate = new Date(formData.expiryDate);
        //     if (expiryDate <= currentDate) {
        //         errors.expiryDate = 'Expiry date must be in the future';
        //     }
    }

    // Validate CVV for presence and format (3 or 4 digits)
    if (!formData.cvv) {
        errors.cvv = 'CVV is required';
    } else if (!/^\d{3,4}$/.test(formData.cvv)) {
        errors.cvv = 'CVV must be 3 or 4 digits';
    }

    if (!formData.email) {
        errors.email = 'Email is required';
    } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formData.email)) {
        errors.email = 'Invalid email address';
    }

    if (!formData.phone) {
        errors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(formData.phone)) {
        errors.phone = 'Phone number must be 10 digits';
    }

    return errors;
};