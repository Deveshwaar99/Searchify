'use client'

import { useRef, useState, useTransition } from 'react'
import { Input } from './ui/input'
import { Loader2, Loader2Icon, Search } from 'lucide-react'
import { Button } from './ui/button'
import { start } from 'repl'
import { useRouter } from 'next/navigation'

function SearchBar() {
  const [query, setQuery] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  const [isSearching, startTransition] = useTransition()

  const router = useRouter()

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') inputRef.current?.blur()
    if (e.key === 'Enter') handleSearch()
  }
  const handleSearch = () => {
    if (!query) return

    startTransition(() => {
      router.push(`/search?query=${query}`)
    })
  }
  return (
    <div className="relative w-full h-14 flex-flex-col">
      <div className="relative z-10 rounded-md h-14 ">
        <Input
          ref={inputRef}
          onKeyDown={e => handleKeyDown(e)}
          value={query}
          onChange={e => setQuery(e.target.value)}
          className="absolute inset-0 h-full "
        />
        <Button
          onClick={handleSearch}
          size={'sm'}
          className="absolute inset-y-0 right-0 z-20 h-full bg-black rounded-l-none"
        >
          {isSearching ? (
            <Loader2 className=" size-6 animate-spin" />
          ) : (
            <Search className="w-6 h-6" />
          )}
        </Button>
      </div>
    </div>
  )
}

export default SearchBar
