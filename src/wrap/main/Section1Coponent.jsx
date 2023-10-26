import React from 'react';
import './sass/section1.scss'
import Section1ChildCoponent from './Section1ChildCoponent';
import axios from 'axios';

export default function Section1Coponent({currentViewProduct}) {

    // const obj = {
    //     이름:"ㅇㅣ경하"
    // }
    // obj.이름 //출력할 땐 이렇게 씀 

    // 같은 방식으로 

    // const state = {
    //     슬라이드:[]
    // }
    // state.슬라이드
    //형식만 다를 뿐 같은 내용임

    const [state, setState] = React.useState({
        슬라이드:[]
    });

    //axios 패키지 설치 해야 쓸 수 ㅣㅇㅆ음!
    //npm i axios
    
    axios({ // 파일 경로는 index.html 루트 경로 위치로 해야 함 
        url: './data/section1.json', //외부데이터 가져오는 것임 // 인덱스 파일이 실행이 되면 인덱스 기준으로 해줘야 하기 때문에 현재 파일 기준으로 길게 나온 경로 삭제하고 ./ 하나만 찍어야 함 
        method:'GET'
    })
    .then((res)=>{ //AXIOS 성공 result나 respones(응답 영어 맞나?) // 프로미스(비동기식), 성공을 찾음
        // console.log ('AXIOS 성공') 여기부터 네 줄은 테스트 한 것
        // console.log (res)
        // console.log (res.data)
        // console.log (res.data.슬라이드) //이걸 받아서 메모리에 넣음 == 이것을 상태관리라고 함
        setState({ //성공 했을 때 집어넣어라
            슬라이드:res.data.슬라이드 //이렇게 한 뒤에 개발자모드 컴포넌트에 슬라이드 19개 들어갓는지 확인 hooks
        })
    })
    .catch((err)=>{ //AXIOS 실패 //캐치는 실패를 찾음
        // console.log ('AXIOS 실패')
        // console.log (err)
    });

    return (
        <section id='section1'>

            <Section1ChildCoponent currentViewProduct={currentViewProduct} 슬라이드={state.슬라이드} /> {/* 여기서 나온 state는 const []안에 있는 거 */}
        </section>
    );
};

