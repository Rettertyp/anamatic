export function apiInterfaces(): string {
    return 'api-interfaces';
}

export type wordAnswer = {
    wordExists: boolean;
    points?: number;
};

export type awakeAnswer = {
    awake: boolean;
};
