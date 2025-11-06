import { NextRequest, NextResponse } from "next/server";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.COCKROACH_CONNECTION_STRING,
});

export async function POST(request: NextRequest) {
  try {
    const { name, responses, cookieId } = await request.json();

    if (!responses || !cookieId) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const client = await pool.connect();
    try {
      const result = await client.query(
        `INSERT INTO assessment_responses (name, responses, cookie_id)
         VALUES ($1, $2, $3)
         RETURNING id, submitted_at`,
        [name || null, JSON.stringify(responses), cookieId]
      );

      return NextResponse.json(
        {
          success: true,
          id: result.rows[0].id,
          submitted_at: result.rows[0].submitted_at,
        },
        { status: 201 }
      );
    } finally {
      client.release();
    }
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      { error: "Failed to submit response" },
      { status: 500 }
    );
  }
}

