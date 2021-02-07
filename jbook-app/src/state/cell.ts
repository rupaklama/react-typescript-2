// type alias to define values in one place rather than same duplicate values all over
export type CellTypes = 'code' | 'text';

export interface Cell {
  id: string;
  type: CellTypes;
  content: string;
}
