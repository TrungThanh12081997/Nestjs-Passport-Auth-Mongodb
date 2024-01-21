import { random } from 'lodash';

function randomId(length = 18) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters[random(characters.length - 1)];
  }
  return result;
}
export default randomId;
