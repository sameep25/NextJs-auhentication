import connectDb from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs"
import { NextResponse } from 'next/server';

connectDb();

export async function POST(req, res) {
    try {
        const reqBody = await req.json();
        const { username, email, password } = reqBody;

        // check if user already exits
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return NextResponse.json(
                { error: "User already exists" },
                { status: 400 }
            );
        }

        // encrypt password
        const salt = await bcryptjs.genSalt();
        const hashedPassword = await bcryptjs.hash(password, salt);

        // save new user to db
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
        })

        const savedUser = await newUser.save();
        // console.log("Saved User :", savedUser);

        return NextResponse.json(
            {
                message: "User created successfully",
                success: true,
                user: savedUser,
            },
            { status: 201 }
        );

    } catch (error) {
        return NextResponse.json(
            { error: error.message },
            { status: 500 }
        );
    }
}
