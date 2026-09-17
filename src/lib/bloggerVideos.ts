export function extractBloggerVideos(html:string){

if(!html){
return [];
}


const videos:string[] = [];


// Buscar iframe Youtube

const iframeRegex =
/<iframe[^>]+src=["']([^"']*youtube[^"']*)["'][^>]*>/gi;


let match;


while((match = iframeRegex.exec(html)) !== null){

const url = match[1];


videos.push(url);

}


return videos;

}