const ExclamationIcon = ({ className = '' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${className}`} viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10" fill="red" />
        <path fill="white" d="M12 8v4m0 4h.01" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
    </svg>
);

export default ExclamationIcon;