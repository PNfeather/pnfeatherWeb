import storage from '@/tools/storage';

const user = {
  state: {
    userLevel: storage.get('userLevel') || '2'
  },
  mutations: {
    SET_USERLEVEL: (state, data) => {
      state.userLevel = data;
    }
  },
  actions: {
    // 获取用户信息
    changeUserLevel ({commit}, level) {
      storage.set('userLevel', level);
      commit('SET_USERLEVEL', level);
    }
  }
};

export default user;
