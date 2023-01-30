import moment from "moment";
import Stripe from "stripe";
const stripe = new Stripe("sk_test_51MErmnAhtP9RzsHySQu8mfHbmCHYVe5U1d286XIIK5PwtR8PRLhtOQNJ5xW5XPAHuR84nSWln2dFa89ed2nZJVvp004ATXy2Qm");

// this will create a customer in stripe
export const createCustomer = async (email, name) => {
    const customer = await getCustomerByEmailName(email);
    if (!customer) {
        return await stripe.customers.create({email, name});
    }

    return customer; 
}

// This will get the customer information including the ID of the user
export const getCustomerByEmailName = async (email, name) => {
    const result = await stripe.customers.list({email});
    if (result.data && result.data.length > 0) {
        return result.data[0]
    } else {
        return await stripe.customers.create({email, name});
    }
}
// This will generate a subscription checkout link to subscribe the user.
export const subscriptionCheckout = async (type, customer_id, price_id, old_sub_id=null) => {
    if (old_sub_id) {
        await cancelSubscription(old_sub_id);
    }
    
    const session = await stripe.checkout.sessions.create({
        success_url: `${window.location.origin}/confirmation?type=${type}`,
        cancel_url: `${window.location.origin}/settings`,
        customer: customer_id,
        client_reference_id: customer_id,
        line_items: [
          {price: price_id, quantity: 1},
        ],
        mode: 'subscription',
    });

    return session;
}
// This will fetch all subscription that belongs to a customer
export const getCustomerSubscriptions = async (customer_id, status='all') => {
    const subscriptions = await stripe.subscriptions.list({customer: customer_id, status});

    if (subscriptions.data && subscriptions.data.length > 0) {
        const active_subscription = subscriptions.data.find((item) => item.status == 'active');
        const cancel_subscription = subscriptions.data.find((item) => item.status == 'canceled');
        if (active_subscription) {
            return active_subscription;
        } else if (cancel_subscription && cancel_subscription.current_period_end < moment().valueOf()) {
            return cancel_subscription;
        } else {
            return null
        }
    } else {
        return null;
    }
}

export const cancelSubscription = async(sub_id) => {
    return await stripe.subscriptions.del(sub_id, {prorate: true, invoice_now: true});
}