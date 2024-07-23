import { memo } from 'react';
import { Product } from '@/shared/types';
import { RatingBar } from '@/shared/components/RatingBar';
import { formatCategoryName } from '@/pages/products/utils/ProductUtils';
import { useNavigate } from 'react-router';
import { useAddToCart } from '../hooks/useAddToCart.hook';

type ProductDetailsProps = {
    product: Product;
};

export const ProductDetails = ({
    product: { title, description, price, stock, category, rating, product_id },
}: ProductDetailsProps) => {
    const navigate = useNavigate();
    const {
        currentProductSelectedQuantity,
        increaseProductSelectedQuantity,
        decreaseProductSelectedQuantity,
        isLoadingAddToCart,
        addToCart,
    } = useAddToCart({ product_id });

    const handleAddToCartClick = () => {
        addToCart();
    };

    const handleCategoryClick = () => {
        if (category) {
            navigate(`/products?categories=${category}`);
        }
    };

    return (
        <div>
            <span className="cursor-pointer font-semibold text-primary-500" onClick={handleCategoryClick}>
                {category ? formatCategoryName(category) : 'Unknown Category'}
            </span>
            <h1 className="text-3xl font-bold">{title || 'Unknown Product'}</h1>
            {rating && <RatingBar rating={rating} />}
            <p>{description || 'No description.'}</p>
            <h6 className="text-2xl font-semibold">{price ? `$${price}` : 'Price Not Avaliable'}</h6>
            <p
                className={`text-sm font-semibold ${stock ? (stock === 0 ? 'text-red-800' : `text-green-800`) : 'text-gray-800'}`}
            >
                {stock ? (stock === 0 ? 'Out of stock' : `${stock} In stock`) : 'Stock unknown'}
            </p>
            <div className="flex flex-col gap-12 sm:flex-row sm:items-center">
                <div className="flex flex-row items-center">
                    <button
                        className="rounded-lg bg-primary-100 px-5 py-2"
                        onClick={decreaseProductSelectedQuantity}
                        disabled={currentProductSelectedQuantity <= 1}
                    >
                        -
                    </button>
                    <span className="rounded-lg px-6 py-4">{currentProductSelectedQuantity}</span>
                    <button className="rounded-lg bg-primary-100 px-4 py-2" onClick={increaseProductSelectedQuantity}>
                        +
                    </button>
                </div>
                <button
                    className="flex h-full items-center justify-center rounded-xl bg-primary-100 px-16 py-3 font-semibold"
                    onClick={handleAddToCartClick}
                    disabled={isLoadingAddToCart}
                >
                    {isLoadingAddToCart ? 'Adding...' : 'Add to Cart'}
                </button>
            </div>
        </div>
    );
};
