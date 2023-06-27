// profile_modification

// colorchange render함수
function colorChange() {
    const LightProfile = 'https://api.mandarin.weniv.co.kr/1687141773353.png'
    const LightPost = 'https://api.mandarin.weniv.co.kr/1687742174893.png'
    const ContrastProfile = 'https://api.mandarin.weniv.co.kr/1687827693364.png'
    const ContrastPost = 'https://api.mandarin.weniv.co.kr/1687742585629.png'

    const imgBtn = document.getElementById("img-btn"),
        imgUploadBtn = document.getElementById("image-upload-btn"),
        symbol = document.getElementById("symbol-image"),
        logo = document.getElementById("logo-image"),
        search = document.getElementById("search-icon");

    if ( localStorage.getItem('theme') === 'highContrast' ) {
        window.localStorage.setItem('theme', 'highContrast');
        document.querySelector('body > div').classList.add('highContrast');

        if(document.querySelector('body > div').classList.contains('.login-wrapper')){
            document.body.style.backgroundColor = '#E4D6FF';
        }else{
            document.body.style.backgroundColor = '#000000'; 
        }

        if(imgBtn) imgBtn.src = "../assets/img-btn-hc.svg";
        if(imgUploadBtn) imgUploadBtn.src = "../assets/upload-file-hc.svg";
        if(symbol) symbol.src = "../assets/symbol-logo-hc.svg";
        if(logo) logo.src = "../assets/logo-hc.svg"
        if(search) search.src = "../assets/icon/icon-search-highContrast.svg";
        
        document.querySelectorAll('img').forEach(item=>{
            if(item.src === LightProfile) item.src=ContrastProfile
            if(item.src === LightPost) item.src=ContrastPost
        })
    } else {
        window.localStorage.setItem('theme', 'light');
        wrapper.classList.remove('highContrast'); 
        document.body.style.backgroundColor = '#ffffff'; 

        if(imgBtn) imgBtn.src = "../assets/img-button.svg";
        if(imgUploadBtn) imgUploadBtn.src = "../assets/upload-file.svg";
        if(symbol) symbol.src = "../assets/symbol-logo.svg";
        if(logo) logo.src = "../assets/logo.svg";
        if(search) search.src = "../assets/icon/icon-search.svg";

        document.querySelectorAll('img').forEach(item=>{
            if(item.src === ContrastProfile) item.src= LightProfile
            if(item.src === ContrastPost) item.src= LightPost
        })
    }
}

// set theme
const radioGroup = document.getElementsByName('colorSet');
radioGroup.forEach((input) => {
    input.addEventListener('change', (e)=>{
        localStorage.setItem('theme',e.target.id)
        colorChange()
    });
});

// 
// 모달 이벤트 : localStorage set
// change 함수 : colorChange
