#! /usr/bin/env node

const NS1 = require('ns1');
const fs = require('fs');
require('epipebomb')();
let iterator = 0;
const readline = require('readline');

const trigger = (key, name) => {
  NS1.set_api_url(process.env.NSONE_DEV_URL);
  NS1.set_api_key(key, null);
  while (iterator < 49){
    const data = {
      'zone': name,
      'domain':`${iterator}.${name}`,
      'type':'A',
      'answers':[{
          'answer':['1.1.1.1']
      }]
    };
    new NS1.NS1Request('put', `/zones/${name}/${iterator}.${name}/A`, data)
      .catch(err=>{
        iterator = 100;
        console.log('error creating records!', err);
      });
    iterator++;
  }
};

if (!process.argv[2]){
  const arr = [];
  var rl = readline.createInterface({
    input: process.stdin,
    terminal: false
  });

  rl.on('line', (line) => {
    arr.push(line);
    if (arr.length === 2){
      trigger(arr[0], arr[1]);
    }
  });
} else {
  trigger(fs.readFileSync('.cache_api_key_ns1_dev'), process.argv[2]);
}
