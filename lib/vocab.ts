export type Inflection = {
    [key: string]: any
};

export type Vocab = {
    id: string | null;
    vocabulary: string;
    meaning: string;
    type: string;
    createAt: number;
    inflection?: Inflection;
    example: string[]
};
