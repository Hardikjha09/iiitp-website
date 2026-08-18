/**
 * careers.seed.ts — Seeds `careers` + `career_buttons` from src/data/careers.json
 *
 * Source JSON shape:
 *   { live: [ { title, buttons[], date, lastDate } ], past: [...] }
 * Each button: { label, file?, link? }
 */
import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';
import * as path from 'path';

const JSON_PATH = path.resolve(__dirname, '../../../../src/data/careers.json');

function parseDate(ddmmyyyy?: string): Date | undefined {
  if (!ddmmyyyy) return undefined;
  const parts = ddmmyyyy.split('-').map(Number);
  if (parts.length !== 3) return undefined;
  const [dd, mm, yyyy] = parts;
  return new Date(yyyy, mm - 1, dd);
}

type Button = { label: string; file?: string; link?: string };
type CareerItem = { title: string; buttons: Button[]; date?: string; lastDate?: string };
type CareersData = { live: CareerItem[]; past: CareerItem[] };

async function seedGroup(prisma: PrismaClient, items: CareerItem[], type: 'live' | 'past') {
  for (const item of items) {
    const career = await prisma.career.create({
      data: {
        title: item.title,
        career_type: type,
        post_date: parseDate(item.date),
        last_date: parseDate(item.lastDate),
        status: 'published',
        has_unpublished_draft: false,
      },
    });

    if (item.buttons?.length) {
      await prisma.careerButton.createMany({
        data: item.buttons.map((btn, idx) => ({
          career_id: career.id,
          label: btn.label,
          file_url: btn.file ?? null,
          url: btn.link ?? null,
          display_order: idx,
        })),
      });
    }
  }
}

export async function seed(prisma: PrismaClient) {
  const raw: CareersData = JSON.parse(fs.readFileSync(JSON_PATH, 'utf-8'));

  console.log(`  💼 Seeding ${raw.live.length} live + ${raw.past.length} past careers...`);
  await seedGroup(prisma, raw.live, 'live');
  await seedGroup(prisma, raw.past, 'past');
  console.log(`  ✅ Careers seeded`);
}
