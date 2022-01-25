'use strict';
// data.json에 있는 데이터를 받아온다.
function loadItems() {
    return fetch('data/data.json')
    .then(response => response.json()) // response 오브젝트를 json api를 이용해서
    .then(json => json.items); //  body를 josn 오브젝트로 변환
}

function displayItems(items) {
     // 컨테이너에 정의된 이름
    const container = document.querySelector('.items');
    // 각각의 아이템을 createHTMLString함수를 이용해서 문자열로 변환 후,
    // join을 이용해서 문자열 배열을 한가지 문자열로 병합
    container.innerHTML = items.map(item => createHTMLString(item)).join(''); 
}

function createHTMLString(item) { // 병합된 문자열을 출력해 주는 것
    return `
    <li class="item">
        <img src="${item.image}" alt="${item.type}" class="productImg" />
        <span class="item_description">${item.gender}, ${item.size}</span>
    </li>
    `;
}

// 버튼이 클릭 되었을 때 이벤트
function onButtonClick(event, items) {
    const datset = event.target.dataset;
    const key = datset.key;
    const value = datset.value;

    // 키와 벨류가 전부 없을 때
    if (key == null || value == null) {
        return;
    }

    // 
    displayItems(items.filter(item => item[key] === value));

}

function setEventListeners(items) {
    const logo = document.querySelector('.logo');
    const btnContainer = document.querySelector('.btn__container');
    // 로고 클릭 시 전체 아이템 등장
    logo.addEventListener('click', () => displayItems(items));
    btnContainer.addEventListener('click', event => onButtonClick(event, items));
}

loadItems() // 아이템을 동적으로 받아와서 프로미스가 리턴이 되면
.then(items => { // 성공적으로 전달 받으면 
    console.log(items);
    displayItems(items); // 이 함수로 HTML에 아이템즈를 보여주고
    setEventListeners(items); // 이 함수로 버튼을 클릭했을 때 필터링 해준다.
})
// .catch(console.log)