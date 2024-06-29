import { Class } from '@/shared/types/utils.types';

export class PGDataTransformer {
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

    static toPGCompositeType<TEmbeddedEntity extends object>(fromClass: Class<TEmbeddedEntity>): (value: any) => any {
        return (data: new () => any) => {
            const values = Object.values(data).filter((value) => value !== undefined);
            return `(${values.join(',')})`;
        };
    }
}
