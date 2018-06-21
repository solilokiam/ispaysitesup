const axios = require('axios');
const cors = require('micro-cors')();
const {send} = require('micro');

const useNull = () => (null);

const handler = cors(async (req,res) => {
  axios.all([
    axios.get('https://www.porntube.com/').catch(useNull),
    axios.get('https://www.vixen.com/').catch(useNull)
  ])
    .then(axios.spread((tubesResponse, paySitesResponse) => {
      return send(res, 200,{
        tubes: tubesResponse !== null ? 'ok' : 'ko',
        paysites: paySitesResponse !== null ? 'ok' : 'ko',
      });
    }))
    .catch(() => (send(res, 500, '')));

});

module.exports = handler;
