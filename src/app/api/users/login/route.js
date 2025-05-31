import connectDb from "@/dbConfig/dbConfig.js";
import User from "@/models/userModel";
import { NextResponse } from "next/server";
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken";

connectDb();

export async function POST(req, res) {
    try {
        const reqBody = await req.json();
        const { email, password } = reqBody;

        //check if User exists in db
        const user = await User.findOne({ email });

        // If user is not found in db
        if (!user) {
            return NextResponse.json(
                { error: "User does not exist" },
                { status: 400 }
            )
        }
        // validate password
        const validPassword = await bcryptjs.compare(password, user.password);

        // handle invalid password
        if (!validPassword) {
            return NextResponse.json(
                { error: "Invalid Password" },
                { status: 400 },
            )
        }
        //token data
        const tokenData = {
            id: user._id,
            email: user.email,
            username: user.username,
        }

        // create token
        const token = jwt.sign(tokenData, process.env.TOKEN_SECRET, { expiresIn: "2d" });

        //create response
        const response = NextResponse.json(
            { message: "Login Successful" },
            { success: true },
        )
        // setting cookies
        response.cookies.set("token", token,
            {
                httpOnly: true,
                maxAge: 60 * 60 * 24 * 2,
            }
        );

        return response;


    } catch (error) {
        return NextResponse.json(
            { error: error.message },
            { status: 500 },
        )
    }
}