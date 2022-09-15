const initialState = [];
import * as types from "./actionTypes";

function formatSession(id, reminders) {
  return {
    id: sessionid,
    reminders: reminders,
    notes: "",
  };
}
export default function agendaReducer(state = initialState, action) {
  switch (action.type) {
    case types.ADD_TO_AGENDA: {
      const { sessionid, reminders } = action.payload;
      return [...state, formatSession(sessionid, reminders)];
    }
    default:
      return state;
  }
}
