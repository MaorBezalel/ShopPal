import { useAuth } from '@/shared/hooks';
import { IconNameDetails, IconPhone, IconBirthday, IconCity, IconCountry, IconStreet, IconUser } from '@/shared/components/icons';

export function AdvancedUserInfo() {
    const userDetails = useAuth().auth?.user;

    const UserAdvancedInfo = [
        {
            title: 'Middle Name',
            content: userDetails?.name_details.middle_name || 'N/A',
            icon: <IconNameDetails className="absolute left-2 top-1/2 transform -translate-y-1/2 size-7 text-text-950 peer-focus:text-accent-500 tablet-sm:size-6" />,
        },
        {
            title: 'Gender',
            content: userDetails?.gender || 'N/A',
            icon: <IconUser className="absolute left-2 top-1/2 transform -translate-y-1/2 size-7 text-text-950 peer-focus:text-accent-500 tablet-sm:size-6" />,
        },
        {
            title: 'Phone',
            content: userDetails?.phone || 'N/A',
            icon: <IconPhone className="absolute left-2 top-1/2 transform -translate-y-1/2 size-7 text-text-950 peer-focus:text-accent-500 tablet-sm:size-6" />,
        },
        {
            title: 'Birth Date',
            content: userDetails?.birthday?.toString() || 'N/A',
            icon: <IconBirthday className="absolute left-2 top-1/2 transform -translate-y-1/2 size-7 text-text-950 peer-focus:text-accent-500 tablet-sm:size-6" />,
        },
    ];

    const AddressInfo = [
        {
            title: 'Country',
            content: userDetails?.address.country || 'N/A',
            icon: <IconCountry className="absolute left-2 top-1/2 transform -translate-y-1/2 size-7 text-text-950 peer-focus:text-accent-500 tablet-sm:size-6" />,
        },
        {
            title: 'City',
            content: userDetails?.address.city || 'N/A',
            icon: <IconCity className="absolute left-2 top-1/2 transform -translate-y-1/2 size-7 text-text-950 peer-focus:text-accent-500 tablet-sm:size-6" />,
        },
        {
            title: 'Street',
            content: userDetails?.address.street || 'N/A',
            icon: <IconStreet className="absolute left-2 top-1/2 transform -translate-y-1/2 size-7 text-text-950 peer-focus:text-accent-500 tablet-sm:size-6" />,
        },
    ];

    return (
        <div className="max-w-lg flex w-full flex-col container ml-0">
            {UserAdvancedInfo.map((info, index) => (
                <div className="flex flex-col mb-4" key={index}>
                    <label className="text-primary-700 font-bold mb-2">{info.title}:</label>
                    <div className="relative p-2 border border-secondary-300 rounded bg-gray-100">
                        {info.icon}
                        <span className="ml-10">{info.content}</span>
                    </div>
                </div>
            ))}
            <div className="flex space-x-4 mobile-lg:flex-col mobile-lg:space-x-0">
                {AddressInfo.map((info, index) => (
                    <div className="flex-1 flex flex-col mb-4" key={index}>
                        <label className="text-primary-700 font-bold mb-2">{info.title}:</label>
                        <div className="relative p-2 border border-secondary-300 rounded bg-gray-100">
                            {info.icon}
                            <span className="ml-10">{info.content}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}