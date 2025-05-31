import connectDb from "@/dbConfig/dbConfig";
import { NextResponse } from "next/server";
import User from "@/models/userModel";


export async function POST(request) {
    try {

        const reqBody = await request.body.json();
        console.log(reqBody);

        const { token } = reqBody;

        // find a user by token and its token expiry should be greater than current time
        const user = User.findOne({ verifyToken: token, verifyTokenExpiry: { $gt: Date.now() } });
        console.log(user);

        user.isVerified = true;
        user.verifyToken = undefined;
        user.verifyTokenExpiry = undefined;
        await user.save();

        return NextResponse.json({
            message: "Email verified",
            success: true
            }
        ) ;

    } catch (error) {
        return NextResponse.json(
            { error: error.message },
            { status: 500 },
        )
    }
}
