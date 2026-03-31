import { createClient } from '@sanity/client'
import { NextResponse } from 'next/server'

const client = createClient({
  projectId: 'hm00vm5p',
  dataset: 'production',
  apiVersion: '2024-03-30',
  useCdn: true,
})

export async function GET() {
  const query = `*[_type == "service"]{
    name,
    description,
    icon
  }`
  const services = await client.fetch(query)
  return NextResponse.json(services)
}