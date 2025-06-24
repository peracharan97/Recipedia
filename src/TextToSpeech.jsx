import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Items from './Items';
import Navbar from './Navbar';

function TextToSpeech() {
  const API_KEY = '909ef4efb2564d5ab4bbe227584cba27';
  const [query, setQuery] = useState('');
 
  const [searchRes,setSearchRes]=useState(null);


  const fetchRecipe = async () => {
  if (!query.trim()) {
    alert('Please enter a valid dish name.');
    return;
  }
    const searchRe = await axios.get(
      `https://api.spoonacular.com/recipes/complexSearch`,
      {
        params: {
          query: query.toLowerCase(),
          number: 10,
          apiKey: API_KEY,
        },
      }
    );
    setSearchRes(searchRe);
  }
 

  return (<>
  <Navbar/>

 
    <input
      className='w-70 rounded-xl p-2 bg-red-100'
        type="text"
        placeholder="Enter a dish (e.g., pasta)"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={fetchRecipe} className='p-2 ml-5 rounded-xl bg-green-300' >
        Search
      </button>
    <div className=" bg-center h-full w-full">
       {!searchRes && (
        <p style={{ marginTop: '2rem' }}>
          🔍 Search the food item, I will provide instructions.
        </p>
      )}
      <div className='w-full flex flex-wrap justify-center '>
      {searchRes && searchRes.data.results.map((res,index)=>{
        
        return <Items key={index} res={res}/>
           }
    )}
    </div>

     

      
    </div>
    </>
  );

}
export default TextToSpeech;
