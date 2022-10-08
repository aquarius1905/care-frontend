const state = {
  dayOfWeeks: ["日曜日", "月曜日", "火曜日", "水曜日", "木曜日", "金曜日", "土曜日"],
};
const getters = {
  getDayOfWeeks(state) {
    return state.dayOfWeeks;
  },
};

export default {
  state,
  getters
}