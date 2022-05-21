import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export interface IMeeting {
    currentMeetingId: string
    activeMeeting: object
}

const initialState: IMeeting = {
    currentMeetingId: '',
    activeMeeting: {},
};

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
    },
    extraReducers: {
    }
});

export const { setCurrentMeetingId, resetCurrentMeetingId, setActiveMeeting, resetActiveMeeting } = meetingSlice.actions;

export const selectMeeting = (state:any) => state.meeting;

export default meetingSlice.reducer;