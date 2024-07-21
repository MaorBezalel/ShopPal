import { Category } from '@/shared/types';
import { RatingBar } from '@/shared/components/RatingBar';
import { formatCategoryName } from '@/pages/products/utils/ProductUtils';
import { useNavigate } from 'react-router';

type ProductDetailsProps = {
    category?: Category;
    title?: string;
    description?: string;
    price?: number;
    rating?: number;
    stock?: number;
}

export const ProductDetails = ({ title, description, price, rating, category, stock } : ProductDetailsProps) => {
    const navigate = useNavigate();

    const handleCategoryClick = () => 
    {
        if (category) 
        {
            navigate(`/products?categories=${category}`);
        }
    }

    return (
        <>
            <span className="text-primary-500 font-semibold cursor-pointer" onClick={handleCategoryClick}>{category ? formatCategoryName(category) : 'Unknown Category'}</span>
            <h1 className="text-3xl font-bold">{title || 'Unknown Product'}</h1>
            {rating && <RatingBar rating={rating} />}
            <p>{description || 'No description.'}</p>
                <h6 className="text-2xl font-semibold">{price ? `$${price}` : 'Price Not Avaliable'}</h6>
                <p className={`text-sm font-semibold ${stock ? (stock === 0 ? 'text-red-800' : `text-green-800`) : 'text-gray-800'}`}>{stock ? (stock === 0 ? 'Out of stock' : `${stock} In stock`) : 'Stock unknown'}</p>
        </>
    );
};
