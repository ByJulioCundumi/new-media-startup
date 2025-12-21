export interface IUserState {
  id: string | null;
  email: string | null;
  userName: string | null;
  logged: boolean;
  favoriteTemplates?: string[];
  affiliateCommission: number;
  subscriptionPlan: "FREE" | "MONTHLY" | "ANNUAL";
  subscriptionStatus?: "ACTIVE" | "CANCELED" | "DELAYED" | null;
  subscriptionExpiresAt?: string | null; // ISO string
  role: "USER" | "ADMIN"
}