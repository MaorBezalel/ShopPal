import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import LoadingAnimation from '@/shared/components/LoadingAnimation';
import OrderSuccess from './components/OrderSuccess';
import CheckoutForm from './components/CheckoutForm';
import CartTable from './components/CartTable';
import { useFormData } from './hooks/useFormData';
import { useOrderHandlers } from './hooks/useOrderHandling';
import { ProductDetails } from './types/ProductDetails';

export function CheckoutPage() {
    const location = useLocation();
    const { itemsInCart } = location.state || { itemsInCart: [] };
    const totalQuantity = itemsInCart.reduce((total: number, item: ProductDetails) => total + item.quantity, 0);
    const totalPrice = itemsInCart
        .reduce((total: number, item: ProductDetails) => total + parseFloat(item.price) * item.quantity, 0)
        .toFixed(2);
    const [fillDetails, setFillDetails] = useState(false);
    const { formData, setFormData, formErrors, setFormErrors, handleChange } = useFormData(fillDetails);
    const {
        showBillingInfo,
        orderSuccess,
        orderId,
        isLoading,
        handleOrder,
        handleContinue,
    } = useOrderHandlers(itemsInCart, formData, setFormErrors);

    return (
        <main className="container relative flex flex-1 flex-row justify-between tablet-lg:gap-4 tablet-md:flex-col-reverse">
            {orderSuccess ? (
                <OrderSuccess orderId={orderId} />
            ) : (
                <>
                    {isLoading && (
                        <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75 z-50">
                            <LoadingAnimation />
                        </div>
                    )}
                    <section className="pl-2 w-full max-w-[40%] pc-sm:w-1/2 tablet-lg:max-w-[50%] tablet-md:w-full tablet-md:max-w-full mobile-lg:px-3">
                        <CheckoutForm
                            formData={formData}
                            formErrors={formErrors}
                            handleChange={handleChange}
                            handleContinue={handleContinue}
                            showBillingInfo={showBillingInfo}
                            fillDetails={fillDetails}
                            setFillDetails={setFillDetails}
                            setFormData={setFormData}
                            handleOrder={handleOrder}
                        />
                    </section>
                    <aside className="my-3 flex flex-col gap-6">
                        <h1 className="text-4xl">Order summary</h1>
                        <section className="h-full border-l border-accent-300 bg-accent-100 pr-7 tablet-md:ml-0 tablet-md:mt-0 tablet-md:w-full">
                            <CartTable
                                itemsInCart={itemsInCart}
                                totalQuantity={totalQuantity}
                                totalPrice={totalPrice}
                            />
                        </section>
                    </aside>
                </>
            )}
        </main>
    );
}