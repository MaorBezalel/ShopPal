import type { Nullable } from '@/shared/types/utils.types';

export class Dimension {
    width: Nullable<number>;
    height: Nullable<number>;
    depth: Nullable<number>;
    weight: Nullable<number>;

    constructor() {
        this.width = null;
        this.height = null;
        this.depth = null;
        this.weight = null;
    }
}
