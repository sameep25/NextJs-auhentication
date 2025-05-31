import { NextResponse } from "next/server";


export async function GET() {
    try {
        const response = NextResponse.json(
            {success : true},
            {status : 200},
        )

        // set the cookies
        response.cookies.set("token", "" ,{httpOnly : true}) ;
        return response ;
        
    } catch (error) {
        return NextResponse.json(
            { error: error.message },
            { status: 400 }
        )
    }
}