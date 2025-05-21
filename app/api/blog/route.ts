import { NextResponse } from 'next/server';
import { client } from '@/lib/sanity';

export const revalidate = 30;

export async function GET() {
  try {
    const query = `*[_type == 'blog'] | order(_createdAt desc) [0...1] {
      title,
      _id,
      tags,
      smallDescription,
      "currentSlug": slug.current,
      "titleImage": titleImage.asset->url,
    }`;

    const data = await client.fetch(query);
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch blogs' },
      { status: 500 }
    );
  }
}