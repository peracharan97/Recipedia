import React from 'react';

function SingleEquipment({ content }) {
 
  return (
    <div className="text-center">
      <img className="h-30 w-30 mx-auto" src={content.image} alt={content.name} />
      <p>{content.name}</p>
    </div>
  );
}

export default SingleEquipment;
