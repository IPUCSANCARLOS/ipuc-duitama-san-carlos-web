/*
=========================================
 EXTRACTOR BLOGGER SEGURO
 IPUC SAN CARLOS
=========================================
*/


function cleanOriginalUrl(url){

if(!url){
return null;
}


return url
.trim()
.replace(
/&amp;/g,
"&"
);

}





/*
=========================================
 EXTRAER IMÁGENES BLOGGER
=========================================
*/


export function extractBloggerImages(html){


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
cleanOriginalUrl(match[1]);



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
 CREAR URL BLOGGER OPTIMIZADA
=========================================
*/


export function optimizeBloggerUrl(
url,
size = 900
){

if(!url){
return "";
}


let optimized = url.trim();



/*
================================
Eliminar parámetros basura
================================
*/

optimized =
optimized.split("?")[0];



/*
================================
BLOGGER NUEVO
=w1200-h900
=w1080-h720-p-k-no
=w640-h640
================================
*/

optimized =
optimized.replace(
/=w\d+(?:-h\d+)?(?:-p)?(?:-k-no)?(?:-nu)?$/,
`=s${size}`
);

/*
================================
BLOGGER ANTIGUO

/s1600/
/s1200/
================================
*/

optimized =
optimized.replace(
/\/s\d+\//,
`/s${size}/`
);



/*
================================
BLOGGER =s1600
================================
*/

optimized =
optimized.replace(
/=s\d+/,
`=s${size}`
);



/*
================================
Si NO tiene formato
usar URL original

NO inventar parámetros
================================
*/


return optimized;


}