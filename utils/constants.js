const reqExpLink = /^(https?:\/\/)(www\.)?([\w-.~:/?#[\]@!$&')(*+,;=]*\.?)*\.{1}[\w]{2,8}(\/([\w-.~:/?#[\]@!$&')(*+,;=])*)?/;

const secretKey = 'secret-key';

module.exports = {
  reqExpLink,
  secretKey,
};
