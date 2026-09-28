import { callOpenRouter, OpenRouterError } from './openrouter';
import { promptBuilders } from './prompts';
import { parseAIResponse, AIParseError } from './parser';
import { validators, AIValidationError } from './validator';
import { generateFallbackAIResponse } from './fallback';

export { OpenRouterError, AIParseError, AIValidationError };

export async function generateAIResponse({ feature, input, maxTokens = 1200, temperature = 0.5 }) {
    const buildPrompt = promptBuilders[feature];
    const validate = validators[feature];

    if (!buildPrompt || !validate) {
        throw new AIValidationError(`Unknown AI feature "${feature}".`);
    }

    // If OpenRouter API Key is missing, return smart fallback AI response directly
    if (!process.env.OPENROUTER_API_KEY) {
        const fallback = generateFallbackAIResponse({ feature, input });
        return validate(fallback);
    }

    try {
        const { system, user } = buildPrompt(input || {});

        const raw = await callOpenRouter({
            messages: [
                { role: 'system', content: system },
                { role: 'user', content: user },
            ],
            temperature,
            maxTokens,
            responseFormat: true,
        });

        const parsed = parseAIResponse(raw);
        return validate(parsed);
    } catch (err) {
        console.warn(`OpenRouter AI call failed for feature "${feature}", serving fallback response:`, err.message);
        const fallback = generateFallbackAIResponse({ feature, input });
        return validate(fallback);
    }
}
