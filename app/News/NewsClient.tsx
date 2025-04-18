'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import Link from 'next/link';
import { urlFor } from '@/lib/sanity';

interface SimpleBlogCard {
  _id: string;
  title: string;
  smallDescription: string;
  currentSlug: string;
  titleImage: any;
  tags: string[];
  categories: Category[];
}

interface Category {
  _id: string;
  name: string;
  slug: string;
}

interface Props {
  initialBlogs: SimpleBlogCard[];
  categories: Category[];
}

export default function NewsClient({ initialBlogs, categories }: Props) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [articles, setArticles] = useState(initialBlogs);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchArticles() {
      setIsLoading(true);
      const url = selectedCategory
        ? `/api/getArticles?category=${selectedCategory}`
        : '/api/getArticles';
      try {
        const response = await fetch(url);
        const data = await response.json();
        setArticles(data);
      } catch (error) {
        console.error('Error fetching articles:', error);
      } finally {
        setIsLoading(false);
      }
    }

    if (selectedCategory !== null) {
      fetchArticles();
    } else {
      setArticles(initialBlogs);
    }
  }, [selectedCategory, initialBlogs]);

  return (
    <div className="pt-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-gray-300">Latest News</h1>

      {/* Category Buttons */}
      <div className="flex flex-wrap gap-2 mb-8">
        <Button
          variant={selectedCategory === null ? 'default' : 'outline'}
          onClick={() => setSelectedCategory(null)}
        >
          All
        </Button>
        {categories.map((category) => (
          <Button
            key={category._id}
            variant={selectedCategory === category.slug ? 'default' : 'outline'}
            onClick={() => setSelectedCategory(category.slug)}
          >
            {category.name}
          </Button>
        ))}
      </div>

      {/* Featured Post */}
      {articles.length > 0 && !isLoading && (
        <div className="mb-12">
          <div className="relative aspect-[16/9] rounded-2xl overflow-hidden">
            <Image
              src={urlFor(articles[0].titleImage).url()}
              alt={articles[0].title}
              fill
              className="object-cover"
            />
          </div>
          <h2 className="text-2xl md:text-3xl font-semibold mt-4 text-gray-900 dark:text-gray-300">{articles[0].title}</h2>
          <p className="text-gray-600 dark:text-gray-400 mt-2">{articles[0].smallDescription}</p>
          <Button asChild className="mt-4 bg-black dark:bg-white text-white dark:text-black">
            <Link href={`/blog/${articles[0].currentSlug}`}>Read More</Link>
          </Button>
        </div>
      )}

      {/* Grid of Other Posts */}
      <div className="grid md:grid-cols-3 gap-8">
        {articles.slice(1).map((post, idx) => (
          <Card key={idx} className="group rounded-2xl">
            <CardContent className="p-0">
              <div className="relative aspect-[4/3] rounded-t-2xl overflow-hidden">
                <Image
                  src={urlFor(post.titleImage).url()}
                  alt={post.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-medium text-gray-900 dark:text-gray-300">{post.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 mt-2 line-clamp-2">{post.smallDescription}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {post.categories.map((category, index) => (
                    <Badge key={index} variant="secondary" className="text-gray-600 dark:text-gray-400 rounded-full border-2 border-gray-900">{category.name}</Badge>
                  ))}
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full text-gray-600 dark:text-gray-400">
                <Link href={`/blog/${post.currentSlug}`}>Read More</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {isLoading && <div className="text-center">Loading...</div>}
    </div>
  );
}