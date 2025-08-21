export interface INote extends Document {
  title: string;
  content: string;
  user: string; // Reference to the user who created the note
  createdAt: Date;
  updatedAt: Date;
}
