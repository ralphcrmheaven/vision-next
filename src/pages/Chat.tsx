
import { useMediaQuery } from 'react-responsive';
import Header from '../components/Header';
import HeaderMobile from '../components/mobileLayout/HeaderMobile';
import appConfig from '../Config';
import AWS from 'aws-sdk';
import React, { useEffect, useRef, useState } from 'react';
import { getContacts } from '../api/contact';
import { useSelector } from 'react-redux';
import { IUser, selectUser } from '../redux/features/userSlice';
import { useMeetings } from '../providers/MeetingsProvider';
import { useAuthContext } from '../providers/AuthProvider';
import { createChannel, createChannelMembership, createMemberArn, getChannelMessage, MessageType, Persistence, sendChannelMessage, updateChannel } from '../api/ChimeAPI';
import { useChatChannelState, useChatMessagingState } from '../providers/ChatMessagesProvider';
import TypingIndicator from '../components/Messages/TypingIndicator/TypingIndicator';
import { debounce } from 'lodash';
import { useNavigate, useParams } from 'react-router-dom';
import CustomModal from '../components/modals/CustomModal';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import moment from 'moment';

const animatedComponents = makeAnimated();

export default function Chat() {
  const isDesktopOrLaptop = useMediaQuery({ minWidth: 821 })
  const isTabletOrMobile = useMediaQuery({ maxWidth: 821 })
  const [users, setUsers] = useState<any>([]);
  const [userSelects, setUserSelects] = useState<any>([]);
  const [channels, setChannels] = useState<any>([]);
  const [message, setMessage] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);

  // create channel user members
  const [memberUserIds, setMemberUserIds] = useState<any>([]);
  const [memberNames, setMemberNames] = useState<any>([]);

  const { member } = useAuthContext();

  const { chatId } = useParams();

  let navigate = useNavigate();

  const getContactsAsync = async (userId: string) => {
    return await getContacts(userId)
  }

  const {
    searchChannels,
    initializeActiveChannel,
  } = useMeetings();

  const {
    activeChannel,
    channelList,
  } = useChatChannelState();
  const {
    messages,
    setMessages,
  } = useChatMessagingState();

  
  
  const addMember = async (channelArn:string, userId:string) => {
    await createChannelMembership(channelArn,
        `${appConfig.appInstanceArn}/user/${userId}`,
        userId
    );
  };

  const createChannelMessage = async (channel: any) => {
    const options = {
      Metadata: JSON.stringify({member})
    };
    if (message) {
      const sendMessageResponse = await sendChannelMessage(
        channel.ChannelArn, 
        message, 
        Persistence.PERSISTENT, 
        MessageType.STANDARD, 
        member,
        options
      );
  
      setMessage('');

      eventHandler({ Send: 'Indicator', chatId:  JSON.parse(channel.Metadata).chatId});

      const datas = await updateChannel(
          channel.ChannelArn,
          channel.Name,
          channel.Mode,
          channel.Metadata,
          member.userId
      );

      console.log('datas', datas);

      if (sendMessageResponse.response.Status.Value == 'PENDING') {
        const sentMessage = await getChannelMessage(channel.ChannelArn, member, sendMessageResponse.response.MessageId);
        const newMessages = [...messages, sentMessage];
        setMessages(newMessages);
      }
    }
  }

  const createChatChannel = async() => {
    const randomId = Math.floor(Math.random() * 10000000000);

    if (memberUserIds.length == 1) {
      const res = channels.find((item: any) => (JSON.parse(item.Metadata).type == 'chat' && JSON.parse(item.Metadata).userIds.includes(memberUserIds[0])));
      if (res) {
        setOpenModal(false);
        navigate(`/chat/${JSON.parse(res.Metadata).chatId}`);
        return;
      }
    }

    if (memberUserIds.length > 0) {
      const memberIds = [member.userId, ...memberUserIds];
      const memberUserNames = [member.givenName, ...memberNames];

      const metadata = JSON.stringify({
        userIds: memberIds,
        type: memberIds.length <= 2 ? 'chat' : 'chat-group',
        chatId: randomId,
      });

      const channelArn = await createChannel(
            appConfig.appInstanceArn,
            metadata,
            memberUserNames.toString() ,
            'UNRESTRICTED',
            'PUBLIC',
            member.userId
      );

      memberIds.map(userId => addMember(channelArn, userId));
      setOpenModal(false);
    }
  }

  const removeAuthName = (names: string) => {
    let name_list = names.split(',');
    name_list.splice(name_list.indexOf(member.givenName), 1)
    return name_list.toString();
    
  }

  const eventHandler = async (data: any | null = null) => {
    if (!data) {
      data = { Typing: 'Indicator' }
    }
    const content = JSON.stringify(data);
    await sendChannelMessage(
      activeChannel.ChannelArn,
      content,
      'NON_PERSISTENT',
      'STANDARD',
      member,
    );
  };

  // Events
  const eventHandlerWithDebounce = React.useCallback(debounce(eventHandler, 500), [activeChannel.ChannelArn]);
  
  const onChangeMessage = (e: any) =>  {
    eventHandlerWithDebounce();
    setMessage(e.target.value)
  }

  const channelActive = async (channel: any) => {
    const chatid = JSON.parse(channel.Metadata).chatId;
    navigate(`/chat/${chatid}`);

  }

  const onLoad = async() => {
    setLoading(true)
    if (member && member.userId) {
      await searchChannels?.([createMemberArn(member.userId)], member.userId);
    }

    setLoading(false);
  }

  const fetchContactList = async () => {
      const { data } = await getContactsAsync(member.userId)
      const contact_list = data.listContacts?.items as any;
      if (contact_list) {
          const result: string[] = contact_list.map((value: any) => value.email)

          const cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider({ region: 'us-east-1' });
          const params = {
            UserPoolId: 'us-east-1_pQUSKlPQS'
          };

          cognitoidentityserviceprovider.listUsers(params, (err, data) => {
            if (err) {
              console.log('Error listing users', err);
            } else {

              const users = data.Users?.filter((item: any) => result.includes(item.Username) && item.Username != member.username)
              console.log('Users:', users);
              setUsers(users);

              if (users) {
                setUserSelects(users.map((item: any) => ({value: item.Attributes[0].Value, label: item.Username})))

              }
            }
        });
      }
  }

  const selectedUser = async (value: any) => {
    let memberNameList = [] as any;
    let memeberUserIdList = [] as any;
    value.map((item: any) => {
      const data = users.find((res: any) => res.Username == item.label);
      memberNameList.push(data.Attributes[2].Value);
      memeberUserIdList.push(item.value);
    });

    setMemberNames(memberNameList);
    setMemberUserIds(memeberUserIdList);
  }

  const channelUnreadMessage = (channel: any) => {
    const unread_messages = localStorage.getItem('unread_messages')
    if (unread_messages) {
      const unread = JSON.parse(unread_messages);
      return JSON.parse(channel.Metadata).chatId in unread
    } else {
      return false;
    }
  }

  useEffect(() => {
    fetchContactList();
  }, [openModal]);

  useEffect(() => {
    if (channelList.length > 0) {
      const result = channelList.filter((item: any) => 
                item.Privacy == 'PUBLIC' && 
                (item.Metadata != null && (JSON.parse(item.Metadata).type == 'chat' || JSON.parse(item.Metadata).type == 'chat-group') && 
                JSON.parse(item.Metadata).chatId));
      console.log('resultss', result);
      setChannels(sortChannel(result));

    }
  }, [channelList])

  useEffect(() => {
    if (chatId && channels.length > 0) {
      const channel = channels.find((item: any) => JSON.parse(item.Metadata).chatId == chatId);
      if (channel) {
        initializeActiveChannel?.(channel.ChannelArn);

        const unread_messages = localStorage.getItem('unread_messages')

        if (unread_messages) {
          const unread = JSON.parse(unread_messages);
          if (JSON.parse(channel.Metadata).chatId in unread) {
            delete unread[JSON.parse(channel.Metadata).chatId];
            localStorage.setItem('unread_messages', JSON.stringify(unread))
          } 
        }
      }
    }
  }, [chatId, channels])

  const sortChannel = (channel_list: any) => {
    return channel_list.sort((channel1: any, channel2: any) => {
      let channel1_message_date = 0;
      let channel2_message_date = 0;
      if (channel1.LastMessageTimestamp) {
        channel1_message_date = channel1.LastMessageTimestamp.getTime();
      }

      if (channel2.LastMessageTimestamp) {
        channel2_message_date = channel2.LastMessageTimestamp.getTime();
      }

      return  channel2_message_date - channel1_message_date;
    })
  }

  useEffect(() => {
    // console.log('messages1', messages);
    scrollToBottom();
  }, [messages])

  useEffect(() => {
    onLoad();
    // console.log('member', member);
  }, [member])

  const messagesEndRef = useRef<null | HTMLDivElement>(null); 

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const enterPress = (e: any) => {
    if (e.keyCode == 13 && e.shiftKey == false) {
      e.preventDefault();
      createChannelMessage(activeChannel)
    }
  }

  return (
    <>
      <div className='p-5 sm:p-5 md:p-10 lg:p-10 md:pb-0 lg:pb-0'>
      {isDesktopOrLaptop ?
        (
          // Desktop View Components
          <>
            <Header showSearchBar={false} showSubHeader={false} header={'Chat'} />

          </>
        )
        :
        isTabletOrMobile ? (
          // Mobile View Component
          <>
            <HeaderMobile showSearchBar={true} showSubHeader={false} header={'Chat'} />

          </>
        ) : ''}
      </div>

      <div className='p-5 sm:p-5 md:p-10 lg:p-10 chat'>
          <div className='gap-4 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-12 lg:grid-cols-12'>
            <div className='col-span-1 sm:col-span-1 md:col-span-4 lg:col-span-3'>
                <div className='chat__menu mb-8'>
                  <div className='chat__menu--item chat__menu--item__active'>
                    <h6>All</h6>
                  </div>
                  <div className='chat__menu--item'>
                    <h6>Direct Messages</h6>
                  </div>
                  <div className='chat__menu--item !p-0 !m-0'>
                    <span onClick={() => setOpenModal(true)} className='chat__menu--item__add'>
                      <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" className="bi bi-plus" viewBox="0 0 16 16">
                        <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                      </svg>
                    </span>
                  </div>
                </div>
                {loading ? (
                  <div className='chat__channel-list flex justify-center'>
                    <span className='px-1 my-5 text-gray-600 home-time-card'>
                        <svg
                        className="w-6 h-6 mr-3 -ml-1 text-gray-600 animate-spin"
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
                    </span>
                    </div>
                ) : (
                <div className='chat__channel-list'>
                  {channels.length > 0 && channels.map((item:any) => (
                     <div onClick={() => channelActive(item)} className={`chat__channel-list__item flex justify-between items-center pointer ${(item.Metadata && JSON.parse(item.Metadata).chatId == chatId) ? 'chat__channel-list__item__active' : ''}`}>
                      <div className='flex items-center'>
                        <img className='chat__channel-list__item--img mr-3' src={`https://ui-avatars.com/api/?name=${removeAuthName(item.Name)}&background=random&bold=true`} alt="" />
                        <h6 className={`${channelUnreadMessage(item) ? 'chat__unread' : ''} chat__channel-list__item--name mr-2`}>{removeAuthName(item.Name)}</h6>
                      </div>
                      <span className='chat__channel-list__item--active'></span>
                    </div> 
                  ))}

                  {channels.length == 0 && (
                    <div className='text-center my-10'>
                        <span className='text-sm font-[700] text-gray-400'>You don't have a channel, please add a channel.</span>
                    </div>
                  )}
                </div>
              )}
            </div>
            <div className='col-span-1 sm:col-span-1 md:col-span-8 lg:col-span-9'>
              <div className='chat__messages'>
                  {activeChannel.ChannelArn ? (
                    <div className='chat__messages--body'>
                    <div className='chat__messages--body__list'>
                      {/* messagus kist */}
                      <ul>
                        {messages.map((item: any) => (
                          <li className={item.Sender.Name == member.username ? 'chat__messages--body__list--right'  : 'chat__messages--body__list--left'}>
                            <div className={`chat__messages--body__list--item ${activeChannel.Metadata && JSON.parse(activeChannel.Metadata).type == 'chat-group' ? '!w-full' : ''}`}>
                              <div className='chat__messages--body__list--item__body'>
                                <img src={`https://ui-avatars.com/api/?name=${item.Sender.Name}&background=random&bold=true`} alt="" />
                                <div className='chat__messages--body__list--item__info'>
                                  <h4>{item.Metadata == null ? item.Sender.Name : JSON.parse(item.Metadata).member.givenName}</h4>
                                  <p>{item.Content}</p>
                                </div>
                              </div>
                              <span className='text-gray-400 text-sm px-3 py-5'>{moment(item.CreatedTimestamp).calendar()}</span>
                            </div>
                          </li>
                        ))}
                        <div ref={messagesEndRef}></div>
                      </ul>
                      <TypingIndicator/>
                    </div>
                    <div className='chat__messages--body--send'>
                     <div className='relative w-full'>
                      <textarea onChange={onChangeMessage} onKeyDown={enterPress} value={message} placeholder='Send message' rows={0} cols={0} className='chat__messages--body--send__input'></textarea>
                      <button onClick={() => createChannelMessage(activeChannel)} className='chat__messages--body--send__button'>
                        <img src="/images/angel-logo.png" alt="Send message" width="60px" />
                      </button>
                     </div>
                    </div>
                  </div>
                  ) : (
                    <div className='chat__messages--body'>
                      <div className='flex justify-center'>
                        <div className='items-center my-10 h-full w-full chat__messages--body__content flex flex-col items-center justify-center'>
                          <img src="/images/message-send.svg" alt="Send message" style={{width: '300px'}}/>
                          <h4 className='text-md font-[700] mt-3 text-gray-500'>Please select a channel.</h4>
                        </div>
                      </div>
                    </div>
                  )}

              </div>
            </div>
          </div>
      </div>

      <CustomModal open={openModal} closeModal={() => setOpenModal(false)}>
        <div className="pb-5 pt-4">
           
            <div className='mb-5 text-center'>
                <h2 className='text-xl font-[700]'>Add Conversation from contacts</h2>
            </div>
            <div className="mt-3">
            <Select
                closeMenuOnSelect={false}
                className="select-user"
                components={animatedComponents}
                isMulti
                onChange={selectedUser}
                options={userSelects}
              />

              <button onClick={createChatChannel} className="button-primary w-full mt-4">Add</button>
            </div>

        </div>
    </CustomModal>             
    </>
  )
}
