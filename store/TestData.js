import Vue from "vue";

export const state = () => ({
  eventData: [
    {'Event_Id':'b3720b49-273d-4ef2-bd92-d9c92d986966', 'Type': 'Meeting', 'Title': 'Get coffee with Dave', 'Body':'Meet with Dave to get coffee.', 'DateTime':'September 20, 2020 12:00:00', 'Year': 2020, 'Month': 9, 'Day':10, 'Time': '12:00:00'},
    {'Event_Id':'b3720b49-273d-4ef2-bd92-d9c92d986965', 'Type': 'Workout', 'Title': 'Go for a bike ride', 'Body':'Go for a 2 hour bike ride.', 'DateTime':'September 20, 2020 14:00:00', 'Year': 2020, 'Month': 9, 'Day':10, 'Time': '14:00:00'},
    {'Event_Id':'b3720b49-273d-4ef2-bd92-d9c92d986964', 'Type': 'Meeting', 'Title': 'Get coffee with Jane', 'Body':'Get coffee with Jane to discuss budget.', 'DateTime':'September 20, 2020 12:00:00', 'Year': 2020, 'Month': 9, 'Day':20, 'Time': '12:00:00'},
    {'Event_Id':'b3720b49-273d-4ef2-bd92-d9c92d986963', 'Type': 'Workout', 'Title': 'Go for a bike ride', 'Body':'Go for a 30 mile ride.', 'DateTime':'September 20, 2020 14:00:00', 'Year': 2020, 'Month': 9, 'Day':20, 'Time': '14:00:00'},
    {'Event_Id':'b3720b49-273d-4ef2-bd92-d9c92d986962', 'Type': 'Meeting', 'Title': 'Catch up with John', 'Body':'Quick catchup with John to discuss work load.', 'DateTime':'September 20, 2020 12:00:00', 'Year': 2020, 'Month': 9, 'Day':20, 'Time': '16:00:00'},
    {'Event_Id':'b3720b49-273d-4ef2-bd92-d9c92d986961', 'Type': 'Event', 'Title': 'Drinks for fundraiser', 'Body':'Get drinks at local fundraiser.', 'DateTime':'September 20, 2020 14:00:00', 'Year': 2020, 'Month': 9, 'Day':20, 'Time': '17:00:00'},
    {'Event_Id':'b3720b49-273d-4ef2-bd92-d9c92d986960', 'Type': 'Event', 'Title': 'Golf with Clients', 'Body':'Go golfing with clients.', 'DateTime':'September 20, 2020 14:00:00', 'Year': 2020, 'Month': 9, 'Day':20, 'Time': '17:00:00'}
  ]
});

export const getters = {
  eventData: function(state) {
    return state.eventData;
  }
};

export const mutations = {
  ADD_EVENTDATA: function(state, event) {
    state.eventData.push(event)
  },
};

export const actions = {
  addEventData({ commit }, event) {
    commit("ADD_EVENTDATA", event);
  },
};
