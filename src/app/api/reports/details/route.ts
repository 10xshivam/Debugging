import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(req: NextRequest) {
  try {
    // Extract `reportId` from query parameters
    const { searchParams } = new URL(req.url); // Parse the request URL
    const reportId = searchParams.get('reportId'); // Get the `reportId` from the query

    // Validate `reportId`
    if (!reportId) {
      return NextResponse.json(
        { error: 'Report ID is required' },
        { status: 400 }
      );
    }

    // Fetch the report from the database using Prisma
    const report = await prisma.report.findUnique({
      where: { reportId },
    });

    // Handle the case where the report is not found
    if (!report) {
      return NextResponse.json(
        { error: 'Report not found' },
        { status: 404 }
      );
    }

    // Return the report as JSON
    return NextResponse.json(report, { status: 200 });
  } catch (error) {
    // Catch and log any errors
    console.error('Error fetching report details:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

