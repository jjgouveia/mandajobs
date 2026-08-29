'use server';
/**
 * @fileOverview A LinkedIn boolean query generator AI agent.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { normalizeQueryVariants } from '@/lib/parse-query-variants';

const GenerateLinkedInQueryInputSchema = z.object({
  title: z.string().describe('Your job title'),
  tools: z.string().describe('Your tools'),
  toolsIdontUse: z.string().describe("Your tools you don't use"),
  level: z.string().describe('Your level'),
  workMode: z.string().optional().describe('Work mode: remoto, hibrido, presencial, or any'),
  language: z.string().optional().describe('Job language preference: pt, en, or both'),
  location: z.string().optional().describe('Preferred location city or region'),
});
export type GenerateLinkedInQueryInput = z.infer<typeof GenerateLinkedInQueryInputSchema>;

const GenerateLinkedInQueryOutputSchema = z.object({
  variants: z
    .array(z.string())
    .min(1)
    .max(2)
    .describe('One or two LinkedIn boolean search queries without numbering'),
});
export type GenerateLinkedInQueryOutput = z.infer<typeof GenerateLinkedInQueryOutputSchema>;

export async function generateLinkedInQuery(
  input: GenerateLinkedInQueryInput
): Promise<GenerateLinkedInQueryOutput> {
  return generateLinkedInQueryFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateLinkedInQueryPrompt',
  input: { schema: GenerateLinkedInQueryInputSchema },
  output: { schema: GenerateLinkedInQueryOutputSchema },
  prompt: `Create LinkedIn job search boolean queries. Use operators AND, OR, NOT and ().
Return ONLY structured output with 1 or 2 query strings in "variants" (no numbering, no explanation).

I'm a {{title}} professional that uses {{tools}}. I'm {{level}} professional.
Tools I don't use: {{toolsIdontUse}}
Work mode preference: {{workMode}}
Language preference: {{language}}
Location preference: {{location}}

Rules:
- Include the job title and seniority level in each query.
- Include the technologies from {{tools}} with OR between them.
- If toolsIdontUse is not empty, exclude every listed technology using NOT (example: NOT php AND NOT ruby).
- Prefer ONE strong query. Only add a second variant when it is meaningfully different (e.g. broader vs narrower title set, OR a different tech grouping). Do NOT return two queries that only swap a couple of job-title synonyms while keeping the same seniority, stack and work-mode clauses.
- If a second variant would be nearly identical, return a single variant.
- Keep queries concise: avoid stacking many near-synonyms for the same concept when 2–3 terms suffice.
- If workMode is "remoto", include (remote OR remoto OR "trabalho remoto").
- If workMode is "hibrido", include (hybrid OR híbrido OR hibrido).
- If workMode is "presencial", include (presencial OR on-site OR "on site") and avoid remote-only phrasing.
- If workMode is "any" or empty, do not force a work-mode term.
- If language is "pt", bias toward Portuguese job titles/terms; if "en", toward English; if "both" or empty, mix when useful.
- If location is not empty, include that location (or common synonyms) in the query.
`,
});

const generateLinkedInQueryFlow = ai.defineFlow(
  {
    name: 'generateLinkedInQueryFlow',
    inputSchema: GenerateLinkedInQueryInputSchema,
    outputSchema: GenerateLinkedInQueryOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);

    if (output?.variants?.length) {
      return { variants: output.variants };
    }

    const fallbackRaw =
      typeof output === 'object' && output !== null
        ? JSON.stringify(output)
        : String(output ?? '');
    const parsed = normalizeQueryVariants(undefined, fallbackRaw);
    if (parsed.variants.length === 0) {
      throw new Error('A IA não retornou uma consulta válida');
    }
    return { variants: parsed.variants };
  }
);
