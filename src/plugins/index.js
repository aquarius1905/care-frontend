import axios from "axios";
const jsonpAdapter = require('axios-jsonp')

export default {
  async fetchAddress(post_code) {
    const { data } = await axios
      .get(
        `https://api.zipaddress.net/?zipcode=${post_code}`,
        { adapter: jsonpAdapter }
      );
    return data.fullAddress;
  }
}