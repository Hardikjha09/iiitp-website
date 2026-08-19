/**
 * shortlistings.seed.ts — Seeds `shortlistings` + `shortlisted_candidates` from src/data/shortlistings.json
 *
 * Source JSON shape (three levels deep):
 * {
 *   "<category>": {
 *     title: "...",
 *     departments: {
 *       "<dept>": {
 *         pdf: "...",
 *         shortlisted: [ { sNo, formNo } ]
 *       }
 *     }
 *   }
 * }
 */
import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';
import * as path from 'path';

const JSON_PATH = path.resolve(__dirname, '../../../src/data/shortlistings.json');

export async function seed(prisma: PrismaClient) {
  const raw: Record<string, {
    title: string;
    departments: Record<string, {
      pdf?: string;
      shortlisted?: Array<{ sNo: string; formNo: string }>;
    }>;
  }> = JSON.parse(fs.readFileSync(JSON_PATH, 'utf-8'));

  let totalShortlistings = 0;
  let totalCandidates = 0;

  await prisma.shortlistedCandidate.deleteMany();
  await prisma.shortlisting.deleteMany();

  for (const [category, catData] of Object.entries(raw)) {
    for (const [dept, deptData] of Object.entries(catData.departments ?? {})) {
      const shortlisting = await prisma.shortlisting.create({
        data: {
          category,
          title: catData.title,
          department: dept,
          pdf_url: deptData.pdf ?? null,
          is_active: true,
        },
      });
      totalShortlistings++;

      const candidates = deptData.shortlisted ?? [];
      if (candidates.length) {
        await prisma.shortlistedCandidate.createMany({
          data: candidates.map((c, idx) => ({
            shortlisting_id: shortlisting.id,
            sno: c.sNo,
            form_no: c.formNo,
            display_order: idx,
          })),
        });
        totalCandidates += candidates.length;
      }
    }
  }

  console.log(`  📋 Shortlistings seeded: ${totalShortlistings} groups, ${totalCandidates} candidates`);
}
