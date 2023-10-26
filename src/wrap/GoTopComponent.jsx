import React from 'react';
import './sass/gotop.scss'

export default function GoTopComponent() {

    

    const [state, setState] = React.useState({ //변수
        isFixed:false
    });
    let goTop = React.useRef(); // 등록!


    React.useEffect(()=>{
        
        window.addEventListener('scroll', function(){
            
            let isFixed = false;

            if(window.scrollY >= 1200){ //1200 눈대중
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


    return (
        <div ref={goTop}id='goTop'  className={state.isFixed ? 'on' : ''}>
            <a href="#wrap"><img src="./img/intro/icon_goTop.png" alt="" /></a>
        </div>
    );
};

