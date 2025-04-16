

import { Card } from '@/components/ui/card';
import { simpleBlogCard } from '@/lib/interface';
import { client, urlFor } from '@/lib/sanity'
import Image from 'next/image';
import React from 'react'

async function getData() {
    const query = `
    *[_type == 'blog'] | order(_createdAt desc) {
        title,
        smallDescription,
        "currentSlug": slug.current,
        titleImage
    }`;

    const data = await client.fetch(query);

    return data;
}



export default async function page() {
    const data: simpleBlogCard[] = await getData();

    console.log(data);

  return (

    <div className='grid grid-cols-1 lg:grid-cols-5 gap-2 mt-5'>
        {data.map((post, idx) => (
            <Card key={idx} className='w-full h-96 flex flex-col justify-between'>
                <Image src={urlFor(post.titleImage).url()} alt={post.title} width={500} height={500} className='w-full h-2/3 object-cover' />
            </Card>
        ))}
    </div>

  )
}
