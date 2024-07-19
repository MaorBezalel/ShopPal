import { useApi } from "@/shared/hooks/useApi.hook";
import { useEffect, useRef, useState } from "react";
import useLocalStorage from "@/shared/hooks/useLocalStorage.hook";
import { ProductDisplayInCart } from "./ProductDisplayInCart";
import { Product } from "@/shared/types";

// Define props type
type UserCartProps = {
    onTotalPriceUpdate: (totalPrice: number) => void;
    onClearCart: () => void;
    clearTrigger: boolean;
  };

export default function GuestCart({ onTotalPriceUpdate, onClearCart, clearTrigger }: UserCartProps) {
    const api = useApi();
    const isMounted = useRef<boolean>(false);
    const [cart, setCart] = useLocalStorage<{ product_ids: Array<string>, quantities: Array<number> }>('cart', { product_ids: [], quantities: [] });
    const [productDetails, setProductDetails] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [isEmpty, setIsEmpty] = useState(false); 



    useEffect(() => {
        const fetchData = async () => {
            isMounted.current = true;
            setIsLoading(true);
            setIsError(false);
            if (cart.product_ids.length) {
                const isValidQuantities = cart.quantities.length === cart.product_ids.length && cart.quantities.every(q => typeof q === 'number');

                if (!isValidQuantities) {
                    console.error("Invalid cart state: Quantities and Product IDs mismatch or Quantities not all numbers");
                    setIsError(true); // Set error state due to invalid cart state
                    setIsLoading(false); // End loading since we're not proceeding with the fetch
                    setCart({ product_ids: [], quantities: [] }); // Clear the cart to prevent further errors
                    return;
                }
                try {
                    const response = await api.cartApi.getGuestCart({ product_ids: cart.product_ids });
                    if ('products' in response) {
                        setProductDetails(response.products);
                        setIsEmpty(response.products.length === 0); // Check if the response is empty
                    } else {
                        console.log(response.message);
                        setIsError(true); // Set error state if response doesn't contain products
                    }
                } catch (error) {
                    console.error("Fetching error:", error);
                    setIsError(true);
                }
            } else {
                console.log("No product IDs found in local storage");
                setIsEmpty(true); // Set empty state if no product IDs
            }
            setIsLoading(false);
        };

        fetchData();
        return () => {
            isMounted.current = false;
        };
    }, [api.cartApi, cart.product_ids]);


    const calculateTotalPrice = () => {
        let totalPrice = 0;
        productDetails.forEach((product, index) => {
            totalPrice += product.price * cart.quantities[index];
        });
        return totalPrice;
    };

    useEffect(() => {
        const totalPrice = calculateTotalPrice();
        onTotalPriceUpdate(totalPrice);
    }, [productDetails, cart.quantities]);

    const removeProductFromCart = (productId: string) => {
        const productIndex = cart.product_ids.findIndex(id => id === productId);
        if (productIndex > -1) {
          const newProductIds = [...cart.product_ids];
          const newQuantities = [...cart.quantities];
          newProductIds.splice(productIndex, 1);
          newQuantities.splice(productIndex, 1);
          setCart({ product_ids: newProductIds, quantities: newQuantities });
    
          setProductDetails(prevDetails => prevDetails.filter(product => product.product_id !== productId));
        }
      };

      const handleClearCart = () => {
        setCart({ product_ids: [], quantities: [] });
        setProductDetails([]);
        onTotalPriceUpdate(0);
        onClearCart();
      };


      useEffect(() => {
        if (clearTrigger) {
            handleClearCart(); // Call the existing cart clearing logic when clearTrigger changes
        }
    }, [clearTrigger]);




    return(
        <div>
            {isLoading ? (
                <p className="m-5">Loading...</p>
            ) : isError ? (
                <p className="m-5">Error loading cart. Please try again later.</p>
            ) : isEmpty ? (
                <p className="m-5">Your cart is empty.</p>
            ) : (
                productDetails.map((product, index) => (
                    <ProductDisplayInCart
                        key={product.product_id}
                        thumbnail={product.thumbnail}
                        title={product.title}
                        price={product.price}
                        quantity={cart.quantities[index]}
                        onRemoveProduct={() => removeProductFromCart(product.product_id)}
                    />
                ))
            )}
        </div>
    );

}