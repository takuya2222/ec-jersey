import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { getProductById } from '../../utils/products';

function Checkout() {
  const router = useRouter();
  const { productId } = router.query;
  const product = getProductById(parseInt(productId, 10));

  const [clientSecret, setClientSecret] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [succeeded, setSucceeded] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    if (!product) return;

    const createPaymentIntent = async () => {
      const response = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: product.price,
        }),
      });

      const data = await response.json();
      setClientSecret(data.clientSecret);
    };

    createPaymentIntent();
  }, [product]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (error) {
      setErrorMessage(error.message);
    } else {
      const { error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: paymentMethod.id,
      });

      if (confirmError) {
        setErrorMessage(confirmError.message);
      } else {
        setSucceeded(true);
        router.push('/success');
      }
    }
  };

  return (
    <>
      {product && (
        <div>
          <h1>{product.name}</h1>
          <p>価格: {product.price}円</p>
          <form onSubmit={handleSubmit}>
            <CardElement />
            <button type="submit" disabled={!stripe || succeeded}>
              支払う
            </button>
          </form>
          {errorMessage && <p>{errorMessage}</p>}
        </div>
      )}
    </>
  );
}

export default Checkout;
