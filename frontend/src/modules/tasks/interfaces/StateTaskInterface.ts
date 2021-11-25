export default interface StateTaskInterface {
  id: number;
  description: string;
  completed: boolean;
  created_at: Date;
  updated_at?: Date;
}
