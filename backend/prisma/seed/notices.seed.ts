/**
 * notices.seed.ts — Seeds the `notices` table from src/data/notices.json
 *
 * Source JSON shape:  [ { id, title, date: "DD-MM-YYYY", category, link } ]
 * Mapping:
 *   date  → notice_date (parsed from DD-MM-YYYY)
 *   link  → file_url if starts with '/', else link_url
 *   All seeded records get status='published' (they were live on the public site)
 */
import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';
import * as path from 'path';

const JSON_PATH = path.resolve(__dirname, '../../../src/data/notices.json');

function parseDate(ddmmyyyy: string): Date {
  const [dd, mm, yyyy] = ddmmyyyy.split('-').map(Number);
  return new Date(yyyy, mm - 1, dd);
}

export async function seed(prisma: PrismaClient) {
  const raw: Array<{
    id: number;
    title: string;
    date: string;
    category: string;
    link: string;
  }> = JSON.parse(fs.readFileSync(JSON_PATH, 'utf-8'));

  console.log(`  📋 Seeding ${raw.length} notices...`);

  for (const item of raw) {
    const isFile = item.link?.startsWith('/');
    await prisma.notice.upsert({
      where: { id: item.id },
      create: {
        id: item.id,
        title: item.title,
        category: item.category,
        notice_date: parseDate(item.date),
        file_url: isFile ? item.link : null,
        link_url: !isFile ? item.link : null,
        status: 'published',
        has_unpublished_draft: false,
      },
      update: {}, // don't overwrite existing records on re-run
    });
  }

  console.log(`  ✅ Notices seeded (${raw.length} records)`);
}
