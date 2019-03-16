const crypto = require('crypto');
const fs = require('fs');
const es = require('event-stream');

const {
  PASSWORD: password,
  PASSWORDS_FILE: path,
} = process.env;

const getSHA1 = (input) =>
  crypto.createHash('SHA1').update(input).digest('hex');

const getPwnedMessage = ({timesUsed, position}) =>
  `
  P W N E D!
  This password has been leaked and used by at least ${timesUsed} people
  It's on position ${position} of the most used cracked passwords
  `
const getNotPwnedMessage = () => `Good! this password has not been leaked yet`

console.log('Searching in password file...')
let count = 0;
const s = fs.createReadStream(path)
  .pipe(es.split())
  .pipe(es.mapSync((line) => {
      s.pause();
      count++
      if (line.includes(getSHA1(password).toUpperCase())) {
        const timesUsed = line.split(':')[1];
        console.log(getPwnedMessage({timesUsed, position: count}))
        s.end()
      } else {
        s.resume();
      }
    })
    .on('error', (err) => console.error('Error:', err))
    .on('end', () => console.log(getNotPwnedMessage()))
  );
