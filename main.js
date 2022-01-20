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

// 메뉴 클릭시 해당 위치로 스크롤링

// navbar__menu를 가져와 navbarMenu에 넣어준다.
const navbarMenu = document.querySelector('.navbar__menu');
// navbarMenu가 클릭이 되면 등록된 함수 호출
navbarMenu.addEventListener('click', (event) => {
    const target = event.target;
    const link = target.dataset.link;
    // navbarmenu 자체를 클릭했을 때가 있기에 link가 데이터가 있을 때만 불러온다.
    if(link == null) {
        return;
    }
    // 클릭했을 때 html의 data-link="#about"이런 것들이 호출 된다.
    console.log(event.target.dataset.link);
    // 호출된 link를 가져와 scrollTo에 넣어준다.
    const scrollTo = document.querySelector(link);
    // 가져온 링크에 스크롤인투뷰 함수와 그 함수에 포함된 스무스를 사용하여 깔끔하게 해당 위치로 이동한다.
    scrollTo.scrollIntoView({ behavior: 'smooth'});
});




