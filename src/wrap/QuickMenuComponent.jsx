import React from 'react';
import './sass/quickMenu.scss'

export default function QuickMenuComponent({viewProduct}) {


    const [state, setState] = React.useState({ //변수
        isFixed:false
    });
    let quickMenu = React.useRef(); // 등록!


    React.useEffect(()=>{
        
        let quickMenuTop = quickMenu.current.offsetTop;
        window.addEventListener('scroll', function(){
            

            let isFixed = false;
            
            if(window.scrollY >= quickMenuTop){
                isFixed = true
            }
            else {
                isFixed = false
            }
            setState({
                ...state,
                isFixed : isFixed
            })// 이프무에서 결정된 값을 넣어줌 임시변수 쓰는 걸 자주 해야 함 !! 셋터함수 바로 넣게되면 오류 날 수 있어서 마지막에 한 번만 해 주삼~~ 이상하게 row3 사라지드라~
        })

    }, []);

    const [cnt, setCnt] = React.useState(0);

    // 업, 다운 클릭 이벤트
    const onClickUpDownEvent=(e, direction)=>{
        e.preventDefault();
        if(direction ==="down"){ //cnt++  6개 일 때 3번 이상 누르면 X // ex. viewProduct.length-4
            if(cnt> viewProduct.length-4){ // 전체슬라이드에서 -4 === 다음에 이동할 숫자까지 빼줘야함 // cnt > 3보다 크면 끝 / 4에서 끝
                return;
            }
            else { //3보다 cnt가 작거나 같다// 3 2 1 0 네 번 클릭 가능
                setCnt(cnt+1) // 1 2 3
            }
        }
        else if(direction ==="up"){ //cnt--
            if(cnt > 0){
                setCnt(cnt-1) // 위로 올라가니까 -  // 3 2 1... // 왜 1을 빼요 ?? 0부터 시작이니께 
            }
            else {// cnt <= 0 // 0이면 종료
                return;
            }
        }
    }

    // 메인슬라이드 애니메이션 메서드 <= 얘는 cnt 변경되면 실행
    const refSlideWrap = React.useRef();
    const mainSlide=(e)=>{
        // 누구를 애니메이션 할 것이냐 ? ? ?
        // ul, 최근 본 상품이 ul 안에 들어가 있기 때문임 
        try{
            refSlideWrap.current.style.transition = "`all 0.3s`"; //style 오류가 났는데  이게 ref={refSlideWrap}을 인식하기 전에 메인슬라이드가 실행되서 그럼
            refSlideWrap.current.style.transform = `translateY(${-84 * cnt}px)` //
        }
        catch(e){
            console.log(e)

        };
    }

    // cnt 변경되면 실행
    React.useEffect(()=>{
        mainSlide();
        
    }, [cnt])


    return (
        <div ref={quickMenu} id='quickMenu' className={state.isFixed ? 'on' : ''}>
            <div className="container">
                <div className="content">
                    <div className="row1">
                        <a href="!#">
                            <img src="./img/intro/deliveryInfo.png" alt="" />
                        </a>
                    </div>
                    <div className="row2">
                        <a href="!#">등급별혜택</a>
                        <a href="!#">레시피</a>
                    </div>
                    {viewProduct.length > 0 && (
                    <div className="row3">
                        <div className="up" onClick={(e)=>onClickUpDownEvent(e, 'up')}> {/* e 쓰면 새로고침 막아줌 */}
                            <a href="!#"><img src="./img/intro/quickmenu/up_arrow.svg" alt="" /></a>
                        </div>
                        <div className="title">최근본상품</div>
                        <div className="img-box">
                            <ul ref={refSlideWrap}>
                            {
                                    viewProduct.map((item)=>{
                                        return(
                                            <li key={item.번호}>
                                                <a href="!#">
                                                    <img src={item.이미지} alt="" />
                                                </a>
                                            </li>
                                        )
                                    })

                                }
                                {/* 반복문 처리해야해서 하나만 냄겨두고 삭제 */}
                            </ul>
                        </div>
                        <div className="down">
                            <a href="!#" onClick={(e)=>onClickUpDownEvent(e, 'down')}><img src="./img/intro/quickmenu/down_arrow.svg" alt="" /></a>
                        </div>
                    </div>
                    )
                    }
                </div>
            </div>
        </div>
    );
};

