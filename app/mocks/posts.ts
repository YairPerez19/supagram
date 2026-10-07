export interface Post {
  id: number | string;
  user: {
    username: string;
    avatar: string | null;
  } | null;
  image_url: string;
  caption: string;
  likes: number;
  isLiked: boolean;
  created_at: Date | string;
  updated_at?: Date | string;
}
