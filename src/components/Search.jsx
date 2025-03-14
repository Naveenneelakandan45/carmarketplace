import React from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { Separator } from './ui/separator'
import { CiSearch } from "react-icons/ci"
import Data from './Shared/Data'
  
function Search() {
  return (
    <div className='p-2 md:p-5 bg-white rounded-md 
    md:rounded-full flex-col md:flex md:flex-row gap-10 px-5 items-center
    w-[60%] '>
      <Select>
         <SelectTrigger className=" outline-none md:border-none w-full shadow-none text-lg">
           <SelectValue placeholder="Cars" />
         </SelectTrigger>
         <SelectContent>
             {Data.model.map((model, index) => (
                 <div key={index}>
                <SelectItem value={model.name}>{model.name}</SelectItem>
               
                 </div>
  ))}
</SelectContent>

      </Select>
      <Separator orientation="vertical"className="hidden md:block" />
      <Select>
         <SelectTrigger className=" outline-none md:border-none w-full shadow-none text-lg">
           <SelectValue placeholder="Car Makes" />
         </SelectTrigger>
         <SelectContent>
             {Data.CarMakes.map((maker, index) => (
                 <div key={index}>
                <SelectItem value={maker.name}>{maker.name}</SelectItem>
                 </div>
  ))}
</SelectContent>

      </Select>
      <Separator orientation="vertical"className="hidden md:block" />
      <Select>
         <SelectTrigger className=" outline-none md:border-none w-full shadow-none text-lg">
           <SelectValue placeholder="Pricing" />
         </SelectTrigger>
          <SelectContent>
            {Data.Pricing.map((price,index)=>(
              <div key={index}>
                <SelectItem value={price.name}>{price.name}</SelectItem>
              </div>
            ))}
             
            
         </SelectContent>
      </Select>
         <div>
         <CiSearch className='text-5xl bg-blue-500 rounded-full p-3 text-white hover:scale-105 transition-all cursor-pointer' />
         </div>
    </div>
  )
}

export default Search
