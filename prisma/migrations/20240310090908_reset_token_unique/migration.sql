-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "isVerified" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "verificationToken" TEXT,
    "verificationTokenExpires" DATETIME,
    "resetToken" TEXT,
    "resetTokenExpires" DATETIME
);
INSERT INTO "new_User" ("createdAt", "email", "id", "isVerified", "password", "resetToken", "resetTokenExpires", "updatedAt", "username", "verificationToken", "verificationTokenExpires") SELECT "createdAt", "email", "id", "isVerified", "password", "resetToken", "resetTokenExpires", "updatedAt", "username", "verificationToken", "verificationTokenExpires" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
CREATE UNIQUE INDEX "User_verificationToken_key" ON "User"("verificationToken");
CREATE UNIQUE INDEX "User_resetToken_key" ON "User"("resetToken");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
