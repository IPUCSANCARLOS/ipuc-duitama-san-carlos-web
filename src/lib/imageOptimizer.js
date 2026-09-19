/**
 * ==========================================
 * OPTIMIZADOR BLOGGER SEGURO
 * IPUC SAN CARLOS
 * ==========================================
 */


function isBloggerImage(url){

return (

url.includes(
"blogger.googleusercontent.com"
)

||

url.includes(
"bp.blogspot.com"
)

);

}





export function optimizeBloggerImage(
url,
size=1200
){


if(!url){
return "";
}



if(!isBloggerImage(url)){

return url;

}



let optimized=url;




/*
================================
BLOGGER ANTIGUO
================================
*/


optimized =
optimized.replace(
/\/s\d+(-c)?\//,
`/s${size}/`
);



/*
================================
BLOGGER NUEVO
================================
*/


optimized =
optimized.replace(
/=s\d+(-c)?$/,
`=s${size}`
);



optimized =
optimized.replace(
/=w\d+-h\d+(-p)?$/,
`=s${size}`
);




/*
================================
SI YA TIENE PARAMETRO
NO TOCAR
================================
*/


if(
optimized.includes(
"=s"
)
){

return optimized;

}




return optimized;



}








export function optimizeGalleryImages(
images=[],
size=900
){


if(!Array.isArray(images)){

return [];

}



return images.map(

img=>

optimizeBloggerImage(
img,
size
)

);



}







export function optimizeCoverImage(
image
){


return optimizeBloggerImage(
image,
1400
);


}

export function createThumbnail(url){

if(!url){
return "";
}


return optimizeBloggerImage(
url,
400
);


}