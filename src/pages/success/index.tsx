import React, { useEffect, useState } from 'react';
import Confetti from 'react-confetti';
import SuccessPaymentIcon from '../images/success-payment';
import Header from '../components/Header';
import useDeviceSize from '@/hooks/use-device-size';
import { useRouter } from 'next/router';
import { api } from '@/utils/api';
import type { Stripe } from 'stripe';
import Loader from '../images/loader';

type Props = {};

const Success = () => {
    const deviceSize = useDeviceSize();
    const router = useRouter();
    const [session, setSession] = useState<Stripe.Checkout.Session | null>(null)
    const [notFound, setNotFound] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState(true);

    const query = router.query.session_id

    const fetchSession = api.stripeRouter.getSession.useMutation()

    useEffect(() => {
        console.log(session)
        console.log(query)
        if (query) {
            new Promise<Stripe.Checkout.Session>((resolve, reject) => {
                if (session) {
                    resolve(session)
                } else {
                    fetchSession.mutateAsync({ sessionID: query as string })
                        .then((session) => {
                            setSession(session)
                            resolve(session)
                        })
                        .catch(() => {
                            reject('Session not found')
                        })
                        .finally(() => {
                            setNotFound(true)
                        })
                }
            })
        } else {
            setNotFound(true)
        }
    }, [query])

    useEffect(() => {
        console.log(isLoading)
        if (notFound && !session) {
            router.push('/')
        }
    }, [notFound])

    if (isLoading) {
        return <div className='bg-dark w-screen h-screen flex overflow-hidden'>
            <Loader key={1} />
        </div>
    }


    return (
        <div className="bg-dark w-screen h-screen overflow-hidden relative">
            <Header removeList containerClassName='!z-30 absolute' />
            <div className="w-full h-full flex flex-col items-center justify-center relative z-20 overflow-hidden">
                <SuccessPaymentIcon className="w-28 h-fit  bg-white p-4 rounded-full bg-gradient-to-tr from-primary to-secondary grow-0 flex items-center justify-center" />
                <h1 className="text-4xl text-white mt-4 font-semibold">Payment Successful</h1>
                <p className="text-lg text-white text-center mt-2 w-[25rem] font-extralight">Your payment has been processed successfully. Click the button below to access the dashboard.</p>
                <button className="bg-gradient-to-tr from-primary to-secondary text-white px-4 py-2 mt-4  rounded-lg font-semibold" onClick={() => router.push('/profile')}>Go to Dashboard</button>
            </div>
            <div id="confetti-container" className="absolute top-0 left-0 w-full h-full z-10">
                <Confetti width={deviceSize.width} height={deviceSize.height} numberOfPieces={20} opacity={.7} />
            </div>
            <div className='absolute z-10 w-[80vw] h-[100vh] rotate-35 bg-primary rounded-full blur-3xl right-[40vw] bottom-4 opacity-[1%]'></div>
            <div className='absolute z-10 w-[80vw] h-[100vh] -rotate-45 bg-secondary rounded-full blur-3xl left-[40vw] bottom-[4vh] opacity-[2%]'></div>
        </div>
    );
};

export default Success;
