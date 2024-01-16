import React, { useState } from 'react'
import PricingCard from '../../components/pricing-card'
import LandingHeader from '../../components/landing-header'


type Props = {
}

export default React.forwardRef(function PricingPlans({ }: Props, ref: React.Ref<HTMLDivElement>) {
    const [clicked, setClicked] = useState(false)
    return (
        <div className='w-full flex justify-center items-center' ref={ref}>
            <div className='w-[75rem] flex flex-col items-center '>
                <div>
                    <LandingHeader sectionName='PRICING PLANS' headingText='Choose The Plan That Works For You' paragraphText='GeniusDraft offers a variety of plans to meet your needs. Whether you are a student, professional, or business, we have a plan for you.' headingClassName='w-full flex items-center justify-center' />
                </div>
                <div className='flex gap-4 mt-8 xs:flex-col lg:flex-row xs:w-full xs:items-center xs:p-2 lg:p-0'>
                    <PricingCard
                        plan='FREE PLAN'
                        description='Ideal for students starting their writing journey. Our Free Plan offers essential tools for college and high school students at no cost.'
                        buttonText='Try It For Free'
                        features={['Personalized writing style adaptation', 'Limited source integration', 'Ads Included', 'Get Started for free and experience the essentials of GeniusDraft']}
                        price='$0'
                        free
                        noButton
                        key={1}
                        clicked={clicked}
                        setClicked={setClicked}
                    />
                    <PricingCard
                        plan='WEEKLY WRITER'
                        description='Tailored for students with dynamic schedules. Our Weekly Plan provides flexibility and premium features for a shorter time frame, perfect for assignments and creative projects.'
                        buttonText='Choose Plan'
                        features={['Personalized writing style adaptation', 'Unlimited source integration', 'Ad Free', 'Perfect for those with dynamic writing needs on a weekly basis.']}
                        price='$3/week'
                        key={2}
                        noButton
                        clicked={clicked}
                        setClicked={setClicked}
                    />
                    <PricingCard
                        plan='MONTHLY MAESTRO'
                        description='For students seeking consistent support. Our Monthly Plan delivers a comprehensive set of features over a longer period, ideal for handling academic projects cost-effectively.'
                        buttonText='Choose Plan'
                        features={['Personalized writing style adaptation', 'Unlimited source integration', 'Ad Free', 'Best value for consistent writing task on a monthly basis.']}
                        price='$10/month'
                        key={3}
                        noButton
                        clicked={clicked}
                        setClicked={setClicked}
                    />
                </div>
            </div>
        </div>
    )
})