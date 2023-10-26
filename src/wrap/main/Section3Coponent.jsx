import React from 'react';
import './sass/section3.scss'



export default function Section3Coponent({currentViewProduct}) {

    //3번
    const [hours, setHours] = React.useState(0); // 시
    const [minutes, setMinutes] = React.useState(0); // 분
    const [seconds, setSeconds] = React.useState(0); // 초
    //4번
    const [state, setState] = React.useState({
        H : 0,
        M : 0,
        S : 0 
    }); //H,S,M 한ㄲ거번에 

// 1. 24시간 타임세일 시작일시(언제?) 2023. 08. 17 19:00:00 => 시(19시)+ 24시간 => 타임세일 종료 일시
//카운트 타이머 => 타임세일 일시를 초단위로 호출 계산 1970년 1월 1일 00:00:00 기점으로 계산
//시 : 분 : 초
// 
React.useEffect(()=>{        
    // 2. 시간 셋팅 여기서
    // 초기값이 0일 뿐 여기서 설정 해조야 함    
    let startTime = new Date("2023-08-16 22:00:00") //타임세일 시작일시 console 하면 타임세일 시작일시Fri Aug 18 2023 19:00:00 GMT+0900 (한국 표준시) 라고 나옴
    let nowTime = new Date();//현재 시간 그때그때 바뀌여야 함
        startTime = (startTime.setHours(startTime.getHours() + 24)) //시간세터함수 +24시간 계산된 상태 최초에 한 번만 
        //3분 타이머면 셋미닛츠 겟미칫츠 +3 해야 함
    let endTime = startTime - nowTime //엔드타임은 시작시간 + 24시간, 초단위

    //이거 메모 잘 해놓으세요
    let H = Math.floor(endTime/(60*60*1000)%24) //60분 60초 1000분의 1초 단위(?) 24시간 == 나머지 시간을 구한다 floor= 내림
    let M = Math.floor(endTime/(60*1000)%60) // 60초 1000분의 1초 단위(?) 60분 === 나머지 분/ 얼마 남았냐?
    let S = Math.floor(endTime/(1000)%60) //  1000분의 1초 단위(?) 60초 === 나머지 초/ 얼마 남았냐?

    // console.log("타임세일 시작일시" + startTime)//타임세일 시작일시Fri Aug 18 2023 19:00:00 GMT+0900 (한국 표준시)
    // // console.log(new Date(endTime)) //날짜 단위
    // console.log("타임세일 시작일시" + startTime) //초단위
    // console.log("타임세일 종료일시" + endTime) //타임세일 남은 시 분 초

    function timeSaleFn(){
        //계속 바뀌는 것들
        let nowTime = new Date();
        let endTime = startTime - nowTime; //나우타임 현재시간을 계산
        H = Math.floor(endTime/(60*60*1000)%24)
        M = Math.floor(endTime/(60*1000)%60)
        S = Math.floor(endTime/(1000)%60)
    if(nowTime >= startTime){//현재 일시가 타임세일 시작보다 크거나 같다면 타임세일 종료
        // console.log('타임세일 종료')
        setState({
            ...state,
            H: 0, //계산한 거, let H
            M: 0,
            S: 0
        }) // 끝났으니까 셋팅 해줘야죠 = 초기화
    }
    else{
        // console.log('타임세일 중...')
        setState({
            ...state, 
            H: H, //계산한 거, let H 남는시간
            M: M,
            S: S
        })
    }
    
}
    setInterval(timeSaleFn, 1000); //1초에 한 번씩 진행해라


}, [state.H, state.M, state.S]);

    return (
        <section id='section3'>
                <div className="slide-container">
                    <div className="content">
                        <ul className="slide-wrap">
                            <li className="slide slide1">
                                    <div className="gap">
                                        <h2>
                                        매일 오전 11시<br />OPEN !
                                        </h2>
                                        <p>
                                        24시간 한정 일일특가
                                        </p>
                                        <div>
                                            <img src="./img/intro/timer.svg" alt="" />
                                            <strong>{state.H < 10 ? `0${state.H}` : state.H}</strong>
                                            <i>:</i>
                                            <strong>{state.M < 10 ? `0${state.M}` : state.M}</strong>
                                            <i>:</i>
                                            <strong>{state.S < 10 ? `0${state.S}` : state.S}</strong>
                                        </div>
                                        <h3>
                                        망설이면 늦어요!
                                        </h3>
                                        
                                    </div>
                            </li>
                            <li className="slide slide2">
                                    <div className="gap">
                                        <div className="img-box">
                                            <img src="./img/intro/삼겹살.jpg" alt="" />
                                            <span><img src={"./img/intro/icon_cart_circle_purple.svg"} alt="" /></span>
                                        </div>
                                        <div className="caption">
                                            <h3>[하이포크] 한돈 급냉 삼겹살 500g</h3>
                                            <h4>
                                                <strong>{Math.round(0.3*100)}%</strong> {/* 매스.라운드==반올림 */}
                                                <em>{Math.round(15300*(1-0.3)).toLocaleString('ko'-'KO')}원</em><br />{/* //로칼스트링 콤마 */}
                                                <span>{(15300).toLocaleString('ko'-'KO')}원</span>
                                            </h4> {/* 바인딩 할 거라 {}로 묶음 */}
                                            <p>
                                                <img src="./img/intro/icon_write.svg" alt="" />
                                                <span>후기 999+</span>
                                            </p>
                                        </div>
                                    </div>
                            </li>
                            <li className="slide slide3">
                                    <div className="gap">
                                        <div className="img-box">
                                            <img src="./img/intro/사과.jpg" alt="" />
                                            <span><img src={"./img/intro/icon_cart_circle_purple.svg"} alt="" /></span>
                                        </div>
                                        <div className="caption">
                                            <h3>썸머킹 사과 1.3kg (4~8입)</h3>
                                            <h4>
                                                <strong>{Math.round(0.31 * 100)}%</strong> {/* 매스.라운드==반올림 */}
                                                <em>{Math.round(15300*(1-0.3)).toLocaleString('ko'-'KO')}원</em><br />{/* //로칼스트링 콤마 */}
                                                <span>{(15300).toLocaleString('ko'-'KO')}원</span>
                                            </h4> {/* 바인딩 할 거라 {}로 묶음 */}
                                            <p>
                                                <img src="./img/intro/icon_write.svg" alt="" />
                                                <span>후기 999+</span>
                                            </p>
                                        </div>
                                    </div>
                            </li>
                            <li className="slide slide4">
                                    <div className="gap">
                                        <div className="img-box">
                                            <img src="./img/intro/샴푸.jpg" alt="" />
                                            <span><img src={"./img/intro/icon_cart_circle_purple.svg"} alt="" /></span>
                                        </div>
                                        <div className="caption">
                                            <h3>[엘라스틴] 오가니스트 비건 샴푸&컨디셔너 500ml 5종</h3>
                                            <h4>
                                                <strong>{Math.round(0.7*100)}%</strong> {/* 매스.라운드==반올림 */}
                                                <em>{Math.round(15300*(1-0.3)).toLocaleString('ko'-'KO')}원</em><br />{/* //로칼스트링 콤마 */}
                                                <span>{(15300).toLocaleString('ko'-'KO')}원</span>
                                            </h4> {/* 바인딩 할 거라 {}로 묶음 */}
                                            <p>
                                                <img src="./img/intro/icon_write.svg" alt="" />
                                                <span>후기 999+</span>
                                            </p>
                                        </div>
                                    </div>
                            </li>
                            
                        </ul>
                    </div>
                </div>
                {/* {
                cnt > 0 && //1보다 크거나 같다면 보여라  == 0 초과하면 보여라 
                <a href="!#" onClick={onClickPrevBtn} className='prev-arrow-button'><img src="./img/intro/icon_white_circle_arrow.svg" alt="" /></a>
            }
                { cnt < 4 && //3 이하까지는 보여라 = 4 초과하면 안 보임
                    <a href="!#" onClick={onClickNextBtn} className='next-arrow-button'><img src="./img/intro/icon_white_circle_arrow.svg" alt="" /></a>
            } */}
        
        </section>
    );
};

