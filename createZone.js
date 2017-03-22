#! /usr/bin/env node
let NS1 = require('ns1');
require('epipebomb')();
const fs = require('fs');

const trigger = (key, name) => {
  NS1.set_api_url(process.env.NSONE_DEV_URL);
  NS1.set_api_key(key, null);
  NS1.Zone.create({zone: name})
    .then(() => {
      process.stdout.write(`${key}\n${name}\n`);
    })
    .catch(err=>{
      console.log('err', err);
    });
};

if (!process.argv[2]){
  console.log('you need to provide a zone name!');
  process.exit();
}

trigger(fs.readFileSync('.cache_api_key_ns1_dev', 'utf8'), process.argv[2]);
