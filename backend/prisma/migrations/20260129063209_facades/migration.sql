-- CreateTable
CREATE TABLE "Facade" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "KitchenFacade" (
    "kitchenId" INTEGER NOT NULL,
    "facadeId" INTEGER NOT NULL,

    PRIMARY KEY ("kitchenId", "facadeId"),
    CONSTRAINT "KitchenFacade_kitchenId_fkey" FOREIGN KEY ("kitchenId") REFERENCES "Kitchen" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "KitchenFacade_facadeId_fkey" FOREIGN KEY ("facadeId") REFERENCES "Facade" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Facade_name_key" ON "Facade"("name");
