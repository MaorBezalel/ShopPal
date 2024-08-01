import React, { ChangeEvent, FormEvent } from 'react';
import FormInputField from './FormInputField';


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

type CheckoutFormProps = {
    formData: FormData;
    setFormData: React.Dispatch<React.SetStateAction<FormData>>;
    formErrors: { [key: string]: string };
    showBillingInfo: boolean;
    handleOrder: (event: FormEvent<HTMLFormElement>) => void;
    handleContinue: () => void;
    fillDetails: boolean;
    setFillDetails: React.Dispatch<React.SetStateAction<boolean>>;
    handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

const CheckoutForm: React.FC<CheckoutFormProps> = ({ formData, formErrors, showBillingInfo, handleOrder, handleContinue, fillDetails, setFillDetails, handleChange }) => {
    return (
        <form onSubmit={handleOrder} className="flex w-full flex-col space-y-4">
            {!showBillingInfo && (
                <>
                    <section>
                        <h1 className="my-3 text-4xl tablet-md:text-3xl">Shipping Address</h1>
                        <input
                            type="checkbox"
                            id="fill-details"
                            checked={fillDetails}
                            onChange={(e) => setFillDetails(e.target.checked)}
                            className="h-4 w-4 accent-accent-500"
                        />
                        <label htmlFor="fill-details"> Fill details from profile</label>
                    </section>
                    <FormInputField
                        id="first-name"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        placeholder="First Name"
                        error={formErrors.firstName}
                    />
                    <FormInputField
                        id="middle-name"
                        name="middleName"
                        value={formData.middleName}
                        onChange={handleChange}
                        placeholder="Middle Name"
                        error={formErrors.middleName}
                    />
                    <FormInputField
                        id="last-name"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        placeholder="Last Name"
                        error={formErrors.lastName}
                    />
                    <FormInputField
                        id="street"
                        name="street"
                        value={formData.street}
                        onChange={handleChange}
                        placeholder="Street"
                        error={formErrors.street}
                    />
                    <FormInputField
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        placeholder="City"
                        error={formErrors.city}
                    />
                    <FormInputField
                        id="country"
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                        placeholder="Country"
                        error={formErrors.country}
                    />
                    <button
                        type="button"
                        onClick={handleContinue}
                        className="w-1/5 rounded-md bg-secondary-300 py-3 text-xl text-white hover:bg-primary-500 tablet-lg:w-fit tablet-lg:px-4"
                    >
                        Continue
                    </button>
                </>
            )}
            {showBillingInfo && (
                <>
                    <h1 className="my-3 text-4xl">Contact info</h1>
                    <FormInputField
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Email"
                        error={formErrors.email}
                    />
                    <FormInputField
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Phone"
                        error={formErrors.phone}
                    />
                    <h1 className="my-3 text-4xl">Billing info</h1>
                    <FormInputField
                        id="card-number"
                        name="cardNumber"
                        value={formData.cardNumber}
                        onChange={handleChange}
                        placeholder="Card Number"
                        error={formErrors.cardNumber}
                    />
                    <FormInputField
                        id="expiry-date"
                        name="expiryDate"
                        value={formData.expiryDate}
                        onChange={handleChange}
                        placeholder="Expiry Date"
                        error={formErrors.expiryDate}
                    />
                    <FormInputField
                        id="cvv"
                        name="cvv"
                        value={formData.cvv}
                        onChange={handleChange}
                        placeholder="CVV"
                        error={formErrors.cvv}
                    />
                    <button
                        type="submit"
                        className="w-3/5 rounded-md bg-secondary-300 py-3 text-2xl text-white hover:bg-primary-500 tablet-lg:w-fit tablet-lg:px-4"
                    >
                        Confirm purchase
                    </button>
                </>
            )}
        </form>
    );
};

export default CheckoutForm;