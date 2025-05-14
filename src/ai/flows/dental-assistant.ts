// 'use server';
/**
 * @fileOverview A dental AI assistant.
 *
 * - dentalAssistant - A function that handles the dental assistant process.
 * - DentalAssistantInput - The input type for the dentalAssistant function.
 * - DentalAssistantOutput - The return type for the dentalAssistant function.
 */

'use server';

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const DentalAssistantInputSchema = z.object({
  question: z.string().describe('The question about dental procedures and treatments.'),
});
export type DentalAssistantInput = z.infer<typeof DentalAssistantInputSchema>;

const DentalAssistantOutputSchema = z.object({
  answer: z.string().describe('The answer to the question about dental procedures and treatments.'),
});
export type DentalAssistantOutput = z.infer<typeof DentalAssistantOutputSchema>;

export async function dentalAssistant(input: DentalAssistantInput): Promise<DentalAssistantOutput> {
  return dentalAssistantFlow(input);
}

const dentalAssistantPrompt = ai.definePrompt({
  name: 'dentalAssistantPrompt',
  input: {schema: DentalAssistantInputSchema},
  output: {schema: DentalAssistantOutputSchema},
  prompt: `You are a helpful AI dental assistant. Answer the following question about dental procedures and treatments:

Question: {{{question}}}`,
});

const dentalAssistantFlow = ai.defineFlow(
  {
    name: 'dentalAssistantFlow',
    inputSchema: DentalAssistantInputSchema,
    outputSchema: DentalAssistantOutputSchema,
  },
  async input => {
    const {output} = await dentalAssistantPrompt(input);
    return output!;
  }
);
