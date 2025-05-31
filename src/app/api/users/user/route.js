import { getDataFromToken } from "@/helpers/getDataFromToken";
import connectDb from "@/dbConfig/dbConfig";
import { NextResponse } from "next/server";
import User from "@/models/userModel";

connectDb() ;
export async function GET(request) {
    try{
        const userData = await getDataFromToken(request) ;
        const userId = userData.id ;
        // console.log(userId); 
        const user = await User.findOne({_id : userId}).select("-password") ; 
        return NextResponse.json(
            {userData : user , message : "User found"},
        )

    }catch(error){
        return NextResponse.json(
            {error : error.message},
            {status : 400},
        )
    }
}

