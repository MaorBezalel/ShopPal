type IconMenuProps = {
    open?: boolean;
} & React.SVGProps<SVGSVGElement>;

export function IconMenu({ open = false, className, ...props }: IconMenuProps) {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            height="1em"
            width="1em"
            data-open={open}
            className={`${className} transition-transform duration-300 ease-in-out data-[open=true]:rotate-180`}
            {...props}
        >
            <path d="M7 10l5 5 5-5H7z" />
        </svg>
    );
}
