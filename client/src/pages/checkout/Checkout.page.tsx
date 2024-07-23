import { useLocation } from "react-router-dom";
import { useAuth } from "@/shared/hooks/useAuth.hook";
import { useState, useEffect } from "react";
import { useApi } from "@/shared/hooks/useApi.hook";
import { Address } from "@/shared/types";
import { validateShippingInfo, validatePaymentInfo } from "./validateForm";
import { useNavigate } from "react-router";
import ExclamationIcon from "./icons/ExclamationIcon";
import logo_svg from '@/assets/svgs/logo.svg';
import useLoadingOverlay from "./useLoadingOverlay";

interface ProductDetails {
  product_id: string;
  thumbnail: string;
  title: string;
  price: string;
  quantity: number;
  stock: number;
};

export function CheckoutPage() {

  const location = useLocation();
  const { itemsInCart } = location.state || { itemsInCart: [] };
  const totalQuantity = itemsInCart.reduce((total: number, item: ProductDetails) => total + item.quantity, 0);
  const totalPrice = itemsInCart.reduce((total: number, item: ProductDetails) => total + parseFloat(item.price) * item.quantity, 0).toFixed(2);
  const { auth } = useAuth();
  const userDetails = auth?.user;
  const api = useApi();
  const [showBillingInfo, setShowBillingInfo] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [orderId, setOrderId] = useState('');
  const navigate = useNavigate();
  const [fillDetails, setFillDetails] = useState(false);  // Checkbox state
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
      setFormData(prevState => ({
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
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
    // Clear the error for the field being edited
    setFormErrors(prevErrors => ({
      ...prevErrors,
      [name]: '',
    }));
  };

  //Handler for order submission
  const handleOrder = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errors = validatePaymentInfo(formData);
    if (Object.values(errors).some(error => error !== '')) {
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
          const clearCartPromise = auth ? api.cartApi.removeCart(auth.user.user_id) : Promise.resolve(window.localStorage.setItem('cart', JSON.stringify({ product_ids: [], quantities: [] })));
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
    if (Object.values(errors).some(error => error !== '')) {
      setFormErrors(errors); // Update formErrors with the validation errors
    } else {
      setShowBillingInfo(true); // Proceed to billing info if no errors in the first part
    }
  };

  // Change UI based on order success
  if (orderSuccess) {
    return (
      <div className="text-center container mx-auto">
        <img src={logo_svg} className="w-full h-96 object-cover mobile-md:object-contain mobile-sm:object-contain" alt="Products Banner" />
        <h1 className="mt-4 text-3xl mobile-lg:text-2xl mobile-md:text-base mobile-md:-mt-10 mobile-sm:text-base mobile-sm:-mt-10">Order placed successfully</h1>
        <h1 className="mt-2 text-3xl mobile-lg:text-2xl mobile-md:text-base mobile-sm:text-base">Your order ID is: </h1>
        <h1 className="font-bold mt-2 text-3xl mobile-lg:text-2xl mobile-md:text-base mobile-sm:text-sm">{orderId}</h1>
        <h1 className="font-bold text-3xl mt-4 mobile-lg:text-2xl mobile-md:text-base mobile-sm:text-base">Thank you for shopping with ShopPal!</h1>
        <button onClick={() => navigate('/')} className="mt-4 px-6 py-4 bg-secondary-300 hover:bg-primary-500 text-white rounded-md">Return Home</button>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen">
      <LoadingOverlay />
      <div className="flex justify-center container mx-auto">
        <div className="w-full max-w-[640px] tablet-md:max-w-[400px] tablet-sm:max-w-[280px] mobile-lg:px-3 mobile-md:px-3 mobile-sm:px-3">
          <form onSubmit={handleOrder} className="flex flex-col space-y-4">
            {!showBillingInfo && (
              <>
                <div>
                  <h1 className="text-3xl my-3">Shipping Address</h1>
                  <input type="checkbox" id="fill-details" checked={fillDetails} onChange={(e) => setFillDetails(e.target.checked)} className="h-4 w-4 accent-accent-500" />
                  <label htmlFor="fill-details"> Fill details from profile</label>
                </div>

                <label htmlFor="first-name">First Name</label>
                <input type="text" id="first-name" name="firstName" value={formData.firstName} onChange={handleChange} placeholder="First Name"
                  className={`border-2 ${formErrors.firstName ? 'border-red-500 focus:outline-red-500' : 'border-gray-300 focus:outline-primary-500'} p-2 rounded-md`} />
                {formErrors.firstName && <p className="text-red-500"> <ExclamationIcon className="inline mb-2" /> {formErrors.firstName}</p>}

                <label htmlFor="middle-name">Middle Name</label>
                <input type="text" id="middle-name" name="middleName" value={formData.middleName} onChange={handleChange} placeholder="Middle Name"
                  className={`border-2 ${formErrors.middleName ? 'border-red-500 focus:outline-red-500' : 'border-gray-300 focus:outline-primary-500'} p-2 rounded-md`} />
                {formErrors.middleName && <p className="text-red-500"> <ExclamationIcon className="inline mb-2" /> {formErrors.middleName}</p>}

                <label htmlFor="last-name">Last Name</label>
                <input type="text" id="last-name" name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Last Name"
                  className={`border-2 ${formErrors.lastName ? 'border-red-500 focus:outline-red-500' : 'border-gray-300 focus:outline-primary-500'} p-2 rounded-md`} />
                {formErrors.lastName && <p className="text-red-500"> <ExclamationIcon className="inline mb-2" /> {formErrors.lastName}</p>}

                <label htmlFor="street">Street</label>
                <input type="text" id="street" name="street" value={formData.street} onChange={handleChange} placeholder="Street"
                  className={`border-2 ${formErrors.street ? 'border-red-500 focus:outline-red-500' : 'border-gray-300 focus:outline-primary-500'} p-2 rounded-md`} />
                {formErrors.street && <p className="text-red-500"> <ExclamationIcon className="inline mb-2" /> {formErrors.street}</p>}

                <label htmlFor="city">City</label>
                <input type="text" id="city" name="city" value={formData.city} onChange={handleChange} placeholder="City"
                  className={`border-2 ${formErrors.city ? 'border-red-500 focus:outline-red-500' : 'border-gray-300 focus:outline-primary-500'} p-2 rounded-md`} />
                {formErrors.city && <p className="text-red-500"> <ExclamationIcon className="inline mb-2" /> {formErrors.city}</p>}

                <label htmlFor="country">Country</label>
                <input type="text" id="country" name="country" value={formData.country} onChange={handleChange} placeholder="Country"
                  className={`border-2 ${formErrors.country ? 'border-red-500 focus:outline-red-500' : 'border-gray-300 focus:outline-primary-500'} p-2 rounded-md`} />
                {formErrors.country && <p className="text-red-500"> <ExclamationIcon className="inline mb-2" /> {formErrors.country}</p>}

                <button type="button" onClick={handleContinue} className="text-white bg-secondary-300 hover:bg-primary-500 py-4 rounded-md w-1/5 ml-auto tablet-sm:w-1/4 mobile-md:w-1/4 mobile-sm:w-1/4">
                  Continue
                </button>
              </>
            )}
            {showBillingInfo && (
              <>
                <h1 className="text-3xl my-3">Contact info</h1>
                <label htmlFor="email">Email</label>
                <input type="text" id="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email"
                  className={`border-2 ${formErrors.email ? 'border-red-500 focus:outline-red-500' : 'border-gray-300 focus:outline-primary-500'} p-2 rounded-md`} />
                {formErrors.email && <p className="text-red-500"> <ExclamationIcon className="inline mb-2" /> {formErrors.email}</p>}

                <label htmlFor="phone">Phone</label>
                <input type="text" id="phone" name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone"
                  className={`border-2 ${formErrors.phone ? 'border-red-500 focus:outline-red-500' : 'border-gray-300 focus:outline-primary-500'} p-2 rounded-md`} />
                {formErrors.phone && <p className="text-red-500"> <ExclamationIcon className="inline mb-2" /> {formErrors.phone}</p>}

                <h1 className="text-3xl my-3">Billing info</h1>
                <label htmlFor="card-number">Card Number</label>
                <input type="text" id="card-number" name="cardNumber" value={formData.cardNumber} onChange={handleChange} placeholder="Card Number"
                  className={`border-2 ${formErrors.cardNumber ? 'border-red-500 focus:outline-red-500' : 'border-gray-300 focus:outline-primary-500'} p-2 rounded-md`} />
                {formErrors.cardNumber && <p className="text-red-500"> <ExclamationIcon className="inline mb-2" /> {formErrors.cardNumber}</p>}

                <label htmlFor="expiry-date">Expiry Date</label>
                <input type="text" id="expiry-date" name="expiryDate" value={formData.expiryDate} onChange={handleChange} placeholder="Expiry Date"
                  className={`border-2 ${formErrors.expiryDate ? 'border-red-500 focus:outline-red-500' : 'border-gray-300 focus:outline-primary-500'} p-2 rounded-md`} />
                {formErrors.expiryDate && <p className="text-red-500"> <ExclamationIcon className="inline mb-2" /> {formErrors.expiryDate}</p>}

                <label htmlFor="cvv">CVV</label>
                <input type="text" id="cvv" name="cvv" value={formData.cvv} onChange={handleChange} placeholder="CVV"
                  className={`border-2 ${formErrors.cvv ? 'border-red-500 focus:outline-red-500' : 'border-gray-300 focus:outline-primary-500'} p-2 rounded-md`} />
                {formErrors.cvv && <p className="text-red-500"> <ExclamationIcon className="inline mb-2" /> {formErrors.cvv}</p>}

                <button type="submit" className="text-white bg-secondary-300 hover:bg-primary-500 py-4 rounded-md w-1/5 ml-auto tablet-md:w-1/3 tablet-sm:w-1/2 mobile-lg:w-1/3 mobile-md:w-1/2 mobile-sm:w-1/2">Confirm purchase</button>
              </>
            )}
          </form>
        </div>
        <div className="ml-4 border-l bg-accent-100 mt-10 border-accent-300 pr-4 mobile-lg:hidden mobile-md:hidden mobile-sm:hidden">
          <table className="ml-3">
            <tbody>
              {itemsInCart.map((item: ProductDetails, index: number) => (
                <tr key={index} className="border-b border-accent-300">
                  <td className="w-20 h-20"><img src={item.thumbnail} alt={item.title} className="w-20 h-20 object-cover" /></td>
                  <td className="">{item.title} <br /> Qty:{item.quantity}</td>
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
        </div>
      </div>
    </div>
  );
}