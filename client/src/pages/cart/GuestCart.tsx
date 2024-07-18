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
    



    useEffect(() => {
        isMounted.current = true;
        const fetchData = async () => {
            if (cart.product_ids.length) {
                const response = await api.cartApi.getGuestCart({ product_ids: cart.product_ids});
                console.log("Response:", response);
                if ('products' in response) {
                    isMounted.current &&
                    setProductDetails(response.products);
                    console.log("Product Details:", productDetails);
                }else{
                    console.log(response.message);
                }
            } else {
                console.log("No product IDs found in local storage");
            }
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
          setCart({ product_ids: newProductIds, quantities: newQuantities }); // Correctly updates local storage
    
          setProductDetails(prevDetails => prevDetails.filter(product => product.product_id !== productId));
        }
      };

      const handleClearCart = () => {
        console.log("Clearing cart");
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
            {productDetails.map((product, index) => (
                <ProductDisplayInCart
                    key={product.product_id}
                    thumbnail={product.thumbnail}
                    title={product.title}
                    price={product.price}
                    quantity={cart.quantities[index]}
                    onRemoveProduct={() => removeProductFromCart(product.product_id)}
                />
        ))}
        </div>
    );

}