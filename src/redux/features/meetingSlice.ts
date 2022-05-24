import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import meetingAPI from '../../api/meeting';

export interface IMeeting {
    currentMeetingId: string
    activeMeeting: object
    meetings: Array<object>
}

const initialState: IMeeting = {
    currentMeetingId: '',
    activeMeeting: {},
    meetings: [],
};

export const readMeetings: any = createAsyncThunk(
    'meeting/read',
    async (data:any) => {
      const res = await meetingAPI().read(data);
      return res.data;
    }
);

const meetingSlice = createSlice({
    name: 'meeting',
    initialState,
    reducers: {
        setCurrentMeetingId: (state, action) => {
            const meetingId = action.payload;

            state.currentMeetingId = meetingId;
        },
        resetCurrentMeetingId: (state) => {
            state.currentMeetingId = initialState.currentMeetingId;
        },
        setActiveMeeting: (state, action) => {
            const { id, type } = action.payload;

            state.activeMeeting = {
                id: id,
                type: type,
            };
        },
        resetActiveMeeting: (state) => {
            state.activeMeeting = initialState.activeMeeting;
        },
        resetMeetings: (state, action) => {
            state.meetings = initialState.meetings;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(readMeetings.pending, (state, action) => {
                console.log('c')
            })
            .addCase(readMeetings.fulfilled, (state, action) => {
                console.log(action.payload)
                state.meetings = action.payload;
            })
            .addCase(readMeetings.rejected, (state, action) => {
                console.log(action)
            })
    }
});

export const { setCurrentMeetingId, resetCurrentMeetingId, setActiveMeeting, resetActiveMeeting } = meetingSlice.actions;

export const selectMeeting = (state:any) => state.meeting;

export default meetingSlice.reducer;