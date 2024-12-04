export interface Decoration {
  id: string;
  type: "bauble" | "star" | "lights";
  position: [number, number, number];
  color?: string;
  message?: string;
  createdAt: number;
}

export type DecorationChoice = {
  type: Decoration["type"];
  label: string;
  color: string;
  icon?: any;
};
