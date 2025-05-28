"use client"

import { simpleBlogCard } from "@/lib/interface";
import { client, urlFor } from "@/lib/sanity";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Boxes } from "lucide-react";


async function getData() {
  const query = `*[_type == 'blog'] | order(_createdAt desc) [0...1]  {
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

export default async function NewsLayout() {
  const data: simpleBlogCard[] = await getData();

  console.log(data);

  return (

    <div className="w-full  mx-auto">
        <div className="bg-black rounded-t-[30px]">
            <div className="">
                <div className="py-10 grid md:grid-cols-2 gap-4 sm:gap-6 md:gap-8 lg:gap-12 grid-cols-1">
                {data.map((post, idx) => (
                    <div
                        key={idx}
                        className="group block"
                    >
                    <div >
                        <div className="aspect-w-16 aspect-h-12 overflow-hidden rounded-2xl relative">
                        <Image
                            src={urlFor(post.titleImage).url()}
                            alt="image"
                            width={800}
                            height={800}
                            className="object-cover w-full h-full rounded-2xl"
                        />
                        </div>

                        <div className="mt-5">
                            <div>
                                <h2 className="font-medium text-white text-md hover:underline">{post.title}</h2>
                            </div>
                            <p className="mt-1 text-muted-foreground line-clamp-3">
                            {post.smallDescription}
                            </p>
                            <div className="mt-3 flex flex-wrap gap-2">
                                {post.tags.map((tagItem, index) => (
                                <span
                                    className="inline-flex items-center text-white rounded-2xl pr-4 pl-4 bg-primary/10 px-3 py-1.5 text-xs sm:text-sm font-medium  ring-2 ring-inset ring-primary/20"
                                    key={index}
                                >
                                    {tagItem}
                                </span>
                                ))}
                            </div>
                            <Button asChild className="w-full mt-7">
                            <Link href={`/blog/${post.currentSlug}`}>Read More</Link>
                            </Button>
                        </div>
                    </div>
                </div>
                ))}
                </div>
            </div>
        </div>
    </div>
  );
}