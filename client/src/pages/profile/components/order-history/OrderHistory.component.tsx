import { useOrderHistory } from '@/pages/profile/hooks';
import {
    OrderHistoryEmpty,
    OrderHistoryError,
    OrderItemID,
    OrderItemIssuedTime,
    OrderItemDeliveryAddress,
    OrderItemStatus,
    OrderItemProductsTable,
} from '@/pages/profile/components/order-history';
import OrderItemAccordion from '@/shared/components/Accordion';
import LoadingAnimation from '@/shared/components/LoadingAnimation';
import { IconMenu } from '@/shared/components/icons';
import { useInfiniteScroll } from '@/shared/hooks';

export function OrderHistory() {
    const { orders, isLoading, isError, conditionsToFetchNewPage, fetchNextPage, isFetchingNextPage } =
        useOrderHistory();
    const isSuceess = !isLoading && !isError;
    const hasOrders = orders.length > 0;

    useInfiniteScroll({
        fetchNextPage,
        threshold: 300,
        conditionsToFetchNewPage,
    });

    return (
        <section className="flex flex-col gap-6">
            <h2
                className="text-5xl font-semibold text-secondary-400
                tablet-md:text-4xl"
            >
                Order History
            </h2>
            {isLoading && <LoadingAnimation className="mt-10" />}
            {isError && <OrderHistoryError />}
            {isSuceess && !hasOrders && <OrderHistoryEmpty />}
            {orders.map((order) => (
                <OrderItemAccordion
                    key={order.order_id}
                    accordionStyles="border border-text-950 rounded-lg p-4 bg-background-100
                    tablet-sm:p-2"
                    accordionButton={(isOpen) => (
                        <button
                            itemScope
                            itemType="http://schema.org/Order"
                            className="relative flex w-full flex-col items-start justify-center gap-4 pr-14 outline-none
                            tablet-sm:pr-4"
                        >
                            <OrderItemID orderID={order.order_id} />
                            <div
                                className="flex w-full flex-row items-center justify-between
                                tablet-sm:text-xs
                                mobile-md:text-[0.7rem]"
                            >
                                <OrderItemIssuedTime issuedTime={order.issued_time} />
                                <OrderItemDeliveryAddress deliveryAddress={order.delivery_address} />
                                <OrderItemStatus orderStatus={order.order_status} />
                            </div>
                            <IconMenu
                                open={isOpen}
                                className="absolute right-2 top-1/2 size-8 -translate-y-1/2 transform text-text-950
                                tablet-sm:-right-2 tablet-sm:size-6"
                            />
                        </button>
                    )}
                >
                    <OrderItemProductsTable products={order.products} />
                </OrderItemAccordion>
            ))}
            {isFetchingNextPage && <LoadingAnimation />}
        </section>
    );
}
