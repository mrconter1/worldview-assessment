import { NextResponse } from "next/server";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.COCKROACH_CONNECTION_STRING,
});

export async function GET() {
  try {
    const client = await pool.connect();
    try {
      const result = await client.query(
        `SELECT responses FROM assessment_responses WHERE responses IS NOT NULL`
      );

      if (result.rows.length === 0) {
        return NextResponse.json({
          totalSubmissions: 0,
          questions: [],
        });
      }

      const responses = result.rows.map((row) => row.responses);

      // Initialize question statistics
      const questionStats = Array(32)
        .fill(null)
        .map(() => ({
          responses: [],
          mean: 0,
          stdDev: 0,
          min: 0,
          max: 0,
          distribution: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
        }));

      // Collect all responses per question
      responses.forEach((responseArray) => {
        responseArray.forEach((value, index) => {
          if (value !== null && questionStats[index]) {
            questionStats[index].responses.push(value);
            questionStats[index].distribution[value]++;
          }
        });
      });

      // Calculate statistics for each question
      questionStats.forEach((stats) => {
        if (stats.responses.length === 0) return;

        const values = stats.responses;
        const n = values.length;

        // Mean
        const mean = values.reduce((a, b) => a + b, 0) / n;
        stats.mean = mean;

        // Standard Deviation
        const variance =
          values.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / n;
        stats.stdDev = Math.sqrt(variance);

        // Min and Max
        stats.min = Math.min(...values);
        stats.max = Math.max(...values);
      });

      return NextResponse.json({
        totalSubmissions: result.rows.length,
        questions: questionStats,
      });
    } finally {
      client.release();
    }
  } catch (error) {
    console.error("Stats error:", error);
    return NextResponse.json(
      { error: "Failed to fetch statistics" },
      { status: 500 }
    );
  }
}

