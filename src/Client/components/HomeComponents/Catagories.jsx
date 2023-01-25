import React from "react";
import Items from "./Items";

const Categories = () => {
  const items=[
    {
      name:'Table White Eggs (6 pieces)',
      img:'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=50,metadata=none,w=270/app/images/products/sliding_image/487729a.jpg',
      qty:'500g',
      price:'$10'
    },{
      name:'Harvest Gold Hearty Brown Bread',
      img:'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=50,metadata=none,w=270/app/images/products/sliding_image/24194a.jpg?ts=1661157751',
      qty:'500g',
      price:'$10'
    },{
      name:'Amul Salted Butter',
      img:'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=50,metadata=none,w=270/app/images/products/sliding_image/160a.jpg?ts=1654778815',
      qty:'500g',
      price:'$10'
    },{
      name:'Amul Salted Butter',
      img:'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=50,metadata=none,w=270/app/images/products/sliding_image/160a.jpg?ts=1654778815',
      qty:'500g',
      price:'$10'
    },{
      name:'Amul Salted Butter',
      img:'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=50,metadata=none,w=270/app/images/products/sliding_image/160a.jpg?ts=1654778815',
      qty:'500g',
      price:'$10'
    },{
      name:'Amul Salted Butter',
      img:'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=50,metadata=none,w=270/app/images/products/sliding_image/160a.jpg?ts=1654778815',
      qty:'500g',
      price:'$10'
    },{
      name:'Amul Salted Butter',
      img:'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=50,metadata=none,w=270/app/images/products/sliding_image/160a.jpg?ts=1654778815',
      qty:'500g',
      price:'$10'
    },
  ]
  const itemls=items.map((detail,index)=><Items key={index} itemId={index} items={detail}/>)
  return (
    <div className="category m-5">
      <div className="ml-5"><h2 className="text-lg">Daily, Breads and Eggs</h2></div>
        <div className="flex flex-col relative">
        <div className="flex flex-row overflow-x-auto overflow-y-hidden max-w-full ">
          {itemls}
        </div>
      </div>
    </div>
  );
};

export default Categories;
