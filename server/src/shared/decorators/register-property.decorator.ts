// Decorator to register class properties
export function RegisterProperty(target: any, propertyKey: string) {
    if (!target.constructor._registeredProperties) {
        target.constructor._registeredProperties = [];
    }
    target.constructor._registeredProperties.push(propertyKey);
}

// Utility function to get registered properties
export function getRegisteredProperties(target: any): string[] {
    return target._registeredProperties || [];
}
