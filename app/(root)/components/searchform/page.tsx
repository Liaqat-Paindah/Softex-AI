import React from 'react'
import Form from 'next/form'


const SearchForm = () => {
  

  return (
    <div>
        <Form action="/" scroll={false}>
        <div className="hidden md:block mx-4 text-black-600">
          <input
            type="search"
            name='search'
            placeholder='Search...'
            
            className="w-full px-4 py-2 border border-[#2e3a4e] text-white bg-[#1f2937] font-light rounded-[4px] text-sm focus:outline-none focus:ring-1 focus:ring-white-500 focus:border-transparent  transition"
          />
        </div>
        </Form>
    </div>
  )
}

export default SearchForm