/*
=========================================
 EXTRACTOR + OPTIMIZADOR BLOGGER
 IPUC SAN CARLOS
=========================================
*/


function cleanUrl(
url,
size=900
){

if(!url){

return null;

}


url=url.trim();


// quitar parámetros basura

url=url.split("?")[0];



// Blogger formato:

// /s16000/
// /s400/
// /s0/

url=url.replace(
/\/s\d+(-c)?\//,
`/s${size}/`
);



// Blogger formato:

// =s16000

url=url.replace(
/=s\d+(-c)?/,
`=s${size}`
);



// Blogger formato:

// =w1200-h800

url=url.replace(
/=w\d+-h\d+/,
`=s${size}`
);



return url;

}





/*
=========================================
 EXTRAER IMÁGENES BLOGGER
=========================================
*/


export function extractBloggerImages(
html,
size=900
){


if(!html){

return [];

}



const images=[];



const regex =

/<img[^>]+src=["']([^"']+)["']/gi;




for(
const match of html.matchAll(regex)
){



const url =
cleanUrl(
match[1],
size
);




if(!url){

continue;

}





if(

url.includes(
"blogger.googleusercontent.com"
)

||

url.includes(
"bp.blogspot.com"
)

){


images.push(url);


}



}





return [

...new Set(images)

];


}







/*
=========================================
 PORTADA
=========================================
*/


export function optimizeCoverImage(
url
){

return cleanUrl(
url,
1200
);

}







/*
=========================================
 GALERIA
=========================================
*/


export function optimizeGalleryImages(
images=[]
){


if(
!Array.isArray(images)
){

return [];

}



return images.map(
img=>
cleanUrl(
img,
900
)

).filter(Boolean);



}







/*
=========================================
 VALIDACIÓN CACHE
=========================================
*/


const imageCache =
new Map();





export async function validateImages(
images
){


if(
!Array.isArray(images)
){

return [];

}




const valid=[];




for(
const img of images
){



if(
await validateSingleImage(img)
){

valid.push(img);

}


}



return valid;


}





async function validateSingleImage(
url
){


if(
imageCache.has(url)
){

return imageCache.get(url);

}



try{


const response =
await fetch(
url,
{
method:"GET",
headers:{
Range:"bytes=0-1024"
}
}
);



const type =
response.headers.get(
"content-type"
);



const ok =
response.ok
&&
type
&&
type.startsWith(
"image/"
);




imageCache.set(
url,
ok
);



return ok;



}

catch{


imageCache.set(
url,
false
);


return false;


}


}