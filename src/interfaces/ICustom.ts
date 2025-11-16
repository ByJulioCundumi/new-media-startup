export interface ICustomItem {
  id: string;
  content: string;
}

export interface ICustomEntry {
  title: string;
  items: ICustomItem[];
}
