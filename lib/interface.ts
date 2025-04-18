export interface NewsCard {
    title: string;
    _id: string;
    imageUrl: string;
    tags: string[];
    description: string;
    link: string;
    images: any;
    

  };

  export interface fullBlog {
    currentSlug: string;
    title: string;
    content: any;
    tags: string[];
    smallDescription: string;
    titleImage: any;
    images: any;
    secondImage: any;
    thirdImage: any;
    imageUrl: string;
  };

  export interface simpleBlogCard {
    title: string;
    _id: string;
    tags: string[];
    smallDescription: string;
    currentSlug: string;
    titleImage: any;
    images: any;
    secondImage: any;
    thirdImage: any;
    imageUrl: string;
    categories: Category[];
  };

  export interface Category {
    _id: string;
    name: string;
    slug: string;
  }