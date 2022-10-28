
class Ui{
    constructor(themes){
this.checked=true;
    }
listStack(lis){
    
    lis.forEach(li => {
        li.style.left="-100%";
     })
        let timeDelay=0.1;
     lis.forEach(li => {
    
        li.style.animationName="slide-in";
        li.style.animationDelay=`${timeDelay}s`;
        timeDelay+=0.1;
        setTimeout(()=>{
            li.style.left="0%";
        },1000)
        
     });
}
changeListType(multiplier){
    
    let ul=document.querySelector("ul");
    let ulWidth=ul.clientWidth;
    let listsContainer=document.querySelector(".lists-container");
listsContainer.style.transform=`translateX(${multiplier*ulWidth}px)`
}
crossTask(e){
    const list=new List()
    if (e.target.classList.contains("check-btn")){
        e.target.classList.add("check-btn-checked");
        e.target.parentElement.classList.add("li-crossed");
        
        list.appendToCompletedList(e.target.parentElement.cloneNode(true));
list.updateLocalStorage();

    }
    else{
        e.target.parentElement.classList.remove("check-btn-checked");
        e.target.parentElement.parentElement.classList.remove("li-crossed");
    //  remove marked task from compteled list;
    document.querySelector(".completed-tasks").childNodes.forEach((child)=>{
        if (child.innerText===e.target.parentElement.parentElement.innerText){
            
            child.style.animationName="slide-out";
            list.appendToActiveList(e.target.parentElement.parentElement.cloneNode(true))
            setTimeout(()=>{
           
                child.remove();
            },1000)
    
    
}
})
}
document.querySelector(".active-tasks").childNodes.forEach((child)=>{
    if (child.innerText===e.target.parentElement.innerText){
        
        child.style.animationName="slide-out";
        setTimeout(()=>{
           
                child.remove();
            },1000)
           
    }
})
}
}