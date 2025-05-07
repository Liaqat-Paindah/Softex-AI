import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { prompt } = await req.json();

  try {
    const response = await axios.post(
      'https://api.together.xyz/v1/chat/completions', // API endpoint for completions
      {
        model: 'meta-llama/Llama-3.3-70B-Instruct-Turbo-Free', // Replace with the valid model name from the docs
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 500,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.TOGETHER_API_KEY}`, // Your API Key from .env.local
          'Content-Type': 'application/json',
        },
      }
    );

    return NextResponse.json(response.data); // Send the response back to the client
  } catch (error: any) {
    console.error(error.response?.data || error.message); // Log any errors for debugging
    return NextResponse.json(
      { error: error.response?.data || error.message }, // Return error message
      { status: 500 }
    );
  }
}
