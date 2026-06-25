export interface CreateNoteResponse {
  success: boolean;
  status: number;
  message: string;
  data: {
    id: string;
    title: string;
    description: string;
    completed: boolean;
    category: string;
    created_at: string;
    updated_at: string;
    user_id: string;
  };
}
