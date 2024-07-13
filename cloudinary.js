/* require ('dotenv').config()

const cloudinary = require('cloudinary').v2

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
}) */

//cloudinary.api.root_folders().then(res => console.log(res)); 

// cloudinary.api.sub_folders('sample').then(res => console.log(res));

/* cloudinary.api
.delete_resources(['educational-resources/mpepfytgb0qukhhnvboi'],{
    type: 'authenticated', resource_type: 'raw'
})
.then (res => console.log(res))
.catch (err => console.log(err)); */

/* cloudinary.uploader.destroy('qtns9vji1byfg3ubrlok.pdf')
.then(res => console.log(res))
.catch(er => console.log(er)) */

/* cloudinary.v2.uploader.upload_large("my_large_video.mp4", 
    { resource_type: "video" }, 
   function(error, result) {console.log(result, error); }); */

   
/* const fs = require('fs')

const path = require('path')
const axios = require('axios');

async function download(){
    const url = 'https://res.cloudinary.com/dg0d0jmtz/raw/upload/v1720059048/educational-resources/file-1720059047256.pptx'
    const Path = path.resolve(__dirname, 'file', 'er')

    const res = await axios.get(url, {responseType: 'stream'})
    res.data.pipe(fs.createWriteStream(Path))

    return new Promise((resolve, reject) => {
        res.data.on('end', () => resolve('downloaded'));
        res.data.on('error', (err) => reject(err));
    })

}

download() */

/* const WolframAlphaAPI = require('@wolfram-alpha/wolfram-alpha-api');
const waApi = WolframAlphaAPI('T6YRT5-7G4QGAUYRL');

const formatAnswer = answer => `<strong class="answer">${answer}</strong>`;
waApi.getShort('20! seconds in years').then((data) => {
  console.log(formatAnswer(data));
}).catch(console.error); */


