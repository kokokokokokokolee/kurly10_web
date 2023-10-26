import React from 'react'; // 꼭 꼭 있어야 함 
import {BrowserRouter, Routes, Route}from 'react-router-dom'
import TopModalComponent from './wrap/TopModalComponent';
import HeaderComponent from './wrap/HeaderComponent';
import MainComponent from './wrap/MainCoponent';
import FooterComponent from './wrap/FooterCoponent';
import QuickMenuComponent from './wrap/QuickMenuComponent';
import GoTopComponent from './wrap/GoTopComponent';
import ConfirmModal from './wrap/ConfirmModal';
import './wrap/sass/wrap.scss';
//서브 컴포넌트
import Sub1Component from './wrap/sub/Sub1Component'
import Sub2Component from './wrap/sub/Sub2Component'
import Sub3Component from './wrap/sub/Sub3Component'
import Sub4Component from './wrap/sub/Sub4Component'
import Sub5SignUpComponent from './wrap/sub/Sub5SignUpComponent'
import Sub6SignInComponent from './wrap/sub/Sub6SignInComponent'
import Sub7NoticeComponent from './wrap/sub/Sub7NoticeComponent'

//주소검색
import AddressSearchComponent from './wrap/AddressSearchComponent';

//최상위 컴포넌트 
export default function WrapComponent() {

    const [state, setState] = React.useState({
        msg:'타코야끼',
        isConfirmModal :false,
        isAddressSearch : false, //주소검색
    })

    const [address, setAddress] = React.useState({
        주소1:'',
        주소2:'',
    })


    //컨펌모달 메세지, isComfirmModal
    //제어 가능하게 메서드 만든다
    //열고 닫는 거 먼저 (제어기능)

    //열기
    const confirmModalOpen=(msg)=>{ //중요한 건?? 메세지 전달이 되어야 함 == > 열 때 뭐를 변경시키나? isconfirmModal 값을 변경 
        setState({
            ...state,
            msg:msg,
            isConfirmModal : true
        })
    }
    
    //닫기
    const confirmModalClose=()=>{ //이 메소드를 자기 자신에게 줘야 함
        setState({
            ...state,
            isConfirmModal : false
        })
    }
    // 주소검색 열기
    const addressSearchOpen = () => {
        setState({
            ...state,
            isAddressSearch: true
        })
    }
    //주소 검색 닫기
    const addressSearchClose = () => {
        setState({
            ...state,
            isAddressSearch: false
        })
    }


    //최근 본 상품 
    const [product, setProduct] = React.useState({}); // 1. 객체 object = {},  

    // 검증
    const [flag, setFlag] = React.useState(false);
    const [viewProduct, setViewProduct ] = React.useState([]);

    // 1. 지금 본 상품 클릭한 데이터 가져오기
    const currentViewProduct =(item, imgPath)=>{//키(key):값(value) 키가 여러개니까 keys
        const obj = {
            번호: item.번호,
            상품명: item.상품명,
            이미지: `${imgPath}${item.이미지}`,
            정가: item.정가,
            할인율: `${Math.round(item.할인율 * 100)}%`,
            판매가: Math.round(item.정가 * (1-item.할인율)),
            후기: item.후기
        } //이렇게 설정해주어야 클릭 했을 때 저장 됨

        setProduct(obj);
    }

    //2. 로컬스토레이지에 저장하기
    //언제? => 상태변수 배열(product)에 저장 완료 되면
    // 저장소에 저장된 데이터가 있는 경우
    // => 저장된 데이터를 가져온다.
    // => 그리고 스택구조형식으로 현재 데이터를 위에 넣고 저장한다(스택구조)
    // stack(스택) : 후입선출법 Last in First Out -> LIFO 리포 (ex, control+Z)
    // ↕
    // Que(큐) : 선입선출법 First In First Out => FIFO 피포

    // 저장소에 저장된 데이터가 없는 경우 => 현재 클릭한 데이터만 저장한다
    React.useEffect(()=>{
        // 1. 임시 배열 생성한다.
         let imsi = [];              
        // 2. {} 객체 데이터가 있다면
        if(Object.keys(product).length > 0){
            imsi = [product];
        }  
        // 3. 저장소 데이터가 없다면 => 임시배열에 객체를 넣어서 저장소 저장한다.
        if(localStorage.getItem('KURLY_VIEW_PRODUCT')===null){
            if(imsi.length>0){
                localStorage.setItem('KURLY_VIEW_PRODUCT', JSON.stringify(imsi)); // [{..}]
            }
        }
                // 4. 저장소 데이터가 있다면 => 데이터 가져온다.
                //    =>  가져온 배열 데이터에 현재 클릭한 겍체{} 를 스택구조로 저장한다.
        else {
            if(localStorage.getItem('KURLY_VIEW_PRODUCT')===null){
                return;
            }

            try{
                let result = JSON.parse(localStorage.getItem('KURLY_VIEW_PRODUCT')); // 배열데이터가져오기
                //  중복검사
                //  저장소에 저장된 데이터가 현재 보고있는 상품과 중복되면 저장취소
                let filterResult = result.map((item)=>item.번호===product.번호); // 배열에 참 거짓
                //filterResult = [true, false, false]
                //console.log( filterResult );            
                if(filterResult.includes(true)){ // 중복된 데이터가 있으면 true 있다
                    return;
                }
                else{ // 중복안됨
                    if(Object.keys(product).length>0){
                        result=[product, ...result];  // [{...},{..}] 스택
                        // 최종 로컬스토레이지에 저장하기
                        localStorage.setItem('KURLY_VIEW_PRODUCT', JSON.stringify(result));
                    }
                }
            }
            catch(e){
                console.log(e);

            }
            
        }
        // 깃발 흔든다
        setFlag( !flag );
    },[product]);


    React.useEffect(()=>{
        if(localStorage.getItem('KURLY_VIEW_PRODUCT')===null){
            return;
        }
    const result = JSON.parse(localStorage.getItem('KURLY_VIEW_PRODUCT')) //키
    setViewProduct(result) //최상위 함수
    }, [flag])



    // 퀵메뉴 위, 아래 슬라이드 애니메이션
    // 아래(down) 클릭 cnt ++
    // 위(up) 클릭 cnt --

    // 74.656 + 10 = 84.656px
    // 1. 상태변수 cnt
    // 2. up & down 버튼 클릭 이벤트를 구현 cnt++ cnt--
    // 3. 상태변수 cnt 값이 변경되면 애니메이션 메인슬라이드 함수를 실행한다
    // 4. 애니메이션 메인슬라이드 함수를 실행

    // 1. 상태변수 cnt
    const [cnt, setCnt] = React.useState(0)

    // 2. up & down 버튼 클릭 이벤트를 구현 cnt++ cnt--
    




    //새로고침 혹은 로딩시
    //저장소에서 가져오기
    //그리고 상태관리자에 저장하기(해서 계속 유지, 새로고침하면 새롭게 데이터가 들어옴)
    React.useEffect(()=>{
        try{
            const result = JSON.parse(sessionStorage.getItem('POSTCODE_ADDRESS'))// 키가 있어야 주소를 가져옴
        setAddress({
            ...address,
            주소1 :result.주소1,
            주소2 :result.주소2
        })
        }
        catch {// 오류를 해결하고 리턴
            
        }
            
    }, [address.주소1, address.주소2]) //로딩시니까 각괄호 //새로고침하거나 로딩시 1회

    //주소를 저장해주는 메소드
    const addressSave = (주소1, 주소2) => {
        setAddress({
            ...address,
            주소1: 주소1,
            주소2: 주소2
        })
    }


    return (
        <div id='wrap'>
            
            <TopModalComponent />
       
                <BrowserRouter basename={process.env.PUBLIC_URL}>
                    <Routes>
                        <Route path='/' element={<HeaderComponent addressSearchOpen={addressSearchOpen}  주소1={address.주소1} 주소2={address.주소2} />}>
                            <Route index element={<MainComponent currentViewProduct={currentViewProduct}/>} />{/*  클릭하면 나오는 페이지 */}
                            <Route path='/index' element={<MainComponent currentViewProduct={currentViewProduct}/>} />{/*  클릭하면 나오는 페이지 */}
                            <Route path='/sub1' element={<Sub1Component currentViewProduct={currentViewProduct} />} /> 
                            <Route path='/sub2' element={<Sub2Component currentViewProduct={currentViewProduct} />} /> 
                            <Route path='/sub3' element={<Sub3Component currentViewProduct={currentViewProduct} />} /> 
                            <Route path='/sub4' element={<Sub4Component currentViewProduct={currentViewProduct}/>} /> 
                            <Route path='/sub5' element={<Sub5SignUpComponent confirmModalOpen={confirmModalOpen} addressSearchOpen={addressSearchOpen} 주소1={address.주소1} 주소2={address.주소2}/>} />
                            <Route path='/sub6' element={<Sub6SignInComponent />} /> 
                            <Route path='/sub7' element={<Sub7NoticeComponent />} /> 
                        </Route>
                    </Routes>
                </BrowserRouter>
       
            <FooterComponent />
            <QuickMenuComponent viewProduct={viewProduct} />
            <GoTopComponent />
            {state.isConfirmModal &&
                <ConfirmModal msg={state.msg} confirmModalClose={confirmModalClose}/>
                }


            {/* 카카오 주소검색 API */}
            {state.isAddressSearch &&
            <AddressSearchComponent addressSearchClose={addressSearchClose} addressSave={addressSave}/>
        }
        </div>
    );
};

// 헤더 매인 푸터 연결 됨 
//import -- 랑
// wrap 안에 있는 거랑 이름 같아야 함 !! 오탈자 주의 