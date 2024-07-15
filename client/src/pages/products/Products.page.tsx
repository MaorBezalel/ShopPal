import ProductCard from "./components/ProductCard";
import type { Product } from "@/shared/types/entities.types";
import { Category } from "@/shared/types/enum.types";

export const ProductsPage = () => {

    const fakeProducts: Product[] = [
            {
              product_id: "49b4ada4f-5aa6-4756-9a4c-ce69a4aa7abb",
              title: "300 Touring",
              description: "The 300 Touring is a stylish and comfortable sedan, known for its luxurious features and smooth performance.",
              category: Category.VEHICLE,
              price: 28999.99,
              rating: 4.56,
              stock: 53,
              images: [
                "https://cdn.dummyjson.com/products/images/vehicle/300%20Touring/1.png",
                "https://cdn.dummyjson.com/products/images/vehicle/300%20Touring/2.png",
                "https://cdn.dummyjson.com/products/images/vehicle/300%20Touring/3.png",
                "https://cdn.dummyjson.com/products/images/vehicle/300%20Touring/4.png",
                "https://cdn.dummyjson.com/products/images/vehicle/300%20Touring/5.png",
                "https://cdn.dummyjson.com/products/images/vehicle/300%20Touring/6.png"
              ],
              thumbnail: "https://cdn.dummyjson.com/products/images/vehicle/300%20Touring/thumbnail.png",
              brand: "Chrysler",
              return_policy: "No return policy",
              shipping_info: "Ships overnight",
              warranty_info: "3 year warranty",
              dimension: {
                width: 5.03,
                height: 6.98,
                depth: 8.65,
                weight: 5
              }
            },
            {
              product_id: "fbc02994-adbf-424c-b069-899529c5fd26",
              title: "Amazon Echo Plus",
              description: "The Amazon Echo Plus is a smart speaker with built-in Alexa voice control. It features premium sound quality and serves as a hub for controlling smart home devices.",
              category: Category.MOBILE_ACCESSORIES,
              price: 99.99,
              rating: 3.52,
              stock: 50,
              images: [
                "https://cdn.dummyjson.com/products/images/mobile-accessories/Amazon%20Echo%20Plus/1.png",
                "https://cdn.dummyjson.com/products/images/mobile-accessories/Amazon%20Echo%20Plus/2.png"
              ],
              thumbnail: "https://cdn.dummyjson.com/products/images/mobile-accessories/Amazon%20Echo%20Plus/thumbnail.png",
              brand: "Amazon",
              return_policy: "90 days return policy",
              shipping_info: "Ships in 1 week",
              warranty_info: "1 month warranty",
              dimension: {
                width: 8.1,
                height: 7.74,
                depth: 5.68,
                weight: 7
              }
            },
            {
              product_id: "40c648a1-cada8-4211-a815-b3aa9870113d",
              title: "American Football",
              description: "The American Football is a classic ball used in American football games. It is designed for throwing and catching, making it an essential piece of equipment for the sport.",
              category: Category.SPORTS_ACCESSORIES,
              price: 19.99,
              rating: 3.78,
              stock: 48,
              images: [
                "https://cdn.dummyjson.com/products/images/sports-accessories/American%20Football/1.png"
              ],
              thumbnail: "https://cdn.dummyjson.com/products/images/sports-accessories/American%20Football/thumbnail.png",
              brand: "Vivo",
              return_policy: "30 days return policy",
              shipping_info: "Ships in 2 weeks",
              warranty_info: "1 month warranty",
              dimension: {
                width: 9.74,
                height: 23.16,
                depth: 26.86,
                weight: 9
              }
            },
            {
                product_id: "49b4d64f-5aa6-4ada56-9a4c-ce69a4aa7abb",
                title: "300 Touring",
                description: "The 300 Touring is a stylish and comfortable sedan, known for its luxurious features and smooth performance.",
                category: Category.VEHICLE,
                price: 28999.99,
                rating: 4.56,
                stock: 53,
                images: [
                  "https://cdn.dummyjson.com/products/images/vehicle/300%20Touring/1.png",
                  "https://cdn.dummyjson.com/products/images/vehicle/300%20Touring/2.png",
                  "https://cdn.dummyjson.com/products/images/vehicle/300%20Touring/3.png",
                  "https://cdn.dummyjson.com/products/images/vehicle/300%20Touring/4.png",
                  "https://cdn.dummyjson.com/products/images/vehicle/300%20Touring/5.png",
                  "https://cdn.dummyjson.com/products/images/vehicle/300%20Touring/6.png"
                ],
                thumbnail: "https://cdn.dummyjson.com/products/images/vehicle/300%20Touring/thumbnail.png",
                brand: "Chrysler",
                return_policy: "No return policy",
                shipping_info: "Ships overnight",
                warranty_info: "3 year warranty",
                dimension: {
                  width: 5.03,
                  height: 6.98,
                  depth: 8.65,
                  weight: 5
                }
              },
              {
                product_id: "fbc02994-cdbf-424c-ada69-899529c5fd26",
                title: "Amazon Echo Plus",
                description: "The Amazon Echo Plus is a smart speaker with built-in Alexa voice control. It features premium sound quality and serves as a hub for controlling smart home devices.",
                category: Category.MOBILE_ACCESSORIES,
                price: 99.99,
                rating: 3.52,
                stock: 50,
                images: [
                  "https://cdn.dummyjson.com/products/images/mobile-accessories/Amazon%20Echo%20Plus/1.png",
                  "https://cdn.dummyjson.com/products/images/mobile-accessories/Amazon%20Echo%20Plus/2.png"
                ],
                thumbnail: "https://cdn.dummyjson.com/products/images/mobile-accessories/Amazon%20Echo%20Plus/thumbnail.png",
                brand: "Amazon",
                return_policy: "90 days return policy",
                shipping_info: "Ships in 1 week",
                warranty_info: "1 month warranty",
                dimension: {
                  width: 8.1,
                  height: 7.74,
                  depth: 5.68,
                  weight: 7
                }
              },
              {
                product_id: "40c648a1-cbf8-4211-a815-b3aa9870adad",
                title: "American Football",
                description: "The American Football is a classic ball used in American football games. It is designed for throwing and catching, making it an essential piece of equipment for the sport.",
                category: Category.SPORTS_ACCESSORIES,
                price: 19.99,
                rating: 3.78,
                stock: 48,
                images: [
                  "https://cdn.dummyjson.com/products/images/sports-accessories/American%20Football/1.png"
                ],
                thumbnail: "https://cdn.dummyjson.com/products/images/sports-accessories/American%20Football/thumbnail.png",
                brand: "Vivo",
                return_policy: "30 days return policy",
                shipping_info: "Ships in 2 weeks",
                warranty_info: "1 month warranty",
                dimension: {
                  width: 9.74,
                  height: 23.16,
                  depth: 26.86,
                  weight: 9
                }
              }
    ]

    return (
        <div className="max-w-screen-xl mx-auto">
            <div className="flex flex-row justify-between">
                <h1 className="text-3xl font-semibold">Products List: </h1>
            </div>
            <div className="grid grid-cols-4 gap-5 m-3">
                {fakeProducts.map(product => (
                    <ProductCard key={product.product_id} product={product} cardShape="column" />
                ))}
            </div>
        </div>
    );
}