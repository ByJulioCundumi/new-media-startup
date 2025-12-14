export interface IUserState {
  id: string | null;
  email: string | null;
  userName: string | null;
  logged: boolean;
  favoriteTemplates?: string[];
}