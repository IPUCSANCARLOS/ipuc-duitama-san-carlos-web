import Parser from "rss-parser";



const parser = new Parser();



const BLOG_URL =
"https://ipucsancarlos.blogspot.com/feeds/posts/default?alt=rss&max-results=100";






export async function getPosts(){


const feed = await parser.parseURL(BLOG_URL);



return feed.items

.filter(item => item.title)



.sort(

(a,b)=>

new Date(b.pubDate) - new Date(a.pubDate)

)



.map((item)=>{


const content =

item.content ||

item["content:encoded"] ||

"";





return {


title:

cleanText(item.title),



link:

item.link,



date:

item.pubDate,



content:

cleanContent(content),



slug:

createSlug(item.title),



image:

getImage(content),



description:

getDescription(content)



};



});



}









/*
CREAR URL AMIGABLE
*/

function createSlug(title){


return title

.toString()

.toLowerCase()

.normalize("NFD")

.replace(/[\u0300-\u036f]/g,"")

.replace(/[^a-z0-9\s-]/g,"")

.trim()

.replace(/\s+/g,"-")

.replace(/-+/g,"");


}









/*
OBTENER IMAGEN PRINCIPAL
*/

function getImage(content){


if(!content){

return "/images/logo-san-carlos.png";

}



const match =

content.match(

/<img[^>]+src=["']([^"']+)["']/

);



return match

? match[1]

: "/images/logo-san-carlos.png";


}









/*
LIMPIAR CONTENIDO COMPLETO
*/

function cleanContent(html){


if(!html){

return "";

}



return html


// eliminar estilos Blogger

.replace(
/<style[\s\S]*?<\/style>/gi,
""
)


// eliminar scripts

.replace(
/<script[\s\S]*?<\/script>/gi,
""
)


// eliminar comentarios HTML

.replace(
/<!--[\s\S]*?-->/g,
""
)


// eliminar comentarios CSS

.replace(
/\/\*[\s\S]*?\*\//g,
""
)


// eliminar atributos style

.replace(
/style="[^"]*"/gi,
""
)


// eliminar clases Blogger

.replace(
/class="[^"]*"/gi,
""
)


// eliminar divs vacíos

.replace(
/<div>\s*<\/div>/gi,
""
)

.trim();


}









/*
CREAR DESCRIPCIÓN PARA TARJETAS
*/

function getDescription(content){

if(!content){

return "";

}


return cleanText(

content

// quitar estilos

.replace(/<style[\s\S]*?<\/style>/gi,"")


// quitar scripts

.replace(/<script[\s\S]*?<\/script>/gi,"")


// quitar comentarios

.replace(/<!--[\s\S]*?-->/g,"")


// quitar etiquetas html

.replace(/<[^>]+>/g,"")


// quitar emojis de controles Blogger

.replace(/🔍|×|›|‹/g,"")


// quitar caracteres html

.replace(/&#10005;/g,"")

.replace(/&#10094;/g,"")

.replace(/&#10095;/g,"")


// espacios

.replace(/\s+/g," ")

.substring(0,220)

);


}








/*
LIMPIAR TEXTO
*/

function cleanText(text){


if(!text){

return "";

}



return text


.replace(/&nbsp;/g," ")

.replace(/&#20;/g," ")

.replace(/&#39;/g,"'")

.replace(/&quot;/g,'"')

.replace(/&amp;/g,"&")

.replace(/&#8217;/g,"'")

.replace(/&#8220;/g,'"')

.replace(/&#8221;/g,'"')

.replace(/\s+/g," ")

.trim();



}