import {Routes, Route} from 'react-router-dom';
import { HomePage } from '@/pages/home/Home.page.tsx';
import { ProductsPage } from '@/pages/products/Products.page';
import { ProductPage } from '@/pages/product/Product.page';
import { AuthPage } from '@/pages/auth/Auth.page';
import { CartPage } from '@/pages/cart/Cart.page';
import { ProfilePage } from '@/pages/profile/Profile.page';
import { OrderPage } from './pages/order/Order.page';
import { NotFoundPage } from './pages/not-found/NotFound.page';
import { RequireAuth } from '@/shared/components/RequireAuth';
import { PersistentLogin } from './shared/components/PersistentLogin';

export default function App() {
    return (
        <Routes>
            {/* public routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="products" element={<ProductsPage />} />
            <Route path="product/:id" element={<ProductPage />} />
            <Route path="auth" element={<AuthPage />} />
            <Route path="cart" element={<CartPage />} />

            {/* private routes */}
            <Route element={<PersistentLogin />}>
                <Route element={<RequireAuth />}>
                    <Route path="profile/:id" element={<ProfilePage />} />
                    <Route path="order/:id" element={<OrderPage />} />
                </Route>
            </Route>

            {/* catch all... */}
            <Route path="*" element={<NotFoundPage />} />

        </Routes>
    )
}
