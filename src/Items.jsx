import React from 'react';
import { Link } from 'react-router-dom';

function Items({ res }) {
  return (
    <Link to={'/item/'+res.id}>
    <div className="w-64 bg-white rounded-lg shadow-md overflow-hidden m-4 flex-shrink-0 hover:scale-105 transform transition"
>
      <img
        src={res.image}
        alt={res.title}
        className="h-40 w-full object-cover"
      />
      <div className="p-3 text-center">
        <h3 className="text-base font-semibold text-gray-800">{res.title}</h3>
      </div>
    </div></Link>
  );
}

export default Items;
