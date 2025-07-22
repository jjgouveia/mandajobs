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
    title: z.string().describe('Your job title'),
    tools: z.string().describe('Your tools'),
    toolsIdontUse: z.string().describe('Your tools you don\'t use'),
    level: z.string().describe('Your level'),
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
    prompt: `Create a query for I use in linkedin searchbar. Use the operators AND, OR, NOT e () for that. Just give me the code, without explanation.
  I'm a {{title}} professional that uses {{tools}} and don't work with {{toolsIdontUse}}. I'm {{level}} professional.
  `,
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
