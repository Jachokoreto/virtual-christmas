export interface Decoration {
    id: string;
    type: 'bauble';
    position: [number, number, number];
    color: string;
    message: string;
    name: string;
    createdAt: number;
}

export type DecorationChoice = {
    type: Decoration["type"];
    label: string;
    color: string;
    icon?: any;
};
