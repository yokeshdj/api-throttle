var input = document.getElementById("input");
input.addEventListener("keypress",function(){
    throttleFn();
})
var keySubmit = document.getElementById("submit-btn");
keySubmit.addEventListener("click",function(){
    var key = document.getElementById("key").value;
})
var resultHolder = document.getElementById("results");
function handleSearch(){
    fetchData(input.value)
    .then(res =>{
        if(res.Response=="False"){
            var p = document.createElement("p");
            resultHolder.innerHTML = null
            p.textContent = "Enter few more words"
            resultHolder.append(p);
        }
        else{
            console.log(res,input.value);
             handleResults(res.Search)
        }

    })
    .catch(err=>console.log(err));
        
}

function handleResults(data){
    resultHolder.innerHTML = null;
    var allData = [];
    for(title of data){
        // allData.push(title.Title)
        var div = document.createElement("div");
        div.className = "dataHolder"
        div.innerText = title.Title;
        resultHolder.append(div);
    }
    console.log(allData);
    // resultHolder.append(...allData);
}

function throttler(search,delay){
    let lastCall = Date.now();
    return function (){
        let now = Date.now();
        if(now-lastCall > delay){
            lastCall = now;
            search();
        }
    }
}

var throttleFn = throttler(handleSearch,1000);
function fetchData(q){
    console.log(key);
    return fetch(`http://www.omdbapi.com/?s=${q}&apikey=${key.value}&page=1`)
    .then(res=>res.json())
    .catch(err=>console.log(err))
}