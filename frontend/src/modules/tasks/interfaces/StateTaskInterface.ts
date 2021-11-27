export default interface StateTaskInterface {
  id: number;
  description: string;
  completed: boolean;
  createdAt: Date;
  updatedAt?: Date;
  historiesTask?: {
    id: number;
    description: string;
    createdAt: Date;
  }[];
}
