import { currentUser } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server';
export async function POST(req: Request) {
    try {  
        const user = await currentUser()     
        const { event_name, event_time } = await req.json();
        console.log(user?.firstName, user?.lastName,user?.emailAddresses[0]?.emailAddress);
        console.log(event_name, event_time);
        return NextResponse.json({ message: "Event added successfully" }, { status: 200 });
    } catch (error) {
    console.log(error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}