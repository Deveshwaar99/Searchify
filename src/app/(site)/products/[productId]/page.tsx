import BackButton from '@/components/BackButton'
import { Button } from '@/components/ui/button'
import { db } from '@/db'
import { productsTable } from '@/db/schema'
import { eq } from 'drizzle-orm'
import { Check, Shield } from 'lucide-react'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import React from 'react'

type ProductPageProps = {
  params: {
    productId: string
  }
}

async function ProductPage({ params }: ProductPageProps) {
  const { productId } = params

  if (!productId) return notFound()

  const [product] = await db.select().from(productsTable).where(eq(productsTable.id, productId))

  if (!product) return notFound()

  return (
    <div className="px-12 py-8 pb-8 bg-white divide-y shadow-md divide-zinc-100 rounded-b-md my-8">
      <div>
        <BackButton />

        <div className="mt-4">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            {product.name}
          </h1>
        </div>

        <div className="my-6 border aspect-square border-border w-52 h-52">
          <div className="relative w-full h-full overflow-hidden bg-zinc-100 rounded-xl">
            <Image
              fill
              loading="eager"
              className="object-cover object-center w-full h-full"
              src={`/${product.imageId}`}
              alt="product image"
            />
          </div>
        </div>

        <div className="mt-4">
          <div className="flex items-center">
            <p className="font-medium text-gray-900">${product.price.toFixed(2)}</p>
          </div>

          <div className="mt-4 space-y-6">
            <p className="text-base max-w-prose text-muted-foreground">{product.description}</p>
          </div>

          <div className="flex items-center mt-6">
            <Check className="flex-shrink-0 w-5 h-5 text-green-500" />
            <p className="ml-2 text-sm text-muted-foreground">Eligible for express delivery</p>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <Button className="w-full mt-10">Add to cart</Button>

        <div className="mt-6 text-center">
          <div className="inline-flex text-sm text-medium">
            <Shield className="flex-shrink-0 w-5 h-5 mr-2 text-gray-400" />
            <span className="text-muted-foreground hover:text-gray-700">
              30 Day Return Guarantee
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductPage
