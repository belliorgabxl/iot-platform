import { connect } from "@/dbConfig/dbConfig";
import Button from "../../../../models/buttonModel";
import { NextResponse } from "next/server";


export async function GET(request , {params}){
    await connect()
    const {id} = await params;
    const button = await Button.find({deviceId : id});
    if (!button){
        return NextResponse.json({message:"Not Found"}, { status: 200 })
      }
    return NextResponse.json(button, { status: 200 });
}