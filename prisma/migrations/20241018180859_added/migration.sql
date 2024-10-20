-- AlterTable
ALTER TABLE "Interview" ADD COLUMN     "jobDescription" TEXT,
ADD COLUMN     "jobRole" TEXT,
ADD COLUMN     "yearOfExp" TEXT;

-- AlterTable
ALTER TABLE "Question" ADD COLUMN     "concept" TEXT,
ADD COLUMN     "difficulty" TEXT;
