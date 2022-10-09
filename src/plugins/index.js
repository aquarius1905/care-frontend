import axios from "axios";
import Vue from 'vue'
const jsonpAdapter = require('axios-jsonp')

export default {
  async fetchAddress(post_code) {
    const { data } = await axios
      .get(
        `https://api.zipaddress.net/?zipcode=${post_code}`,
        { adapter: jsonpAdapter }
    );
    return data.fullAddress;
  },
  makeSendData(copy_source) {
    let send_data = Vue.util.extend({}, copy_source);

    send_data.name
      = send_data.last_name + '　' + send_data.first_name;
    send_data.name_furigana
      = send_data.last_name_furigana + '　' + send_data.first_name_furigana;
    
    [
      'id',
      'last_name',
      'first_name',
      'last_name_furigana',
      'first_name_furigana',
    ].forEach(e => delete send_data[e]);

    return send_data;
  }
}