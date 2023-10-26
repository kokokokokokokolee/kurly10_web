import React from 'react';

export default function Section6ChildCoponent({슬라이드,currentViewProduct}) {
    const slideWrap = React.useRef();
    const [state, setState] = React.useState({
        cnt:0
    });
    const {cnt} = state //이렇게 하면 state.cnt 들어가는 자리에 cnt만 써도 됨 = 비 구조화




    //1. 최근 본 상품 클릭 이벤트(누르면 개발자모드 컴포넌트에 후입선출 됨)
    const onClickViewProduct=(e, item, imgPath)=>{
        e.preventDefault();       
        currentViewProduct(item, imgPath);
        //후입선출법 == on shift 방법과 같음
    }





    const onClickPrevBtn=(e)=>{
        e.preventDefault();
        setState({
            ...state,
            cnt: state.cnt-1 //맨 위에 state의 변수 안에 cnt:0 이라서
        })
    }

    const onClickNextBtn=(e)=>{
        e.preventDefault();
        setState({
            ...state,
            cnt: state.cnt+1
        })
    } // 얘네들이 구현되는데는 랩이 필요

    const mainSlide=()=>{
        slideWrap.current.style.transform = `translateX(${-1068*state.cnt}px)`
        slideWrap.current.style.transition = `all 0.6s ease-in-out`
    }

    React.useEffect(()=>{
        mainSlide();
    }, [cnt])//[cnt]가 변경이 되면 메인 함수 호출해라

    return (
            <div className="slide-container">
                <div className="slide-view">
                    <ul ref={slideWrap} className="slide-wrap">
                    {

슬라이드.map((item)=>{
    return(
        <li onClick={(e)=>onClickViewProduct(e, item,'./img/intro/')} className="slide slide1" key={item.번호}>
            <div className="gap">
                <div className="img-box">
                    <img src={`./img/intro/${item.이미지}`} alt="" />
                    <span><img src="./img/intro/icon_cart_circle_purple.svg" alt="" /></span>
                </div>    
                <div className="caption">
                    <h3>
                        {item.상품명}
                    </h3>
                    <h4>
                        <strong>{Math.round(item.할인율*100)}%</strong>
                        <em>{Math.round(item.정가*(1-item.할인율)).toLocaleString('ko-KO')}원</em><br/>
                        <span>{item.정가.toLocaleString('ko-KO')}원</span>
                    </h4>
                    <p>
                        <img src="./img/intro/icon_write.svg" alt="" />
                        <span>{item.후기}</span>
                    </p>
                </div>
            </div>    
        </li>                    

    )
})
    
}
                    </ul>
                </div>
                {
                cnt > 0 && //1보다 크거나 같다면 보여라  == 0 초과하면 보여라 
                <a href="!#" onClick={onClickPrevBtn} className='prev-arrow-button'><img src="./img/intro/icon_white_circle_arrow.svg" alt="" /></a>
            }
                { cnt < 4 && //3 이하까지는 보여라 = 4 초과하면 안 보임
                    <a href="!#" onClick={onClickNextBtn} className='next-arrow-button'><img src="./img/intro/icon_white_circle_arrow.svg" alt="" /></a>
            }
            </div>
                   
    );
};

