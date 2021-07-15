-- CreateTable
CREATE TABLE "_FollowingRelation" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_FollowingRelation_AB_unique" ON "_FollowingRelation"("A", "B");

-- CreateIndex
CREATE INDEX "_FollowingRelation_B_index" ON "_FollowingRelation"("B");

-- AddForeignKey
ALTER TABLE "_FollowingRelation" ADD FOREIGN KEY ("A") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FollowingRelation" ADD FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
