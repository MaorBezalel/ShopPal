import { UserBasicInfo } from '@/pages/profile/components/UserBasicInfo.component';

export function ProfilePage() {
    return (
        <main className="container-highlight container flex flex-1 flex-col gap-10">
            <UserBasicInfo />

            {/* Idan */}
            <section>
                <h2>Advanced Info</h2>
            </section>

            {/* Maor */}
            <section>
                <h2>Orders</h2>
            </section>

            {/* Nadav */}
            <section>
                <h2>Edit Info</h2>
            </section>
        </main>
    );
}
