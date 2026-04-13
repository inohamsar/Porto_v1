import { NextResponse } from 'next/server';
import fs from 'node:fs/promises';
import path from 'node:path';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const folder = searchParams.get('folder');

  if (!folder) {
    return NextResponse.json({ error: 'Folder parameter is required' }, { status: 400 });
  }

  try {
    const dirPath = path.join(process.cwd(), 'public', 'project', folder);
    const files = await fs.readdir(dirPath);

    // Filter for common image extensions and sort numerically
    const images = files
      .filter(file => /\.(png|jpe?g|webp|gif|svg)$/i.test(file))
      .sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' }))
      .map(file => `/project/${folder}/${file}`);

    return NextResponse.json({ images });
  } catch (error) {
    console.error('Gallery API Error:', error);
    return NextResponse.json({ error: 'Failed to read directory' }, { status: 500 });
  }
}
