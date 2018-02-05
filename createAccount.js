#! /usr/bin/env node
let NS1 = require('ns1');
let fs = require('fs');
require('epipebomb')();
// creates an account from 2 args and writes
// username and password to stdout on success.
 console.log(process.env.NSONE_DEV_URL);
NS1.set_api_url(process.env.NSONE_DEV_URL);
NS1.set_api_key(process.env.NSONE_DEV_KEY, null);
const data = {
        'username': process.argv[2],
        'password': process.argv[3],
        'plan': {
            'type': 'advanced',
            'period': 'monthly'
        },
        'contact': {
            'address': {
                'city': 'New York',
                'country': 'US',
                'postalcode': '10007',
                'street': '16 beaver street',
                'state': 'NY'
            },
            'email': `${this.username}@nsone.net`,
            'firstname': 'jordan',
            'lastname': 'byrd',
            'phone': '15857484523'
        },
        'paymentmethod': {
            'type': 'creditcard',
            'address': {
                'city': 'New York',
                'country': 'US',
                'postalcode': '10007',
                'street': 'Villa',
                'state': 'NY'
            },
            'firstname': 'jordan',
            'lastname': 'byrd',
            'phone': '15857484523',
            'cc_cvv2': '123',
            'cc_expire_month': 11,
            'cc_expire_year': 2030,
            'cc_number': '4111111111111111'
        }
    };
new NS1.NS1Request('put', '/account/signup', data)
  .then(res=>{
    console.log(res)
    NS1.set_api_key(res.key, null);
    NS1.Account.ApiKey
        .create({name: 'TSDB shim', permissions: {dns: {view_zones: true}}})
        .then((keyRes)=>{
            fs.writeFileSync('.ns1shimkey', keyRes.attributes.key);
            console.log('remember to source .ns1shimkey as env var contents for using mock tsdb!');
            process.stdout.write(`${data.username}\n${data.password}\n${res.key}\n`);
        }).catch(e=>{
            console.log('failed out creating apikey for mock tsdb', e);
        })
  })
  .catch((err)=>{
    console.log('nsl:', err);
    process.exit(2);
  });

