import React from 'react';
import './sass/header.scss'
import {Link, Outlet, useLocation}from 'react-router-dom'

export default function HeaderComponent({addressSearchOpen, 주소1, 주소2}) {
    
    const {pathname} = useLocation();

    const refRow3 = React.useRef(); // 등록!
    
    //icon_menubar
    const [state, setState] = React.useState({
        imagefile: 'icon_menubar.svg',
        map:false,
        notice:false,
        isFixed:false
    })

    //스크롤 탑값이(143.372 = 탑모달값 높이, 헤더 1, 2 높이 더한 값) row3 머리에 닿으면 고정
    React.useEffect(()=>{
        let row3OffsetTop = refRow3.current.offsetTop + 43.375
        window.addEventListener('scroll', function(){ //스크롤 이벤트가 발생하면
            // console.log (window.scrollY)//스크롤 수직방향
            let isFixed = false;
            //console.log(refRow3.current.offsetTop + 43.375) //row3 오프셋 탑값 offset().top == 제이쿼리 , offsetTop==>자바스크립트
            //43.375는 탑모달 높이 오프셋 == 내 머리부터 천장까지의 거리 머리에 도달하면 ~해라~
            if(window.scrollY >= row3OffsetTop){
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


    //1)
    const onMouseEnterCatergory=()=>{//마우스 올렸을 때 스테이트 안에 들어있는 ㄴ셋스테이트를 실행해라
    setState({
        ...state, //state 안에 모든 변수 중
        imagefile: 'icon_purple_menubar.svg' //이미지파일 변수만 셋터함수 실행함
    })
    }
    const onMouseLesaveCatergory=()=>{//마우스 내렸을 때 스테이트 안에 들어있는 ㄴ셋스테이트를 실행해라
    setState({
        ...state, // 전개연산자, state 중에서 image만 수정해라!
        imagefile: 'icon_menubar.svg'
    })
    }

    // 배송지 등록 마우스 엔터

    const onMouseEnterMap=()=>{//마우스 올리게 되면 보임
        setState({
            ...state,
            map:true //모든 변수중에 map만 true로 바꿔라~
        })
    }

    //배송지 등록 박스를 마우스가 떠나면 map:false로 상태변경
    const onMouseleaveMap = () => {
        setState({
            ...state,
            map:false
        })
    }

    //공지사항 Notice 마우스 엔터
    const onMouseENterNotice = () => {
        setState({
            ...state,
            notice:true
        })
    } //마우스 올리면 보임 true

    //공지사항 Notice 마우스 리브
    const onMouseLeavenotice = () => {
        setState({
            ...state,
            notice:false
        })
    } //마우스 안 올리면 안 보임 false

    //주소검색 API
    const onClickAddressSearchOpen =(e)=>{
        e.preventDefault();
        addressSearchOpen();
    }

    return (
        <>
        <header id='header'>
            <div className="row1">
                <div className="container">
                    <ul> {/* 플렉스 하던 마진으로 이용해서 옮기던 본인 마음대로 구성해서 해보기 */}
                        <li><Link to="/sub5" className="on">회원가입</Link></li>
                        <li><i>ㅣ</i></li>
                        <li><Link to="/sub6">로그인</Link></li>
                        <li><i>ㅣ</i></li>
                        <li><Link to="/sub7" onMouseEnter={onMouseENterNotice}>고객센터</Link>

                       { state.notice && /* 노티스 변수라 등록해조야함 */
                       <div className="notice-box" onMouseLeave={onMouseLeavenotice}>
                            <ul>
                                <li><Link to="/sub7">공지사항</Link></li>
                                <li><a href="!#">자주하는 질문</a></li>
                                <li><a href="!#">1:1 문의</a></li>
                                <li><a href="!#">대량 주문 문의</a></li>
                            </ul>
                        </div>} {/* 안보이게 하려면 상태관리 해준다 */} {/* 괄호가 상태관리임 */}
                        
                        </li>
                    </ul>
                </div>
            </div>
            <div className="row2">
                <div className="container">
                    <div className="left">
                        <h1><Link to="/index"><img src="./img/intro/icon_logo.svg" alt="" /><strong>마켓컬리</strong></Link></h1>
                        <span><i>ㅣ</i></span>
                        <a href="!#"><span>뷰티컬리<img src="./img/intro/icon_n.svg" alt="" /></span></a>
                    </div>
                    <div className={`center${state.isFixed ?' on' : ''}`}>
                    <input type="text" name="search" id='search' placeholder='검색어를 입력해주세요'/>
                        <a href="!#"><img src="./img/intro/icon_zoom.svg" alt="" /></a>
                    </div>
                    <div className={`right${state.isFixed ?' on' : ''}`}>
                        <a href="!#" onMouseEnter={onMouseEnterMap}><img src="./img/intro/icon_map.svg" alt="" /></a>
                    {
                    // 참이면 보이고 펄스면 안 보임
                    state.map &&
                        (<div className="map-box" onMouseLeave={onMouseleaveMap}>

                           {
                                주소1 !== "" && (
                                <p>
                                    {주소1}<br />
                                    {주소2}
                                </p>)
                            }
                                <p>
                                <strong>배송지를 등록</strong>하고<br/>
                                구매 가능한 상품을 확인하세요!
                                </p>
                                <div className="btn-box">
                                    <button className='login-btn'>로그인</button>
                                    <button onClick={onClickAddressSearchOpen} className='addr-search-btn'><img src="./img/intro/icon_small_zoom.png" alt="" />주소 검색</button>
                                </div>
                        </div>)

                    }
                        <a href="!#"><img src="./img/intro/icon_heart.svg" alt="" /></a>
                        <a href="!#"><img src="./img/intro/icon_cart_middle.svg" alt="" /></a>
                    </div>
                </div>
            </div>
            <div ref={refRow3} className={`row3${state.isFixed ?' on' : ''}`}> {/* 변수가 트루면 들어가고 펄스면 안 들어감 on 앞에 띄어쓰기 해야 함!! 그래야 트루일 때 row3 on 됨 */}
                <div className="container">
                    <div className={`left${state.isFixed ?' on' : ''}`}>
                        <a href="!#" onMouseEnter={onMouseEnterCatergory} onMouseLeave={onMouseLesaveCatergory}>
                            <img src={`./img/intro/${state.imagefile}`} alt="" />
                            <strong>카테고리</strong>
                        </a>
                    </div>
                    <div className={`center${state.isFixed ?' on' : ''}`}>
                        <ul>
                            <li><Link to="/sub1" className={pathname==='/sub1' ? 'on' : ''}>신상품</Link></li>
                            <li><Link to="/sub2" className={pathname==='/sub2' ? 'on' : ''}>베스트</Link></li>
                            <li><Link to="/sub3" className={pathname==='/sub3' ? 'on' : ''}>알뜰쇼핑</Link></li>
                            <li><Link to="/sub4" className={pathname==='/sub4' ? 'on' : ''}>특가/혜택</Link></li>
                        </ul>
                    </div>
                    <div className={`right${state.isFixed ?' on' : ''}`}>
                        <a href="!#"><strong>샛별・택배</strong><span>배송안내</span></a>
                    </div>
                </div>
            </div>
        </header>
        <Outlet />
        </>
    );
};

