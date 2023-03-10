import React, { useEffect, useState } from 'react'
import PlanSwiper from './pricing/PlanSwiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { userInfo } from 'os';
import { useSelector } from 'react-redux';
import { IUser, selectUser } from '../redux/features/userSlice';
import { activateSubscription, cancelSubscription, getCustomerByEmailName, getCustomerSubscriptions, subscriptionCheckout, upgradeDowngradeSubscription } from '../services/StripeServices';
import CustomModal from './modals/CustomModal';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Loading = () => (
    <svg
        className="w-5 h-5 mr-3 -ml-1 text-white animate-spin"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
    >
    <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
    ></circle>
    <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    ></path>
    </svg>
);

export default function Pricing() {
    const user: IUser = useSelector(selectUser)
    const [customer, setCustomer] = useState<any | null>(null);
    const [activeSubscription, setActiveSubscription] = useState<any | null>(null);

    const [checkoutLoading, setCheckoutLoading] = useState(false);
    const [upgradeLoading, setUpgradeLoading] = useState(false);
    const [activateLoading, setActivateLoading] = useState(false);
    const [isMonthly, setIsMonthly] = useState(false);

    const [unsubscribeLoading, setUnsubscribeLoading] = useState(false);
    const [pricingStatus, setPricingStatus] = useState(''); 
    
    const [openModal, setOpenModal] = useState(false);
    const [openModalUpgrade, setOpenModalUpgrade] = useState(false);
    const [openModalActivate, setOpenModalActivate] = useState(false);
    // price_id
    const price_data: any = {
        'free': {
            price_id: 'price_1MWCr1I1DrAa7pi6q2tuQmkY',
            amount: 0,
            title: 'Free'
        },
        'small_business': {
            price_id: 'price_1MWCsVI1DrAa7pi6PzbV4yPz',
            amount: 12750,
            price: '127.50',
            title: 'Yearly Small Business'
        },
        'large_business': {
            price_id: 'price_1MWCvJI1DrAa7pi6WcR8u6UJ',
            amount: 16992,
            price: '169.92',
            title: 'Yearly Large Business'
        },
        'monthly_large_business': {
            price_id: 'price_1MXM64I1DrAa7pi6BoRcXe67',
            amount: 1615,
            price: '16.15',
            title: 'Monthly Large Business'
        },
        'monthly_small_business': {
            price_id: 'price_1MXMwnI1DrAa7pi6nPSibQYt',
            amount: 1190,
            price: '11.90',
            title: 'Monthly Small Business'
        }
    };

    const freeActive = async () => {
        alert("Free Plan is currently active, subscribe to another plan to invite more users.")
    }

    const getActiveSubscription = async(customer: any) => {
        const result = await getCustomerSubscriptions(customer.id);
        if (result) {
            console.log('resultss', result);
            setActiveSubscription(result);
        }
    }

    const onMount = async () => {
        const customer = await getCustomerByEmailName(user.email, user.given_name);
        if (customer) {
            setCustomer(customer);
            getActiveSubscription(customer);
        }
    }

    const onActivate = (type:string) => {
        setPricingStatus(type);
        setOpenModalActivate(true);
    }


    const onUnsubscribe = (type:string) => {
        setPricingStatus(type);
        setOpenModal(true);
    }

    const onOpenUpgradeModal = (type: string) => {
        setPricingStatus(type);
        setOpenModalUpgrade(true);
    }

    const onActivateSubscription = async() => {
        
        if (activeSubscription && activeSubscription.status == 'canceled') {
            setActivateLoading(true);
            activateSubscription(activeSubscription.id).then(res => {
                toast.success(`Successfully Activated ${price_data[pricingStatus].title} Plan`);
                setActivateLoading(false);
                setOpenModalActivate(false);

                setTimeout(() => {
                    window.location.reload();
                }, 1000);
            });
        }
        
    }

    const onUpgrade = async() => {

        if (activeSubscription && customer && pricingStatus) {
            setUpgradeLoading(true);

            
           upgradeDowngradeSubscription(activeSubscription.id, price_data[pricingStatus].price_id).then(res => {
        
                toast.success(`Successfully ${activeSubscription.plan.amount > price_data[pricingStatus].amount ? 'Downgrade' : 'Upgrade'} to ${price_data[pricingStatus].title} Plan`);
                setOpenModalUpgrade(false);
                setUpgradeLoading(false);
                setTimeout(() => {
                    window.location.reload();
                }, 1000);
            });
            
         

        }
    }

    const onCancel = async() => {
        if (activeSubscription) {
            setUnsubscribeLoading(true);
            cancelSubscription(activeSubscription.id).then(res => {
                setUnsubscribeLoading(false);
                setOpenModal(false);
                if (customer) {
                    getActiveSubscription(customer);
                }
                toast.success(`Successfully Unsubscibe to ${price_data[pricingStatus].title} Plan`);
            
            });
        } else {
            toast.error(`No Subscription`);
        }
        
    }

    const onCheckout = async(type:string, price_id:string) => {
        setPricingStatus(type);
        setCheckoutLoading(true);
        if (customer) {
            const result = await subscriptionCheckout(type, customer.id, price_id);
            window.location.href = result.url as string;
        } else {
            // error no customer found
            toast.error(`No Customer Found.`);
        }

        setCheckoutLoading(false)
        
    }

    useEffect(() => {
        onMount();
    }, []);

    return (
           <div className="pricing">
                <ToastContainer />
                {/* <h2 className="pricing__title mb-4 font-semibold">Pricing</h2> */}
                <div className='flex justify-center mb-20'>
                    <div className='flex items-center'>
                        <span className="mr-4 text-sm font-medium text-gray-900 dark:text-gray-300"><strong>Billed Yearly</strong></span>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" onChange={() => setIsMonthly(!isMonthly)} value="" className="sr-only peer" />
                            <div className="w-14 h-8 bg-[#053F64] rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:shadow after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all dark:border-gray-600 peer-checked:bg-gray-200"></div>
                        </label>
                        <span className="ml-4 text-sm font-medium text-gray-900 dark:text-gray-300"><strong>Billed Monthly</strong></span>
                    </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-12 lg:grid-cols-12 gap-4">
                    <div className="col-span-1 sm:col-span-1 md:col-span-6 lg:col-span-3 h-full">
                        <div className="pricing__card flex flex-col justify-between">
                            <div>
                                <div className="flex justify-between items-center">
                                    <div>
                                        <h4 className="pricing__card--title font-semibold">Free</h4>
                                        <h6 className="pricing__card--sub-title mt-1">FREE</h6>
                                    </div>
                                    <div style={{marginRight: '-15px'}}>
                                        <img src="/images/pricing_image_free.svg" className="pricing-img"></img>
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
                            {activeSubscription && activeSubscription.plan.id == price_data['free'].price_id && activeSubscription.status == 'active'  ? (
                                    <div>
                                        <a href="#" onClick={() => onUnsubscribe('free')} className='pricing__card--button unsubscribe'>
                                            Unsubscribe
                                        </a>
                                    </div>
                                ) : (
                                    <div>
                                        {activeSubscription ? (
                                            <div>
                                                {activeSubscription && activeSubscription.plan.id == price_data['free'].price_id && activeSubscription.status == 'canceled' ? (
                                            
                                                    <a href="#" className='pricing__card--button active_plan'>
                                                        <span>Active</span>
                                                    </a>
                                                ) : (
                                                    <div>
                                                        {activeSubscription.status == 'canceled' ? 
                                                        (
                                                            <a href="#" onClick={() => onCheckout('free', price_data[isMonthly ? 'monthly_small_business' : 'small_business'].price_id)} className='pricing__card--button'>
                                                                {(pricingStatus == 'free' && checkoutLoading) && (
                                                                    <Loading />
                                                                )}
                                                                
                                                                <span>Downgrade</span>
                                                                
                                                            </a>
                                                        ) : (
                                                            <a href="#" onClick={() => onOpenUpgradeModal('free')} className='pricing__card--button'>
                                                                {(pricingStatus == 'free' && upgradeLoading) && (
                                                                    <Loading />
                                                                )}
                                                                
                                                                <span>Downgrade</span>
                                                            </a>
                                                        )}   
                                                    </div>
                                                    
                                                    
                                                )}
                                            </div>
                                        ) : (
                                            <div>
                                                <a href="#" onClick={() => onCheckout('free', price_data['free'].price_id)} className='pricing__card--button'>
                                                    {(pricingStatus == 'free' && checkoutLoading) && (
                                                        <Loading />
                                                    )}
                                                    <span>Try Now</span>
                                                </a>
                                            </div>
                                        )}
                                        
                                        
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="col-span-1 sm:col-span-1 md:col-span-6 lg:col-span-3 h-full">
                        <div className="pricing__card--wrap">
                            <div className="w-full flex justify-center">
                                <div className="pricing__card--label">
                                    <h4>BEST VALUE</h4>
                                </div>
                            </div>
                            <div className="pricing__card flex flex-col justify-between">
                                <div>
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <h4 className="pricing__card--title font-semibold">Small<br />Business</h4>
                                            <h6 className="pricing__card--sub-title mt-2">${price_data[isMonthly ? 'monthly_small_business' : 'small_business'].price}</h6>
                                        </div>
                                        <div style={{marginRight: '-20px'}}>
                                            <img src="/images/pricing_image_business.svg" className="pricing-img"></img>
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
                                    {activeSubscription && activeSubscription.plan.id == price_data[isMonthly ? 'monthly_small_business' : 'small_business'].price_id && activeSubscription.status == 'active'  ? (
                                        <div>
                                            <a href="#" onClick={() => onUnsubscribe(isMonthly ? 'monthly_small_business' : 'small_business')} className='pricing__card--button unsubscribe'>
                                               Unsubscribe
                                            </a>
                                        </div>
                                    ) : (
                                        <div>
                                            {activeSubscription ? (
                                                <div>
                                                    {activeSubscription && activeSubscription.plan.id == price_data[isMonthly ? 'monthly_small_business' : 'small_business'].price_id && activeSubscription.status == 'canceled' ? (
                                               
                                                        <a href="#" className='pricing__card--button active_plan'>
                                                            <span>Active</span>
                                                        </a>
                                                    ) : (
                                                        <div>
                                                            {activeSubscription.status == 'canceled' ? 
                                                            (
                                                                <a href="#" onClick={() => onCheckout(isMonthly ? 'monthly_small_business' : 'small_business', price_data[isMonthly ? 'monthly_small_business' : 'small_business'].price_id)} className='pricing__card--button'>
                                                                    {((pricingStatus == 'small_business' || pricingStatus == 'monthly_small_business') && checkoutLoading) && (
                                                                        <Loading />
                                                                    )}
                                                                    {activeSubscription.plan.amount > price_data[isMonthly ? 'monthly_small_business' : 'small_business'].amount ? (
                                                                        <span>Downgrade</span>
                                                                    ) : (
                                                                        <span>Upgrade</span>
                                                                    )}
                                                                    
                                                                </a>
                                                            ) : (
                                                                <a href="#" onClick={() => onOpenUpgradeModal(isMonthly ? 'monthly_small_business' : 'small_business')} className='pricing__card--button'>
                                                                    {((pricingStatus == 'small_business' || pricingStatus == 'monthly_small_business') && upgradeLoading) && (
                                                                        <Loading />
                                                                    )}
                                                                    {activeSubscription.plan.amount > price_data[isMonthly ? 'monthly_small_business' : 'small_business'].amount ? (
                                                                        <span>Downgrade</span>
                                                                    ) : (
                                                                        <span>Upgrade</span>
                                                                    )}
                                                                    
                                                                </a>
                                                            )}   
                                                        </div>
                                                       
                                                        
                                                    )}
                                                </div>
                                            ) : (
                                                <div>
                                                    <a href="#" onClick={() => onCheckout(isMonthly ? 'monthly_small_business' : 'small_business', price_data[isMonthly ? 'monthly_small_business' : 'small_business'].price_id)} className='pricing__card--button'>
                                                        {((pricingStatus == 'small_business' || pricingStatus == 'monthly_small_business') && checkoutLoading) && (
                                                            <Loading />
                                                        )}
                                                        <span>Try Now</span>
                                                    </a>
                                                </div>
                                            )}
                                            
                                           
                                        </div>
                                    )}
                                    
                                </div>
                            </div>
                        </div>
                        
                    </div>

                    <div className="col-span-1 sm:col-span-1 md:col-span-6 lg:col-span-3 h-full">
                        <div className="pricing__card flex flex-col justify-between">
                            <div>
                                <div className="flex justify-between items-center">
                                    <div>
                                        <h4 className="pricing__card--title font-semibold">Large<br />Business</h4>
                                        <h6 className="pricing__card--sub-title mt-1">${price_data[isMonthly ? 'monthly_large_business' : 'large_business'].price}</h6>
                                    </div>
                                    <div style={{marginRight: '-20px'}}>
                                        <img src="/images/pricing_image_large_business.svg" className="pricing-img"></img>
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
                                {activeSubscription && activeSubscription.plan.id == price_data[isMonthly ? 'monthly_large_business' : 'large_business'].price_id && activeSubscription.status == 'active' ? (
                                        <div>
                                            <a href="#" onClick={() => onUnsubscribe(isMonthly ? 'monthly_large_business' : 'large_business')} className='pricing__card--button unsubscribe'>
                                               Unsubscribe
                                            </a>
                                        </div>
                                    ) : (
                                        <div>
                                            {activeSubscription ? (
                                                <div>
                                                    {activeSubscription && activeSubscription.plan.id == price_data[isMonthly ? 'monthly_large_business' : 'large_business'].price_id && activeSubscription.status == 'canceled' ? (
                                                        <a href="#" className='pricing__card--button active_plan'>
                                                            <span>Active</span>
                                                        </a>
                                                    ) : (
                                                        <div>
                                                            {activeSubscription.status == 'canceled' ? 
                                                            (
                                                                <a href="#" onClick={() => onCheckout(isMonthly ? 'monthly_large_business' : 'large_business', price_data[isMonthly ? 'monthly_large_business' : 'large_business'].price_id)} className='pricing__card--button'>
                                                                    {((pricingStatus == 'large_business' || pricingStatus == 'monthly_large_business')  && checkoutLoading) && (
                                                                        <Loading />
                                                                    )}
                                                                    {activeSubscription.plan.amount > price_data[isMonthly ? 'monthly_large_business' : 'large_business'].amount ? (
                                                                        <span>Downgrade</span>
                                                                    ) : (
                                                                        <span>Upgrade</span>
                                                                    )}
                                                                </a>
                                                            ) : (
                                                                <a href="#" onClick={() => onOpenUpgradeModal(isMonthly ? 'monthly_large_business' : 'large_business')} className='pricing__card--button'>
                                                                    {((pricingStatus == 'large_business' || pricingStatus == 'monthly_large_business') && upgradeLoading) && (
                                                                        <Loading />
                                                                    )}
                                                                    {activeSubscription.plan.amount > price_data[isMonthly ? 'monthly_large_business' : 'large_business'].amount ? (
                                                                        <span>Downgrade</span>
                                                                    ) : (
                                                                        <span>Upgrade</span>
                                                                    )}
                                                                </a>
                                                            )}   
                                                        </div>
                                                       
                                                        
                                                    )}
                                                </div>
                                            ) : (
                                                <div>
                                                    <a href="#" onClick={() => onCheckout(isMonthly ? 'monthly_large_business' : 'large_business', price_data[isMonthly ? 'monthly_large_business' : 'large_business'].price_id)} className='pricing__card--button'>
                                                        {((pricingStatus == 'large_business' || pricingStatus == 'monthly_large_business') && checkoutLoading) && (
                                                            <Loading />
                                                        )}
                                                        <span>Try Now</span>
                                                    </a>
                                                </div>
                                            )}
                                            
                                            
                                           
                                        </div>
                                    )}
                            </div>
                        </div>
                    </div>

                    <div className="col-span-1 sm:col-span-1 md:col-span-6 lg:col-span-3 h-full">
                        <div className="pricing__card flex flex-col justify-between">
                            <div>
                                <div className="flex justify-between items-center">
                                    <div>
                                        <h4 className="pricing__card--title font-semibold">Enterprise</h4>
                                        <h6 className="pricing__card--sub-title mt-1">Contact Sales</h6>
                                    </div>
                                    <div style={{marginRight: '-20px'}}>
                                        <img src="/images/pricing_image_enterpise.svg" className="pricing-img"></img>
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

                <CustomModal open={openModal} closeModal={() => setOpenModal(false)}>
                    <div className="text-center pb-5 pt-4">
                        <div className="flex justify-center items-center">
                        <div className="flex h-16 w-16 mb-3  items-center justify-center rounded-full bg-red-100 sm:h-16 sm:w-16">
                            <svg className="h-10 w-10 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                            </svg>
                        </div>
                        </div>
                        <div className="mt-3">
                            <h3 className="text-lg font-medium leading-6 text-gray-900" id="modal-title"><strong>Are you sure you want to Unsubscribe to this plan?</strong></h3>
                            <div className='flex justify-center mt-5'>
                                <button onClick={onCancel} className='mt-4 pricing__card--button w-52'>
                                    {unsubscribeLoading && (
                                        <Loading />
                                    )}
                                    <span>Unsubscribe</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </CustomModal>

                <CustomModal open={openModalActivate} closeModal={() => setOpenModalActivate(false)}>
                    <div className="text-center pb-5 pt-4">
                        <div className="flex justify-center items-center">
                        <div className="flex h-16 w-16 mb-3  items-center justify-center rounded-full bg-red-100 sm:h-16 sm:w-16">
                            <svg className="h-10 w-10 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                            </svg>
                        </div>
                        </div>
                        <div className="mt-3">
                            <h3 className="text-lg font-medium leading-6 text-gray-900" id="modal-title"><strong>Are you sure you want to Activate this plan again?</strong></h3>
                            <div className='flex justify-center mt-5'>
                                <button onClick={onActivateSubscription} className='mt-4 pricing__card--button w-52'>
                                    {activateLoading && (
                                        <Loading />
                                    )}
                                    <span>Activate Now</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </CustomModal>

                <CustomModal open={openModalUpgrade} closeModal={() => setOpenModalUpgrade(false)}>
                    <div className="text-center pb-5 pt-4">
                        <div className="flex justify-center items-center">
                        <div className="flex h-16 w-16 mb-3  items-center justify-center rounded-full bg-red-100 sm:h-16 sm:w-16">
                            <svg className="h-10 w-10 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                            </svg>
                        </div>
                        </div>
                        <div className="mt-3">
                            {(activeSubscription && pricingStatus) && (
                                <div>
                                    <h3 className="text-lg font-medium leading-6 text-gray-900" id="modal-title"><strong>Are you sure you want to {activeSubscription.plan.amount > price_data[pricingStatus].amount ? 'Downgrade' : 'Upgrade' } to this plan?</strong></h3>
                                    <div className='flex justify-center mt-5'>
                                        <button onClick={onUpgrade} className='mt-4 pricing__card--button w-52'>
                                            {(upgradeLoading) && (
                                                <Loading />
                                            )}
                                            <span>{activeSubscription.plan.amount > price_data[pricingStatus].amount ? 'Downgrade' : 'Upgrade' } Now</span>
                                        </button>
                                    </div>
                                </div>
                            )}
                            
                        </div>
                    </div>
                </CustomModal>




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