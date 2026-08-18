/**
 * etenders.seed.ts — Seeds `etenders` from src/data/etenders.json
 *
 * Source JSON shape:
 *   { live: [ { title, tenderNumber, fileUrl, corrigendumUrl, submissionDate } ], past: [...] }
 *
 * NOTE: submissionDate kept as TEXT — format varies across entries ("25-08-2026, 19:00" vs "16-07-2026 - 11:30")
 */
import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';
import * as path from 'path';

const JSON_PATH = path.resolve(__dirname, '../../../../src/data/etenders.json');

type TenderItem = {
  title: string;
  tenderNumber?: string;
  fileUrl?: string;
  corrigendumUrl?: string;
  submissionDate?: string;
};
type EtendersData = { live: TenderItem[]; past: TenderItem[] };

async function seedGroup(prisma: PrismaClient, items: TenderItem[], type: 'live' | 'past') {
  for (const item of items) {
    await prisma.etender.create({
      data: {
        title: item.title,
        tender_number: item.tenderNumber ?? null,
        tender_type: type,
        file_url: item.fileUrl || null,
        corrigendum_url: item.corrigendumUrl || null,
        submission_date: item.submissionDate ?? null,
        status: 'published',
        has_unpublished_draft: false,
      },
    });
  }
}

export async function seed(prisma: PrismaClient) {
  const raw: EtendersData = JSON.parse(fs.readFileSync(JSON_PATH, 'utf-8'));

  console.log(`  📄 Seeding ${raw.live.length} live + ${raw.past.length} past tenders...`);
  await seedGroup(prisma, raw.live, 'live');
  await seedGroup(prisma, raw.past, 'past');
  console.log(`  ✅ E-Tenders seeded`);
}
