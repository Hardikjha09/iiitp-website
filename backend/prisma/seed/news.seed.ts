/**
 * news.seed.ts — Seeds the `news` table from src/data/news.json
 *
 * Source JSON shape:  [ { id, title, date: "DD-MM-YYYY", excerpt, link } ]
 */
import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';
import * as path from 'path';

const JSON_PATH = path.resolve(__dirname, '../../../src/data/news.json');

function parseDate(ddmmyyyy: string): Date {
  const [dd, mm, yyyy] = ddmmyyyy.split('-').map(Number);
  return new Date(yyyy, mm - 1, dd);
}

export async function seed(prisma: PrismaClient) {
  const raw: Array<{
    id: number;
    title: string;
    date: string;
    excerpt: string;
    link: string;
  }> = JSON.parse(fs.readFileSync(JSON_PATH, 'utf-8'));

  console.log(`  📰 Seeding ${raw.length} news items...`);

  for (const item of raw) {
    const isFile = item.link?.startsWith('/');
    await prisma.news.upsert({
      where: { id: item.id },
      create: {
        id: item.id,
        title: item.title,
        excerpt: item.excerpt,
        news_date: parseDate(item.date),
        file_url: isFile ? item.link : null,
        link_url: !isFile ? item.link : null,
        status: 'published',
        has_unpublished_draft: false,
      },
      update: {},
    });
  }

  console.log(`  ✅ News seeded (${raw.length} records)`);
}
