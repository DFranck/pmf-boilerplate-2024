// types/next-auth.d.ts
import "next-auth";

declare module "next-auth" {
  /**
   * Ajoutez vos propres propriétés de session ici.
   */
  interface Session {
    user?: {
      username?: string;
    } & DefaultSession["user"];
  }
}
