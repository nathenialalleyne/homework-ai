import React from 'react'

type Props = {}

export default function WhyChoose({ }: Props) {
    return (
        <div>
            <div className='w-full p-4 flex flex-col items-center'>
                <h2 className='font-semibold text-4xl max-w-[42rem] tracking-wide text-center'>
                    Why Choose GeniusDraft?
                </h2>

                <p className='text-lg max-w-[45rem] font-thin tracking-wide text-center'>
                    We're glad you asked! Here are just a few of the many reasons why you should choose GeniusDraft:
                </p>

                <div className='flex items-center justify-center flex-col md:flex-row mt-4'>
                    <ol className='mt-4 md:mt-0 md:ml-8'>
                        <li className='mb-4'>
                            <div>
                                <h3 className='font-semibold text-2xl'>We're Fast</h3>
                                <p className='text-lg max-w-[45rem] font-thin tracking-wide text-center'>
                                    We know that time is of the essence when it comes to writing. That's why we've made it our mission to deliver your writing samples as quickly as possible.
                                </p>
                            </div>
                        </li>

                        <li className='mb-4'>
                            <div>
                                <h3 className='font-semibold text-2xl'>We're Accurate</h3>
                                <p className='text-lg max-w-[45rem] font-thin tracking-wide text-center'>
                                    We're confident in our ability to deliver accurate writing samples. If you're not satisfied with your results, we'll give you a full refund.
                                </p>
                            </div>
                        </li>

                        <li className='mb-4'>
                            <div>
                                <h3 className='font-semibold text-2xl'>We're Affordable</h3>
                                <p className='text-lg max-w-[45rem] font-thin tracking-wide text-center'>
                                    We believe that everyone should have access to high-quality writing samples. That's why we offer our services at a fraction of the cost of other writing services.
                                </p>
                            </div>
                        </li>

                        <li className='mb-4'>
                            <div>
                                <h3 className='font-semibold text-2xl'>We're Easy to Use</h3>
                                <p className='text-lg max-w-[45rem] font-thin tracking-wide text-center'>
                                    We've designed our platform to be as simple as possible
                                </p>
                            </div>
                        </li>
                    </ol>
                </div>
            </div>
        </div>
    )
}