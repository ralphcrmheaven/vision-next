import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { IMeetingRecord } from '../../interfaces';
import meetingAPI from '../../api/meeting';

interface IMeeting {
    currentMeetingId: string
    activeMeeting: object
    meetings: Array<IMeetingRecord>
}

const initialState: IMeeting = {
    currentMeetingId: '',
    activeMeeting: {},
    meetings: [],
};

export const meetingCreate: any = createAsyncThunk(
    'meeting/create',
    async (data:any) => {
      const res = await meetingAPI().create(data);
      return res;
    }
);

export const meetingRead: any = createAsyncThunk(
    'meeting/read',
    async (pkValue:any, data:any) => {
      const res = await meetingAPI().read(pkValue, data);
      return res;
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
            .addCase(meetingRead.pending, (state, action) => {
                state.meetings = initialState.meetings;
            })
            .addCase(meetingRead.fulfilled, (state, action) => {
                let meetings = action.payload;
                meetings = meetings.filter((m:any) => { return typeof m.CreatedAt !== 'undefined' && m.StartDate !== ''}).sort((a:any, b:any) => new Date(a.StartDateTimeUTC) > new Date(b.StartDateTimeUTC) ? 1 : -1);
                state.meetings = meetings;
            })
            .addCase(meetingRead.rejected, (state, action) => {
            })
            .addCase(meetingCreate.pending, (state, action) => {
            })
            .addCase(meetingCreate.fulfilled, (state, action) => {
                const { data } = action.payload;
                let meetings = [data, ...state.meetings];
                meetings = meetings.filter((m:any) => { return typeof m.CreatedAt !== 'undefined' && m.StartDate !== ''}).sort((a:any, b:any) => new Date(a.StartDateTimeUTC) > new Date(b.StartDateTimeUTC) ? 1 : -1);
                state.meetings = meetings;
            })
            .addCase(meetingCreate.rejected, (state, action) => {
            })
    }
});

export const { setCurrentMeetingId, resetCurrentMeetingId, setActiveMeeting, resetActiveMeeting } = meetingSlice.actions;

export const selectMeeting = (state:any) => state.meeting;

export default meetingSlice.reducer;