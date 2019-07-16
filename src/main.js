import { getFullName } from './scripts/utils';

if (process.env.MYNAME) {
  const firstName = getFullName(process.env.MYNAME);
  console.log(firstName); 
}

console.log('yo yo yo');
