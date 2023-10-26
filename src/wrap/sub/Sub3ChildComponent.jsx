import React from 'react';

export default function Sub3ChildComponent ({알뜰쇼핑,currentViewProduct}) {
    const onClickViewProduct=(e, item, imgPath)=>{
        e.preventDefault();
        currentViewProduct(item, imgPath);
    }
    return (
       
        <ul>
        {
         알뜰쇼핑.map((item, idx)=>{//바인딩 되는 거에요~
             return(
             <li key={item.번호}  onClick={(e)=>onClickViewProduct(e, item, './img/sub/sub3/')}>
             <div className="col-gap">
                 <div className="img-box"> 
                     <img src={`./img/sub/sub3/${item.이미지}`} alt="" />
                 </div>
                 <div className="button-box">
                     <a href="!#"><img src="./img/sub/sub1/icon_cart_middle.svg" alt="" />담기</a>
                 </div>
                 <div className="txt-box">
                     <ul>
                         <li><a href="!#"><em>{item.배송구분}</em></a></li>
                         <li><a href="!#"><h2>{item.상품명}</h2></a></li>
                         <li><a href="!#"><h3>{item.상세설명}</h3></a></li>
                         <li><a href="!#"><h4>{item.정가.toLocaleString("ko-KO")}</h4></a></li>
                         <li><a href="!#"><strong>{Math.round(item.할인율*100)}%</strong><h5>{Math.round(item.정가*(1-item.할인율)).toLocaleString("ko-KO")}원</h5></a></li>
                         <li><a href="!#"><h6>{item.공급처}</h6></a></li>
                     </ul>
                 </div>
             </div>
             </li>
             )    
     })

         }
     </ul>
    );
};

