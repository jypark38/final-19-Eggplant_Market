if(document.querySelector('.btn-back')){
    
    document.querySelector('.btn-back').addEventListener('click',()=>{
        const prevLink = document.referrer
        const isPrevUpload = prevLink.includes('modification') || prevLink.includes('upload')
        
        if(isPrevUpload){
            location.href = './home.html'
        }
        else{
            history.back()
        }
    })
}

function checkImageExtension(file){
    const validExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'];
    const extension = file.name.substring(file.name.lastIndexOf('.')).toLowerCase();
    return validExtensions.some(validExtension => extension.endsWith(validExtension));
}

function checkProfileImageUrl(Img){

    Img += ''

    const pattern = /^https:\/\/api\.mandarin\.weniv\.co\.kr\/(\d{13})\.png$/;

    if(pattern.test(Img)){
        console.log('통과!')
        return Img
    }
    else{
        if(Img.includes('https://api.mandarin.weniv.co.kr/https://api.mandarin.weniv.co.kr/')){
            const result = Img.replace('https://api.mandarin.weniv.co.kr/https://api.mandarin.weniv.co.kr/','https://api.mandarin.weniv.co.kr/')
            return checkImageUrl(result)
        }
        if(Img.includes('mandarin.api')){
            const result = Img.replace('mandarin.api','api.mandarin')
            return checkImageUrl(result)
        }

        const regex = /(\d+)\.png$/;
        const match = Img.match(regex);
        const fileNameWithExtension = match && match[1].length === 13 ? match[1] + ".png" : null

        if(fileNameWithExtension){
            return 'https://api.mandarin.weniv.co.kr/' + fileNameWithExtension;
        }
        
        if(Img.includes('Ellipse') || !fileNameWithExtension){
            return 'https://api.mandarin.weniv.co.kr/1687141773353.png'
        }
    }
}

// common

async function handleLike(event){
    const target = event.currentTarget;
    console.log(event.currentTarget)
    
    const postId = target.closest('li').dataset.postid;
    const isLiked = target.classList.contains('like');

    const action = isLiked ? 'unheart' : 'heart'
    const method = isLiked ? 'DELETE' : 'POST'
    
    result = await reqLike(postId, action, method)
    target.querySelector('span').textContent = `${result.heartCount}`
    result.hearted ? target.classList.add('like') : target.classList.remove('like')
    
}

async function reqLike(postId,act,method){
    try{
        const res = await fetch(`${url}/post/${postId}/${act}`, {
                        method: method,
                        headers : {
                            "Authorization" : `Bearer ${token}`,
                            "Content-type" : "application/json"
                        }
                    });
        const resJson = await res.json();

        return resJson.post
    } catch(err){
        console.error(err);
    }
}

if(document.querySelector('.tab-item-more a') !== null){
    document.querySelector('.tab-item-more a').href = `./profile_info.html?accountName=${localStorage.getItem('user-accountname')}`
}

function dateProcess(createdAt) {
    const itemDate = new Date(createdAt)
    const YEAR = itemDate.getFullYear()
    const MONTH = (itemDate.getMonth()+1) >= 10 ? (itemDate.getMonth()+1) : '0'+(itemDate.getMonth()+1)
    const DAY = itemDate.getDate()

    return `${YEAR}년 ${MONTH}월 ${DAY}일`
}