import React from 'react';
import { simpleBlogCard } from "@/lib/interface";
import { client, urlFor } from "@/lib/sanity";
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

async function getData() {
  const query = `*[_type == 'blog'] | order(_createdAt desc) [0...4]  {
        title,
        _id,
        tags,
        smallDescription,
        "currentSlug": slug.current,
        titleImage,
  }`;


  const data = await client.fetch(query, {}, { next: { revalidate: 30 } });

  return data;
}

export async function NewsSection() {

  const data: simpleBlogCard[] = await getData();
  console.log(data);

    return (
        <div className='w-full h-full bg-zinc-950 p-5 gap-5 '>
                <div className="py-10 grid md:grid-cols-2 gap-4 sm:gap-6 md:gap-8 lg:gap-12 grid-cols-1">
                {data.map((post, idx, item) => (
                    <div
                        key={idx}
                        className="group block"
                    >
                    <div >
                        <div className="aspect-w-16 aspect-h-12 overflow-hidden rounded-2xl relative">
                        <Image
                            src={urlFor(post.titleImage).url()}
                            alt="image"
                            width={500}
                            height={500}
                            className="object-cover group-hover:scale-105 w-full h-full transition-transform duration-500 ease-in-out rounded-2xl"
                        />
                        </div>

                        <div className="mt-5">
                            <div>
                                <h2 className="font-medium text-white text-2xl hover:underline">{post.title}</h2>
                            </div>
                            <p className="mt-1 text-white/70 line-clamp-3">
                            {post.smallDescription}
                            </p>
                            <div className="mt-3 flex flex-wrap gap-2">
                                {post.tags.map((tagItem, index) => (
                                <span
                                    className="inline-flex items-center text-white rounded-2xl pr-4 pl-4 bg-primary/10 px-3 py-1.5 text-xs sm:text-sm font-medium text-primary ring-2 ring-inset ring-primary/100"
                                    key={index}
                                >
                                    {tagItem}
                                </span>
                                ))}
                            </div>
                            <Button asChild className="w-full mt-7">
                                <Link href={`/blog/${post.currentSlug}`}>Case Study</Link>
                            </Button>
                        </div>
                    </div>
                </div>
                ))}
                </div>
        </div>
    );
}

