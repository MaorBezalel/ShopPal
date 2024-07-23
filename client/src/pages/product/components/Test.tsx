import { Product } from '@/shared/types';
import { memo, useEffect } from 'react';
import { useNavigate } from 'react-router';

type TestProps = {
    product: Product;
};

const Test = memo(({ product: { title, description, price, stock, category, rating, product_id } }: TestProps) => {
    return (
        <div>
            <h1>{title}</h1>
            <h1>{description}</h1>
            <h1>{price}</h1>
            <h1>{stock}</h1>
            <h1>{category}</h1>
            <h1>{rating}</h1>
            <h1>{product_id}</h1>
        </div>
    );
});

export default Test;
