import React from 'react';
import Section1Coponent from './main/Section1Coponent'; //다른 폴더 안에 있는 파일이라서 이렇게 해줘야 함
import Section2Coponent from './main/Section2Coponent'; 
import Section3Coponent from './main/Section3Coponent'; 
import Section4Coponent from './main/Section4Coponent'; 
import Section5Coponent from './main/Section5Coponent'; 
import Section6Coponent from './main/Section6Coponent'; 
import './sass/main.scss'


export default function MainCoponent({currentViewProduct}) {
    return (
        <div id='main'>
            <Section1Coponent />
            <Section2Coponent currentViewProduct={currentViewProduct}/>
            <Section3Coponent currentViewProduct={currentViewProduct}/>
            <Section4Coponent currentViewProduct={currentViewProduct}/>
            <Section5Coponent currentViewProduct={currentViewProduct}/>
            <Section6Coponent currentViewProduct={currentViewProduct}/>
        </div>
    );
};

