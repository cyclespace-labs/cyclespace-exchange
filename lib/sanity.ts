import { createClient } from 'next-sanity';
import imageUrlBuilder from '@sanity/image-url';

export const client = createClient({
    apiVersion: '2025-04-16',
    dataset: 'production',
    projectId: 'v2696xud',
    useCdn: false,
})

const builder = imageUrlBuilder(client);

export function urlFor(source: any) {
    return builder.image(source);
}