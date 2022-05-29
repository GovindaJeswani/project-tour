/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';
const stripe = Stripe('pk_test_51L3kdwSEB7l5pCJwTlpB5Z0zQanD0bGKXyOVI1NYK7uVYtXtGeYxsSrkAzKTKt7NawCRfF5kH4lI2ksp6I1kvCaZ00lVBDNu1W');

export const bookTour = async tourId => {
  try {
    // 1) Get checkout session from API
    // const session = await axios(`http://127.0.0.1:3000/api/bookings/checkout-session/${tourId}`);
    const session = await axios(`/api/bookings/checkout-session/${tourId}`);
    // console.log(session);

    // 2) Create checkout form + chanre credit card
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id
    });
  } catch (err) {
    console.log(err);
    showAlert('error', err);
  }
};
