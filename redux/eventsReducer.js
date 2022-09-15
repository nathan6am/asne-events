const initialState = [];
import * as types from "./actionTypes";
export default function eventsReducer(state = initialState, action) {
  switch (action.type) {
    case types.ADD_TO_MY_EVENTS: {
      const eventid = action.payload;
      if (state.some((event) => event.id === eventid)) {
        return state;
      }
      return [...state, { id: eventid, myAgenda: [], sessionNotes: [] }];
    }

    case types.REMOVE_FROM_MY_EVENTS: {
      const eventid = action.payload;
      const filtered = state.filter((event) => event.id !== eventid);
      return filtered;
    }

    case types.ADD_TO_AGENDA: {
      const { eventid, sessionid } = action.payload;
      const idx = state.findIndex((event) => event.id === eventid);
      if (idx === -1) {
        return [
          ...state,
          {
            id: eventid,
            myAgenda: [{ id: sessionid, notifications: true }],
            sessionNotes: {},
          },
        ];
      } else {
        const updated = state.map((event, i) => {
          if (i !== idx) return event;
          if (event.myAgenda.some((session) => session.id === sessionid))
            return event;
          return {
            ...event,
            myAgenda: event.myAgenda.concat([
              { id: sessionid, notifications: true },
            ]),
          };
        });
        return updated;
      }
    }
    case types.REMOVE_FROM_AGENDA: {
      console.log(action.payload);
      const { eventid, sessionid } = action.payload;
      const idx = state.findIndex((event) => event.id === eventid);
      if (idx === -1) {
        return state;
      } else {
        const updated = state.map((event, i) => {
          if (i !== idx) return event;
          if (!event.myAgenda.some((session) => session.id === sessionid))
            return event;
          return {
            ...event,
            myAgenda: event.myAgenda.filter(
              (session) => session.id !== sessionid
            ),
          };
        });
        return updated;
      }
    }

    case types.UPDATE_SESSION_NOTES: {
      const { eventid, sessionid, notes } = action.payload;
      console.log(action.payload);
      const idx = state.findIndex((event) => event.id === eventid);
      if (idx === -1) {
        return [
          ...state,
          {
            id: eventid,
            myAgenda: [],
            sessionNotes: { [sessionid]: notes },
          },
        ];
      } else {
        const updated = state.map((event, i) => {
          if (i !== idx) return event;
          return {
            ...event,
            sessionNotes: {
              ...event.sessionNotes,
              [sessionid]: notes,
            },
          };
        });
        return updated;
      }
    }

    default:
      return state;
  }
}
