import React from 'react';
import './sass/section4.scss'

export default function Section4Coponent({currentViewProduct}) {
    return (
        <section id='section4'>
            <div className="slide-container">
                    <div className="content">
                        <ul className="slide-wrap">
                            <li className="slide slide1">
                                    <div className="gap">
                                        <h2>
                                        더 강력해진 뷰티 특가<br />🎉
                                        </h2>
                                        <p>
                                        뷰티컬리페스타 한정 혜택
                                        </p>
                                        <h3>
                                        망설이면 늦어요!
                                        </h3>
                                        
                                    </div>
                            </li>
                            <li className="slide slide2">
                                    <div className="gap">
                                        <div className="img-box">
                                            <img src="./img/intro/section4/77fb93fa-4e32-410c-a950-159639b48ff4.jpg" alt="" />
                                            <span><img src={"./img/intro/icon_cart_circle_purple.svg"} alt="" /></span>
                                        </div>
                                        <div className="caption">
                                            <h3>[하이포크] 한돈 급냉 삼겹살 500g</h3>
                                            <h4>
                                                <strong>{Math.round(0.3*100)}%</strong> {/* 매스.라운드==반올림 */}
                                                <em>{Math.round(15300*(1-0.3)).toLocaleString('ko'-'KO')}원</em><br />{/* //로칼스트링 콤마 */}
                                                <span>{(15300).toLocaleString('ko'-'KO')}원</span>
                                            </h4> {/* 바인딩 할 거라 {}로 묶음 */}
                                            <p>
                                                <img src="./img/intro/icon_write.svg" alt="" />
                                                <span>후기 999+</span>
                                            </p>
                                        </div>
                                    </div>
                            </li>
                            
                        </ul>
                    </div>
                </div>
        </section>
    );
};

