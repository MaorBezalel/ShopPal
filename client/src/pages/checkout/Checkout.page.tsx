import { useLocation } from "react-router-dom";
import { useAuth } from "@/shared/hooks/useAuth.hook";
import { useState, useEffect } from "react";
import { useApi } from "@/shared/hooks/useApi.hook";
import { Address } from "@/shared/types";
import { validateShippingInfo, validatePaymentInfo } from "./validateForm";

interface ProductDetails {
  product_id: string;
  thumbnail: string;
  title: string;
  price: string;
  quantity: number;
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
  const initialFormState = {
    firstName: '',
    middleName: '',
    lastName: '',
    street: '',
    city: '',
    country: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  };

  const [formData, setFormData] = useState(initialFormState);
  const [formErrors, setFormErrors] = useState({} as Partial<typeof initialFormState>);

  // Checkbox state
  const [fillDetails, setFillDetails] = useState(false);

  // Effect to fill form when checkbox is checked
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
      }));
    }
  }, [fillDetails, userDetails]);

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

  const handleOrder = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const errors = validatePaymentInfo(formData); // 'secondPart' is an example identifier
    if (Object.values(errors).some(error => error !== '')) {
      setFormErrors(errors);
      return; // Prevent form submission if there are errors
    }

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
      console.log(response);
      if (response && 'order_id' in response && auth) {
        try {
          await api.cartApi.removeCart(auth.user.user_id);
        }
        catch (error) {
          console.error(error);
        }
      } else if (response && 'order_id' in response) {
        window.localStorage.setItem('cart', JSON.stringify({ product_ids: [], quantities: [] }));
      }
    }
  };

  const handleContinue = () => {
    // Assuming validateForm can now accept a second parameter indicating the form part
    const errors = validateShippingInfo(formData); // 'firstPart' is an example identifier

    // Check if there are any errors in the first part of the form
    if (Object.values(errors).some(error => error !== '')) {
      setFormErrors(errors); // Update formErrors with the validation errors
    } else {
      setShowBillingInfo(true); // Proceed to billing info if no errors in the first part
    }
  };


  return (
    <div className="flex">
      <h1>Checkout</h1>
      <div className="w-1/2">
        <form onSubmit={handleOrder} className="flex flex-col space-y-4">
          {!showBillingInfo && (
            <>
              <div>
                <h1>Shipping Address:</h1>
                <input type="checkbox" id="fill-details" checked={fillDetails} onChange={(e) => setFillDetails(e.target.checked)} />
                <label htmlFor="fill-details">Fill details from profile</label>
              </div>

              <label htmlFor="first-name">First Name</label>
              <input type="text" id="first-name" name="firstName" value={formData.firstName} onChange={handleChange} placeholder="First Name"
                className={`border-2 ${formErrors.firstName ? 'border-red-500' : 'border-gray-300'} p-2 rounded-md focus:outline-none`} />
              {formErrors.firstName && <p className="text-red-500 text-xs italic">{formErrors.firstName}</p>}

              <label htmlFor="middle-name">Middle Name</label>
              <input type="text" id="middle-name" name="middleName" value={formData.middleName} onChange={handleChange} placeholder="Middle Name"
                className={`border-2 ${formErrors.middleName ? 'border-red-500' : 'border-gray-300'} p-2 rounded-md focus:outline-none`} />
              {formErrors.middleName && <p className="text-red-500 text-xs italic">{formErrors.middleName}</p>}

              <label htmlFor="last-name">Last Name</label>
              <input type="text" id="last-name" name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Last Name"
                className={`border-2 ${formErrors.lastName ? 'border-red-500' : 'border-gray-300'} p-2 rounded-md focus:outline-none`} />
              {formErrors.lastName && <p className="text-red-500 text-xs italic">{formErrors.lastName}</p>}

              <label htmlFor="street">Street</label>
              <input type="text" id="street" name="street" value={formData.street} onChange={handleChange} placeholder="Street"
                className={`border-2 ${formErrors.street ? 'border-red-500' : 'border-gray-300'} p-2 rounded-md focus:outline-none`} />
              {formErrors.street && <p className="text-red-500 text-xs italic">{formErrors.street}</p>}

              <label htmlFor="city">City</label>
              <input type="text" id="city" name="city" value={formData.city} onChange={handleChange} placeholder="City"
                className={`border-2 ${formErrors.city ? 'border-red-500' : 'border-gray-300'} p-2 rounded-md focus:outline-none`} />
              {formErrors.city && <p className="text-red-500 text-xs italic">{formErrors.city}</p>}

              <label htmlFor="country">Country</label>
              <input type="text" id="country" name="country" value={formData.country} onChange={handleChange} placeholder="Country"
                className={`border-2 ${formErrors.country ? 'border-red-500' : 'border-gray-300'} p-2 rounded-md focus:outline-none`} />
              {formErrors.country && <p className="text-red-500 text-xs italic">{formErrors.country}</p>}

              <button type="button" onClick={handleContinue} className="bg-secondary-300 hover:bg-primary-500 px-4 py-1 rounded-md my-2 text-white">
                Continue
              </button>
            </>
          )}
          {showBillingInfo && (
            <>
              <h1 className="pt-4">Billing info:</h1>
              <label htmlFor="card-number">Card Number</label>
              <input type="text" id="card-number" name="cardNumber" value={formData.cardNumber} onChange={handleChange} placeholder="Card Number"
                className={`border-2 ${formErrors.cardNumber ? 'border-red-500' : 'border-gray-300'} p-2 rounded-md focus:outline-none`} />
              {formErrors.cardNumber && <p className="text-red-500 text-xs italic">{formErrors.cardNumber}</p>}

              <label htmlFor="expiry-date">Expiry Date</label>
              <input type="text" id="expiry-date" name="expiryDate" value={formData.expiryDate} onChange={handleChange} placeholder="Expiry Date"
                className={`border-2 ${formErrors.expiryDate ? 'border-red-500' : 'border-gray-300'} p-2 rounded-md focus:outline-none`} />
              {formErrors.expiryDate && <p className="text-red-500 text-xs italic">{formErrors.expiryDate}</p>}

              <label htmlFor="cvv">CVV</label>
              <input type="text" id="cvv" name="cvv" value={formData.cvv} onChange={handleChange} placeholder="CVV"
                className={`border-2 ${formErrors.cvv ? 'border-red-500' : 'border-gray-300'} p-2 rounded-md focus:outline-none`} />
              {formErrors.cvv && <p className="text-red-500 text-xs italic">{formErrors.cvv}</p>}

              <button type="submit" className="bg-secondary-300 hover:bg-primary-500 px-4 py-1 rounded-md my-2 text-white">Confirm purchase</button>
            </>
          )}
        </form>
      </div>
      <div className="w-1/2">
        <table>
          <tbody>
            {itemsInCart.map((item: ProductDetails, index: number) => (
              <tr key={index}>
                <td><img src={item.thumbnail} alt={item.title} /></td>
                <td>{item.title} <br /> Qty:{item.quantity}</td>
                <td>${(parseFloat(item.price) * item.quantity).toFixed(2)}</td>
              </tr>
            ))}
            <tr>
              <td>Total {totalQuantity} items ${totalPrice}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}