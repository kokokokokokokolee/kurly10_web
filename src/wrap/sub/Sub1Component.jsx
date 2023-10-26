import React from 'react';
import './sass/sub1.scss'
import axios from 'axios';
import Sub1ChildComponent from './Sub1ChildComponent'

export default function Sub1Component({currentViewProduct}) {

    const [state, setState] = React.useState({
        신상품: [],
        issub1 :false,
        issub2 :false,
        issub3 :false,
        issub4 :false,
        issub5 :false,
        issub6 :false
    })
React.useEffect(()=>{
    axios({
        url :'./data/sub/sub1/sub1.json',
        method:'GET'

    }).then((res)=>{
        setState({
            ...state,
            신상품:res.data.신상품
        })
    }).catch((err)=>{
    })
})

    //서브메뉴 버튼 클릭 이벤트 
    const onClickSub1=(e)=>{ //클릭이벤트니께 e 넣어주기
        e.preventDefault();
        setState({
            ...state,
            //isSub1:true // 한번은 트루 한 번은 펄스 ==>토글로 해주기 toggle 어떠케????????????!!!!
            issub1:!state.issub1 // 이렇게 = ! 표시는 반대임 클릭마다 값 바뀜
        })
    }
    const onClickSub2=(e)=>{
        e.preventDefault();
        setState({
            ...state,
            issub2:!state.issub2
        })
    }
    const onClickSub3=(e)=>{
        e.preventDefault();
        setState({
            ...state,
            issub3:!state.issub3
        })
    }
    const onClickSub4=(e)=>{
        e.preventDefault();
        setState({
            ...state,
            issub4:!state.issub4
        })
    }
    const onClickSub5=(e)=>{
        e.preventDefault();
        setState({
            ...state,
            issub5:!state.issub5
        })
    }
    const onClickSub6=(e)=>{
        e.preventDefault();
        setState({
            ...state,
            issub6:!state.issub6
        })
    }

    return (
        <main id='sub1' className='sub'>
            <section id="section1">
            <div className="container">
                    <div className="content">
                        <a href="!#"><img src="./img/sub/sub1/uHE0ClaQtik9dFz10g9WdtCkTcVNKSEjnJYuZYw0.jpg" alt="" /></a>
                    </div>
            </div>
            </section>

            <section id="section2">
                <div className="container">
                    <div className="title">
                        <h2>신상품</h2>
                    </div>
                    <div className="content">
                        <div className="left">
                            <div className="col-gap">
                                <div className="top">
                                    <strong>필터</strong>
                                    <a href="!#" className='refresh-btn'>
                                        <img src="./img/sub/sub1/refresh.svg" alt="" />
                                        <em>초기화</em>
                                    </a>

                                </div>
                                <div className="category">
                                    <ul>
                                        <li>
                                            <a href="!#" onClick={onClickSub1} className='category-btn'>카테고리</a>
                                            <div className={`sub sub1${state.issub1 ? ' on' : ' off'}`}>
                                                <ul>
                                                    <li>
                                                        <label>
                                                        <input type="checkbox" name='sub-1' id='sub-1' value='생수·음료·우유·커피' />
                                                        생수·음료·우유·커피
                                                        <em>35</em>
                                                        </label>
                                                    </li>
                                                    <li>
                                                        <label>
                                                        <input type="checkbox" name='sub-2' id='sub-2' value='국·반찬·메인요리' />
                                                        국·반찬·메인요리
                                                        <em>33</em>
                                                        </label>
                                                    </li>
                                                    <li>
                                                        <label>
                                                        <input type="checkbox" name='sub-3' id='sub-3' value='샐러드·간편식' /> 
                                                        샐러드·간편식
                                                        <em>31</em>
                                                        </label>
                                                    </li>
                                                    <li>
                                                        <label>
                                                        <input type="checkbox" name='sub-4' id='sub-4' value='SUMMER BIG SALE' /> 
                                                        SUMMER BIG SALE
                                                        <em>17</em>
                                                        </label>
                                                    </li>
                                                    <li>
                                                        <label>
                                                        <input type="checkbox" name='sub-5' id='sub-5' value='수산·해산·건어물' /> 
                                                        산·해산·건어물
                                                        <em>16</em>
                                                        </label>
                                                    </li>
                                                    <li>
                                                        <label>
                                                        <input type="checkbox" name='sub-6' id='sub-6' value='생활용품·리빙·캠핑' /> 
                                                        생활용품·리빙·캠핑
                                                        <em>15</em>
                                                        </label>
                                                    </li>
                                                    <li>
                                                        <label>
                                                        <input type="checkbox" name='sub-7' id='sub-7' value='베이커리·치즈·델리' /> 
                                                        베이커리·치즈·델리
                                                        <em>15</em>
                                                        </label>
                                                    </li>
                                                    <li>
                                                        <label>
                                                        <input type="checkbox" name='sub-8' id='sub-8' value='면·양념·오일' /> 
                                                        면·양념·오일
                                                        <em>15</em>
                                                        </label>
                                                    </li>
                                                    <li>
                                                        <label>
                                                        <input type="checkbox" name='sub-9' id='sub-9' value='과일·견과·쌀' /> 
                                                        과일·견과·쌀
                                                        <em>14</em>
                                                        </label>
                                                    </li>
                                                    <li>
                                                        <label>
                                                        <input type="checkbox" name='sub-10' id='sub-10' value='주방용품' /> 
                                                        주방용품
                                                        <em>9</em>
                                                        </label>
                                                    </li>
                                                </ul>
                                                <button className='category-more-view-btn'>카테고리 더보기<img src="./img/sub/sub1/up_arrow.svg" alt="" /></button>
                                            </div>
                                        </li>
                                        <li>
                                            <a href="!#" onClick={onClickSub2} className='category-btn'>브랜드</a>
                                            <div className={`sub sub2${state.issub2 ? ' on' : ' off'}`}>
                                                <ul>
                                                    <li>
                                                        <label>
                                                        <input type="checkbox" name='sub2-1' id='sub2-1' value='생수·음료·우유·커피' />
                                                        생수·음료·우유·커피
                                                        <em>35</em>
                                                        </label>
                                                    </li>
                                                    <li>
                                                        <label>
                                                        <input type="checkbox" name='sub2-2' id='sub2-2' value='국·반찬·메인요리' />
                                                        국·반찬·메인요리
                                                        <em>33</em>
                                                        </label>
                                                    </li>
                                                    <li>
                                                        <label>
                                                        <input type="checkbox" name='sub2-3' id='sub2-3' value='샐러드·간편식' /> 
                                                        샐러드·간편식
                                                        <em>31</em>
                                                        </label>
                                                    </li>
                                                    <li>
                                                        <label>
                                                        <input type="checkbox" name='sub2-4' id='sub-4' value='SUMMER BIG SALE' /> 
                                                        SUMMER BIG SALE
                                                        <em>17</em>
                                                        </label>
                                                    </li>
                                                    <li>
                                                        <label>
                                                        <input type="checkbox" name='sub2-5' id='sub2-5' value='수산·해산·건어물' /> 
                                                        산·해산·건어물
                                                        <em>16</em>
                                                        </label>
                                                    </li>
                                                    <li>
                                                        <label>
                                                        <input type="checkbox" name='sub2-6' id='sub2-6' value='생활용품·리빙·캠핑' /> 
                                                        생활용품·리빙·캠핑
                                                        <em>15</em>
                                                        </label>
                                                    </li>
                                                    <li>
                                                        <label>
                                                        <input type="checkbox" name='sub2-7' id='sub2-7' value='베이커리·치즈·델리' /> 
                                                        베이커리·치즈·델리
                                                        <em>15</em>
                                                        </label>
                                                    </li>
                                                    <li>
                                                        <label htmlFor="sub-8">
                                                        <input type="checkbox" name='sub-8' id='sub-8' value='면·양념·오일' /> 
                                                        면·양념·오일
                                                        <em>15</em>
                                                        </label>
                                                    </li>
                                                    <li>
                                                        <label htmlFor="sub-9">
                                                        <input type="checkbox" name='sub-9' id='sub-9' value='과일·견과·쌀' /> 
                                                        과일·견과·쌀
                                                        <em>14</em>
                                                        </label>
                                                    </li>
                                                </ul>
                                                <button className='category-more-view-btn'>브랜드 더보기<img src="./img/sub/sub1/up_arrow.svg" alt="" /></button>
                                            </div>
                                        </li>
                                        <li>
                                            <a href="!#" onClick={onClickSub3} className='category-btn'>가격</a>
                                            <div className={`sub sub3${state.issub3 ? ' on' : ' off'}`}>
                                                <ul>
                                                    <li>
                                                        <label>
                                                        <input type="checkbox" name='sub3-1' id='sub3-1' value='생수·음료·우유·커피' />
                                                        생수·음료·우유·커피
                                                        <em>35</em>
                                                        </label>
                                                    </li>
                                                    <li>
                                                        <label>
                                                        <input type="checkbox" name='sub3-2' id='sub3-2' value='국·반찬·메인요리' />
                                                        국·반찬·메인요리
                                                        <em>33</em>
                                                        </label>
                                                    </li>
                                                    <li>
                                                        <label>
                                                        <input type="checkbox" name='sub3-3' id='sub3-3' value='샐러드·간편식' /> 
                                                        샐러드·간편식
                                                        <em>31</em>
                                                        </label>
                                                    </li>
                                                    <li>
                                                        <label>
                                                        <input type="checkbox" name='sub3-4' id='sub3-4' value='SUMMER BIG SALE' /> 
                                                        SUMMER BIG SALE
                                                        <em>17</em>
                                                        </label>
                                                    </li>
                                                </ul>
                                                <button className='category-more-view-btn'>가격 더보기<img src="./img/sub/sub1/up_arrow.svg" alt="" /></button>
                                            </div>
                                        </li>
                                        <li>
                                            <a href="!#" onClick={onClickSub4} className='category-btn'>혜택</a>
                                            <div className={`sub sub4${state.issub4 ? ' on' : ' off'}`}>
                                                <ul>
                                                    <li>
                                                        <label>
                                                        <input type="checkbox" name='sub4-1' id='sub4-1' value='생수·음료·우유·커피' />
                                                        생수·음료·우유·커피
                                                        <em>35</em>
                                                        </label>
                                                    </li>
                                                    <li>
                                                        <label>
                                                        <input type="checkbox" name='sub4-2' id='sub4-2' value='국·반찬·메인요리' />
                                                        국·반찬·메인요리
                                                        <em>33</em>
                                                        </label>
                                                    </li>
                                                </ul>
                                                <button className='category-more-view-btn'>혜택 더보기<img src="./img/sub/sub1/up_arrow.svg" alt="" /></button>
                                            </div>
                                        </li>
                                        <li>
                                            <a href="!#" onClick={onClickSub5} className='category-btn'>유형</a>
                                            <div className={`sub sub5${state.issub5 ? ' on' : ' off'}`}>
                                                <ul>
                                                    <li>
                                                        <label>
                                                        <input type="checkbox" name='sub5-1' id='sub5-1' value='과일·견과·쌀' /> 
                                                        과일·견과·쌀
                                                        <em>14</em>
                                                        </label>
                                                    </li>
                                                    <li>
                                                        <label>
                                                        <input type="checkbox" name='sub5-2' id='sub5-2' value='주방용품' /> 
                                                        주방용품
                                                        <em>9</em>
                                                        </label>
                                                    </li>
                                                </ul>
                                                <button className='category-more-view-btn'>유형 더보기<img src="./img/sub/sub1/up_arrow.svg" alt="" /></button>
                                            </div>
                                        </li>
                                        <li>
                                            <a href="!#" onClick={onClickSub6} className='category-btn'>특정상품 제외</a>
                                            <div className={`sub sub6${state.issub6 ? ' on' : ' off'}`}>
                                                <ul>
                                                    <li>
                                                        <label>
                                                        <input type="checkbox" name='sub6-1' id='sub6-1' value='생수·음료·우유·커피' />
                                                        반려동물 상품
                                                        <em>35</em>
                                                        </label>
                                                    </li>
                                                </ul>
                                                <button className='category-more-view-btn'>특정상품 더보기<img src="./img/sub/sub1/up_arrow.svg" alt="" /></button>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="right">
                            <div className="top">
                                <div className="top-left">
                                    <strong>총 232건</strong>
                                </div>
                                <div className="top-right">
                                    <a href="!#" className='order-btn'>추천순<img src="./img/sub/sub1/icon_question.svg" alt="" /></a>
                                    <a href="!#" className='order-btn'>신상품순</a>
                                    <a href="!#" className='order-btn'>판매량순</a>
                                    <a href="!#" className='order-btn'>혜택순</a>
                                    <a href="!#" className='order-btn'>낮은 가격순</a>
                                    <a href="!#" className='order-btn'>높은 가격순</a>
                                </div>
                            </div>
                                <Sub1ChildComponent currentViewProduct={currentViewProduct} 신상품={state.신상품}  />
                            
                        </div>
                    </div>
                </div>
            </section>
            
        </main>
    );
};

