import {createContext} from 'react';
import { useAuthService } from '../services/auth.service';
import { useUserService } from '../services/user.service';
import { useProductService } from '../services/product.service';
import { useCartService } from '../services/cart.service';
import { useOrderService } from '../services/order.service';
import { useReviewService } from '../services/review.service';
import { usePrivateAPI } from '../hooks/usePrivateAPI.hook';
import { usePublicAPI } from '../hooks/usePublicAPI.hook';



type ApiProviderProps = {
    children: React.ReactNode;
}

type ApiProviderValue = {
    authApi: ReturnType<typeof useAuthService>;
    userApi: ReturnType<typeof useUserService>;
    productApi: ReturnType<typeof useProductService>;
    cartApi: ReturnType<typeof useCartService>;
    orderApi: ReturnType<typeof useOrderService>;
    reviewApi: ReturnType<typeof useReviewService>;
}

export const ApiContext = createContext<ApiProviderValue | null>(null);

export const ApiProvider = ({children}: ApiProviderProps) => {
    const PRIVATE_API = usePrivateAPI();
    const PUBLIC_API = usePublicAPI();
    const authApi = useAuthService({PRIVATE_API});
    const userApi = useUserService({PRIVATE_API, PUBLIC_API});
    const productApi = useProductService({PUBLIC_API});
    const cartApi = useCartService({PRIVATE_API, PUBLIC_API});
    const orderApi = useOrderService({PRIVATE_API, PUBLIC_API});
    const reviewApi = useReviewService({PRIVATE_API, PUBLIC_API});

    return (
        <ApiContext.Provider value={{authApi, userApi, productApi, cartApi, orderApi, reviewApi}}>
            {children}
        </ApiContext.Provider>
    )
};