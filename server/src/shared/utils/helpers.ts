import { getRegisteredProperties } from '../decorators';
import { NameDetails } from '../types/embedded-entites';

export class Transformer {
    static fromPGCompositeType<T>(data: string, fields: string[]): T {
        if (typeof data !== 'string') {
            throw new TypeError(`composite type didn't return as string`);
        }

        const values = data.replace('(', '').replace(')', '').split(',');
        const result = fields.reduce((acc, field, index) => {
            if (!isNaN(parseFloat(values[index]))) {
                acc[field] = parseFloat(values[index]);
            } else {
                acc[field] = values[index];
            }

            return acc;
        }, {} as any);
        return result as T;
    }

    static toPGCompositeType(data: Record<string, any>): string {
        const values = Object.values(data).filter((value) => value !== undefined);
        console.log(`in toPGCompositeType of NameDetails: ${values}`);
        console.log(`(${values.join(',')})`);
        return `(${values.join(',')})`;
    }
}
