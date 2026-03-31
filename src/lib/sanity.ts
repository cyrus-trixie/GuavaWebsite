import { createClient } from '@sanity/client'
import { createImageUrlBuilder } from '@sanity/image-url'

export const client = createClient({
  projectId: 'hm00vm5p',
  dataset: 'production',
  apiVersion: '2024-03-30',
  useCdn: true,
})

const builder = createImageUrlBuilder(client)

export const urlFor = (source: any) => builder.image(source)