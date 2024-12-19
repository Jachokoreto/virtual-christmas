export interface Decoration {
  id: string;
  type: string;
  position: [number, number, number];
  normal?: [number, number, number];
  message: string;
  name: string;
  createdAt: number;
  color?: any
}

export type DecorationChoice = {
  type: Decoration["type"];
  label: string;
  icon?: any;
};
