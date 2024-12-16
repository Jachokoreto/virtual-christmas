export interface OrnamentProps {
  id: string;
  scale: number;
  position: [number, number, number];
  normal?: [number, number, number];
  onVisible?: () => void;
  onHidden?: () => void;
  onClick?: () => void;
}
