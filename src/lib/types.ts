export interface AuthContextType {
  accessToken: string | null;
  user: object | null;
  login: ({
    user,
    accessToken,
  }: {
    user: object;
    accessToken: string;
  }) => void;
  logout: () => void;
}