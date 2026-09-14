document.documentElement.classList.add(
"js-enabled"
);


document.addEventListener(
"DOMContentLoaded",
()=>{


const elements =
document.querySelectorAll(
"[data-animate]"
);



if(!elements.length){

return;

}



const observer =
new IntersectionObserver(

(entries)=>{


entries.forEach(

(entry)=>{


if(entry.isIntersecting){


entry.target.classList.add(
"animate-visible"
);


observer.unobserve(
entry.target
);


}


});


},

{

threshold:0.15,

rootMargin:
"0px 0px -80px 0px"

}

);



elements.forEach(

(element)=>{


observer.observe(
element

);


});


}

);