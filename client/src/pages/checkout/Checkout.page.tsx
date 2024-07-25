import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/shared/hooks/useAuth.hook';
import { useState, useEffect } from 'react';
import { useApi } from '@/shared/hooks/useApi.hook';
import { Address } from '@/shared/types';
import { validateShippingInfo, validatePaymentInfo } from './validateForm';
import { useNavigate } from 'react-router';
import ExclamationIcon from './icons/ExclamationIcon';
import logo_svg from '@/assets/svgs/logo.svg';
import useLoadingOverlay from './useLoadingOverlay';

interface ProductDetails {
    product_id: string;
    thumbnail: string;
    title: string;
    price: string;
    quantity: number;
    stock: number;
}

export function CheckoutPage() {
    const location = useLocation();
    const { itemsInCart } = location.state || { itemsInCart: [] };
    const totalQuantity = itemsInCart.reduce((total: number, item: ProductDetails) => total + item.quantity, 0);
    const totalPrice = itemsInCart
        .reduce((total: number, item: ProductDetails) => total + parseFloat(item.price) * item.quantity, 0)
        .toFixed(2);
    const { auth } = useAuth();
    const userDetails = auth?.user;
    const api = useApi();
    const [showBillingInfo, setShowBillingInfo] = useState(false);
    const [orderSuccess, setOrderSuccess] = useState(false);
    const [orderId, setOrderId] = useState('');
    const navigate = useNavigate();
    const [fillDetails, setFillDetails] = useState(false); // Checkbox state
    const { setIsLoading, LoadingOverlay } = useLoadingOverlay();
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

    const [formData, setFormData] = useState(initialFormState);
    const [formErrors, setFormErrors] = useState({} as Partial<typeof initialFormState>);

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

    //Handler for order submission
    const handleOrder = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const errors = validatePaymentInfo(formData);
        if (Object.values(errors).some((error) => error !== '')) {
            setFormErrors(errors);
            return; // Prevent form submission if there are errors
        }

        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
        }, 2000);

        //Preparing order details for API call
        const productIds = itemsInCart.map((item: ProductDetails) => item.product_id);
        const quantities = itemsInCart.map((item: ProductDetails) => item.quantity);
        const billingInfo = `${formData.cardNumber},${formData.expiryDate},${formData.cvv}`;

        const deliveryAddress = {
            country: formData.country,
            city: formData.city,
            street: formData.street,
        };

        let orderDetails = {
            product_ids: productIds as string[],
            quantities: quantities as number[],
            billing_info: billingInfo,
            delivery_address: deliveryAddress as Address,
        };
        let response;

        try {
            if (auth) {
                response = await api.orderApi.addUserOrder(auth.user.user_id, orderDetails);
            } else {
                response = await api.orderApi.addGuestOrder(orderDetails);
            }
        } catch (error) {
            console.error(error);
            alert('An error occurred while placing the order, please try again later');
        } finally {
            if (response && 'order_id' in response) {
                const newStocks = itemsInCart.map((item: ProductDetails) => item.stock - item.quantity);
                const updateStocks = { product_ids: productIds, new_stocks: newStocks };
                setOrderSuccess(true);
                setOrderId(response.order_id);
                try {
                    const updateStocksPromise = api.orderApi.updateStocks(updateStocks);
                    const clearCartPromise = auth
                        ? api.cartApi.removeCart(auth.user.user_id)
                        : Promise.resolve(
                              window.localStorage.setItem('cart', JSON.stringify({ product_ids: [], quantities: [] }))
                          );
                    await Promise.all([updateStocksPromise, clearCartPromise]);
                } catch (error) {
                    console.error(error);
                }
            }
        }
    };

    // Handler to proceed to billing information after validating shipping info
    const handleContinue = () => {
        const errors = validateShippingInfo(formData);
        if (Object.values(errors).some((error) => error !== '')) {
            setFormErrors(errors); // Update formErrors with the validation errors
        } else {
            setShowBillingInfo(true); // Proceed to billing info if no errors in the first part
        }
    };

    // Change UI based on order success
    if (orderSuccess) {
        return (
            <main className="container-highlight container mx-auto flex flex-1 flex-col items-center justify-center gap-4 text-center">
                <i className="-translate-y-28 scale-[2] text-9xl text-primary-500">🎉</i>
                <h1 className="mt-4 text-6xl font-bold pc-sm:text-5xl tablet-sm:text-4xl">Order placed successfully</h1>
                <p className="mt-2 text-4xl pc-sm:text-2xl tablet-lg:text-xl tablet-sm:text-base">
                    Your order ID is: <br className="hidden mobile-lg:block" />{' '}
                    <span className="font-bold">{orderId}</span>
                </p>
                <p className="mt-4 text-4xl font-bold pc-sm:text-3xl tablet-sm:text-xl">
                    Thank you for shopping with ShopPal!
                </p>
                <Link
                    to={'/'}
                    className="mt-4 rounded-md bg-secondary-300 px-6 py-4 text-2xl font-bold text-white hover:bg-primary-500
                    tablet-sm:px-4 tablet-sm:text-lg"
                >
                    Return Home
                </Link>
            </main>
        );
    }

    return (
        <main
            className="container-highlight container relative flex flex-1 flex-row justify-between px-2 tablet-lg:gap-4 
        tablet-md:flex-col-reverse"
        >
            <LoadingOverlay />
            <section
                className="w-full max-w-[40%] pc-sm:w-1/2 tablet-lg:max-w-[50%]
            tablet-md:w-full tablet-md:max-w-full mobile-lg:px-3"
            >
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
            </section>
            <aside className="my-3 flex flex-col gap-6">
                <h1 className="text-4xl">Order summary</h1>
                <section
                    className="h-full border-l border-accent-300 bg-accent-100 pr-4
                    tablet-md:ml-0 tablet-md:mt-0 tablet-md:w-full
                    
                    "
                >
                    <table className="ml-3 w-full">
                        <tbody>
                            {itemsInCart.map((item: ProductDetails, index: number) => (
                                <tr
                                    key={index}
                                    className="border-b border-accent-300"
                                >
                                    <td className="h-20 w-20">
                                        <img
                                            src={item.thumbnail}
                                            alt={item.title}
                                            className="h-20 w-20 object-cover"
                                        />
                                    </td>
                                    <td className="pc-sm:w-40 pc-sm:text-sm">
                                        {item.title} <br /> Qty:{item.quantity}
                                    </td>
                                    <td className="pl-10">${(parseFloat(item.price) * item.quantity).toFixed(2)}</td>
                                </tr>
                            ))}
                            <tr>
                                <td className="px-4 font-bold">Total:</td>
                                <td className="pl-4"> {totalQuantity} items</td>
                                <td className="pl-10">${totalPrice}</td>
                            </tr>
                        </tbody>
                    </table>
                </section>
            </aside>
        </main>
    );
}
