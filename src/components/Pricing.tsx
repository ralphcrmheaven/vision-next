import React from 'react'
import PlanSwiper from './pricing/PlanSwiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { userInfo } from 'os';

export default function Pricing() {

    const freeActive = async () => {
        alert("Free Plan is currently active, subscribe to another plan to invite more users.")
    }

    return (
           <div>
            <div className="w-full opacity-60 bg-blue-600 bg-opacity-20 rounded-full" />
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
                                {/* <label className="small-title ">Free</label> */}
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
                    </div>
           </div>
    )
}