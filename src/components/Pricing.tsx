import React from 'react'
import PlanSwiper from './pricing/PlanSwiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { userInfo } from 'os';

export default function Pricing() {

    const freeActive = async () => {
        alert("Free Plan is currently active, subscribe to another plan to invite more users.")
    }

    return (
           <div className="pricing">
                <h2 className="pricing__title mb-4 font-semibold">Pricing</h2>
                <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-12 lg:grid-cols-12 gap-4">
                    <div className="col-span-1 sm:col-span-1 md:col-span-12 lg:col-span-6">
                        <div className="pricing__card flex flex-col justify-between">
                            <div>
                                <div className="flex justify-between items-center">
                                    <div>
                                        <h4 className="pricing__card--title font-semibold">Free</h4>
                                        <h6 className="pricing__card--sub-title mt-1">FREE</h6>
                                    </div>
                                    <div>
                                        <img src="/images/pricing_1.svg" className="pricing-img"></img>
                                    </div>
                                </div>
                                <div className="mt-5">
                                    <ul className="pricing__card--list">
                                        <li>Host up to 100 Participants</li>
                                        <li>1 hour Meeting Duration</li>
                                        <li>Group and Private Messaging</li>
                                        <li>Screen Sharing</li>
                                        <li>Schedule a meeting</li>
                                        <li>Meeting reactions</li>
                                        <li>Electronic Hand Raising</li>
                                        <li>3 White Boards with 20GB storage</li>
                                        <li>Multiple video layouts</li>
                                        <li>Q&A and polls</li>
                                        <li>Up to 3 Breakout rooms</li>
                                    </ul>
                                </div>
                            </div>
                            <div>
                                <a href="#" onClick={() => freeActive()} className='pricing__card--button'>Try Now</a>
                            </div>
                        </div>
                    </div>
                    <div className="col-span-1 sm:col-span-1 md:col-span-12 lg:col-span-6">
                        <div className="pricing__card--wrap">
                            <div className="w-full flex justify-center">
                                <div className="pricing__card--label">
                                    <h4>BEST VALUE</h4>
                                </div>
                            </div>
                            <div className="pricing__card flex flex-col justify-between">
                                <div>
                                    <div className="flex justify-between items-center" style={{ marginTop: '-25px' }}>
                                        <div>
                                            <h4 className="pricing__card--title font-semibold">Small<br />Business</h4>
                                            <h6 className="pricing__card--sub-title mt-2">$127.50</h6>
                                        </div>
                                        <div style={{marginRight: '-30px'}}>
                                            <img src="/images/pricing_2.svg" className="pricing-img"></img>
                                        </div>
                                    </div>
                                    <div className="mt-5">
                                        <ul className="pricing__card--list">
                                            <li>Host up to 100 Participants</li>
                                            <li>24 hours Meeting Duration</li>
                                            <li>Group and Private Messaging</li>
                                            <li>Screen Sharing</li>
                                            <li>Schedule a meeting</li>
                                            <li>Meeting reactions</li>
                                            <li>Electronic Hand Raising</li>
                                            <li>4 White Boards with 25GB storage</li>
                                            <li>Multiple video layouts</li>
                                            <li>Q&A and polls</li>
                                            <li>Up to 4 Breakout rooms</li>
                                            <li>Background Customization, up to 10 uploads of Customized Backgrounds (images or video)</li>
                                            <li>Record Meeting  (5.5 GB Cloud/License)</li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="mt-4">
                                    <a target={'_blank'} href="https://buy.stripe.com/test_4gw9ASbqU9eE6U8aEF?prefilled_email=" className='pricing__card--button'>Try Now</a>
                                </div>
                            </div>
                        </div>
                        
                    </div>

                    <div className="col-span-1 sm:col-span-1 md:col-span-12 lg:col-span-6">
                        <div className="pricing__card flex flex-col justify-between">
                            <div>
                                <div className="flex justify-between items-center">
                                    <div>
                                        <h4 className="pricing__card--title font-semibold">Large<br />Business</h4>
                                        <h6 className="pricing__card--sub-title mt-1">$169.92</h6>
                                    </div>
                                    <div>
                                        <img src="/images/pricing_3.svg" className="pricing-img"></img>
                                    </div>
                                </div>
                                <div className="mt-5">
                                    <ul className="pricing__card--list">
                                        <li>Host up to 330 Participants</li>
                                        <li>24 hours Meeting Duration</li>
                                        <li>Group and Private Messaging</li>
                                        <li>Screen Sharing</li>
                                        <li>Schedule a meeting</li>
                                        <li>Meeting reactions</li>
                                        <li>Electronic Hand Raising</li>
                                        <li>Unlimited Whiteboards</li>
                                        <li>Multiple video layouts</li>
                                        <li>Q&A and polls</li>
                                        <li>Unlimited Breakout Rooms</li>
                                        <li>Background Customization, up to 20 uploads of Customized Backgrounds (images or video)</li>
                                        <li>Record Meeting  (8 GB Cloud/License)</li>
                                        <li>Automated Captions</li>
                                        <li>Attendance Tracking</li>
                                    </ul>
                                </div>
                            </div>
                            <div className="mt-4">
                                <a target={'_blank'} href="https://buy.stripe.com/test_cN26oGeD63Uk1zObIK" className='pricing__card--button'>Try Now</a>
                            </div>
                        </div>
                    </div>

                    <div className="col-span-1 sm:col-span-1 md:col-span-12 lg:col-span-6">
                        <div className="pricing__card flex flex-col justify-between">
                            <div>
                                <div className="flex justify-between items-center">
                                    <div>
                                        <h4 className="pricing__card--title font-semibold">Enterprise</h4>
                                        <h6 className="pricing__card--sub-title mt-1">Contact Sales</h6>
                                    </div>
                                    <div>
                                        <img src="/images/pricing_4.svg" className="pricing-img"></img>
                                    </div>
                                </div>
                                <div className="mt-5">
                                    <ul className="pricing__card--list">
                                        <li>Host up to 500-1k Participants</li>
                                        <li>24 hours Meeting Duration</li>
                                        <li>Group and Private Messaging</li>
                                        <li>Screen Sharing</li>
                                        <li>Schedule a meeting</li>
                                        <li>Meeting reactions</li>
                                        <li>Electronic Hand Raising</li>
                                        <li>Unlimited Whiteboards</li>
                                        <li>Multiple video layouts</li>
                                        <li>Q&A and polls</li>
                                        <li>Unlimited Breakout Rooms</li>
                                        <li>Background Customization, up to 20 uploads of Customized Backgrounds (images or video)</li>
                                        <li>Record Meeting  (Unlimited)</li>
                                        <li>Automated Captions</li>
                                        <li>Attendance Tracking</li>
                                    </ul>
                                </div>
                            </div>
                            <div className="mt-4">
                                <a href="#" className='pricing__card--button'>Contact Sales</a>
                            </div>
                        </div>
                    </div>

                </div>




            {/* <div className="w-full opacity-60 bg-blue-600 bg-opacity-20 rounded-full" />
                    <img src="/images/monthly-yearly.png" className="pricing-header-img"></img>

                    <div className="w-full bg-white  rounded-3xl pricing-wrapper flex flex-col" >
                        <div className="flex pricing-containers">
                            <div>
                                <img src="/images/free-pricing.png" className="pricing-img"></img>
                            </div>
                            <div>
                                <p className="pricing-subheader mt-5">Meetings</p>
                                <ul>
                                    <li>Host up to 100 participants</li>
                                    <li>Unlimited meetings up to 40 minutes</li>
                                    <li>Automated Captions</li>
                                </ul>

                                <p className="pricing-subheader">Whiteboard (NEW)</p>
                                <ul>
                                    <li>3 editable boards with 25MB of cloud storage</li>
                                </ul>

                                <p className="pricing-subheader">Messaging</p>
                                <ul>
                                    <li>Chats and channels for collaboration, file sharing, and more</li>
                                </ul>
                            </div>
                            <div className="text-center">
                              
                                <h2 className="huge-title">Free</h2>
                                <p className="fee">USD/user/month</p>
                                <p className="fee">**(billed annually)</p>
                                <button className="btn-success" onClick={() => freeActive()}>Active</button>
                            </div>
                        </div>

                        <div className="flex pricing-containers mt-10">
                            <div>
                                <img src="/images/small-business-pricing.png" className="pricing-img"></img>
                            </div>
                            <div>
                                <p className="pricing-subheader mt-5">Meetings</p>
                                <ul>
                                    <li>Host up to 100 participants</li>
                                    <li>Unlimited meetings up to 40 minutes</li>
                                    <li>Automated Captions</li>
                                </ul>

                                <p className="pricing-subheader">Whiteboard (NEW)</p>
                                <ul>
                                    <li>3 editable boards with 25MB of cloud storage</li>
                                </ul>

                                <p className="pricing-subheader">Messaging</p>
                                <ul>
                                    <li>Chats and channels for collaboration, file sharing, and more</li>
                                </ul>
                            </div>
                            <div className="text-center mt-5">
                                <label className="small-title ">Small Business</label>
                                <h2 className="huge-title">$127.41</h2>
                                <p className="fee">Year/user</p>
                                <a href="https://buy.stripe.com/test_4gw9ASbqU9eE6U8aEF?prefilled_email="><button className="btn">Try it Now</button></a>
                            </div>
                        </div>


                        <div className="flex pricing-containers ">
                            <div>
                                <img src="/images/large-business-pricing.png" className="pricing-img"></img>
                            </div>
                            <div>
                                <p className="pricing-subheader mt-5">Meetings</p>
                                <ul>
                                    <li>Host up to 100 participants</li>
                                    <li>Unlimited meetings up to 40 minutes</li>
                                    <li>Automated Captions</li>
                                </ul>

                                <p className="pricing-subheader">Whiteboard (NEW)</p>
                                <ul>
                                    <li>3 editable boards with 25MB of cloud storage</li>
                                </ul>

                                <p className="pricing-subheader">Messaging</p>
                                <ul>
                                    <li>Chats and channels for collaboration, file sharing, and more</li>
                                </ul>


                                <p className="pricing-subheader">Chat</p>
                                <ul>
                                    <li>Single sign-on </li>
                                    <li>Managed domains </li>
                                    <li>Company branding</li>
                                </ul>
                            </div>
                            <div className="text-center mt-5">
                                <label className="small-title ">Large Business</label>
                                <h2 className="huge-title">$169.92</h2>
                                <p className="fee">Year/user</p>
                                <a href="https://buy.stripe.com/test_cN26oGeD63Uk1zObIK"> <button className="btn">Try it Now</button></a>                            </div>
                        </div>

                        <div className="flex pricing-containers">
                            <div>
                                <img src="/images/enterprise-pricing.png" className="pricing-img"></img>
                            </div>
                            <div>
                                <p className="pricing-subheader mt-5">Meetings</p>
                                <ul>
                                    <li>Host up to 100 participants</li>
                                    <li>Unlimited meetings up to 40 minutes</li>
                                    <li>Automated Captions</li>
                                </ul>

                                <p className="pricing-subheader">Whiteboard (NEW)</p>
                                <ul>
                                    <li>3 editable boards with 25MB of cloud storage</li>
                                </ul>

                                <p className="pricing-subheader">Messaging</p>
                                <ul>
                                    <li>Chats and channels for collaboration, file sharing, and more</li>
                                </ul>

                                <p className="pricing-subheader">Phone* Vision Mobile is business use only</p>
                                <ul>
                                    <li>Full-featured PBX</li>
                                    <li>Metered outbound calls</li>
                                    <li>Call queues & IVR</li>
                                    <li>Power Pack*</li>
                                    <li>Common Area Phone*</li>
                                </ul>
                                <p className="pricing-subheader">Vision Room + Conference Room Connector*</p>
                                <p className="pricing-subheader">Webinars 500 / Webinars 1000*</p>
                                <p className="pricing-subheader">Extras</p>
                                <ul>
                                    <li>Single sign-on</li>
                                    <li>Managed domains</li>
                                    <li>Company branding</li>
                                </ul>
                            </div>
                            <div className="text-center mt-5">
                                <label className="small-title ">Enterprise</label>
                                <h2 className="contact-sales">Contact Sales</h2>
                                <button className="btn">Send us a Message</button>
                            </div>
                        </div>
                    </div> */}
           </div>
    )
}