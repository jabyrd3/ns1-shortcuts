#! /usr/bin/env node
let NS1 = require('ns1');
require('epipebomb')();
// creates an account from 2 args and writes
// username and password to stdout on success.
NS1.set_api_url(process.env.NSONE_DEV_URL);
NS1.set_api_key(process.env.NSONE_DEV_KEY, null);
const data = {
        'username': process.argv[2],
        'password': process.argv[3],
        'plan': {
            'type': 'startup',
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
    process.stdout.write(`${data.username}\n${data.password}\n${res.key}`);
  })
  .catch(()=>{
    // console.log('nsl:', err);
    process.exit(2);
  });

