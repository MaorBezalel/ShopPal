import React, { useState, ReactElement, cloneElement } from 'react';

type AccordionProps = {
    children: React.ReactNode;
    accordionButton: ReactElement | ((isOpen: boolean) => ReactElement);
    accordionStyles?: string;
    isOpen?: boolean;
    onToggle?: (isOpen: boolean) => void;
};

export default function Accordion({
    children,
    isOpen: controlledIsOpen,
    onToggle,
    accordionStyles = '',
    accordionButton,
}: AccordionProps) {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const isControlled = controlledIsOpen !== undefined;
    const currentIsOpen = isControlled ? controlledIsOpen : isOpen;

    const handleToggle = () => {
        if (isControlled) {
            onToggle && onToggle(!controlledIsOpen);
        } else {
            setIsOpen((prev) => {
                onToggle?.(!prev);
                return !prev;
            });
        }
    };

    const buttonToRender = () => {
        const additionalProps = {
            onClick: handleToggle,
            'aria-expanded': currentIsOpen,
        };

        return typeof accordionButton === 'function'
            ? cloneElement(accordionButton(currentIsOpen), additionalProps)
            : cloneElement(accordionButton, additionalProps);
    };

    return (
        <div className={accordionStyles}>
            {/* Accordion Button */}
            {buttonToRender()}

            {/*  Accordion Content */}
            <div
                className={`grid overflow-hidden transition-all duration-300 ease-in-out ${
                    currentIsOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                }`}
                aria-hidden={!currentIsOpen}
            >
                <div className="overflow-hidden">{children}</div>
            </div>
        </div>
    );
}
