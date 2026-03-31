import { createClient } from '@sanity/client'
import { NextResponse } from 'next/server'

const client = createClient({
  projectId: 'hm00vm5p',
  dataset: 'production',
  apiVersion: '2024-03-30',
  useCdn: true,
})

export async function GET() {
  const query = `*[_type == "hero"][0]{
    title,
    subtitle,
    buttonText,
    buttonLink
  }`
  const hero = await client.fetch(query)
  return NextResponse.json(hero)
}