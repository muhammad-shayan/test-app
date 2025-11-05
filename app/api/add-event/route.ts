import { currentUser } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server';
const bizSdk = require('facebook-nodejs-business-sdk') 

const EventRequest = bizSdk.EventRequest;
const UserData = bizSdk.UserData;
const ServerEvent = bizSdk.ServerEvent;
const pixel_id = process.env.FACEBOOK_PIXEL_ID;
const access_token = process.env.FACEBOOK_ACCESS_TOKEN;
const api = bizSdk.FacebookAdsApi.init(access_token);

const current_timestamp= new Date().toISOString();

export async function POST(req: Request) {
    try {  
        const user = await currentUser()     
        //const { event_name, event_time } = await req.json();
        //console.log(user?.firstName, user?.lastName,user?.emailAddresses[0]?.emailAddress);
        //console.log(event_name, event_time);
        const userData = (new UserData())
          .setEmails(user?.emailAddresses[0]?.emailAddress)
          .setClientUserAgent(req.headers.get('user-agent'))
        
        const serverEvent = (new ServerEvent())
                .setEventName('Purchase')
                .setEventTime(current_timestamp)
                .setUserData(userData)
                .setEventSourceUrl('http://shoe-market.com/product/123')
                .setActionSource('website');

        const eventsData = [serverEvent];
        const eventRequest = (new EventRequest(access_token, pixel_id))
                .setEvents(eventsData);
        const response = await eventRequest.execute();
        console.log(response);
        return NextResponse.json({ message: "Event added successfully" }, { status: 200 });
    } catch (error) {
    console.log(error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}