import {v2 as cloudinary} from 'cloudinary';
        import fs, { unlink } from 'fs'
        
        
cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY_, 
  api_secret: process.env.CLOUDINARY_API_SECRET 
});


export const uploadOnCloudinary=async(localpath)=>{
try {
        if (!localpath) {
        return null
        }
    
        const response= await cloudinary.uploader.upload(localpath,{
            resource_type:"auto"
        })
    
        console.log(response);
        // unlink.unlinkSync(localpath)
        return response
} catch (error) {
    fs.unlinkSync(localpath)
    return null
}

}


// const uploadOnCloudnary= async (localFilePath)=>{
//     try {
//         if (!localFilePath) return null
//         // upload the file on cloudinary
//       const response= await cloudinary.uploader.upload(
//             localFilePath,{
//                 resource_type:"auto"
//             }
//         )
//         fs.unlinkSync(localFilePath)
//         console.log( 'response is:',response)
//         return response
//     } catch (error) {
//         fs.unlinkSync(localFilePath)// removed the localy saved files as the uplode operation got failed
//         return null;
//     }
// }