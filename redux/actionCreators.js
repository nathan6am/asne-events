import * as types from "./actionTypes";
export function addToMyEvents(eventid) {
  return {
    type: types.ADD_TO_MY_EVENTS,
    payload: eventid,
  };
}

export function removeFromMyEvents(eventid) {
  return {
    type: types.REMOVE_FROM_MY_EVENTS,
    payload: eventid,
  };
}

export function addToAgenda(eventid, sessionid) {
  return {
    type: types.ADD_TO_AGENDA,
    payload: {
      eventid: eventid,
      sessionid: sessionid,
    },
  };
}
export function removeFromAgenda(eventid, sessionid) {
  return {
    type: types.REMOVE_FROM_AGENDA,
    payload: {
      eventid: eventid,
      sessionid: sessionid,
    },
  };
}

export function updateNotes(eventid, sessionid, notes) {
  const action = {
    type: types.UPDATE_SESSION_NOTES,
    payload: {
      eventid: eventid,
      sessionid: sessionid,
      notes: notes,
    },
  };
  console.log(action);
  return action;
}
