import { currentUser } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server';
//const bizSdk = require('facebook-nodejs-business-sdk') 

//const EventRequest = bizSdk.EventRequest;
//const UserData = bizSdk.UserData;
//const ServerEvent = bizSdk.ServerEvent;
const pixel_id = process.env.FACEBOOK_PIXEL_ID;
const access_token = process.env.FACEBOOK_ACCESS_TOKEN;
//const api = bizSdk.FacebookAdsApi.init(access_token);

const current_timestamp= new Date().toISOString();

export async function POST(req: Request) {
    try {  
        const user = await currentUser()     
        //const { event_name, event_time } = await req.json();
        //console.log(user?.firstName, user?.lastName,user?.emailAddresses[0]?.emailAddress);
        //console.log(event_name, event_time);
        //const userData = (new UserData())
        //  .setEmails(user?.emailAddresses[0]?.emailAddress)
        //  .setClientUserAgent(req.headers.get('user-agent'))
        
        //const serverEvent = (new ServerEvent())
        //        .setEventName('Purchase')
        //        .setEventTime(current_timestamp)
        //        .setUserData(userData)
        //        .setEventSourceUrl('http://shoe-market.com/product/123')
        //        .setActionSource('website');

        //const eventsData = [serverEvent];
        //const eventRequest = (new EventRequest(access_token, pixel_id))
        //        .setEvents(eventsData);
        //eventRequest.execute().then(
        //  (response: any) => {
        //    console.log('Response: ', response);
        //  },
        //  (err: any) => {
        //    console.error('Error: ', err);
        //  })
      const data = [
        {
          event_name: "Purchase",
          event_time: 1762371072,
          user_data: {
            em: ["309a0a5c3e211326ae75ca18196d301a9bdbd1a882a4d2569511033da23f0abd"],
            ph: [
              "254aa248acb47dd654ca3ea53f48c2c26d641d23d7e2e93a1ec56258df7674c4",
              "6f4fcb9deaeadc8f9746ae76d97ce1239e98b404efe5da3ee0b7149740f89ad6"
            ],
          client_ip_address: "123.123.123.123",
          client_user_agent: "$CLIENT_USER_AGENT",
          fbc: "fb.1.1554763741205.AbCdEfGhIjKlMnOpQrStUvWxYz1234567890",
          fbp: "fb.1.1558571054389.1098115397"
        },
        custom_data: {
        currency: "usd",
        value: 123.45,
        contents: [
        {
          id: "product123",
          quantity: 1,
          delivery_category: "home_delivery"
        }
      ]
    },
    event_source_url: "http://jaspers-market.com/product/123",
    action_source: "website"
  }
];



const fb_response = await fetch(`https://graph.facebook.com/v24.0/${pixel_id}/events?access_token=${access_token}`, {
  method: "POST",
  body: JSON.stringify({ data}),
})
  console.log("Facebook Response:", await fb_response.json())
        return NextResponse.json({ message: "Event added successfully" }, { status: 200 });
    } catch (error) {
    console.log(error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}