import ImageGallery from "@/components/ImageGallery";
import { fullBlog } from "@/lib/interface";
import { client, urlFor } from "@/lib/sanity";
import { PortableText } from "@portabletext/react";
import Image from "next/image";

export const revalidate = 30; // revalidate at most 30 seconds

async function getData(slug: string) {
  const query = `
    *[_type == "blog" && slug.current == '${slug}'] {
        "currentSlug": slug.current,
          title,
          images,
          smallDescription,
          content,
          titleImage,
          secondImage,
          thirdImage,
      }[0]`;

  const data = await client.fetch(query);
  return data;
}

export default async function BlogArticle({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params; // Await the params promise to get the slug
  const data: fullBlog = await getData(slug);

  return (
    <div className="max-w-[1600px] w-full px-4 md:px-8 mx-auto justify-items-center place-items-center">
        <div className="mt-20 justify-items-center items-center place-content-center place-items-center ">
        <h1>
            <span className="block text-base text-center text-primary font-semibold tracking-wide uppercase">
            Project Case study
            </span>
            <span className="mt-2 text-white block text-3xl text-center leading-8 font-bold tracking-tight sm:text-4xl">
            {data.title}
            </span>
        </h1>

        <div className="mt-16 text-white  dark:prose-invert prose-li:marker:text-primary prose-a:text-primary sm:text-3xl text-center font-bold mb-5">
            {data.smallDescription}
        </div>

        <div className="flex justify-center items-center">
          <Image
              src={urlFor(data.titleImage).url()}
              width={1500}
              height={1500}
              alt="Title Image"
              priority
              className="rounded-lg  justify-items-center items-center place-content-center place-items-center mt-8 "
          />
        </div>  

        <div className="mt-16 text-white prose prose-blue prose-lg dark:prose-invert prose-li:marker:text-primary prose-a:text-primary sm:text-2xl font-medium">
            <PortableText value={data.content} />
        </div>
        
        <div>
          <ImageGallery images={data.images}  />
        </div>
        </div>
    </div>
  );
}