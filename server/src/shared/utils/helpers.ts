type ClassConstructor = new () => any;

export class PGDataTransformer {
    static fromPGCompositeType(toEmbeddedEntity: ClassConstructor): (value: any) => any {
        const instance = new toEmbeddedEntity();
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

            return result as typeof toEmbeddedEntity;
        };
    }

    static toPGCompositeType(fromEmbeddedEntity: ClassConstructor): (value: any) => any {
        return (data: new () => any) => {
            const values = Object.values(data).filter((value) => value !== undefined);
            return `(${values.join(',')})`;
        };
    }
}
