import React, { useEffect, useState } from 'react'
import {CardElement, useElements, useStripe} from '@stripe/react-stripe-js'
import './common.css'
import useAxiosCommon from '../Hooks/useAxiosCommon';
import useAuth from '../Hooks/useAuth';
import toast from 'react-hot-toast';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { TbFidgetSpinner } from "react-icons/tb";
import useRole from '../Hooks/useRole';

const Checkout_forms = ({price, packageData, refetch, stocks_visiblity}) => {
    const stripe = useStripe();
    const elements = useElements();
    const axiosCommon = useAxiosCommon();
    const [clientSecret, setClientSecret] = useState();
    const [pendingPayment, setPendingPayment] = useState(false);
    const {user} = useAuth();
    const navigate = useNavigate();
    const {role} = useRole();

    parseInt(stocks_visiblity)

    console.log(stocks_visiblity)

    useEffect(() => {
        const getClientSecret = async() => {
            const {data} = await axiosCommon.post('/create-payment-intent', {price})
            setClientSecret(data.clientSecret)
        }

        getClientSecret();
    }, [price])

    const {mutateAsync : savePaymentInfoToDB} = useMutation({
        mutationFn : async(info) => {
            const {data} = await axiosCommon.post('/save-payment-info', info);
            return data;
        },

        onSuccess : () => {
            setPendingPayment(false);
            toast.success("Payment successful!")
            refetch();
        }
    })
  
    const handleSubmit = async (event) => {
      // Block native form submission.
      event.preventDefault();

      setPendingPayment(true);

      if(role !== 'user'){
        toast.error('You must be an user before buying something!');
        setPendingPayment(false);
        return;
      }
  
      if (!stripe || !elements || !clientSecret) {
        // Stripe.js has not loaded yet. Make sure to disable
        // form submission until Stripe.js has loaded.
        return;
      }
  
      // Get a reference to a mounted CardElement. Elements knows how
      // to find your CardElement because there can only ever be one of
      // each type of element.
      const card = elements.getElement(CardElement);
  
      if (card == null) {
        return;
      }
  
      // Use your card Element with other Stripe.js APIs
      const {error, paymentMethod} = await stripe.createPaymentMethod({
        type: 'card',
        card,
      });
  
      if (error) {
        console.log('[error]', error);
      } else {
        console.log('[PaymentMethod]', paymentMethod);
      }


      const {error : confirmError, paymentIntent} = await stripe.confirmCardPayment(clientSecret, {
        payment_method : {
            card : card,
            billing_details : {
                email : user?.email,
                name : user?.displayName
            }
        }
      })

      if(confirmError){
        setPendingPayment(false);
        console.log(confirmError)
        toast.error(confirmError.message);
        return
      }

      if(paymentIntent.status === 'succeeded'){
        
        const paymentObject = {
            transactionId: paymentIntent.id,
            paid : price,
            userEmail : user?.email,
            userName : user?.displayName,
            ...packageData,
            status : 'processing'
        }

        delete paymentObject?._id;

        const savedResponse = await savePaymentInfoToDB(paymentObject);

        if(savedResponse?.insertedId){
            navigate(`/invoice/${savedResponse?.insertedId}`);
            setPendingPayment(false);
        }

      }
    };
  
    return (
      <form onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#424770',
                '::placeholder': {
                  color: '#aab7c4',
                },
              },
              invalid: {
                color: '#9e2146',
              },
            },
          }}
        />
        <button className='btn btn-block btn-primary' type="submit" disabled={!stripe || stocks_visiblity < 1}>
          {pendingPayment ? <TbFidgetSpinner className='animate-spin' /> : stocks_visiblity < 1 ? 'Out of stocks' : 'Pay'}
        </button>
      </form>
    );
  };

export default Checkout_forms;