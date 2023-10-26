import React from 'react';

export default function Section1ChildCoponent ({슬라이드}) {
    const slideWrap = React.useRef();
    const [cnt, setCnt] = React.useState(0);
    const [n, setn] = React.useState(0); //슬라이드 전체 개수
    const [toggle, setToggle] = React.useState(0); //리턴한 걸 기억하는 상태변수
    const [play, setPlay] = React.useState(true) //타이머 제어 true이면 타이머 동작 false이면 타이머 중지


    React.useEffect(()=>{
        slideWrap.current.style.width = `${100 * 슬라이드.length}%`
        setn((슬라이드.length-2)) //17개이지만 번호는 0~16
    }, [슬라이드]); 

    // 1. 메인슬라이드 함수

    const mainSlide=()=>{
        slideWrap.current.style.transform = `translate(${-1900 * cnt}px)`; //만들기만 하고 실행 되는 건 X, 퍼센트 쓰니까 한꺼번에 다 가서 걍 픽셀로 
        slideWrap.current.style.transition = `all 0.6s ease-in-out`;
        // console.log(cnt)
        // console.log(n)
        // if(cnt>n){
        //     setCnt(1); //setCnt는 1로 간다 //cnt 변경했다 처음으로 (return)
        //     // 리턴 됐다는 걸 기억하는 변수를 만들어줌
        //     setToggle(1); //토글 값이 1이면 리턴 한 거임 
        //     slideWrap.current.style.transition = `none`;
        //     slideWrap.current.style.transform = `translate(${-1900 * 0}px)`;
        // }
        // if(cnt<0){
        //     setCnt(n-1); //cnt 마지막 슬라이드로 설정
        //     // 리턴 됐다는 걸 기억하는 변수를 만들어줌
        //     setToggle(1); //토글 값이 1이면 리턴 한 거임 
        //     slideWrap.current.style.transition = `none`;
        //     slideWrap.current.style.transform = `translate(${-1900 * n}px)`;
        // } --> 이러케하면 넘 지저분해 
        returnSlide();
    }

    //3.  자동 타이머 함수가 필요함 

    React.useEffect(()=>{
        let setId = 0;
        if(play===true){
            setId = setInterval(()=>{
                setCnt(cnt => cnt+1)
            }, 3000);
            return () => clearInterval(setId);
        }
        else {

        }
        }, [play]);
    //2. 로딩시 실행, cnt가 변경되면 자동으로 메인슬라이드 호출 실행 
    React.useEffect(()=>{ //비동기 방식이 필요함, 비동기 1 2 3 순차적 promise 기법 
        if(toggle===0){//리턴이 아닌 상태에서 실행
            mainSlide(); 
        }
        else { //리턴이 발생할 때
            setToggle(0)// 0은 원상복귀 return에서 토글이 1이었으니 0으로 바꿔줌
            setTimeout(function(){//비동기식 : 맨 마지막 페이지에서 촤라락 맨 앞으로 가는 거 그냥 17 -> 1로 가게 해야 함 
                mainSlide(); 
            }, 100)// 리턴 한 다음에 한 템포 쉬고 진행해라
        }
    }, [cnt]); //cnt가 증가하고 나서 0.1초 있다가 메인슬라이드를 실행함 4초마다 넘어가는데 약간의 틈을 줌

    //이전 화살 버튼 클릭 이벤트
    const onClickPrevBtn = ()=>{
        setCnt(cnt-1);
    }
    //다음 화살 버튼 클릭 이벤트
    const onClickNextBtn = ()=>{
        setCnt(cnt+1); //cnt를 증가해달라, 타이머에는 꼭 cnt =>cnt-1 이렇게 써줘야 하는데 여기선 cnt 생략 가능
    }

    const returnSlide=()=>{
        if(cnt>n){
            setCnt(1); //setCnt는 1로 간다 //cnt 변경했다 처음으로 (return)
            // 리턴 됐다는 걸 기억하는 변수를 만들어줌
            setToggle(1); //토글 값이 1이면 리턴 한 거임 
            slideWrap.current.style.transition = `none`;
            slideWrap.current.style.transform = `translate(${-1900 * 0}px)`;
        }
        if(cnt<0){
            setCnt(n-1); //cnt 마지막 슬라이드로 설정
            // 리턴 됐다는 걸 기억하는 변수를 만들어줌
            setToggle(1); //토글 값이 1이면 리턴 한 거임 
            slideWrap.current.style.transition = `none`;
            slideWrap.current.style.transform = `translate(${-1900 * n}px)`; // n은 마지막 번호 
        }
    }

    //마우스를 슬라이드에 오버시 슬라이드 정지 
    const onMouseEnterSlide = () => {
        // console.log('슬라이드 마우스 오버')
        setPlay(false); //play 변수가 변경 되면 타이머에 정지

    }
    //마우스를 슬라이드에 아웃시 슬라이드 재실행
    const onMouseLeaveSlide = () => {
        // console.log('슬라이드 마우스 아웃')
        setPlay(true)// play 변수가 변경 되면 타이머에 실행 인지 
    }
    return (
        <div className="slide-container" onMouseEnter={onMouseEnterSlide} onMouseLeave={onMouseLeaveSlide}>
            <div className="slide-view">
                <ul ref={slideWrap} className="slide-wrap">

                    { //반복문
                        슬라이드.map((item, idx)=>{
                            return( //반드시 리턴문
                        <li className="slide" key={item.번호}>
                            <img src={`./img/intro/slide/${item.이미지}`} alt="" />
                        </li>
                            )
                        })
                    }
                </ul>
            </div>
                    <button onClick={onClickNextBtn} className='arrow-next-btn'><img src="./img/intro/icon_circle_gray_arrow.svg" alt="" /></button>
                    <button onClick={onClickPrevBtn}className='arrow-prev-btn'><img src="./img/intro/icon_circle_gray_arrow.svg" alt="" /></button>
                    <div className='page-num-box'><span>{ cnt+1 > n ? 1 : cnt+1}</span>/<span>{슬라이드.length-2}</span></div>

        </div>

    );
};