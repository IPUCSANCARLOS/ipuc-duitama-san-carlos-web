/*
=========================================
 EXTRACTOR SEGURO BLOGGER
=========================================
*/


function cleanUrl(url){

if(!url){
return null;
}


url=url.trim();


// eliminar parámetros basura

url=url.split("?")[0];


// formatos antiguos

url=url.replace(
/\/s\d+(-c)?\//,
"/s1600/"
);


// formatos nuevos

url=url.replace(
/=s\d+(-c)?/,
"=s1600"
);


url=url.replace(
/=w\d+-h\d+/,
"=s1600"
);


return url;

}





export function extractBloggerImages(html){


if(!html){

return [];

}


const images=[];



/*
buscar solamente src de imágenes
*/

const regex =
/<img[^>]+src=["']([^"']+)["']/gi;



for(
const match of html.matchAll(regex)
){


let url =
cleanUrl(match[1]);



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

)

{


images.push(url);


}



}




/*
Eliminar repetidas
*/

return [
...new Set(images)
];


}