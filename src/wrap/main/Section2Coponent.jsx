import React from 'react';
import './sass/section2.scss'
import Section2ChildCoponent from './Section2ChildCoponent';
import axios from 'axios';

export default function Section2Coponent({currentViewProduct, 슬라이드, n}) {
    const [state, setState] = React.useState({
        슬라이드:[], //[]--> 배열
        n:0 //슬라이드 갯수(아마)dsd
    })

    React.useEffect(()=>{
        axios({
            url:'./data/section2.json',
            method:'GET'
        })
        .then((res)=>{
            setState({
                ...state,
                슬라이드: res.data.슬라이드,
                n:  res.data.슬라이드.length
            })
        })
        .catch(()=>{

        })
    })

return (
        <section id='section2'>
            <div className="container">
                <div className="title">
                    <h2>이 상품 어때요?</h2>
                </div>
                <div className="content">
                     <Section2ChildCoponent currentViewProduct={currentViewProduct}슬라이드={state.슬라이드} n={state.n}/>
                </div>
            </div>
        </section>
    );
}