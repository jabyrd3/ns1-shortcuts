#! /usr/bin/env node

let NS1 = require('ns1');
require('epipebomb')();
const fs = require('fs');
var readline = require('readline');
const trigger = (arr) => {
  NS1.set_api_url(process.env.NSONE_DEV_URL);
  NS1.set_api_key(null);
  const data={
    username: arr[0],
    password: arr[1]
  };
  if (arr.length === 3){
      fs.writeFileSync('.cache_api_key_ns1_dev', arr[2], 'utf8');
      return process.stdout.write(`${arr[3]}\n`);
  }
  new NS1.NS1Request('post', '/account/login', data)
    .then(res=>{
      fs.writeFileSync('.cache_api_key_ns1_dev', res.key, 'utf8');
      process.exit();
    })
    .catch(err=>{
      console.log(err);
    });
};

if (!process.argv[2]){
  var rl = readline.createInterface({
    input: process.stdin,
    terminal: false
  });
  let arr = [];
  rl.on('line', (line) => {
    arr.push(line);
    if (arr.length === 3){
      trigger(arr);
    }
  });
}

if (process.argv[2] && process.argv[3]){
  trigger(process.argv.slice(2, 4));
}
