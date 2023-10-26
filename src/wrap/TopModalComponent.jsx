import React from 'react';
import './sass/top_modal.scss'

export default function TopModalComponent() {
    
    //2.탑모달 가상클래스 상태관리 statement
    //[modal 변수, setmodal 셋터함수(변경)]
    const [modal, setmodal] = React.useState(false);// 상태관리를 만들어주는 리액트 훅(함수)
//modal ; 단순 변수, setmodal; 세트함수/ 초기값 넣어줘야 함 펄스 씀으로써 모달은 펄스임
//4.탑모달 닫기 클릭 이벤트 
    const onClickModal=(e)=>{
        e.preventDefault();
        setmodal(true); //셋터함수 트루로 변경
    }//리액트의 포인트

// 3. 사이트이동링크
    //1.스크립트코딩자리 무조건 화살표함수 써야 함
    const onClickSiteLink=(e)=> { //버튼클릭이벤트
        e.preventDefault()
        window.location.href = 'https://www.kurly.com/shop/event/kurlyEvent.php?htmid=event/join/join/coupon'
    }
    return (
        <div id='topModal' className={modal ? 'on' : ''}> {/* //x트루면 안 보이고 펄스면 보임 */}
            <div className="container">
                <a href="!#" onClick={onClickSiteLink}>지금 가입하고,<strong> 1만원 할인 쿠폰 </strong>받아가세요!</a>
                {/* <a href="!#" className='top-modal-close'><img src="../../public/img/top_modal/Untitled-1.svg" alt="" /></a> */}
                <a href="!#" onClick={onClickModal} className='top-modal-close'><img src="./img/top_modal/Untitled-1.svg" alt="" /></a> {/* 인덱스파일 기준으로 해야 해서 점은 1개만 */}
            </div>
        </div>
    );
};

