import { UserBasicInfo } from '@/pages/profile/components/UserBasicInfo.component';
import { OrderHistory } from '@/pages/profile/components/order-history/OrderHistory.component';

export function ProfilePage() {
    return (
        <main className="container-highlight container flex flex-1 flex-col gap-10">
            <UserBasicInfo />
            <OrderHistory />
        </main>
    );
}
