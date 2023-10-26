import React from 'react';

export default function Sub4ChildComponent ({특가혜택, currentViewProduct}) {
    return (
       
        <ul>
        {
         특가혜택.map((item, idx)=>{//바인딩 되는 거에요~
             return(
             <li key={item.번호}>
                <div className="col-gap">
                    <div className="img-box"> 
                        <img src={`./img/sub/sub4/${item.상품이미지}`} alt="" />
                    </div>
                </div>
             </li>
             )    
     })

         }
     </ul>
    );
};

