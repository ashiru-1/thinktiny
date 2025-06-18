import { NextRequest, NextResponse } from 'next/server';

// Demo explanations for when AI services aren't available
const getDemoExplanations = (topic: string) => ({
  child: `Imagine ${topic} is like a big puzzle! Just like how you put together toy blocks to make something cool, ${topic} is about putting together different pieces to understand something important. It's like learning how your favorite game works - at first it seems complicated, but once you understand the rules, it becomes fun!`,
  teen: `${topic} is a fascinating subject that combines several important concepts. Think of it like learning a new language or mastering a complex video game. You start with the basics, then gradually learn more advanced techniques. ${topic} involves understanding how different parts work together, similar to how a computer program or a scientific experiment has many steps that all need to work correctly.`,
  expert: `${topic} represents a sophisticated interdisciplinary field that encompasses multiple theoretical frameworks and practical applications. It involves complex mathematical models, advanced computational algorithms, and deep theoretical understanding of underlying principles. The field has evolved significantly over recent decades, incorporating cutting-edge research methodologies and state-of-the-art technologies. Current applications span various domains including but not limited to scientific research, industrial processes, and technological innovation.`
});

// Try Hugging Face Inference API (free tier available)
const tryHuggingFace = async (topic: string) => {
  try {
    const prompt = `Please explain "${topic}" at three different levels of complexity:

1. **5-Year-Old Level**: Use simple words, fun analogies, and avoid complex concepts. Keep it engaging and easy to understand for a young child.

2. **15-Year-Old Level**: Include more details, real-world examples, and some technical terms. Make it educational but accessible to a teenager.

3. **Expert Level**: Provide comprehensive coverage with technical terminology, detailed explanations, and professional depth.

Please format your response as:
CHILD: [5-year-old explanation]
TEEN: [15-year-old explanation]
EXPERT: [expert explanation]

Keep each explanation concise but informative.`;

    const response = await fetch(
      "https://api-inference.huggingface.co/models/microsoft/DialoGPT-medium",
      {
        headers: {
          Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY || 'hf_demo'}`,
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({ inputs: prompt }),
      }
    );

    if (response.ok) {
      const data = await response.json();
      const aiResponse = data[0]?.generated_text || '';
      
      // Parse the response to extract the three explanations
      const childMatch = aiResponse.match(/CHILD:\s*(.*?)(?=\nTEEN:|$)/s);
      const teenMatch = aiResponse.match(/TEEN:\s*(.*?)(?=\nEXPERT:|$)/s);
      const expertMatch = aiResponse.match(/EXPERT:\s*(.*?)(?=\n|$)/s);

      return {
        child: childMatch?.[1]?.trim() || 'Unable to generate child-level explanation.',
        teen: teenMatch?.[1]?.trim() || 'Unable to generate teen-level explanation.',
        expert: expertMatch?.[1]?.trim() || 'Unable to generate expert-level explanation.',
      };
    }
  } catch (error) {
    console.log('Hugging Face API not available');
  }
  return null;
};

// Try Ollama (local only)
const tryOllama = async (topic: string) => {
  try {
    const prompt = `Please explain "${topic}" at three different levels of complexity:\n\n1. **5-Year-Old Level**: Use simple words, fun analogies, and avoid complex concepts. Keep it engaging and easy to understand for a young child.\n\n2. **15-Year-Old Level**: Include more details, real-world examples, and some technical terms. Make it educational but accessible to a teenager.\n\n3. **Expert Level**: Provide comprehensive coverage with technical terminology, detailed explanations, and professional depth.\n\nPlease format your response as:\nCHILD: [5-year-old explanation]\nTEEN: [15-year-old explanation]\nEXPERT: [expert explanation]\n\nKeep each explanation concise but informative.`;

    const ollamaResponse = await fetch('http://localhost:11434/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'llama3',
        prompt,
        stream: false
      })
    });

    if (ollamaResponse.ok) {
      const data = await ollamaResponse.json();
      const response = data.response || '';

      // Parse the response to extract the three explanations
      const childMatch = response.match(/CHILD:\s*(.*?)(?=\nTEEN:|$)/s);
      const teenMatch = response.match(/TEEN:\s*(.*?)(?=\nEXPERT:|$)/s);
      const expertMatch = response.match(/EXPERT:\s*(.*?)(?=\n|$)/s);

      return {
        child: childMatch?.[1]?.trim() || 'Unable to generate child-level explanation.',
        teen: teenMatch?.[1]?.trim() || 'Unable to generate teen-level explanation.',
        expert: expertMatch?.[1]?.trim() || 'Unable to generate expert-level explanation.',
      };
    }
  } catch (ollamaError) {
    console.log('Ollama not available');
  }
  return null;
};

export async function POST(request: NextRequest) {
  try {
    const { topic } = await request.json();

    if (!topic) {
      return NextResponse.json(
        { error: 'Topic is required' },
        { status: 400 }
      );
    }

    // Try AI services in order of preference
    let explanations = null;
    
    // 1. Try Ollama (local development)
    explanations = await tryOllama(topic);
    
    // 2. Try Hugging Face (works on Vercel)
    if (!explanations) {
      explanations = await tryHuggingFace(topic);
    }

    // 3. Fallback to demo explanations
    if (!explanations) {
      const demoExplanations = getDemoExplanations(topic);
      explanations = {
        child: demoExplanations.child,
        teen: demoExplanations.teen,
        expert: demoExplanations.expert,
      };
    }

    return NextResponse.json(explanations);

  } catch (error) {
    console.error('Error generating explanations:', error);
    return NextResponse.json(
      { error: 'Failed to generate explanations' },
      { status: 500 }
    );
  }
} 