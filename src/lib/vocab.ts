export type Inflection = {
    [key: string]: any
};

export type Vocab = {
    id: string;
    vocabulary: string;
    meaning: string;
    type: string;
    createAt: number;
    inflection?: Inflection;
    example: string[];
    revision:number
};
