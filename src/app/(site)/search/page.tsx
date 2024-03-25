import React from 'react'

type SearchPageProps = {
  searchParams: {
    [key: string]: string | string[] | undefined
  }
}

function Searchpage({ searchParams }: SearchPageProps) {
  const { query } = searchParams
  if (!Array.isArray(query) || !query) return null
  return <div>Searchpage</div>
}

export default Searchpage
