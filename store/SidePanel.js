import Vue from "vue";

export const state = () => ({
  showSidePanel: false,
  sidePanelType: null,
  refreshQueries: false,
  sidePanelEntityId: null
});

export const getters = {
  showSidePanel: function(state) {
    return state.showSidePanel;
  },
  sidePanelType: function(state) {
    return state.sidePanelType;
  },
  sidePanelEntityId: function(state) {
    return state.sidePanelEntityId
  }
};

export const mutations = {
  SET_SHOWSIDEPANEL: function(state, panelState) {
    state.showSidePanel = panelState;
  },
  SET_SIDEPANELTYPE: function(state, sidePanelType) {
    state.sidePanelType = sidePanelType;
  },
  SET_SIDEPANELENTITYID: function(state, entityId) {
    state.sidePanelEntityId = entityId;
  }
};

export const actions = {
  sidePanelToggle({ commit }, panelState) {
    commit("SET_SHOWSIDEPANEL", panelState);
  },
  setSidePanelType({ commit }, sidePanelType) {
    commit("SET_SIDEPANELTYPE", sidePanelType);
  },
  setSidePanelEntityId({ commit }, entityId) {
    commit("SET_SIDEPANELENTITYID", entityId)
  }
};
