'use strict';

//navbar 스크롤 css
// navbar 스크롤 해서 내릴 때 색이 바뀌게끔
// navbar에서 position: fixed; 주고 background-color: transparent; 준 후 
// navbar 아래 영역인 home에 가서 padding-top: 120px;을 줘서 띄워 준 후 

// HTML의 navbar 아이디 태그를 가져온다.
const navbar = document.querySelector('#navbar');
// navbar 태그의 getBoundingClientRect().height를 써서 높이를 가져온다.
const navbarHeight = navbar.getBoundingClientRect().height;

// 스크롤 될 때마다 작성한 코드가 실행 된다.
document.addEventListener('scroll', () => {
    // 스크롤 된 픽셀 수가 내 navbar의 높이보다 커질 때 !
    if(window.scrollY > navbarHeight) {
        // navbar에 navbar--dark 클래스를 만들어 준다.
        navbar.classList.add('navbar--dark');
    } else {
        // navbar에 navbar--dark 클래스를 제거해 준다.
        navbar.classList.remove('navbar--dark');
    }
});





