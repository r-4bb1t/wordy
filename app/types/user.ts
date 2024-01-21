export interface UserType {
  id: string;
  email: string | null;
  username: string | null;
  image: string | null;
  provider: string;
  role: string;
  words: string[];
}
