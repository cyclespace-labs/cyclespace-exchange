import type { NextApiRequest, NextApiResponse } from 'next';
import { client } from '@/lib/sanity';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { category } = req.query;

  let query;
  if (category) {
    query = `*[_type == 'blog' && references(*[_type == 'category' && slug.current == '${category}']._id)] | order(_createdAt desc) [0...4] {
      title,
      _id,
      smallDescription,
      "currentSlug": slug.current,
      titleImage,
      tags,
      categories[]->{
        _id,
        name,
        "slug": slug.current
      }
    }`;
  } else {
    query = `*[_type == 'blog'] | order(_createdAt desc) [0...4] {
      title,
      _id,
      smallDescription,
      "currentSlug": slug.current,
      titleImage,
      tags,
      categories[]->{
        _id,
        name,
        "slug": slug.current
      }
    }`;
  }

  try {
    const data = await client.fetch(query);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch articles' });
  }
}