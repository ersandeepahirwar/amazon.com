import { buffer } from "micro";

import * as admin from "firebase-admin";

const serviceAccount = require("../../../permissions.json");
const app = !admin.apps.length
  ? admin.initializeApp({ credential: admin.credential.cert(serviceAccount) })
  : admin.app();

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const webhookEndpointSecret = process.env.WEBHOOK_SIGNING_SECRET;

const fulfillOrder = async (session) => {
  return app
    .firestore()
    .collection("users")
    .doc(session.metadata.email)
    .collection("orders")
    .doc(session.id)
    .set({
      amount: session.amount_total / 100,
      amount_shipping: session.total_details.amount_shipping / 100,
      amount_discount: session.total_details.amount_discount / 100,
      images: JSON.parse(session.metadata.images),
      timestamp: admin.firestore.FieldValue.serverTimestamp(),
    })
    .then(() => {
      console.log(
        `SUCCESS: Order ${session.id} has been added to the Database.`
      );
    });
};

export default async (request, response) => {
  if (request.method === "POST") {
    const requestBuffer = await buffer(request);
    const payload = requestBuffer.toString();
    const signature = request.headers["stripe-signature"];

    let event;
    try {
      event = stripe.webhooks.constructEvent(
        payload,
        signature,
        webhookEndpointSecret
      );
    } catch (error) {
      return response.status(400).send(`Webhook error: ${error.message}`);
    }

    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      return fulfillOrder(session)
        .then(() => response.status(200))
        .catch((error) =>
          response.status(400).send(`Webhook Error: ${error.message}`)
        );
    }
  }
};

export const config = {
  api: {
    bodyParser: false,
    externalResolver: true,
  },
};
