ALTER TABLE "orders" ADD COLUMN "accounts" text;--> statement-breakpoint
ALTER TABLE "orders" ADD COLUMN "redeem_codes" text;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "avatar" text DEFAULT '/figmaAssets/profile.png';