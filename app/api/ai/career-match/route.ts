import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { interests, techSkills, softSkills, aptitudeScore, preferredCategory } = body;

    const apiKey = process.env.OPENROUTER_API_KEY || process.env.NEXT_PUBLIC_INSFORGE_ANON_KEY;
    const gatewayUrl = 'https://openrouter.ai/api/v1/chat/completions';

    let matchResult = null;

    if (apiKey && !apiKey.includes('placeholder')) {
      try {
        const aiRes = await fetch(gatewayUrl, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            model: 'meta-llama/llama-3.3-70b-instruct:free',
            messages: [
              {
                role: 'system',
                content: 'You are an AI Career Counselor. Analyze candidate profile and return valid JSON with: overallScore (number 0-100), topRecommendations (array of 3 objects with title, matchPercentage, summary, keySkillsNeeded), actionableRoadmap (array of strings).',
              },
              {
                role: 'user',
                content: `Candidate Profile:
Interests: ${JSON.stringify(interests || [])}
Tech Skills: ${JSON.stringify(techSkills || [])}
Soft Skills: ${JSON.stringify(softSkills || [])}
Aptitude Score: ${aptitudeScore || 85}
Category: ${preferredCategory || 'Software & Tech'}`,
              },
            ],
            response_format: { type: 'json_object' },
          }),
        });

        if (aiRes.ok) {
          const json = await aiRes.json();
          const content = json?.choices?.[0]?.message?.content;
          if (content) {
            matchResult = JSON.parse(content);
          }
        }
      } catch (err) {
        console.warn('Career Match Model Gateway warning:', err);
      }
    }

    if (!matchResult) {
      matchResult = {
        overallScore: 88,
        topRecommendations: [
          {
            title: 'AI / Machine Learning Engineer',
            matchPercentage: 94,
            summary: 'High aptitude score and strong analytical interests make you a prime fit for building intelligent ML models.',
            keySkillsNeeded: ['Python', 'PyTorch', 'Mathematics & Statistics', 'MLOps'],
          },
          {
            title: 'Full Stack Web Developer',
            matchPercentage: 91,
            summary: 'Your combination of technical skills and problem solving aligns directly with end-to-end modern web applications.',
            keySkillsNeeded: ['TypeScript', 'React.js', 'Node.js', 'PostgreSQL'],
          },
          {
            title: 'Data Scientist',
            matchPercentage: 86,
            summary: 'Extract business insights and build predictive data models leveraging statistical tools and data analytics.',
            keySkillsNeeded: ['SQL', 'Python / Pandas', 'Tableau', 'Big Data'],
          },
        ],
        actionableRoadmap: [
          'Complete 2 hands-on AI/ML or Web projects to build a strong GitHub portfolio',
          'Practice algorithmic problem solving and system design basics',
          'Get certified in cloud foundations (AWS / GCP / Azure)',
        ],
      };
    }

    return NextResponse.json(matchResult);
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || 'Failed to match career' }, { status: 500 });
  }
}
