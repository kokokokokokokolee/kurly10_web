import React from 'react';
import './sass/section6.scss'
import Section6ChildCoponent from './Section6ChildCoponent';
import axios from 'axios';

export default function Section2Coponent({슬라이드, n, currentViewProduct}) {
    const [state, setState] = React.useState({
        슬라이드:[], //[]--> 배열
        n:0 //슬라이드 갯수(아마)
    })

    React.useEffect(()=>{
        axios({
            url:'./data/section6.json',
            method:'GET'
        })
        .then((res)=>{
            setState({
                슬라이드:res.data.슬라이드
            })
        })
        .catch(()=>{

        })
    })

return (
        <section id='section6'>
            <div className="container">
                <div className="title">
                    <h2>이 상품 어때요?</h2>
                </div>
                <div className="content">
                     <Section6ChildCoponent currentViewProduct={currentViewProduct} 슬라이드={state.슬라이드} n={state.n}/>
                </div>
            </div>
        </section>
    );
}