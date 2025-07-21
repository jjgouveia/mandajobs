'use server';
/**
 * @fileOverview A LinkedIn boolean query generator AI agent.
 *
 * - generateLinkedInQuery - A function that handles the query generation process.
 * - GenerateLinkedInQueryInput - The input type for the generateLinkedInQuery function.
 * - GenerateLinkedInQueryOutput - The return type for the generateLinkedInQuery function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const GenerateLinkedInQueryInputSchema = z.object({
    keywords: z.string().describe('Comma separated keywords for job roles or technologies'),
});
export type GenerateLinkedInQueryInput = z.infer<typeof GenerateLinkedInQueryInputSchema>;

const GenerateLinkedInQueryOutputSchema = z.object({
    booleanQuery: z.string().describe('A boolean query optimized for LinkedIn job searches'),
});
export type GenerateLinkedInQueryOutput = z.infer<typeof GenerateLinkedInQueryOutputSchema>;

export async function generateLinkedInQuery(input: GenerateLinkedInQueryInput): Promise<GenerateLinkedInQueryOutput> {
    return generateLinkedInQueryFlow(input);
}

const prompt = ai.definePrompt({
    name: 'generateLinkedInQueryPrompt',
    input: { schema: GenerateLinkedInQueryInputSchema },
    output: { schema: GenerateLinkedInQueryOutputSchema },
    prompt: `Gere uma query booleana no estilo do LinkedIn usando os termos abaixo: {{{keywords}}}.\n\nUse os operadores AND, OR, NOT e parênteses. Otimize para uma busca eficiente no LinkedIn Jobs. Não explique o resultado. Apenas retorne a query.\n\nExemplo de saída:\n(backend AND python AND flask) AND remoto`,
});

const generateLinkedInQueryFlow = ai.defineFlow(
    {
        name: 'generateLinkedInQueryFlow',
        inputSchema: GenerateLinkedInQueryInputSchema,
        outputSchema: GenerateLinkedInQueryOutputSchema,
    },
    async input => {
        const { output } = await prompt(input);
        return output!;
    }
);
