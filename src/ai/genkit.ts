import { genkit } from 'genkit';
import { googleAI } from '@genkit-ai/googleai';

export const ai = genkit({
    plugins: [googleAI()],
    model: 'googleai/gemini-3.6-flash',
});
