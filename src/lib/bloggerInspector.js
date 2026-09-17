/*
=========================================
 INSPECTOR IMÁGENES BLOGGER
=========================================
*/


export async function inspectImage(url){


try{


const response = await fetch(url,{
method:"HEAD"
});


return {

url:url,

status:response.status,

type:
response.headers.get(
"content-type"
),

size:
response.headers.get(
"content-length"
)


};



}catch(error){


return {

url:url,

error:error.message

};


}


}