import React, { ChangeEvent, FormEvent } from 'react';
import ExclamationIcon from '../icons/ExclamationIcon';


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
}

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

}


const CheckoutForm: React.FC<CheckoutFormProps> = ({ formData, formErrors, showBillingInfo, handleOrder, handleContinue, fillDetails, setFillDetails, handleChange }) => {


    return (
        <form
            onSubmit={handleOrder}
            className="flex w-full flex-col space-y-4"
        >
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

                    <label htmlFor="first-name">First Name</label>
                    <input
                        type="text"
                        id="first-name"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        placeholder="First Name"
                        className={`border-2 ${formErrors.firstName ? 'border-red-500 focus:outline-red-500' : 'border-gray-300 focus:outline-primary-500'} rounded-md p-2
                                pc-sm:w-full tablet-lg:w-full`}
                    />
                    {formErrors.firstName && (
                        <p className="text-red-500">
                            {' '}
                            <ExclamationIcon className="mb-2 inline" /> {formErrors.firstName}
                        </p>
                    )}

                    <label htmlFor="middle-name">Middle Name</label>
                    <input
                        type="text"
                        id="middle-name"
                        name="middleName"
                        value={formData.middleName}
                        onChange={handleChange}
                        placeholder="Middle Name"
                        className={`border-2 ${formErrors.middleName ? 'border-red-500 focus:outline-red-500' : 'border-gray-300 focus:outline-primary-500'} rounded-md p-2
                                pc-sm:w-full tablet-lg:w-full`}
                    />
                    {formErrors.middleName && (
                        <p className="text-red-500">
                            {' '}
                            <ExclamationIcon className="mb-2 inline" /> {formErrors.middleName}
                        </p>
                    )}

                    <label htmlFor="last-name">Last Name</label>
                    <input
                        type="text"
                        id="last-name"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        placeholder="Last Name"
                        className={`border-2 ${formErrors.lastName ? 'border-red-500 focus:outline-red-500' : 'border-gray-300 focus:outline-primary-500'} rounded-md p-2
                                pc-sm:w-full tablet-lg:w-full`}
                    />
                    {formErrors.lastName && (
                        <p className="text-red-500">
                            {' '}
                            <ExclamationIcon className="mb-2 inline" /> {formErrors.lastName}
                        </p>
                    )}

                    <label htmlFor="street">Street</label>
                    <input
                        type="text"
                        id="street"
                        name="street"
                        value={formData.street}
                        onChange={handleChange}
                        placeholder="Street"
                        className={`border-2 ${formErrors.street ? 'border-red-500 focus:outline-red-500' : 'border-gray-300 focus:outline-primary-500'} rounded-md p-2
                                pc-sm:w-full tablet-lg:w-full`}
                    />
                    {formErrors.street && (
                        <p className="text-red-500">
                            {' '}
                            <ExclamationIcon className="mb-2 inline" /> {formErrors.street}
                        </p>
                    )}

                    <label htmlFor="city">City</label>
                    <input
                        type="text"
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        placeholder="City"
                        className={`border-2 ${formErrors.city ? 'border-red-500 focus:outline-red-500' : 'border-gray-300 focus:outline-primary-500'} rounded-md p-2
                                pc-sm:w-full tablet-lg:w-full`}
                    />
                    {formErrors.city && (
                        <p className="text-red-500">
                            {' '}
                            <ExclamationIcon className="mb-2 inline" /> {formErrors.city}
                        </p>
                    )}

                    <label htmlFor="country">Country</label>
                    <input
                        type="text"
                        id="country"
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                        placeholder="Country"
                        className={`border-2 ${formErrors.country ? 'border-red-500 focus:outline-red-500' : 'border-gray-300 focus:outline-primary-500'} rounded-md p-2
                                pc-sm:w-full tablet-lg:w-full`}
                    />
                    {formErrors.country && (
                        <p className="text-red-500">
                            {' '}
                            <ExclamationIcon className="mb-2 inline" /> {formErrors.country}
                        </p>
                    )}

                    <button
                        type="button"
                        onClick={handleContinue}
                        className=" w-1/5 rounded-md bg-secondary-300 py-3 text-xl text-white hover:bg-primary-500
                                tablet-lg:w-fit tablet-lg:px-4"
                    >
                        Continue
                    </button>
                </>
            )}
            {showBillingInfo && (
                <>
                    <h1 className="my-3 text-4xl">Contact info</h1>
                    <label htmlFor="email">Email</label>
                    <input
                        type="text"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Email"
                        className={`border-2 ${formErrors.email ? 'border-red-500 focus:outline-red-500' : 'border-gray-300 focus:outline-primary-500'} rounded-md p-2
                                pc-sm:w-full tablet-lg:w-full`}
                    />
                    {formErrors.email && (
                        <p className="text-red-500">
                            {' '}
                            <ExclamationIcon className="mb-2 inline" /> {formErrors.email}
                        </p>
                    )}

                    <label htmlFor="phone">Phone</label>
                    <input
                        type="text"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Phone"
                        className={`border-2 ${formErrors.phone ? 'border-red-500 focus:outline-red-500' : 'border-gray-300 focus:outline-primary-500'} rounded-md p-2
                                pc-sm:w-full tablet-lg:w-full`}
                    />
                    {formErrors.phone && (
                        <p className="text-red-500">
                            {' '}
                            <ExclamationIcon className="mb-2 inline" /> {formErrors.phone}
                        </p>
                    )}

                    <h1 className="my-3 text-4xl">Billing info</h1>
                    <label htmlFor="card-number">Card Number</label>
                    <input
                        type="text"
                        id="card-number"
                        name="cardNumber"
                        value={formData.cardNumber}
                        onChange={handleChange}
                        placeholder="Card Number"
                        className={`border-2 ${formErrors.cardNumber ? 'border-red-500 focus:outline-red-500' : 'border-gray-300 focus:outline-primary-500'} rounded-md p-2
                                pc-sm:w-full tablet-lg:w-full`}
                    />
                    {formErrors.cardNumber && (
                        <p className="text-red-500">
                            {' '}
                            <ExclamationIcon className="mb-2 inline" /> {formErrors.cardNumber}
                        </p>
                    )}

                    <label htmlFor="expiry-date">Expiry Date</label>
                    <input
                        type="text"
                        id="expiry-date"
                        name="expiryDate"
                        value={formData.expiryDate}
                        onChange={handleChange}
                        placeholder="Expiry Date"
                        className={`border-2 ${formErrors.expiryDate ? 'border-red-500 focus:outline-red-500' : 'border-gray-300 focus:outline-primary-500'} rounded-md p-2
                                pc-sm:w-full tablet-lg:w-full`}
                    />
                    {formErrors.expiryDate && (
                        <p className="text-red-500">
                            {' '}
                            <ExclamationIcon className="mb-2 inline" /> {formErrors.expiryDate}
                        </p>
                    )}

                    <label htmlFor="cvv">CVV</label>
                    <input
                        type="text"
                        id="cvv"
                        name="cvv"
                        value={formData.cvv}
                        onChange={handleChange}
                        placeholder="CVV"
                        className={`border-2 ${formErrors.cvv ? 'border-red-500 focus:outline-red-500' : 'border-gray-300 focus:outline-primary-500'} rounded-md p-2
                                pc-sm:w-full tablet-lg:w-full`}
                    />
                    {formErrors.cvv && (
                        <p className="text-red-500">
                            {' '}
                            <ExclamationIcon className="mb-2 inline" /> {formErrors.cvv}
                        </p>
                    )}

                    <button
                        type="submit"
                        className=" w-3/5 rounded-md bg-secondary-300 py-3 text-2xl text-white hover:bg-primary-500
                                tablet-lg:w-fit tablet-lg:px-4"
                    >
                        Confirm purchase
                    </button>
                </>
            )}
        </form>
    );
};

export default CheckoutForm;