import * as CryptoJS from 'crypto-js';

//const secretKey = 'v!$!oNn3xt@20222022@v!$!oNn3xt!!';
const secretKey = process.env.REACT_APP_SK ?? '';
const mode = CryptoJS.mode.CBC;
const format = CryptoJS.format.Hex;

export const decrypt = (encryptedText:any) => {
    const [ encryptedData, iv ] = encryptedText.split('|');
  
    return CryptoJS.AES.decrypt(encryptedData, CryptoJS.enc.Utf8.parse(secretKey), {
      iv: CryptoJS.enc.Hex.parse(iv),
      mode: mode,
      format: format,
    }).toString(CryptoJS.enc.Utf8);
  }