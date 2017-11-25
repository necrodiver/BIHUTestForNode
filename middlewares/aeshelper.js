const crypto = require('crypto');
const config = require('config-lite')(__dirname);
/**
 * aes 256位加密
 * @param {*aes需要加密的字符串} str 
 */
exports.aesEncrypt = function (str) {
  const cipher = crypto.createCipheriv(config.aes.algorithm, config.aes.key, config.aes.iv);
  var crypted = cipher.update(str, config.aes.clearEncoding, config.aes.cipherEncoding);
  crypted += cipher.final(config.aes.cipherEncoding);
  crypted = new Buffer(crypted, config.aes.cipherEncoding).toString(config.aes.decipherEncoding);
  return crypted;
}
/**
 * aes 256位解密
 * @param {*aes需要解密的字符串} str 
 */
exports.aesUnEncrypt = function (str) {
  const decipher = crypto.createDecipheriv(config.aes.algorithm, config.aes.key, config.aes.iv);
  const cipherChunks = [];
  decipher.setAutoPadding(true);
  cipherChunks.push(decipher.update(str, config.aes.decipherEncoding, config.aes.declearEncoding));
  cipherChunks.push(decipher.final(config.aes.declearEncoding));
  const uncrypted = cipherChunks.join('');
  return uncrypted;
}
