export interface PostResponse {
   id: number;
   title: string;
   description: string;
}

export interface PostRequest extends Omit<PostResponse, 'id'> {}
