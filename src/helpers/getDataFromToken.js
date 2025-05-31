import jwt from "jsonwebtoken";

export const getDataFromToken = async(request) =>{
    try{
        const token = await request.cookies.get("token")?.value || "" ;
        const decodedToken = jwt.verify(token ,process.env.TOKEN_SECRET) ;
        // console.log(decodedToken);
        return decodedToken;

    }catch(error){
        throw new Error(error.message) ;
    }
}