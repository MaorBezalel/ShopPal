import { useAuth } from '@/shared/hooks';
import { AsyncImage } from 'loadable-image';
import defaultUserProfileAvatar from '@/assets/svgs/user-profile-avatar.svg';

export function UserBasicInfo() {
    const { auth } = useAuth();
    const basicInfoSections = [
        {
            title: 'Username',
            content: auth?.user?.username || 'N/A',
        },
        {
            title: 'Email',
            content: auth?.user?.email || 'N/A',
        },
        {
            title: 'First Name',
            content: auth?.user?.name_details.first_name || 'N/A',
        },
        {
            title: 'Last Name',
            content: auth?.user?.name_details.last_name || 'N/A',
        },
    ] as const;

    return (
        <header
            className="flex flex-col gap-10 px-4
            tablet-sm:gap-4 tablet-sm:px-2"
        >
            <h2
                className="text-5xl font-semibold text-secondary-400
                tablet-md:text-4xl"
            >
                Basic Info
            </h2>
            <div
                className="flex w-full flex-row items-center gap-4
                tablet-sm:flex-col tablet-sm:justify-center
                "
            >
                <AsyncImage
                    id="user-profile-image"
                    src={auth?.user?.avatar || defaultUserProfileAvatar}
                    alt={`${auth?.user?.username} avatar`}
                    className="size-36 rounded-full
                    tablet-md:size-32"
                    loader={<div className="size-32 rounded-full bg-gray-300" />}
                />
                <div
                    id="basic-info-sections"
                    className="mx-auto grid max-w-full grid-cols-[1fr_1fr] grid-rows-[1fr_1fr] gap-x-80 gap-y-4
                    pc-md:gap-x-60
                    pc-sm:gap-x-40
                    tablet-lg:gap-x-16
                    tablet-md:gap-x-8
                    tablet-sm:mx-0 tablet-sm:gap-x-32 tablet-sm:gap-y-2
                    mobile-lg:gap-x-12
                    mobile-md:gap-x-8
                    "
                >
                    {basicInfoSections.map(({ title, content }) => (
                        <BasicInfo
                            key={title}
                            className="flex flex-col items-center justify-center gap-1"
                            title={title}
                            titleStyles="text-lg font-medium text-accent-400
                            tablet-md:text-base
                            mobile-lg:text-sm
                            mobile-md:text-xs"
                            content={content}
                            contentStyles="text-2xl text-primary-500 font-bold
                            tablet-md:text-xl
                            tablet-sm:text-lg
                            mobile-lg:text-base
                            mobile-md:text-sm"
                        />
                    ))}
                </div>
            </div>
        </header>
    );
}

type BasicInfoProps = {
    title: string;
    titleStyles: string;
    content: string;
    contentStyles: string;
} & React.JSX.IntrinsicElements['section'];

function BasicInfo({ title, titleStyles, content, contentStyles, ...sectionProps }: BasicInfoProps) {
    return (
        <section {...sectionProps}>
            <h3 className={titleStyles}>{title}</h3>
            <p className={contentStyles}>{content}</p>
        </section>
    );
}
