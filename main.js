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
    navbarMenu.classList.remove('open');
    // 함수로 만들었기 때문에 간단하게 작성할 수 있다.
    scrollIntoView(link);

    // 클릭했을 때 html의 data-link="#about"이런 것들이 호출 된다.
    // console.log(event.target.dataset.link);
    // // 호출된 link를 가져와 scrollTo에 넣어준다.
    // const scrollTo = document.querySelector(link);
    // // 가져온 링크에 스크롤인투뷰 함수와 그 함수에 포함된 스무스를 사용하여 깔끔하게 해당 위치로 이동한다.
    // scrollTo.scrollIntoView({ behavior: 'smooth'});


});

// 버튼을 클릭하면 메뉴 아이템이 나오도록
const navbarToggleBtn = document.querySelector('.navbar__toggle-btn');
navbarToggleBtn.addEventListener('click', () => {
    navbarMenu.classList.toggle('open');
});

// 위쪽 navbar__menu와 비슷한 방식 > 버튼 하나만 있기에 querySelector에서 바로 해당 아이디 네임 적어주면 된다.
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

// 프로젝트 카테고리 별로 보여주기
const workBtnContainer = document.querySelector('.work__categories');
const projectContainer = document.querySelector('.work__projects');
// 프로젝트스에 프로젝트들 전부를 받아온다.
const projects = document.querySelectorAll('.project');
workBtnContainer.addEventListener('click', (e) => {
    // 클릭 됐을 때 e를 받아와서 안에 타겟 안에 데이터 셋 안에 있는 필터 값을 받아 온다.
    // 그리고 버튼 안 숫자를 클릭했을 때 필터값이 없으면(||) parentNode(디버깅에서 찾은)의 데이터셋 필터값을 받아 온다.
    const filter = e.target.dataset.filter || e.target.parentNode.dataset.filter; 
    if(filter == null) { // 안전장치
        return;
    }

    // 이전 선택 아이템에서 selection 없애고 새로 선택된 버튼에게 select 넣어주기
    const active = document.querySelector('.category__btn.selected');
    active.classList.remove('selected');
    // 이 타겟에는 항상 버튼만 할당 되어 지는 식
    const target = e.target.nodeName === 'BUTTON' ? e.target : e.target.parentNode;
    target.classList.add('selected');

    // 클릭이 되면 컨테이너 자체에 anim-out 클래스 추가
    projectContainer.classList.add('anim-out');
    // 0.3초가 지나면 anim-out을 없애준다.
    setTimeout(() => { // 시간 순서상 setTimeout안에 데이터 처리 과정이 들어가야 애니메이션이 어색하지 않다.
        // 간단하게 .project 를 전부 불러온다.
        projects.forEach((project) => {
            // 필터가 전부 다 보여줘야 하는 '*'이거나 필터가 프로젝트의 타입이 똑같으면
            if(filter === '*' || filter === project.dataset.type) {
                // 프로젝트의 클래스에 invisible(안보여주는 클래스)을 제거해 준다.
                project.classList.remove('invisible');
            } else {
                project.classList.add('invisible');
            }
        });
        projectContainer.classList.remove('anim-out');
    }, 300);
});

// 모든 섹션 요소들과 메뉴 아이템들을 가지고 온다.
// IntersectionObserver를 이용해서 모든 섹션들을 관찰한다.
// 보여지는 섹션에 해당하는 메뉴 아이템을 활성화 시킨다.

const sectionIds = [
    '#home', 
    '#about', 
    '#skills',
    '#work', 
    // '#testimonials',
    '#contact',
];

// 해당하는 모든 섹션 요소와 각각 메뉴 아이템 가져옴
const sections = sectionIds.map(id => document.querySelector(id));
const navItems = sectionIds.map(id => document.querySelector(`[data-link="${id}"]`));
console.log(sections);
console.log(navItems);

// 선택된 메뉴 인덱스와 변수를 저장
let selectedNavIndex = 0;
let selectedNavItem = navItems[0];
// 새로운 메뉴 아이템을 선택할 때 마다
function selectNavItem(selected) {
    selectedNavItem.classList.remove('active'); // 이전 선택 지워주고
    selectedNavItem = selected; // 다시 새롭게 할당하고 나서
    selectedNavItem.classList.add('active'); // 액티브를 지정해 준다.
};

// 나중에 또 쓰일 수 있기 때문에 함수로 하나 만들어놓고 호출만 할 수 있게.
function scrollIntoView(selector) {
    const scrollTo = document.querySelector(selector);
    scrollTo.scrollIntoView({ behavior: 'smooth'});
    selectNavItem(navItems[sectionIds.indexOf(selector)]);
}

const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.3,
};

// 인터섹션 옵저버를 이용해서 섹션이 밖으로 나갈 때마다 그 다음에 해당하는 인덱스 계산 식
const observerCallback = (entries, observer) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting && entry.intersectionRatio > 0) { // 화면에서 빠져나갈 때 && 맨 앞 맨 뒤 선택되어지게
            const index = sectionIds.indexOf(`#${entry.target.id}`); // 요소마다 인덱스 번호 부여
            // 스크롤링이 아래로 되어서 페이지가 올라옴
            if (entry.boundingClientRect.y < 0) {
                selectedNavIndex = index + 1;
            } else {
                selectedNavIndex = index - 1;
            }
        }
    });
};

const observer = new IntersectionObserver(observerCallback, observerOptions);
sections.forEach(section => observer.observe(section));

// 스크롤링 했을 때
window.addEventListener('wheel', () => { // 사용자가 직접 스크롤 할 때는 wheel 이벤트가 발생하기 때문에 정말 손으로 스크롤링 할 때만
    if (window.scrollY === 0) { // 스크롤이 아직 안됐을 때 인덱스 번호 처음으로 지정
        selectedNavIndex = 0;
    } else if (window.scrollY + window.innerHeight === document.body.clientHeight) { // 마지막에 도달 했다면
        selectedNavIndex = navItems.length - 1; // 마지막 인덱스를 지정해 준다.
    }
    // 배열로 선언해 준 navItems의 부여된 인덱스 번호를 불러와 줌 > 해당 인덱스 번호가 됐을 때 메뉴바 강조 테두리 바뀜
    selectNavItem(navItems[selectedNavIndex]);
});