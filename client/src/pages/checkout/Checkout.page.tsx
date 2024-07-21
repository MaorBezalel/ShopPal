import { useLocation } from "react-router-dom";
import { useAuth } from "@/shared/hooks/useAuth.hook";

interface ProductDetails{
    product_id: string;
    thumbnail: string;
    title: string;
    price: string;
    quantity: number;

}

export function CheckoutPage() {

    const location = useLocation();
    const { itemsInCart } = location.state || { itemsInCart: [] };
    const totalQuantity = itemsInCart.reduce((total: number, item: ProductDetails) => total + item.quantity, 0);
    const totalPrice = itemsInCart.reduce((total:number, item:ProductDetails) => total + parseFloat(item.price) * item.quantity, 0).toFixed(2);
    const { auth } = useAuth();
    const userId = auth?.user.user_id;


    return (
        <div>
          <h1>Checkout</h1>
          <table>
            <tbody>
              {itemsInCart.map((item: ProductDetails, index: number) => (
                <tr key={index}>
                  <td><img src={item.thumbnail} alt={item.title}/></td>
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
      );
}