/**
 * SEED INDEX — runs all seed scripts sequentially in dependency order.
 *
 * Run: npm run db:seed
 *      (or: ts-node --project tsconfig.json prisma/seed/index.ts)
 *
 * Each seed module exports a named `seed(prisma)` function.
 * This orchestrator passes a shared PrismaClient so connections are not multiplied,
 * and awaits each seeder to completion before starting the next — ensuring correct order.
 */
import { PrismaClient } from '@prisma/client';

import { seed as seedNotices } from './notices.seed';
import { seed as seedNews } from './news.seed';
import { seed as seedCareers } from './careers.seed';
import { seed as seedEtenders } from './etenders.seed';
import { seed as seedFaculty } from './faculty.seed';
import { seed as seedAlumni } from './alumni.seed';
import { seed as seedStaff } from './non_teaching_staff.seed';
import { seed as seedScholarships } from './scholarships.seed';
import { seed as seedMous } from './mous.seed';
import { seed as seedShortlistings } from './shortlistings.seed';
import { seed as seedPress } from './press.seed';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...\n');

  // Run in dependency order — content tables first, then supplementary
  await seedNotices(prisma);
  await seedNews(prisma);
  await seedCareers(prisma);
  await seedEtenders(prisma);
  await seedFaculty(prisma);
  await seedAlumni(prisma);
  await seedStaff(prisma);
  await seedScholarships(prisma);
  await seedMous(prisma);
  await seedShortlistings(prisma);
  await seedPress(prisma);

  console.log('\n✅ All seed scripts complete.');
}

main()
  .catch((e) => {
    console.error('\n❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
