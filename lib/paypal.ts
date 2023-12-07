// @/lib/paypal.ts

import * as paypal from '@paypal/checkout-server-sdk';

function environment() {
    let clientId = process.env.PAYPAL_CLIENT_ID;
    let clientSecret = process.env.PAYPAL_CLIENT_SECRET;

    return process.env.NODE_ENV === "production" ?
        new paypal.core.LiveEnvironment(clientId!, clientSecret!) :
        new paypal.core.SandboxEnvironment(clientId!, clientSecret!);
}

export const PayPalClient = new paypal.core.PayPalHttpClient(environment());
