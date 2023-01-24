
import { useState } from 'react'

import chamicon from '../assets/images/chamicon.png'
import ChamResponse from '../components/ai/ChamResponse'
import UserResponse from '../components/ai/UserResponse'
import * as queries from '../graphql/queries';
import { Observable } from '@reduxjs/toolkit';
import { API, graphqlOperation } from 'aws-amplify';
import { json } from 'stream/consumers';

export default function VisionAi() {

  interface Conversation {
      away: boolean;
      message: string;
  }

  interface Result {
    body: any;
}



  const [prompt, setPrompt] = useState<string>('')
  const [typing, setIsTyping] = useState<boolean>(false)
  const [conversations, setConversation] = useState<any>([])


  type PromptType = {
      prompt: string
  };

  const sendToAi = async (prompt: PromptType) => {
      return await API.graphql(graphqlOperation(queries.sendPromptAi, prompt));
  }

  const handleClick = async () => {
    setIsTyping(true)

    const convo = {
      away: false,
      body: prompt
    }

    let newConvo = conversations;
    newConvo.push(convo)
    setConversation(newConvo);

    setPrompt('')
    //const rules = "This is the previous conversation: "+JSON.stringify(conversations)+" then the next words are new ones "
    const rules = "Act as a joyful and very intelligent friend, but if you dont know the answer just politely tell me - .";
    const identity = `
          Here is your identity
          Hi, I’m Cam the Chameleon.
          In many cultures, seeing a chameleon is considered lucky because it represents good fortune and prosperity. Chameleons are frequently kept as pets in some cultures because they are thought to bring good fortune and luck to those who see them.
          end of identity
    `
    const result: any = await sendToAi({prompt:rules+identity+prompt})

    console.log(result)

    const response = {
      away: true,
      body: result.data.sendPromptAi.body
    }

    conversations.push(response)
    setConversation(conversations)


    console.log(conversations)

    setPrompt('|')
    setPrompt('')

    setIsTyping(false)
  };

  return (
    <>
        <div className="px-14 pt-14">
          <h1>VISION-Ai</h1>
          <div className="w-[500px] h-[80vh] flex flex-col border shadow-md bg-white">
            <div className="flex items-center justify-between border-b p-2">
              <div className="flex items-center">
                <img className="rounded-full w-10 h-10"
                  src={chamicon} />
                <div className="pl-2">
                  <div className="font-semibold">
                    <a className="hover:underline" href="#">Cham the Chameleon {typing &&<span className="italic pl-2 bold">is typing...</span>}</a>
                  </div>
                  <div className="text-xs text-gray-600">Online </div>
                </div>
              </div>

              <div>
                <a className="inline-flex hover:bg-indigo-50 rounded-full p-2" href="#">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                  </svg>
                </a>

                <button className="inline-flex hover:bg-indigo-50 rounded-full p-2" type="button">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="flex-1 px-4 py-4 overflow-y-auto">
              {conversations.map((item:Conversation, i:string) => (
                <div key={i+"-convo"}>
                    {item.away == true && (
                      <ChamResponse data={item} key={i+"-away"}/>
                    )}

                    {!item.away && (
                      <UserResponse data={item}  key={i+"-user"}/>
                    )}

                </div>
              ))}

            </div>

            <div className="flex items-center border-t p-2">
              <div>
                <button className="inline-flex hover:bg-indigo-50 rounded-full p-2" type="button">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </button>
              </div>

              <div className="w-full mx-2">
                <textarea  value={prompt} onChange={(e: any) => setPrompt(e.target.value)} className="w-full border border-gray-200 p-2"   />
              </div>

              <div>
                <button onClick={handleClick} className="inline-flex hover:bg-indigo-50 rounded-full p-2" type="button">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </button>
              </div>

            </div>
          </div>

       </div>
    </>
  )
}
