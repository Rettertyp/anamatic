export type dwdsWordbankAnswer = {
    input: string;
    wortart: string;
    lemma: string;
    url: string;
};

export type dwdsFrequencyAnswer = {
    hits: number;
    q: string;
    total: string;
    frequency: number;
};
