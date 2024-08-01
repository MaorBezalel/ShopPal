import { AdvancedUserInfo } from "./components/AdvancedUserInfo";

export function ProfilePage() {

    return (
        <main className="container flex flex-1 flex-col">
            {/* Maor */}
            <header className="flex flex-col">
                <h2>Basic Info</h2>
                <div className="flex flex-row items-center gap-4">
                    <img
                        src=""
                        alt=""
                        className="rounded-full"
                    />
                    <div className="grid grid-cols-2 grid-rows-2 gap-4">
                        <section>
                            <h3></h3>
                            <p></p>
                        </section>
                        <section>
                            <h3></h3>
                            <p></p>
                        </section>
                        <section>
                            <h3></h3>
                            <p></p>
                        </section>
                        <section>
                            <h3></h3>
                            <p></p>
                        </section>
                    </div>
                </div>
            </header>

            {/* Idan */}
            <section>
                <h2>Advanced Info</h2>
                <AdvancedUserInfo />
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
