
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

export default async function Projects() {
  const data: simpleBlogCard[] = await getData();

  console.log(data);

  return (

    <div className="max-w-[1600px] w-full px-4 md:px-8 mx-auto">
        <div className="bg-black rounded-t-[30px]">
            <div className="pr-20 pl-20 pt-20">
                <div className="justify-center items-center gap-3 flex mb-5">
                    <Boxes color='#1340FF' stroke='#1340FF' strokeWidth={2} size={30} />
                    <h1 className="text-2xl lg:text-2xl text-white font-light w-fit text-center">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#C2CDFF] to-[#1340FF]">
                            Portfolio
                        </span>
                    </h1>
                </div>
                <div className="justify-center items-center self-center flex mb-10">
                    <h1 className="text-3xl lg:text-3xl text-white font-normal w-[380px] text-center">
                        <span className="">
                            Top–notch designs, delivered at your doorstep.
                        </span>
                    </h1>
                </div>
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
                            width={500}
                            height={500}
                            className="object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out rounded-2xl"
                        />
                        </div>

                        <div className="mt-5">
                            <div>
                                <h2 className="font-medium text-white text-2xl hover:underline">{post.title}</h2>
                            </div>
                            <p className="mt-1 text-muted-foreground line-clamp-3">
                            {post.smallDescription}
                            </p>
                            <div className="mt-3 flex flex-wrap gap-2">
                                {post.tags.map((tagItem, index) => (
                                <span
                                    className="inline-flex items-center text-white rounded-2xl pr-4 pl-4 bg-primary/10 px-3 py-1.5 text-xs sm:text-sm font-medium text-primary ring-2 ring-inset ring-primary/20"
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