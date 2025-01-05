import type { RequestHandler } from '@sveltejs/kit';
import { query } from '$lib/database';

export const GET: RequestHandler = async () => {
  try {
    // A trivial SELECT to ensure queries work
    const rows = await query('SELECT 1 + 1 AS result');

    // Expect something like [ { result: 2 } ]
    return new Response(JSON.stringify(rows), {
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (err) {
    console.error('DB Error:', err);
    return new Response(
      JSON.stringify({ error: 'Database query failed' }),
      { status: 500 }
    );
  }
};
