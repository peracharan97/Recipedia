import React from 'react'
import { Link } from 'react-router-dom'
function Navbar({setQuery,fetchRecipe,query}) {
  return (<>
    <div className='w-full h-20 bg-green-500 flex items-center gap-15'>
      <Link to={'/'}><h2>Recipedia</h2></Link>

    </div>
    
    </>
  )
}

export default Navbar