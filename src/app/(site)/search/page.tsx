import { db } from '@/db'
import { Product, productsTable } from '@/db/schema'
import { vectorize } from '@/lib/vectorize'
import { Index } from '@upstash/vector'
import { sql } from 'drizzle-orm'
import { X } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { resolve } from 'path'
import React from 'react'

type SearchPageProps = {
  searchParams: {
    [key: string]: string | string[] | undefined
  }
}

type CoreProduct = Omit<Product, 'createdAt' | 'updatedAt'>

async function Searchpage({ searchParams }: SearchPageProps) {
  const { query } = searchParams

  const index = new Index<CoreProduct>()

  if (Array.isArray(query) || !query) return null
  // exact match
  let products: CoreProduct[] = await db
    .select()
    .from(productsTable)
    .where(
      sql`to_tsvector('simple',lower(${productsTable.name} || ' '||${
        productsTable.description
      })) @@ to_tsquery('simple',lower(${query.trim().split(' ').join(' & ')}))`
    )
    .limit(3)

  if (products.length < 3) {
    // search products by semantic similarity
    const vector = await vectorize(query)

    const res = await index.query({
      topK: 5,
      vector,
      includeMetadata: true,
    })

    const vectorProducts = res
      .filter(existingProduct => {
        products.some(product => product.id !== existingProduct.id) && existingProduct.score > 0.9
          ? true
          : false
      })
      .map(({ metadata }) => metadata!)

    products.push(...vectorProducts)
  }

  if (products.length === 0)
    return (
      <div className="py-4 my-8 text-center bg-white shadow-md rounded-b-md">
        <X className="mx-auto text-gray-400 size-8" />
        <h3 className="mt-2 text-sm font-semibold text-grey-900">No results</h3>
        <p className="mx-auto mt-1 text-sm text-gray-500 max-w-prose">
          Sorry, we {"couldn't"} find any matches for{' '}
          <span className="font-medium text-green-600 ">{query}</span>
        </p>
      </div>
    )
  return (
    <ul className="py-4 my-8 bg-white divide-y shadow-md divide-zinc-100 rounded-b-md">
      {products.slice(0, 3).map(product => (
        <Link key={product.id} href={`/products/${product.id}`}>
          <li className="flex px-8 py-4 mx-auto space-x-4">
            <div className="relative flex items-center w-40 h-40 rounded-lg bg-zinc-100">
              <Image loading="eager" fill alt="product-image" src={`/${product.imageId}`} />
            </div>

            <div className="flex-1 w-full py-1 space-y-2">
              <h1 className="text-lg font-medium text-gray-900">{product.name}</h1>
              <p className="prose-sm prose text-gray-500 line-clamp-3">{product.description}</p>
              <p className="text-base font-medium text-gray-900">${product.price.toFixed(2)}</p>
            </div>
          </li>
        </Link>
      ))}
    </ul>
  )
}

export default Searchpage
