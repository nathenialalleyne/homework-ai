import {
    Body,
    Button,
    Container,
    Column,
    Head,
    Heading,
    Hr,
    Html,
    Img,
    Link,
    Preview,
    Row,
    Section,
    Tailwind,
    Text,
} from '@react-email/components';
import * as React from 'react';

const baseUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : '';

export const EarlyAccessSignUp = () => {
    const previewText = `You've signed up for early access to GeniusDraft!`;

    return (
        <Html>
            <Head />
            <Preview>{previewText}</Preview>
            <Tailwind
                config={{
                    theme: {
                        extend: {
                            colors: {
                                primary: '#00FF8F',
                                secondary: '#00A1FF',
                                dark: '#101010',
                                slightlyDark: '#1d1d1d',
                                lighterDark: '#2a2a2a'
                            }
                        }
                    }
                }}>
                <Body className="bg-dark my-auto mx-auto font-sans">
                    <Container className="border border-solid border-[#eaeaea] rounded my-[40px] mx-auto p-[20px] w-[465px] relative">
                        <Section className="mt-[32px]">
                            <Img
                                src={`${baseUrl}/colored-logo.png`}
                                width={200}
                                alt="GeniusDraft"
                                className="my-0 mx-auto"
                            />
                        </Section>
                        <Heading className="text-white text-[24px] font-normal text-center p-0 my-[30px] mx-0">
                            <strong>You're on the list!</strong>
                        </Heading>
                        <Text className="text-white text-[14px] leading-[24px] text-center">
                            You've just secured your spot on the list of academic innovators—kudos! 🚀
                        </Text>
                        <Section className='text-center mt-[32px] mb-[32px] text-white'>
                            <Text>
                                Get ready to redefine how you approach assignments. We're thrilled to have you on board for early access to our AI-powered platform.
                            </Text>
                            <Text>
                                Exciting things are on the horizon, and you're at the forefront! Keep an eye on your inbox for exclusive updates and sneak peeks. Your input will be crucial in shaping the future of personalized learning.
                            </Text>
                        </Section>
                        <Section className='mt-[32px] mb-[16px] w-full mx-auto'>
                            <Row className=''>
                                <Column align='right'>
                                    <Link href='https://x.com/geniusdraftapp'>
                                        <Img
                                            src={`${baseUrl}/twitter.png`}
                                            height={25}
                                            width={25}
                                        />
                                    </Link>
                                </Column>
                                <Column align='center' width={12} height={12} />
                                <Column align='left'>
                                    <Link href='https://instagram.com/geniusdraftapp'>
                                        <Img
                                            src={`${baseUrl}/instagram.png`}
                                            height={25}
                                            width={25}
                                            className='border border-px border-white'
                                        />
                                    </Link>
                                </Column>
                            </Row>
                        </Section>
                        <Section className="text-center mt-[32px] bg-primary text-transparent bg-clip-text">
                            <Text>
                                Check out our social media channels to stay up to date on the latest news and announcements.
                            </Text>
                        </Section>

                    </Container>
                </Body>
            </Tailwind>
        </Html>
    );
};

export default EarlyAccessSignUp;
