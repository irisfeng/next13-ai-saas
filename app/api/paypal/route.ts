import { auth, currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";
import { PayPalClient } from "@/lib/paypal"; // 引入 PayPal 客户端配置
import { absoluteUrl } from "@/lib/utils";

const settingsUrl = absoluteUrl("/settings");

export async function GET() {
  try {
    const { userId } = auth();
    const user = await currentUser();

    if (!userId || !user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const userSubscription = await prismadb.userSubscription.findUnique({
      where: {
        userId
      }
    });

    if (userSubscription && userSubscription.paypalCustomerId) {
      // 如果用户已有 PayPal 订阅，重定向到 PayPal 订阅管理界面（假设您已有逻辑处理这部分）
      // ...
    } else {
        // 如果用户没有 PayPal 订阅，创建 PayPal 订单
      const request = new PayPalClient.orders.OrdersCreateRequest();
      request.requestBody({
        intent: 'CAPTURE',
        purchase_units: [{
          amount: {
            currency_code: 'USD',
            value: '15.00'
          },
          description: 'Unlimited AI Generations'
        }],
        application_context: {
          brand_name: 'PantheonAI Pro',
          return_url: settingsUrl,
          cancel_url: settingsUrl
        }
      });

      const order = await PayPalClient.execute(request);

      return new NextResponse(JSON.stringify({ url: order.result.links[1].href }));
    }
  } catch (error) {
    console.error("[PAYPAL_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
