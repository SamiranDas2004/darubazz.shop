import Address from "../models/address.model";

export const Address =async(req,res)=>{
    const {username,state,city,zipcode,locatioon}=req.body


if (!(username && state && city && zipcode && locatioon)) {
    return res.status(400).json("have to fill all the fields")
}
const address=await Address.create({
    username,city,zipcode,locatioon
})


if (!address) {
    return res.status(401).json(" failed to create address")
}

return res.status(200).json("user address",address)

}

export const updateAddress=async(req,res)=>{
    const {username}=req.params
}