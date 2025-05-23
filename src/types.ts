export const JOKER_SYMBOLS = ['♣️', '♥️', '♠️', '♦️'] as const;

export type Team = {
    id: number;
    name: string;
    score: number;
};

export type Player = {
    name: string;
};