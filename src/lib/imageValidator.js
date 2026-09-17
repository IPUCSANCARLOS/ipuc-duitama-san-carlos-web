/*
=========================================
 VALIDAR IMÁGENES BLOGGER
 GET REAL + CACHE
=========================================
*/


const imageCache = new Map();




export async function validateImages(images){


if(!images || !Array.isArray(images)){

return [];

}



const validImages=[];



for(const img of images){


const result =
await validateSingleImage(img);



if(result){

validImages.push(img);

}


}



return validImages;


}






async function validateSingleImage(url){



if(!url){

return false;

}




// evitar consultar dos veces

if(imageCache.has(url)){

return imageCache.get(url);

}





try{


const response =
await fetch(
url,
{
method:"GET",
headers:{
"Range":"bytes=0-1024"
}
}
);





const contentType =
response.headers.get(
"content-type"
);





const valid =

response.ok

&&

contentType

&&

contentType.startsWith(
"image/"
);






imageCache.set(
url,
valid
);




return valid;



}

catch(error){



console.warn(
"Imagen inválida:",
url
);



imageCache.set(
url,
false
);



return false;



}


}