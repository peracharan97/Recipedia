import React from 'react'

function SingleIngrediant({content}) {
  console.log(content)
  
  return (
    <div className=''>
       <img className='w-30 h-30' src={'https://spoonacular.com/cdn/ingredients_250x250/' + content.image} />
       <p className='text-center'>{content.name}</p>
    </div>
  )
}

export default SingleIngrediant