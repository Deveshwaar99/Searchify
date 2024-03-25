import { Icons } from '@/components/Icons'
import SearchBar from '@/components/SearchBar'
import React from 'react'

function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-white border-b border-gray-200 isolate text-slate-900">
      <svg
        className="absolute inset-0 -z-10 h-full w-full stroke-gray-200 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]"
        aria-hidden="true"
      >
        <defs>
          <pattern
            id="0787a7c5-978c-4f66-83c7-11c213f99cb7"
            width={200}
            height={200}
            x="50%"
            y={-1}
            patternUnits="userSpaceOnUse"
          >
            <path d="M.5 200V.5H200" fill="none" />
          </pattern>
        </defs>
        <rect
          width="100%"
          height="100%"
          strokeWidth={0}
          fill="url(#0787a7c5-978c-4f66-83c7-11c213f99cb7)"
        />
      </svg>
      <div className="gap-16 px-6 pt-10 pb-24 mx-auto max-w-7xl sm:pb-32 lg:flex lg:px-8 lg:py-24">
        <div className="flex flex-col items-center w-full h-full gap-4">
          <Icons.Sparkles className=" size-16" />
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">Searchify</h1>
          <div className="flex flex-col w-full max-w-2xl mx-auto mt-16 ">
            <SearchBar />
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SiteLayout
