#! /usr/bin/env node
let NS1 = require('ns1');
require('epipebomb')();
const fs = require('fs');

const trigger = (key, name) => {
  NS1.set_api_url(process.env.NSONE_DEV_URL);
  NS1.set_api_key(key, null);
  NS1.DataSource.find().then(sources=>{
    console.log(sources); 
  });
};

trigger(fs.readFileSync('.cache_api_key_ns1_dev', 'utf8'));
