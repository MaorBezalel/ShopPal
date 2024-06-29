import { Class } from '@/shared/types/utils.types';

/**
 * Helper class for transforming data from and to Postgres composite types
 */
export class PGDataTransformer {
    /**
     * Transforms data from Postgres composite type to a class instance (Embedded Entity)
     *
     * @template TEmbeddedEntity - Embedded Entity class type (e.g. Address, NameDetails, etc.)
     * @param toClass - class to transform data to
     * @returns - function that transforms data from Postgres composite type to a class instance
     */
    static fromPGCompositeType<TEmbeddedEntity extends object>(toClass: Class<TEmbeddedEntity>): (value: any) => any {
        const instance = new toClass();
        const fields = Object.keys(instance);

        return (dataFromPG: string) => {
            const values = dataFromPG.replace('(', '').replace(')', '').split(',');
            const result = fields.reduce((acc, field, index) => {
                if (!isNaN(parseFloat(values[index]))) {
                    acc[field] = parseFloat(values[index]);
                } else {
                    acc[field] = values[index];
                }

                return acc;
            }, {} as any);

            return result as TEmbeddedEntity;
        };
    }

    /**
     * Transforms data from class instance (Embedded Entity) to Postgres composite type
     *
     * @template TEmbeddedEntity - Embedded Entity class type (e.g. Address, NameDetails, etc.)
     * @param fromClass - class to transform data from
     * @returns - function that transforms data from class instance to Postgres composite type
     */
    static toPGCompositeType<TEmbeddedEntity extends object>(fromClass: Class<TEmbeddedEntity>): (value: any) => any {
        return (data: new () => any) => {
            const values = Object.values(data).filter((value) => value !== undefined);
            return `(${values.join(',')})`;
        };
    }
}
