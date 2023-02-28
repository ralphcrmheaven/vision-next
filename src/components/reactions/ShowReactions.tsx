import React from 'react';


interface Props {
    reaction: string
}

export default function ShowReactions(props:Props) {
    const reaction_data = {
        "clap" : {
            "image" : "/images/clapping.gif",
            "audio" : ""
        },
        "smile" : {
            "image" : "/images/smiling.gif",
            "audio" : ""
        },
        "raise" : {
            "image" : "/images/raise-hand.gif",
            "audio" : ""
        }
    }
    const reaction = props.reaction
    console.log(reaction)
    if(reaction == "") {
        return <></>;
    }
    const reaction_image = reaction != "" ? (reaction_data as any)[reaction].image : ""

    if(reaction_image == undefined) {
        return <></>;
    }
    return (
        <>
           <img src={reaction_image} alt="reaction" className="meeting-icon"/>
        </>
    )
}
