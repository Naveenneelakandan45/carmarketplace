import React from 'react'
import Data from './Shared/Data'

function Category() {
  return (
    <div className='mt-40'>
      <h2 className='font-bold text-3xl text-center mb-6'>Browse By Type</h2>
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 
      lg:grid-cols-9 gap-6 px-20">
               {Data.Category.map((category,index)=>(
               <div key={index} className='border rounded-md p-3 
               items-center flex flex-col'>

             <img src={category.icon} width={40} height={40}/>
                  <h2>{category.name}</h2>
               </div>

               ))}
      </div>
    </div>
  )
}

export default Category
