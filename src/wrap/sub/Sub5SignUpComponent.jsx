import React from 'react';
import './sass/sub5.scss'
import axios from 'axios';
//네이게이트 사용
import {useNavigate, useLocation} from 'react-router-dom'
 
export default function Sub5Component({회원가입, confirmModalOpen, addressSearchOpen, 주소1, 주소2}) {
    

    const {location} = useLocation(); // 로케이션 사용 등록 선언 {} 비구조화
    const {navigate} = useNavigate(); // 네비게이트 사용 등록 선언 {} 비구조화

    const RefUserPh1 = React.useRef()
    const [state, setState] = React.useState(회원가입) //프롭스를 상태관리 안에 넣은 거, 회원가입을 넣으면 회원 가입 안에 있는 걸 사용할 수 있고 그걸 스테이트가 관리함 

    //state.회원가입.is인증번호받기
    const {
            아이디, 비밀번호1, 비밀번호2, 이름, 이메일, 휴대폰1, 휴대폰2, 인증번호발송, 인증번호입력, 성별, 생년, 생월, 생일, 참여이벤트명, 추천인아이디, 이용약관동의, 전체동의, 체크필수항목카운트,
            is인증번호받기, is인증번호확인, is인증번호입력, is주소검색, is추가입력사항, 추가입력사항, is인증번호성공, is아이디중복확인, is이메일중복확인, is휴대폰번호인증확인,
            info_id, info_pw1, info_pw2, info_name, info_email, info_hp, info_birth
        } = state; //비구조화 == 구조분할할당 (맨 밑에 적은 거 기반) 여기에 안 넣으면 적을 때 state.회원가입.~ 로 해야 함 짧게 해줌

    React.useEffect(()=>{

        if(주소1!=='' && 주소2!==''){ // 주소1이 공백이 아니고 주소2도 공백이 아닐 때 !! 
        setState({
            ...state,
            is주소검색 :true
        })
    }

    }, [주소1, 주소2])

    // 1. 입력상자 이벤트
    // 1. 아이디
    // #유효성 검증 :입력 제한요건 
    // 1. 6자 이상 16자 이하의 영문 혹은 영문과 숫자를 조합 ==> 영문은 필수, 숫자는 선택
    // 정규표현식(RegExp) = 패턴언어(미리 정해진 기호화된 언어- 기호, 문자, 숫자)
    // 정규표현식을 사용할 때 슬래쉬와 슬래쉬 사이에 씀+마지막에 g, /정규표현식 범위/g  g==global==모든 영역(범위 전체)

    // [^]            부정, ~이 아닌 것, 대괄호 안에서 써야만 적용
    // 1자 이상     + (무조건 1자 이상 와야 함)
    // 0자 이상     x (와도 안 와도 상관 없음)
    // 0자 또는 1자 ? (1자 또는 아예 없는)
    // {}            (수량자)
    // {6}          - 여섯자 아니면 때려죽어도 안 됨
    // {6,}         - 6자 이상
    // {6, 16}      - 6자 이상 그리고 16자 이하(범위)

    // [0-9]        0-9숫자
    // [^0-9]       숫자가 아닌 것 
    // [a-z]        a-z 알파벳 소문자
    // [A-Z]        A-Z 알파벳 대문ㄴ자
    // [A-Za-z]     A-Za-z 알파벳 대소문자
    // [A-Za-z0-9]  A-Za-z0-9 알파벳 대소문자 숫자
    // [abcd]       abcd a b c d가 포함된 문자만
    // [!@#$]       ! @ # $가 포함된 것 
    // |            또는 
    // &            그리고
    // (.)          모든 글자
    // (.){10,}     10자 이상
    // [A-Z]/gi     i === ignore, 영문대소문자구별없음
    //^[a-zA-Z]+[0-9]+&/g 시작문자 ㅣ 영문대소문자 $끝문자 숫자로 끝나야 한다

    
    const onChangeId =(e)=> {

        //검증
        //문자열을 통해 검증
        //정규표현식(정규식) RegExp
        // (영문(+, 필수 1자이상) 혹은 영문과 숫자(*, 0자 이상)를 조합) [영문숫자]{6자 이상 16자 이하} 
        const RegExp =/(?=.*[A-Za-z])+(?=.*[\d])*[A-Za-z0-9]{6,16}/g; // 영문 필수! , + 들어가니까
        //?는 조건문임 ?=.*[A-Za-z] --> 오른쪽이 하나(+) 포함되었냐? (?=.*[\d])* ---> 오른쪽이 0개 이상 포함 되었냐?(*) =쓰는 이유는, 1자 이상 0자 이상을 체크 못할 때 적어 줌 (이상하게 여기만 문제ㅜ)
        let info_id = ''; //오류 메세지 때문에 변수 필요
        //검증은 test라는 메소드로 함, test()=> true 또는 false 를 반환함
        //정규표현식.test(문자열)
        // if(RegExp.test(e.target.value)===true){///([a-zA-Z]+[0-9]*){6, 16}/g 이 범위면~~ 
        //     info_id = '';
        // }
        if(RegExp.test(e.target.value)===false){///([a-zA-Z]+[0-9]*){6, 16}/g 이 범위면~~ = 오류가 있으면
            info_id = '6자 이상 16자 이하의 영문 혹은 영문과 숫자를 조합'
        }
        else { //유효성 검증 false
            info_id = '';
        }

        //검증 통과되면 저장


        setState({
            
            ...state,
            아이디 : e.target.value,
            info_id : info_id
        })
    }



    // 프론트엔드 리액트 =>rest API AXIOS => form데이터(아이디) 요청
    // => POST => 백엔드 PHP => ID(POST 방식으로 받는다)
    // => SQL 아이디 조회 => 중복된 아이디 검사 => 중복 됨(1), 또는 중복 안 됨(0), 리턴(반환)
    // => REST API AJAX에서 처리

    // 폼데이터를 전송하는 방식을 post 방식이라고 함
    // 아이디 중복확인 버튼 클릭 이벤트
    const onClickIdOkBtn = (e) => {
        e.preventDefault();
        // 1. 유효성 검사

        const RegExp =/(?=.*[A-Za-z])+(?=.*[\d])*[A-Za-z0-9]{6,16}/g; 
        if(RegExp.test(아이디)===false){ //아이디 입력상자와 비교이기 때문에 아이디라고 써야 함 
            confirmModalOpen('6자 이상 16자 이하의 영문 혹은 영문과 숫자를 조합')
        }
        else { 
            //confirmModalOpen('6자 이상 16자 이하의 영문 혹은 영문과 숫자를 조합');//메소드
            // 2. 중복검사(rest api로 === axios=> 서버에 전송)

            const formData = new FormData();
            formData.append('id', 아이디);

            axios({
                url:'https://qwefg.com/kurly10/select_id_check.php',
                method:'POST',
                data: formData //axios 폼데이터 형식으로 전송
            })
            .then((res)=>{
                console.log(res)
                console.log(res.data)//res를 가져오면 data가 자동으로 생성 됨 응답 내용은 string(문자열)
                if(res.status===200){//200이라는 건 성공이란 얘기
                    if(Number(res.data)===0){
                        confirmModalOpen("사용 할 수 있는 아이디 입니다.")
                        setState({
                            ...state, //다른 건 다 냅두고 아래에 잇는 것만 수정한단 얘기
                            is아이디중복확인:true
                        })
                    }
                    else {
                        confirmModalOpen("사용 불가능한 아이디 입니다.")
                        setState({
                            ...state,
                            is아이디중복확인:false
                        })
                    }
                }
            }
            )
            .catch((err)=>{
                console.log(err)
            });
        }
    }
    //2. 비밀번호1
    // 1) 최소 10자 이상 입력 (.){10,}
    // 2) 공백제외 === \s 공백 | \S 공백 아닌 것
    // 3) 동일한 숫자 3개 이상 연속 사용 불가
    // 4) 영문/숫자/특수문자(공백 제외)만 허용하며, 2개 이상 조합
    //영문+숫자+, 영문+특수문자+, 특수문자+숫자+
    //abcdef1234
    //특수문자 ~`!@#$%^&*()_\-=+|\\|[]{}:;"'<>?,./
    // 특수 문자를 문자로 인식하게 해주는 역슬래쉬\  \\ \- \]
    const onchangepw1 =(e)=>{
        //1. 최소 10자 이상 입력
        const regExp1 = /(.){10,}/g;
        //2. 공백 제외
        const regExp2 = /\s/g;
        //3. 동일한(연속 사용시) 숫자(\d) 세 개 [0-9] 이상 연속 사용 불가
        const regExp3 =/(\d)\1\1/g; //d1 까지 2개 d11 세 개
        //4. 영문/숫자/특수문자(공백 제외)만 허용하며, 2개 이상 조합
        //   영문+숫자+, 영문+특수문자+, 숫자+특수문자+
        //const regExp4 =/(([A-Z]+[\d]+)+)|(([A-Z]+[~`!@#$%^&*()_\-=+|\\|[]{}:;"'<>\?,\.\/]+)+)|(([0-9]+[~`!@#$%^&*()_\-=+|\\|[]{}:;"'<>\?,\.\/]+])+)/gi; //띄어쓰기 X , i == ignore, 대소문자 구분 안 하겠다(([A-Z]+[\d]+) == (영문 필수, 숫자 필수 ) 모두 필수 -- 너무 길어서 나눔 --려고 했는데 나누니까 안 됨 쪼개지말고 길게 쓰기 
        const regExp4 =/(([A-Z]+[0-9]+)+)|(([0-9]+[A-Z]+)+)|(([A-Z]+[`~!@#$%^&*()\-_=+\\|[\]{}'";:/?.,<>]+)+)|(([`~!@#$%^&*()\-_=+\\|[\]{}'";:/?.,<>]+[A-Z]+)+)|(([0-9]+[`~!@#$%^&*()\-_=+\\|[\]{}'";:/?.,<>]+)+)|(([`~!@#$%^&*()\-_=+\\|[\]{}'";:/?.,<>]+[0-9]+)+)/gi;
        let info_pw1 = '';

        if(regExp1.test(e.target.value)===false){ //펄스이면 안 됨
            info_pw1 = '최소 10자 이상 입력'
        }
        else if(regExp2.test(e.target.value)===true){ // 트루면 안 됨
            info_pw1 ='공백제외';

        }
        else if(regExp3.test(e.target.value)===true){ //동일한 숫자 3개 이상 연속 사용 불가 //트루면 안 됨
            info_pw1 = '동일한 숫자 3개 이상 연속 사용 불가'
        }
        else if(regExp4.test(e.target.value)===false){ // 펄스면 안 됨
            info_pw1 = '영문/숫자/특수문자(공백 제외)만 허용하며, 2개 이상 조합'
        }
        setState({
            ...state,
            비밀번호1 : e.target.value,
            info_pw1: info_pw1
        })
    }
    //3. 비밀번호2
    //pw1 = pw2 
    //공백 X
    // 비밀번호를 한번 더 입력해 주세요.
    //동일한 비밀번호를 입력
    const onchangepw2 =(e)=>{
        let info_pw2 ='';

        if(e.target.value===''){
            info_pw2 ='비밀번호를 한번 더 입력해 주세요.'
        }
        else if (e.target.valur!==비밀번호1){
            info_pw2 = '동일한 비밀번호를 입력'
        }
        setState({
            // 회원가입 : {
            //     ...state.회원가입, 
            //     비밀번호2 : e.target.value
            // }
            ...state,
            비밀번호2 : e.target.value,
            info_pw2: info_pw1
        })
    }
    // 4. 이름
    // 20자 이내
    // 1자 이상
    // 특수문자 허용안함 입력과 동시에 삭제
    // [`~!@#$%^&*()\-_=+\\|[\]{}'";:/?.,<>]
    const onChangeName =(e)=>{
        const regExp = /[`~!@#$%^&*()\-_=+\\|[\]{}'";:/?.,<>]/g; //특수문자만 표시
        let info_name = '';
        let 이름 = e.target.value; //이게 없으면 특수문자가 이름에 들어가기 때문에 이거 적어줌

        //특수문자이면 삭제 입력금지
        //특수문자를 공백으로 치환(replace)
        //문자열.replace(regExp, '')

        이름 = e.target.value.replace (regExp, ''); //다시 확인 !! 에러문자 뜸
        if(e.target.value===""){
            info_name = "이름을 입력해 주세요.";
        }
        else {
            info_name = "";
        }
        setState({
            ...state,
            이름 : e.target.value,
            info_name : info_name
        })
    }
    //5. 이메일
    //^[A-Za-z0-9`~!@#$%^&*_+\"'/?{}]+[\.]?[A-Za-z0-9`~!@#$%^&*_+\"'/?{}]*@[A-Za-z0-9`~!@#$%^&*_+\"'/?{}]\.(필수\.)kr
    //[\.]? == .라는 점이 온다면 한(1) 자만 와라 (빼박 와야 함)

    // kyungjjang@naver.com
    // kyung_jjang@naver.co.kr
    // kyungjjang123@naver.com
    // kyungjjang@naver.com
    // kyungjjang@naver.com
    //[@()[\]<>\\";:,] 제외
    //[`~!@#$%^&*_+\"'/?{}]
    //[A-Za-z0-9]

    // 1. ^[\.]?[A-Za-z0-9`~!@#$%^&*_+\"'/?{}]+ 시작은 영문숫자특수문자범위 1자 이상
    // 2. [.]?[A-Za-z0-9`~!@#$%^&*_+\"'/?{}]*  (.는 1자 또는 0자가 오면 양문숫자특수문자범위1자이상) 0자 이상
    // 3. @
    // 4. [A-Za-z0-9]+
    // 5. [A-Za-z0-9`~!@#$%^&*_+\"'/?{}]*
    // 6. \. 점(dot) 필수
    // 7. [A-Za-z]{2,3}& 끝글자는 영문2자에서 3자
    const onChangeemail=(e)=>{
        const regExp = /^([\.]?[A-Za-z0-9`~!@#$%^&*_+\"'/?{}]+)([.]?)([\.]?[A-Za-z0-9`~!@#$%^&*_+\"'/?{}]*)*@[A-Za-z0-9]+[A-Za-z0-9`~!@#$%^&*_+\"'/?{}]*\.[A-Za-z]{2,3}/g; 
        let info_email = '';

        if(regExp.test(e.target.value)===false){
            info_email = '이메일 형식으로 입력해 주세요.';
        }
        else if(e.target.value==='') {
            info_email = '이메일을 입력해 주세요.';
        }
        else {
            info_email = '';
        }
        setState({
            ...state,
            이메일:e.target.value,
            info_email: info_email
        })
    }

    //이메일 중복확인 버튼 클릭 이벤트
    const onClickEmailokBtn=(e)=>{
        e.preventDefault()
        confirmModalOpen('이메일을 입력해 주세요')
        const RegExp = /^([\.]?[A-Za-z0-9`~!@#$%^&*_+\"'/?{}]+)([.]?)([\.]?[A-Za-z0-9`~!@#$%^&*_+\"'/?{}]*)*@[A-Za-z0-9]+[A-Za-z0-9`~!@#$%^&*_+\"'/?{}]*\.[A-Za-z]{2,3}/g; 
        if( 이메일==="" ){
            confirmModalOpen('이메일 입력해 주세요.');
        }
        else if( RegExp.test(이메일)===false ){
            confirmModalOpen('이메일 형식으로 입력해 주세요.');
        }
        else { 
            //confirmModalOpen('6자 이상 16자 이하의 영문 혹은 영문과 숫자를 조합');//메소드
            // 2. 중복검사(rest api로 === axios=> 서버에 전송)

            const formData = new FormData();
            formData.append('email', 이메일)
            axios({
                url:'https://qwefg.com/kurly10/select_email_check.php',
                method:'POST',
                data: formData
            })
            .then((res)=>{
                // console.log(res)
                // console.log(res.data)//res를 가져오면 data가 자동으로 생성 됨
                if(res.status===200){//200이라는 건 성공이란 얘기
                    if(Number(res.data)===0){
                        confirmModalOpen("사용 할 수 있는 이메일 입니다.")
                        setState({
                            ...state,
                            is이메일중복확인 : true
                        })
                    }
                    else {
                        confirmModalOpen("사용 불가능한 이메일 입니다.")
                        setState({
                            ...state,
                            is이메일중복확인 : false
                        })
                    }
                }
            })
            .catch((err)=>{
                console.log(err)
            });
        }
    }
    // 6. 휴대폰1
    // 숫자 제외 모두 삭제===[^\d]
    // 공백 휴대폰 번호를 입력해 주세요.
    // ^01[\d] {1}[\d] {3,4} [\d]{4}$
    // $ == 마지막글자 ^ === 시작글자
    // 숫자가 아닌 것 === ^\d === \D 

    //const regExp2 = /01[\d]{1}[\d]{3,4}[\d]{4}/g //01 === 빼박 , 버튼클릭 시 검증하기 위함
    //잘못된 휴대폰 번호 입니다. 확인 후 다시 시도 해 주세요. (모달 메세지)
    
    const onchangeph1=(e)=>{
        const regExp = /[^\d]/g
        let info_hp = '';
        let 휴대폰1 = e.target.value; //입력값을 넣어서 필터링 만드는 것
        let is인증번호받기 = false;

        휴대폰1 = e.target.value.replace(regExp, '') //숫자가 아니면 삭제해라 ~~

        if (휴대폰1.length>1){
            is인증번호받기 = true
        }
        else {
            is인증번호받기 =false
        }
        if(e.target.value===''){
            info_hp = '휴대폰 번호를 입력해 주세요.'
        }
        else {
            info_hp = '';
        }
        setState({
            ...state,
            휴대폰1:휴대폰1, //필터링 됐기 때문에
            info_hp : info_hp,
            is인증번호받기 : is인증번호받기 
        })
    }

    //휴대폰 인증번호 받기 클릭 이벤트 번호 검증
    const onClickAuthen=(e)=>{
        e.preventDefault();
        if(is인증번호성공===true){
            setState({
                ...state,
                휴대폰:"",
                is인증번호성공:false //초기화 = 다시 처음 상태로 
            })
        }
        RefUserPh1.current.focus(); //커서 포커스
        
        const regExp2 = /^01[\d]{1}[\d]{3,4}[\d]{4}$/g;  
        let is인증번호확인 = false;
        let is인증번호받기 = true;
        let 인증번호발송 = '';

        if(regExp2.test(휴대폰1)===false){// 휴대폰 번호가 휴대폰1에 들어가있음
        //원래 모달로 할 건데 임시로 alert로 테스트함
        confirmModalOpen('잘못된 휴대폰 번호 입니다. 확인 후 다시 시도 해 주세요.') //\n 줄바꿈
        is인증번호확인 =false;
        is인증번호받기 =true
        
        }   
        else {
            //임의의 숫자(난수) 6자리 발급
            인증번호발송 = Math.floor((Math.random() * 900000) + 100000);            
            is인증번호확인 = true;
            is인증번호받기 = false;
            confirmModalOpen(`인증번호가 발송되었습니다. ${인증번호발송}`);
        }
        setState({
            ...state,
            is인증번호확인:is인증번호확인,
            is인증번호받기:is인증번호받기,
            인증번호발송 : 인증번호발송
        })
    }

    //인증번호입력상자 온체인지 이벤트
    //입력된 숫자는 문자열이 됨 문자열을 숫자로 변환 시켜줘야 함 
    const onChangeHp2=(e)=>{

        let is인증번호입력 = false;
        
        if(e.target.value.length>=1){
            is인증번호입력 = true;
        }
        else {
            is인증번호입력 = false;
        }
        setState({
            ...state,
            is인증번호입력: is인증번호입력,
            인증번호입력 : Number(e.target.value),  // 숫자 문자열 => 숫자변환
            
            휴대폰2:e.target.value
        })
    }
    //인증번호입력 완료하고 확인버튼 클릭
    //인증번호 같다면
    //인증에 성공 하였습니다.
    //잘못된 인증 코드입니다.

    const onClickAuthenNumInput=(e)=>{
        e.preventDefault();
        let is인증번호성공 = false;
        let is인증번호확인 = false;
        let is인증번호받기 = false;
        let is휴대폰번호인증확인 = false;

        if(인증번호입력===인증번호발송){ //변수를 적어야 컴퓨터가 저장하기 때문에 임시변수 적어주기
            is인증번호성공 = true;
            is인증번호확인 = false;
            is인증번호받기 = true;
            is휴대폰번호인증확인 = true;
            confirmModalOpen(`인증에 성공 하였습니다.`)
        }
        else{
            is인증번호성공 = false;
            is인증번호확인 = true;
            is인증번호받기 = true;
            is휴대폰번호인증확인 = false;
            confirmModalOpen(`잘못된 인증 코드입니다.`)

        }
        setState({
            ...state,
            is인증번호성공:is인증번호성공,
            is인증번호확인:is인증번호확인,
            is인증번호받기:is인증번호받기,
            is휴대폰번호인증확인 : is휴대폰번호인증확인
        })
    }


    //주소검색 API 열기
    const onClickAddressSearch = (e) => {
        e.preventDefault();
        addressSearchOpen(); //진짜 신기하당...
    }

    //성별 라디오버튼
    const onChangeGender=(e)=>{
        console.log(e.target.value)
        setState({
            ...state,
            성별:e.target.value
        })
    }

    //생년
    const onChangeYear = (e) => {
        setState({
            ...state,
            생년:e.target.value // e.target.value === 키보드로 입력한 값
        })
    }
    
    //생월
    const onChangeMonth = (e) => {
        setState({
            ...state,
            생월:e.target.value // e.target.value === 키보드로 입력한 값
        })
    }
    
    //생일
    const onChangeDate = (e) => {
        setState({
            ...state,
            생일:e.target.value // e.target.value === 키보드로 입력한 값
        })
    }

/*   생년, 생월, 생일 입력 제한 조건 & 정규표현식
    생년, 생월, 생일 입력값이 발생하면 즉기 동작
    입력값이 모두 없으면 오류 제거 === 초기화


    제한조건
    1. 생년조건
    1-1. 생년월일을 다시 확인해주세요. 1923 크거나 같아야,
    1-2. 생년월일이 미래로 입력 되었습니다.
    1-3. 만 14세 미만은 가입이 불가합니다. 2009 작거나 같아야
    1-4. 태어난 년도 4자리를 정확하게 입력해주세요.

    2. 태어난 월을 정화갛게 입력해주세요.
    3. 태어난 일을 정확하게 입력해주세요. */

    React.useEffect(()=>{
        if(생년==='' && 생월==='' && 생일===''){
            setState({
                ...state,
                info_birth: '생년월일 오류메세지'
            })
        }
        else {
            if(생년===''){
                setState({
                    ...state,
                    info_birth : '태어난 년도 4자리를 정확하게 입력해주세요.'
                })
            }
            else {
                if(Number(생년) < ((new Date().getFullYear())-100)){ //나이 현재년도-100// date는 년월일 나오는데 .getfullYear하면 년도만 빠짐 // 입력값 <1923
                    setState({
                        ...state,
                        info_birth: '생년월일을 다시 확인해주세요.'
                    })
                }
                else if(Number(생년) > ((new Date().getFullYear()))){
                    setState({
                        ...state,
                        info_birth: '생년월일이 미래로 입력 되었습니다.'
                    })
                } 
                else if(Number(생년) > ((new Date().getFullYear())-14)){
                    setState({
                        ...state,
                        info_birth: '만 14세 미만은 가입이 불가합니다.'
                    })  
                }
                else {// 생년조건 모두 만족시 초기화 ===>생월로 넘어간다
                    setState({
                        ...state,
                        info_birth: ''
                    });
                    if(생월 ==="" || Number(생월) < 1 || Number(생월) > 12 ){ // || 또는 1~12
                        setState({
                            ...state,
                            info_birth : ''
                        });
                    }
                    else {
                        if(생일==="" || Number(생일 < 1 || Number(생일) > 31)){//1~31
                            setState({
                                ...state,
                                info_birth: '태어난 일을 정확하게 입력해주세요.'
                            })
                        }
                        else {
                            setState({
                                ...state,
                                info_birth: ''
                            })
                        }
                    }
                }
            }
        }
    },[생년, 생월, 생일]) 

    //추가 입력사항
    const onChangechooga=(e)=>{
            setState({
                ...state,
                is추가입력사항:true, //체인지이벤트가 발동되면 바로 트루 됨 
                추가입력사항 : e.target.value
            })
    }

    //추가입력사항 밑에 있는 추천인아이디 입력상자
    const onChangechoogaId=(e)=>{
        setState({
            ...state,
            추천인아이디:e.target.value
        })
    }

    //추가입력사항 밑에 있는 이벤트명
    const onChangechoogaEvent=(e)=>{
        setState({
            ...state,
            참여이벤트명:e.target.value
        })
    }

    // 추천인 아이디 체크 버튼 클릭 이벤트
    const onClickChooChunId=(e)=>{
        e.preventDefault();

        const formData = new FormData();
        formData.append('id', 추천인아이디);

        axios({
            url:'https://qwefg.com/kurly10/select_choochun_id_check.php',
            method:'POST',
            data: {
                id: formData
            },
        })
        .then((res)=>{
            // console.log(res)
            // console.log(res.data)//res를 가져오면 data가 자동으로 생성 됨
            if(res.status===200){//200이라는 건 성공이란 얘기
                if(Number(res.data)===1){
                    confirmModalOpen("존재하는 아이디입니다. 친구초대 이벤트에 참여가능해요.")
                }
                else {
                    confirmModalOpen("존재하지 않는 아이디 입니다.")
                }
            }
        })
        .catch((err)=>{
            console.log(err)
        });
    }


    //이용약관동의 : 체크 이벤트
    //전체동의
    //1. 전체동의를 체크하면 e.target.checked===true
    //   이용약관동의 배열에 전체 동의 항목을 모두 삽입
    //   그러면 각 체크 박스  항목을 체크 이벤트가 발생하게 된다
    //   (모두 체크 됨, 7개)


    //2. 전체동의를 체크 해제하면
    //   이용약관동의 배열을 모두 비운다. ===> 빈배열[]
    //   그러면 각 체크 박스 항목을 체크 false 이벤트가 발생 되게 한다.
    //  (모두 체크 해제된다 7개)
    const onChangeAllCheck=(e)=>{
        if(e.target.checked===true){//checked가 선택이 되면 ~ 
            setState({
                ...state,
                이용약관동의: 전체동의 
            })
        }
        else {
            setState({
                ...state,
                이용약관동의:[]
            })
        }
    }

    // 개별체크 이벤트
    // 체크가 선택되면 이용약관동의 배열에 체크항목을 추가한다.
    // 구현방법 => 전개연산자사용 누적 추가[...이용약관동의, e.target.value]

    // 체크 해제되면 이용약관동의 배열에 체크항목을 삭제한다.
    // 구현방법 => 배열에 저장된 항목 중 체크 해제 한 항목을 제외한 모든 항목을 재구성한다.
    // [1, 2, 3, 4] => 3 체크 해제
    // [1, 2, 4]
    // 필터 메서드 활용해서 체크 해제된 항목만 제외하고 배열을 재구성한다.
    // 화살표함수 한 줄 코딩(중괄호 제외) 즉시 처리 반환한다.
    const onChangeCheck=(e)=>{
        let imsi = []; // 기본은 배열이니까 각괄호
        if(e.target.checked===true){
            imsi = [...이용약관동의, e.target.value]; // 추가 개념
        }
        else {
            // 현재 체크 해제한 항목이 아닌(!==) 모든 항목을 리턴 반환 재배열 한다
            imsi = 이용약관동의.filter((item)=>item !== e.target.value); // 삭제 개념
        }
        setState({
            ...state,
            이용약관동의 :imsi
        })
    }
    
    //필수 항목 개수 체크 이벤트 (필수 항목 체크 갯수 안 채워지면 가입 안 됨)
    React.useEffect(()=>{
        const arr = 이용약관동의.map((item)=>item.includes('필수') ? 1 : 0) // 이용약관동의 안에 있는 내용을 map함수로 처리
        // 예시) arr[0, 1, 1, 1, 0]; //이런식으로 배열 만들어짐, 1의 갯수로 카운트 되겠져?
        let sum = 0;
        arr.map((item)=>{
            sum += item //누적연산 0+0+0+1+1 = 2
        })
        console.log("필수항목 : " + sum);
        setState({
            ...state,
            체크필수항목카운트:sum
        })
    }, [이용약관동의]) //이용약관동의가 움직이면 움직이는 useEffect~


    //폼 전송 이벤트 온 서브밋 이벤트
    const onSubSignUp=(e)=>{
        e.preventDefault();
        //아이디의 모든 빈 값 체크 (먼저) 상태변수로 체크
        if(아이디 === ""){
            confirmModalOpen('아이디를 입력하세요')
        }
        else if(is아이디중복확인 === false){
            confirmModalOpen('아이디 중복확인을 하세요')
        }
        else if(비밀번호1 === ""){
            confirmModalOpen('비밀번호를 입력하세요')
        }
        else if(비밀번호2 === ""){
            confirmModalOpen('비밀번호를 한 번 더 입력하세요')
        }
        else if(이름 === ""){
            confirmModalOpen('이름을 입력하세요')
        }
        else if(이메일 === ""){
            confirmModalOpen('이메일을 입력하세요')
        }
        else if(is이메일중복확인 === false){
            confirmModalOpen('이메일 중복확인을 하세요')
        }
        else if(휴대폰1 === ""){
            confirmModalOpen('휴대폰 번호를 입력하세요')
        }
        else if(is휴대폰번호인증확인 === false){
            confirmModalOpen('휴대폰 번호를 인증하세요')
        }
        else if(주소1 === ""){
            confirmModalOpen('주소를 입력하세요')
        }
        else if(주소2 === ""){
            confirmModalOpen('나머지 주소를 입력하세요')
        }
        else if(체크필수항목카운트 !== 3){
            confirmModalOpen('이용약관동의 필수 항목 3개 이상을 선택하세요')
        }

        else{ //모두 정상이면!
            // 전송 준비
            // 전화 010-1234-5678, 010-123-4567 이런 경우가 있으니까 정규표현식 적어줌
            // 주민 010101-3434349 주민번호.replace(regExp, '$1-$2'));
            // const regExp = /^(\d{6})(\d{7}))$/g;
            // 사업자번호

            const regExp = /^(\d{3})(\d{3,4})([0-9]{4})$/g;

            // 사용될 객체 생성
            const formData = new FormData(); // 폼데이터를 준비하쟈, data에 들어갈 것, v폼데이터 객체 ★생성★
            formData.append("id", 아이디);//추가 할 속성
            formData.append("pw", 비밀번호1);
            formData.append("name", 이름);
            formData.append("email", 이메일);
            formData.append("hp", 휴대폰1.replace(regExp, '$1-$2-$3'));
            formData.append("addr", `${주소1} ${주소2}`);
            formData.append("gender", 성별);
            formData.append("birth", `${생년}-${생월}-${생일}`);
            formData.append("chooga_input", `${참여이벤트명} ${추천인아이디} ${추가입력사항}`);
            formData.append("service", 이용약관동의);

            // alert(formData)
            // console.log(formData)
            axios({
                url : 'https://qwefg.com/kurly10/signUp.php', //서버사이트 스크립트 언어 파일, signUp.php
                method : 'POST',
                data : formData,
            })
            .then((res)=>{
                console.log(res)
                console.log(res.data) //데이터 속성이 자동으로 맨들어짐
                console.log("axios 성공")
                if(res.status===200){
                    if(res.data===1){
                        confirmModalOpen('회원가입을 진심으로 감사합니다.')  
                        setTimeout(()=>{
                        window.location.pathname="/index"
                        // 라우터 네비게이서 사용 
                        navigate('/index'); // 홈으로 이동
                    })
                    }
                    else {
                        confirmModalOpen('폼데이터를 확인 후 다시 시도해주세요')
                        console.log(res.status)
                    }
                }
            })
            .catch((err)=>{
                console.log(err)
                console.log("axios 실패")
            });
        }
        //유효성 검사(마지막에 해줌)
    }
    return (
        <main id='sub5' className='main'>
            <section id="signUp">
                <div className="container">
                    <div className="title">
                        <h2>회원가입</h2>
                        <h3><em><i>*</i>필수입력사항 </em></h3> {/* 글자를 오른쪽으로 보내고 강조하기 위함, em은 strong처럼 강조할 때 많이 쓰임 */}
                    </div>
                    <div className="content">
                        <form onSubmit={onSubSignUp}> {/* //폼 안에 모든 입력상자가 들어가야 함 */}
                            <ul>
                                <li>
                                    <div className='gap'>
                                        <label htmlFor="userId">아이디<i>*</i></label>
                                        {/* 입력상자에 이벤트가 발생하면(입력하면) change 이벤트 == onchange 
                                        입력상자의 값을 상태변수에 저장한다.
                                        그러면 상태변수에 저장된 내용은 다시 현재 입력상자 value 값으로 넣어준다 

                                        아주 중요한 포인트! 리액트에서 가장 중요한 포인트
                                        입력 상자를 다루는 포인트  */}

                                        {/* 1. 키입력 입력상자 입력 ==> 2. 상태변수에 저장 ==> 3. 저장된 상태변수 내용 값을 => 4.다시 입력상자 value 값으로 저장시킨다 (바인딩) */}
                                        <input type="text"
                                        name='user_id'
                                        id='userId'
                                        placeholder='아이디를 입력해주세요'
                                        onChange={onChangeId}
                                        value={아이디}
                                        maxLength={16}/>{/*  밸류   는 상태관리, maxLength최대입력글자 */} 
                                       {/*  정규표현식 또는 입력제한조건 틀리면 오류메세지 바인딩이 됨, 오류가 없으면 안 나옴, info_id에 문자열이 나옴 */}
                                        <button
                                            className='right'
                                            onClick={onClickIdOkBtn}
                                        >중복확인</button>
                                        <p className='info'>{info_id}</p>
                                    </div>
                                </li>
                                <li>
                                    <div className='gap'>
                                        <label htmlFor="userPW1">비밀번호<i>*</i></label>
                                        <input type="password"
                                        name='user_pw1'
                                        id='userPW1'
                                        placeholder='비밀번호를 입력해주세요'
                                        onChange={onchangepw1}
                                        value={비밀번호1}
                                        maxLength={16}/>
                                        <p className='info'>{info_pw1}</p>
                                    </div>
                                </li>
                                <li>
                                    <div className='gap'>
                                        <label htmlFor="userPw2">비밀번호확인<i>*</i></label>
                                        <input type="password"
                                        name='user_pw2'
                                        id='userPw2'
                                        placeholder='비밀번호를 한번 더 입력해주세요'
                                        onChange={onchangepw2}
                                        value={비밀번호2}
                                        maxLength={16}/>{/* value는 입력변수 */}
                                        <p className='info'>{info_pw2}</p>
                                    </div>
                                </li>
                                <li>
                                    <div className='gap'>
                                        <label htmlFor="userName">이름<i>*</i></label>
                                        <input type="text"
                                        name='user_name'
                                        id='userName'
                                        placeholder='이름을 입력해 주세요'
                                        onChange={onChangeName}
                                        value={이름}
                                        maxLength={30}/>{/*  밸류는 상태관리 */}
                                        <p className='info'>{info_name}</p>
                                    </div>
                                </li>
                                <li>
                                    <div className='gap'>
                                        <label htmlFor="userEmail">이메일<i>*</i></label>
                                        <input type="text"
                                        name='user_email'
                                        id='userEmail'
                                        placeholder='예: marketkurly@kurly.com'
                                        onChange={onChangeemail}
                                        value={이메일}
                                        maxLength={100}/>{/*  밸류는 상태관리 */}
                                        <button className='right' onClick={onClickEmailokBtn}>중복확인</button>
                                        <p className='info'>{info_email}</p>
                                    </div>
                                </li>
                                <li>
                                    <div className='gap'>
                                        <label htmlFor="userPh1">휴대폰<i>*</i></label>
                                        <input type="text"
                                        name='user_ph1'
                                        id='userPh1'
                                        placeholder='숫자만 입력해주세요.'
                                        onChange={onchangeph1}
                                        value={휴대폰1}
                                        maxLength={11}
                                        ref={RefUserPh1}/>
                                        <button onClick={onClickAuthen} className={`right${state.is인증번호받기 ? '' : ' off' }`}>{is인증번호성공 ? `다른번호 인증` : `인증번호 받기`}</button>
                                        <p className='info'>{info_hp}</p>
                                    </div>
                                </li>

                            { is인증번호확인 &&
                            <li>
                                    <div className='gap'>
                                        <label htmlFor="userPh2">휴대폰<i>*</i></label>
                                        <input type="text"
                                        name='user_ph2'
                                        id='userPh2'
                                        placeholder='숫자만 입력해주세요.'
                                        onChange={onChangeHp2}
                                        value={휴대폰2}
                                        maxLength={11}/>{/*  밸류는 상태관리 */}
                                        <button
                                            className={`right${state.is인증번호입력 ? '' : ' off' }`}
                                            onClick={onClickAuthenNumInput}
                                        >인증번호 확인</button>
                                    </div>
                                </li>
                                }
                                
                                <li>
                                    <div className='gap'>
                                        <label htmlFor="userAddr1">주소<i>*</i></label>
                                        {
                                        is주소검색 && //트루이면 보이는데 펄스면 안 보임
                                        <input type="text" name='user_addr1' id='userAddr1' placeholder='숫자만 입력해주세요.' value={주소1}/> 
                                        }
                                        <button onClick={onClickAddressSearch} className={`right address${is주소검색 ? ' on' : ''}`}><img src="./img/sub/sub5/ico_search.svg" alt="" />{is주소검색 ? '재검색' : '주소 검색'}</button> {/* 전자 백틱은 is주소검색 외에 다른 것들이 있어서 백특 쓴 거고 후자는 아니어서 백틱 없음 */}
                                        {
                                            !is주소검색 && //트루일 때 안 보이고 펄스면 보임 !! 
                                            <><br/><br/><em>배송지에 따라 상품 정보가 달라질 수 있습니다.</em></>
                                        }
                                    </div>
                                </li>

                                {
                                    
                                    is주소검색 && //is주소검색이 트루일 때만 보여라~~
                                    <>
                                <li>
                                    <div className='gap'>
                                        <input type="text" name='user_addr2' id='userAddr2' placeholder='나머지 주소를 입력하세요.' value={주소2} />{/*  밸류는 상태관리 */}
                                    </div>
                                </li>
                                <li>
                                    <div className='gap'>
                                        <div className='address-tip-box'>
                                            <strong>샛별배송</strong>
                                            <em>배송지에 따라 상품 정보가 달라질 수 있습니다.</em>
                                        </div>
                                    </div>
                                </li>
                                </> //원래 하나만 묶을 수 있는데 두 개(li)니까 빈태그 해주기 
    }

                                <li>
                                    <div className='gap'>
                                        <label htmlFor='null'>성별</label>{/*  밑에 성별끼리 연결되서 여기서 htmlfor 삭제해도 됨 */}
                                        <div className="gender-box">
                                            <label htmlFor="male">
                                                <input type="radio" 
                                                name='gender' 
                                                id='male' 
                                                value='남자'
                                                onChange={onChangeGender}
                                                //상태변수 값이 남자이면 true, 아니면 false
                                                checked={성별.includes('남자')} />남자</label><label htmlFor="female">
                                                <input type="radio" 
                                                name='gender' 
                                                id='female
                                                ' value='여자' 
                                                onChange={onChangeGender}
                                                checked={성별.includes('여자')}/>여자</label>
                                            <label htmlFor="none">
                                                <input type="radio" 
                                                name='gender' 
                                                id='none' 
                                                value='선택안함'
                                                onChange={onChangeGender}
                                                checked={성별.includes('선택안함')}/>선택안함</label>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div className='gap'>
                                        <label htmlFor="year">생년월일</label>
                                        <div className="birth-box">
                                            <input 
                                            type="text"
                                            name='year' 
                                            id='year' 
                                            placeholder='YYYY'
                                            maxLength={4}
                                            onChange={onChangeYear}
                                            value={생년}/>
                                            <i>/</i>
                                            <input 
                                            type="text"
                                            name='month'
                                            id='month' 
                                            placeholder='MM'
                                            maxLength={2}
                                            onChange={onChangeMonth}
                                            value={생월}/>
                                            <i>/</i>
                                            <input 
                                            type="text"
                                            name='date' 
                                            id='date' 
                                            placeholder='DD'
                                            maxLength={2}
                                            onChange={onChangeDate}
                                            value={생일}/>
                                        <p className='info'>{info_birth}</p>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div className='gap'>
                                        <label htmlFor='null'>추가입력사항</label>
                                        <div className="gender-box">
                                            <label htmlFor="add1"><input type="radio" 
                                            name='add' 
                                            id='add1' 
                                            value='친구초대 추천인 아이디'
                                            onChange={onChangechooga}
                                            checked={state.추가입력사항.includes('친구초대 추천인 아이디')}/>친구초대 추천인 아이디</label>{/*  //라벨은 입력상자랑 연결되어야 함  */}
                                            <label htmlFor="add2"><input type="radio" 
                                            name='add' 
                                            id='add2' 
                                            value='참여 이벤트명'
                                            checked={state.추가입력사항.includes('참여 이벤트명')}
                                            />참여 이벤트명</label>
                                        </div>
                                    </div>
                                </li>
                                { is추가입력사항 && //트루면 보여용 왜 한꺼번에 묶어요?? 추가입력사항 체크하기 전엔 안 보여서요
                                    <>
                                        <li>
                                            <div className='gap'>
                                                {
                                                추가입력사항 === '친구초대 추천인 아이디' && <>
                                                <input type="text" 
                                                name='chooChun1_Id' 
                                                id='chooChun1' 
                                                placeholder='추천인 아이디를 입력해 주세요.'
                                                onChange={onChangechoogaId}
                                                value={state.추가입력사항.추천인아이디}/>{/*  밸류는 상태관리 */}
                                                <button className='right'
                                                onClick={onClickChooChunId}>아이디 확인</button>
                                                </>
                                                }

                                                {
                                                추가입력사항 === '참여 이벤트명' && 
                                                <input type="text"
                                                name='chamEvent_Id'
                                                id='chamEventId'
                                                placeholder='참여 이벤트명을 입력해주세요.'
                                                onChange={onChangechoogaEvent}
                                                value={state.추가입력사항.참여이벤트명}/>
                                                }
                                            </div>
                                        </li>
                                        <li>
                                            <div className="gap">
                                                {
                                            추가입력사항 === '친구초대 추천인 아이디' &&
                                                <em>가입 후 7일 내 첫 주문 배송완료 시, 친구초대 이벤트 적립금이 지급됩니다.</em>
                                            }
                                            {
                                            추가입력사항 === '참여 이벤트명' && 
                                                <em>추천인 아이디와 참여 이벤트명 중 하나만 선택 가능합니다. <br />가입 이후는 수정이 불가능 합니다.<br />대소문자 및 띄어쓰기에 유의해주세요.</em>
                                            }
                                            </div>
                                        </li>
                                    </>
                                }
                                <li>
                                    <hr />
                                </li>
                                <li className='icon_sub_dot'>
                                    <div className='gap service-gap'>
                                        <label htmlFor='check2' className='service-label'>이용약관동의<i>*</i></label> {/* //오ㅐ 얘만 클래스네임 있어요?? 얘만 왼쪽으로 가야해서 */}
                                        <div className="service">
                                            <label className='check1' htmlFor="check1">
                                                <input
                                                type="checkbox"
                                                name='service'
                                                id='check1'
                                                value='전체 동의 합니다'
                                                onChange={onChangeAllCheck}
                                                checked={이용약관동의.length===7}/>전체 동의 합니다.</label><br />
                                            <em>선택항목에 동의하지 않은 경우도 회원가입 및 일반적인 서비스를 이용할 수 있습니다.</em>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div className='gap service-gap'>
                                        <div className="service">
                                            <label htmlFor="check2">
                                                <input
                                                type="checkbox"
                                                name='service' id='check2'
                                                value='이용약관 동의(필수)'
                                                checked={이용약관동의.includes('이용약관 동의(필수)')}
                                                onChange={onChangeCheck}
                                                />이용약관 동의</label><span>(필수)</span>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div className='gap service-gap'>
                                        <div className="service">
                                            <label htmlFor="check3">
                                                <input type="checkbox"
                                                name='service'
                                                id='check3'
                                                value='개인정보 수집∙이용 동의(필수)'
                                                checked={이용약관동의.includes('개인정보 수집∙이용 동의(필수)',)}
                                                onChange={onChangeCheck}
                                                />개인정보 수집∙이용 동의</label><span>(필수)</span>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div className='gap service-gap'>
                                        <div className="service">
                                            <label htmlFor="check4">
                                                <input type="checkbox"
                                                name='service'
                                                id='check4'
                                                value='개인정보 수집∙이용 동의(선택)'
                                                checked={이용약관동의.includes('개인정보 수집∙이용 동의(선택)',)}
                                                onChange={onChangeCheck}
                                                />개인정보 수집∙이용 동의</label><span>(선택)</span>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div className='gap service-gap'>
                                        <div className="service">
                                            <label htmlFor="check5">
                                                <input
                                                type="checkbox"
                                                name='service'
                                                id='check5'
                                                value='무료배송, 할인쿠폰 등 혜택/정보 수신 동의(선택)'
                                                checked={이용약관동의.includes('무료배송, 할인쿠폰 등 혜택/정보 수신 동의(선택)',)}
                                                onChange={onChangeCheck}
                                                />무료배송, 할인쿠폰 등 혜택/정보 수신 동의</label><span>(선택)</span>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div className='gap service-gap'>
                                        <div className="service sns">
                                            <label htmlFor="check6">
                                                <input 
                                                type="checkbox" 
                                                name='service' 
                                                id='check6' 
                                                value='SNS'
                                                checked={이용약관동의.includes('SNS')}
                                                onChange={onChangeCheck}/>SMS</label>
                                            <label htmlFor="check7">
                                                <input 
                                                type="checkbox" 
                                                name='service' 
                                                id='check7' 
                                                value='이메일'
                                                checked={이용약관동의.includes('이메일')}
                                                onChange={onChangeCheck}/>이메일</label>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div className='gap service-gap'>
                                        <div className="service">
                                            <em className='icon-sub-dot'><img src="./img/sub/sub5/ico_sub_dot.svg" alt="" />동의 시 한 달간 [5%적립] + [2만원 이상 무료배송] 첫 주문 후 안내</em> 
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div className='gap service-gap'>
                                        <div className="service">
                                            <label htmlFor="check8">
                                                <input
                                                type="checkbox"
                                                name='service'
                                                id='check8'
                                                value='본인은 만 14세 이상입니다.(필수)'
                                                checked={이용약관동의.includes('본인은 만 14세 이상입니다.(필수)')}
                                                onChange={onChangeCheck}
                                                />본인은 만 14세 이상입니다.</label><span>(필수)</span>
                                        </div>
                                    </div>
                                </li>
                                
                            </ul>
                            <div className="button-box">
                                <button type='summit' /* onClick={onClickSubmit} */>가입하기</button>
                            </div>
                        </form>
                    </div>
                    
                </div>
            </section>
        </main>
    );
};

Sub5Component.defaultProps = {
    회원가입 : {//멤버라는 변수객체를 맨들어줌

        인증번호입력:'',
        인증번호발송:'',
        성별:'선택안함',
        생년:'',
        생월:'',
        생일:'',

        아이디:'', //변수
        비밀번호1:'',
        비밀번호2:'',
        이름:'',
        이메일:'',
        휴대폰1: '',
        휴대폰2: '',

        //조건부 연산자 
        is인증번호받기:false, //참이냐 펄스냐 이니까 is 붙임
        is인증번호확인:false,
        is인증번호입력:false,
        is인증번호성공:false,
        is주소검색 : false,
        is추가입력사항:true,
        is아이디중복확인 : false,
        is이메일중복확인 : false,
        is휴대폰번호인증확인 : false,

        추가입력사항:'', //선택이 되면 값이 들어감
        참여이벤트명:'',
        추천인아이디:'',
        전체동의:[
            '이용약관 동의(필수)',
            '개인정보 수집∙이용 동의(필수)',
            '개인정보 수집∙이용 동의(선택)',
            '무료배송, 할인쿠폰 등 혜택/정보 수신 동의(선택)',
            'SNS',
            '이메일',
            '본인은 만 14세 이상입니다.(필수)',
        ],
        이용약관동의: [],
        체크필수항목카운트:0,


        //가이드 텍스트(오류문자)
        info_id  : '',
        info_pw1  : '',
        info_pw2  : '',
        info_name  : '',
        info_email : '',
        info_hp  : '',
        info_birth : '',
    }
}
