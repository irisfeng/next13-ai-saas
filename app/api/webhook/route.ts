import Stripe from "stripe"
import { headers } from "next/headers"
import { NextResponse } from "next/server"

import prismadb from "@/lib/prismadb"
import { stripe } from "@/lib/stripe"

export async function POST(req: Request) {
  const body = await req.text()
  const signature = headers().get("Stripe-Signature") as string

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (error: any) {
    return new NextResponse(`Webhook Error: ${error.message}`, { status: 400 })
  }

  const session = event.data.object as Stripe.Checkout.Session

  if (event.type === "checkout.session.completed") {
    const subscription = await stripe.subscriptions.retrieve(
      session.subscription as string
    )

    if (!session?.metadata?.userId) {
      return new NextResponse("User id is required", { status: 400 });
    }

    await prismadb.userSubscription.create({
      data: {
        userId: session?.metadata?.userId,
        stripeSubscriptionId: subscription.id,
        stripeCustomerId: subscription.customer as string,
        stripePriceId: subscription.items.data[0].price.id,
        stripeCurrentPeriodEnd: new Date(
          subscription.current_period_end * 1000
        ),
      },
    })
  }

  if (event.type === "invoice.payment_succeeded") {
    const subscription = await stripe.subscriptions.retrieve(
      session.subscription as string
    )

    await prismadb.userSubscription.update({
      where: {
        stripeSubscriptionId: subscription.id,
      },
      data: {
        stripePriceId: subscription.items.data[0].price.id,
        stripeCurrentPeriodEnd: new Date(
          subscription.current_period_end * 1000
        ),
      },
    })
  }

  return new NextResponse(null, { status: 200 })
};

// import { NextResponse } from "next/server";
// import prismadb from "@/lib/prismadb";
// // import { PayPalClient } from "@/lib/paypal";

// export async function POST(req: Request) {
//   const body = await req.json();

//   try {
//     if (body.event_type === "BILLING.SUBSCRIPTION.CREATED") {
//       const subscriptionId = body.resource.id;
//       const userId = body.resource.custom_id ; 

//       await prismadb.userSubscription.create({
//         data: {
//           userId: userId,
//           paypalSubscriptionId: subscriptionId,
//           paypalCustomerId: body.resource.subscriber.payer_id,
//           paypalPlanId: body.resource.plan_id,
//           paypalCurrentPeriodEnd: new Date(
//             body.resource.billing_info.next_billing_time
//           ),
//         },
//       });
//     }

//     if (body.event_type === "BILLING.SUBSCRIPTION.UPDATED") {
//       const subscriptionId = body.resource.id;
//       const planId = body.resource.plan_id; // 获取新的计划 ID

//       await prismadb.userSubscription.update({
//         where: {
//           paypalSubscriptionId: subscriptionId,
//         },
//         data: {
//           paypalPlanId: planId,
//           paypalCustomerId: body.resource.subscriber.payer_id,
//           paypalCurrentPeriodEnd: new Date(
//             body.resource.billing_info.next_billing_time
//           ),
//           // 更新其他相关字段
//         },
//       });
//     }

//     // 处理其他 PayPal 事件...

//     return new NextResponse(null, { status: 200 });
//   } catch (error: unknown) {
//     console.error("[PAYPAL_ERROR]", error);
//     return new NextResponse(`Webhook Error: ${(error as Error).message}`, { status: 400 });
//   }
// };


