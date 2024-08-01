import { UserBasicInfo } from '@/pages/profile/components/UserBasicInfo.component';
import { OrderHistory } from '@/pages/profile/components/order-history/OrderHistory.component';
import { ProfileEdit } from './components/ProfileEdit';
import { AdvancedUserInfo } from './components/AdvancedUserInfo';
import { useState } from 'react';

type ProfilePageTab = 'Advanced Info' | 'Order History' | 'Edit Profile';

export function ProfilePage() {
    const [pageTab, setPageTab] = useState<ProfilePageTab>('Advanced Info');

    return (
        <main className="container flex flex-1 flex-col items-center gap-8 px-4 tablet-sm:px-2">
            <UserBasicInfo />

            <div className="flex flex-row gap-4">
                <button
                    onClick={() => setPageTab('Advanced Info')}
                    className="rounded-sm border border-primary-200 bg-primary-100 px-3 py-1 font-semibold data-[selected=true]:bg-primary-300 data-[selected=true]:text-white"
                    data-selected={pageTab === 'Advanced Info'}
                >
                    Advanced Info
                </button>
                <button
                    onClick={() => setPageTab('Order History')}
                    className="rounded-sm border border-primary-200 bg-primary-100 px-3 py-1 font-semibold data-[selected=true]:bg-primary-300 data-[selected=true]:text-white"
                    data-selected={pageTab === 'Order History'}
                >
                    Order History
                </button>
                <button
                    onClick={() => setPageTab('Edit Profile')}
                    className="rounded-sm border border-primary-200 bg-primary-100 px-3 py-1 font-semibold data-[selected=true]:bg-primary-300 data-[selected=true]:text-white"
                    data-selected={pageTab === 'Edit Profile'}
                >
                    Profile Edit
                </button>
            </div>

            {pageTab === 'Advanced Info' && <AdvancedUserInfo />}
            {pageTab === 'Order History' && <OrderHistory />}
            {pageTab === 'Edit Profile' && <ProfileEdit />}
        </main>
    );
}
