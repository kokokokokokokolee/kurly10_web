import React from 'react';
import './sass/sub4.scss'
import axios from 'axios';
import Sub4ChildComponent from './Sub4ChildComponent'

export default function Sub3Component({currentViewProduct}) {

    const [state, setState] = React.useState({
        특가혜택: [],
        issub1 :false,
        issub2 :false,
        issub3 :false,
        issub4 :false,
        issub5 :false,
        issub6 :false
    })
React.useEffect(()=>{
    axios({
        url :'./data/sub/sub4/sub4.json',
        method:'GET'

    }).then((res)=>{
        console.log('AJAX 성공')
        setState({
            ...state,
            특가혜택:res.data.특가혜택
        })
    }).catch((err)=>{
        
        console.log('AJAX 실패')
    })
})

    //서브메뉴 버튼 클릭 이벤트 
    // const onClickSub1=(e)=>{ //클릭이벤트니께 e 넣어주기
    //     e.preventDefault();
    //     setState({
    //         ...state,
    //         //isSub1:true // 한번은 트루 한 번은 펄스 ==>토글로 해주기 toggle 어떠케????????????!!!!
    //         issub1:!state.issub1 // 이렇게 = ! 표시는 반대임 클릭마다 값 바뀜
    //     })
    // }
    // const onClickSub2=(e)=>{
    //     e.preventDefault();
    //     setState({
    //         ...state,
    //         issub2:!state.issub2
    //     })
    // }
    // const onClickSub3=(e)=>{
    //     e.preventDefault();
    //     setState({
    //         ...state,
    //         issub3:!state.issub3
    //     })
    // }
    // const onClickSub4=(e)=>{
    //     e.preventDefault();
    //     setState({
    //         ...state,
    //         issub4:!state.issub4
    //     })
    // }
    // const onClickSub5=(e)=>{
    //     e.preventDefault();
    //     setState({
    //         ...state,
    //         issub5:!state.issub5
    //     })
    // }
    // const onClickSub6=(e)=>{
    //     e.preventDefault();
    //     setState({
    //         ...state,
    //         issub6:!state.issub6
    //     })
    // }

    return (
        <main id='sub4'>

            <section id="section2">
                <div className="container">
                    <div className="content">
                        <div className="right">
                                <Sub4ChildComponent currentViewProduct={currentViewProduct} 특가혜택={state.특가혜택}  />
                            
                        </div>
                    </div>
                </div>
            </section>
            
        </main>
    );
};

