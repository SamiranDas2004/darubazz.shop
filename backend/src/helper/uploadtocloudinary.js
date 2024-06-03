import {v2 as cloudinary} from 'cloudinary';
        import fs from 'fs'
      
          
        cloudinary.config({ 
          cloud_name: 'dfjfjovut', 
          api_key: '149544752172973', 
          api_secret: 'U5ItBKdO8hDIamslh1OAufRco_k' 
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
        fs.unlinkSync(localpath)
        return response
} catch (error) {
    fs.unlinkSync(localpath)
   throw new Error(error.message)
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