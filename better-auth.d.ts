import "better-auth";
import "@better-auth/core/db";

declare module "better-auth" {
  interface User {
    membershipTier?: "A" | "B" | "C";
  }
}

declare module "@better-auth/core/db" {
  interface User {
    membershipTier?: "A" | "B" | "C";
  }
}
