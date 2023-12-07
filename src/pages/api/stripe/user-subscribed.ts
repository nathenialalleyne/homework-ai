// import {NextApiRequest, NextApiResponse} from 'next';
// import { databaseRouter } from '@/server/api/routers/database-operations';
// import { db } from '@/server/db';
// import { getAuth } from '@clerk/nextjs/dist/types/server-helpers.server';
// import stripe from '@/utils/stripe';

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   let event

//   try{
//     event = stripe.webhooks.constructEvent(req.body, req.headers['stripe-signature'] as string[], process.env.STRIPE_TEST_KEY!)
//     switch(event.type) {
//       case 'payment_intent.succeeded':
//         const paymentIntent = event.data.object
//         const dbRouter = databaseRouter.createCaller({db: db, auth: getAuth(req)})
//         const userActions = await dbRouter.getRemainingUserActions({id: paymentIntent.metadata.userId!})
//         if(userActions === 0){
//           await dbRouter.updateUser({id: paymentIntent.metadata.userId!, actionsRemaining: 5})
//         }
//         else{
//           await dbRouter.updateUser({id: paymentIntent.metadata.userId!, actionsRemaining: userActions! + 5})
//         }

//     }
//     res.status(200)
//   }
//   catch(e: any){
//     res.status(400).send(`Webhook Error: ${e.message}`)
//   }
// }
