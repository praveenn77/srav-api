import { getRsvps, saveRsvps } from './utils/blob.js';

export default async function handler(request) {
  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type'
      }
    });
  }

  try {
    const body = await request.json();
    const { name, email, attending, guests, dietary_restrictions } = body;

    if (!name || !email || attending === undefined) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), {
        status: 400,
        headers: { 
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      });
    }

    const rsvps = await getRsvps();
    const newRsvp = {
      id: Date.now().toString(),
      name,
      email,
      attending,
      guests: guests || 0,
      dietary_restrictions: dietary_restrictions || null,
      created_at: new Date().toISOString()
    };

    rsvps.push(newRsvp);
    await saveRsvps(rsvps);

    return new Response(JSON.stringify(newRsvp), {
      status: 201,
      headers: { 
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  } catch (error) {
    console.error('Error creating RSVP:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  }
}