
import { useApi } from "@/shared/hooks/useApi.hook";

export function ProfilePage() {

    const { userApi } = useApi();

    const testUpdate = async () => {
        try {
            const message = await userApi.updateUser({username: 'idantest999'}, '96ba525b-ccda-4846-bfb1-357d1e2e31c8');
            console.log('update success: ' + message);
        }
        catch(error) {
            console.error(error);
        }
    }


    return (
        <div>
            <h1>Profile Page</h1>

            
            <button onClick={testUpdate}>Update Me! (test)</button>
        </div>
    );
}