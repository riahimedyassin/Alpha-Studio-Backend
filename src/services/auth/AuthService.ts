
export interface AuthService {
  generateToken(id: number): string;
  verifyToken(token: string): number;
  existEntity(id: string , entity : 'Admin' | 'Client') : Promise<boolean>
}
