import React, { FC, useState } from 'react'
import { useAuthContext } from '../providers/AuthProvider';
import {
    listChannels,
    deleteChannel
} from '../api/ChimeAPI';
import appConfig from '../Config';

const DeleteAllChannels: FC = () => {
    const { member } = useAuthContext();

    const { userId } = member;

    const [text, setText] = useState('');

    const getAvailableChannels = async() => {
        let availableChannels: any[] = [];
        let nextToken: string | null = null;

        // listChannels returns only 50 channels at once, so we need to loop to get all channels
        do {
            const channelsList: any = await listChannels(appConfig.appInstanceArn, userId, nextToken);
            availableChannels = [...availableChannels, ...channelsList.Channels];
            nextToken = channelsList.NextToken;
        }
        while (nextToken !== null);

        return availableChannels;
    };

    const onDeleteAllChannels = async() => {
        let availableChannels = await getAvailableChannels();

        console.log(availableChannels);

        for (const channel of availableChannels) {
            console.log('Deleting channel: ' + channel.ChannelArn + '...');
            try{
                await deleteChannel(channel.ChannelArn, userId);

                console.log('Deleted channel: ' + channel.ChannelArn);
            }catch(e){
                console.log('Failed to delete channel: ' + channel.ChannelArn);
            }
            console.log('----------------------------------------------------');
        }

        availableChannels = await getAvailableChannels();

        console.log(availableChannels);

        setText('Channels deleted.');
    };

    return (
        <>
            <button onClick={() => onDeleteAllChannels() }>Delete All Channels</button>
            <p>{text}</p>
        </>
    )
};

export default DeleteAllChannels;