import { currentUser } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server';
import crypto from 'crypto'

const pixel_id = process.env.FACEBOOK_PIXEL_ID;
const access_token = process.env.FACEBOOK_ACCESS_TOKEN;
const current_timestamp= new Date().toISOString();

export async function POST(req: Request) {
    try {  
      const user = await currentUser()
      const first_name = user?.firstName || ""
      const last_name = user?.lastName || ""
      const email = user?.emailAddresses[0]?.emailAddress || ""
      const hash_first_name = crypto.createHash('sha256').update(first_name).digest('hex');
      const hash_last_name = crypto.createHash('sha256').update(last_name).digest('hex');
      const hash_email = crypto.createHash('sha256').update(email).digest('hex');
        
      const data = [
        {
          event_name: "Contact",
          event_time: current_timestamp,
          action_source: "website",
          event_source_url: "https://test-app-seven-steel.vercel.app/contact",
          user_data: {
          em: hash_email,
          fn: hash_first_name,
          ln: hash_last_name,
          client_user_agent: req.headers.get('user-agent')
          }
        }
      ]
      

      const fb_response = await fetch(`https://graph.facebook.com/v24.0/${pixel_id}/events?access_token=${access_token}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({data}),
            
      })
      console.log("Facebook Response:", await fb_response.json())
      return NextResponse.json({ message: "Event added successfully" }, { status: 200 });
    } catch (error) {
      
      console.log(error);
      return new NextResponse("Internal Error", { status: 500 });
  }
}