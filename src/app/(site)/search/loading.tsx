import React from 'react'

function Loading() {
  return (
    <ul className="py-4 bg-white divide-y divide-gray-200 shadow-md rounded-b-md">
      {new Array(3).fill(null).map((_, i) => (
        <li key={i} className="flex w-full px-8 py-4 mx-auto space-x-4 animate-pulse">
          <div className="w-40 h-40 bg-gray-300 rounded-lg " />
          <div className="flex-1 w-full py-1 space-y-4">
            <div className="h-10 bg-gray-300 rounded w-fill" />
            <div className="space-y-2 ">
              <div className="w-4/5 h-4 bg-gray-300 rounded" />
              <div className="w-4/5 h-4 bg-gray-300 rounded" />
              <div className="w-4/5 h-4 bg-gray-300 rounded" />
            </div>
          </div>
        </li>
      ))}
    </ul>
  )
}

export default Loading
