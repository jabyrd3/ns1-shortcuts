# ns1 dev shortcuts
This is a set of utility scripts i've been using to make development easier. They behave like unix commands, each one accepts either args or stdin so you can pipe output to the next command. The API url is set by environment variable (NSONE_DEV_URL), so you can use these against any instance of the API, provided you have an API key with permissions to create users. You need to set the env var NSONE_DEV_KEY to that key. 

# big example
`nsca someUser somePassword | nsl && nscz foo.bar.baz | nscr`

The above example creates a user with a username of someUser and a password of somePassword. It then uses the login script to cache the apikey (this will also perform an http request if called on its own with 2 args). After that, it creates a zone (foo.bar.baz). The output of that is piped to the createRecords command, which will take the zone from stdin and generate 49 records there (0..40.foo.bar.baz).

# available commands
## nsca
mnemonic for ns1 createAccount. This uses the root key to create an account at http://portal.dev.nsone.co. Username/password are the two arguments.

## nsl
ns1 login: you can pipe stdout from nsca to this and it will use the key from the original API request for any subsequent commands. If you're writing a one liner, be sure to use && after this for now. Eventually i'd like it to support the pipe syntax but it's being finnicky if you don't && because of a workaround.

## nscz
ns1 createZone: This takes one argument, even when using a pipe (hacky, i know). When you pass this zone name as an arg, it creates a zone. stdout for this is `${apikey}\n${zoneName}`.

## nscz
ns1 createZones: creates 50 zones with the 1 argument as zone suffix (0..50.foobar.com)

## nscr
ns1 createRecords: this accepts either 1 argument (zone name) or stdin (zone name). It creates 49 records at the zone name you pass it. 

# individual examples
```
shell> nsca <username> <password>
  <username> \n
  <password> \n
  <apikey> \n
```
```
shell> login <username> <password>
```
```
shell> nscz foobar.baz
```
```
shell> nscr foobar.baz
```

# installation
- clone the directory
- cd into it
- `npm install`
- `npm link`

# prereqs
- node.js 6-ish
- set `$NSONE_DEV_KEY` to the master key for the local dev envs for account creation; this is the only time its used.
- set `$NSONE_DEV_URL` to the url of the environment you're trying to reach (ie: http://portal.dev.nsone.co)

# todo
- [ ] config file
- [ ] standardize .cache_api_key_ns1_dev location, make configurable
- [ ] fix login && vs | garbage
- [ ] add more actions
- [ ] test suite
- [ ] standardize error handling, abort, exit code logic for failures 
- [ ] better logging
- [ ] reorganize codebase for ergonomics and consistency
