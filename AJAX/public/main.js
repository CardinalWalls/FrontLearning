

console.log("I'm main.js2");

getHTML.onclick = ()=>{
    const request = new XMLHttpRequest()
    request.open('GET', '/3.html')

    request.onreadystatechange = ()=>{
        if(request.readyState===4){
            if(request.status>=200 && request.status<300){
                const myDiv = document.createElement('div')
                myDiv.innerHTML = request.response;
                document.body.appendChild(myDiv) 
            }else{
                alert('failed when load HTML')
            }
        }
    }
    
    request.send()
}

getCSS.onclick = ()=>{
    const request = new XMLHttpRequest()
    request.open('GET', '/style.css')
    request.onreadystatechange = ()=>{
        if(request.readyState===4){
            if(request.status>=200 && request.status<300){
                const myStyle = document.createElement('style')
                myStyle.innerHTML = request.response;
                document.head.appendChild(myStyle)  
            }else{
                alert('failed when load CSS')
            }
        }
    }
    
    request.send()
}

getJS.onclick = ()=>{
    const request = new XMLHttpRequest()
    request.open('GET', '/2.js')
    request.onreadystatechange = ()=>{
        if(request.readyState===4){
            if(request.status>=200 && request.status<300){
                const myScript = document.createElement('script')
                myScript.innerHTML = request.response;
                document.head.appendChild(myScript)
            }else{
                alert('failed when load JS')
            }
        }
    }
    
    request.send()
}

getXML.onclick = ()=>{
    const request = new XMLHttpRequest()
    request.open('GET', '/4.xml')
    request.onreadystatechange = ()=>{
        if(request.readyState===4){
            if(request.status>=200 && request.status<300){
                const myDOM = request.responseXML;
                const text = myDOM.getElementsByTagName('warning')[0].textContent;
                console.log(text.trim())
            }else{
                alert('failed when load XML')
            }
        }
    }
    
    request.send()
}

getJSON.onclick = ()=>{
    const request = new XMLHttpRequest()
    request.open('GET', '/5.json')
    request.onreadystatechange = ()=>{
        if(request.readyState===4){
            if(request.status>=200 && request.status<300){
                const object = JSON.parse(request.response)
                console.log(object)
                myName.textContent = object.name;
            }else{
                alert('failed when load JSON')
            }
        }
    }
    
    request.send()
}

let pageN = 1;
getPage.onclick = ()=>{
    const request = new XMLHttpRequest()
    request.open('GET', `/p${pageN + 1}`)
    request.onreadystatechange = ()=>{
        if(request.readyState===4){
            if(request.status>=200 && request.status<300){
                let array = JSON.parse(request.response)
                array.forEach(element => {
                    let li = document.createElement("li");
                    li.textContent = element.id;
                    xxx.appendChild(li);
                });
            }else{
                alert('failed when load NextPage')
            }
            pageN++;
        }
    }
    
    request.send()
}