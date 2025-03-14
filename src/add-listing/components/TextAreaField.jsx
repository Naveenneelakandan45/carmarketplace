import React from 'react'
import { Textarea } from "@/components/ui/textarea"


function TextAreaField({item}) {
  return (
    <div>
      <Textarea 
      required={item?.required} />
    </div>
  )
}

export default TextAreaField
