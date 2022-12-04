import axios from "axios";
import Vue from 'vue'
import USER_TYPE from '@/const/index.js'

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
  },
  makeCareReceiverData(copy_source) {
    let send_data = Vue.util.extend({}, copy_source);

    send_data.name
      = send_data.last_name + '　' + send_data.first_name;
    send_data.name_furigana
      = send_data.last_name_furigana + '　' + send_data.first_name_furigana;
    
    send_data.keyperson_name
      = send_data.keyperson_last_name + '　' + send_data.keyperson_first_name;
    send_data.keyperson_name_furigana
      = send_data.keyperson_last_name_furigana + '　' + send_data.keyperson_first_name_furigana;
    
    [
      'id',
      'last_name',
      'first_name',
      'last_name_furigana',
      'first_name_furigana',
      'keyperson_last_name',
      'keyperson_first_name',
      'keyperson_last_name_furigana',
      'keyperson_first_name_furigana',
    ].forEach(e => delete send_data[e]);

    return send_data;
  },
  getLoggedInUserType() {
    const locationPathName = location.pathname;
    if (locationPathName.match(/care-manager/)) {
      return USER_TYPE.CARE_MANAGER;
    } else if (locationPathName.match(/care-receiver/)) {
      return USER_TYPE.CARE_RECEIVER;
    } else if (locationPathName.match(/nursing-care-office/)) {
      return USER_TYPE.NURSING_CARE_OFFICE;
    }
  }
}