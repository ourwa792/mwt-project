const axios = require('axios');
const axiosRetry = require('axios-retry');

//axiosRetry(axios, { retries: 3, retryDelay: axiosRetry.exponentialDelay });

//const rax = require('retry-axios');

// إنشاء مثيل axios
/* const instance = axios.create({
  baseURL: 'https://api.example.com',
  timeout: 10000,
});

// إعداد retry-axios على هذا المثيل
instance.defaults.raxConfig = {
  instance: instance,
  retry: 3,
  noResponseRetries: 2,
  retryDelay: 1000,
  httpMethodsToRetry: ['GET', 'HEAD', 'OPTIONS', 'DELETE', 'PUT'],
  statusCodesToRetry: [[100, 199], [429, 429], [500, 599]],
  onRetryAttempt: err => {
    const cfg = rax.getConfig(err);
    console.log(`Retry attempt #${cfg.currentRetryAttempt}`);
  },
  backoffType: 'exponential',
  checkRetryAfter: true,
  shouldRetry: (err) => {
    const cfg = rax.getConfig(err);
    return true;
  }
};

// إضافة retry-axios إلى المثيل
rax.attach(instance);

module.exports = instance;
 */

//module.exports = axios;
