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

    // 함수로 만들었기 때문에 간단하게 작성할 수 있다.
    scrollIntoView(link);

    // 클릭했을 때 html의 data-link="#about"이런 것들이 호출 된다.
    // console.log(event.target.dataset.link);
    // // 호출된 link를 가져와 scrollTo에 넣어준다.
    // const scrollTo = document.querySelector(link);
    // // 가져온 링크에 스크롤인투뷰 함수와 그 함수에 포함된 스무스를 사용하여 깔끔하게 해당 위치로 이동한다.
    // scrollTo.scrollIntoView({ behavior: 'smooth'});
});
// 위와 비슷한 방식 > 버튼 하나만 있기에 querySelector에서 바로 해당 아이디 네임 적어주면 된다.
const homeContact = document.querySelector('.home__contact');
homeContact.addEventListener('click', () => {
    scrollIntoView('#contact');
});

// 크롤링 될수록 홈이 투명해 진다.
const home = document.querySelector('.home__container');
const homeHight = home.getBoundingClientRect().height;
document.addEventListener('scroll', () => {
    home.style.opacity = 1 - window.scrollY / homeHight; // homeHight이 800이고 스크롤이 800이면 = 1 그럼 1- 1 은 0(불투명)

});

// 스크롤링 되면 화살표 버튼이 나타 난다.
const arrowUp = document.querySelector('.arrow-up');
document.addEventListener('scroll', () => {
    if(window.scrollY > homeHight /2) {
        arrowUp.classList.add('visible'); // css에 있는 visible
    } else {
        arrowUp.classList.remove('visible');
    }
});

// 화살표 버튼 클릭 시 home으로 올라가게 한다.
arrowUp.addEventListener('click', () => {
    scrollIntoView('#home');
});



// 나중에 또 쓰일 수 있기 때문에 함수로 하나 만들어놓고 호출만 할 수 있게.
function scrollIntoView(selector) {
    const scrollTo = document.querySelector(selector);
    scrollTo.scrollIntoView({ behavior: 'smooth'});
}

