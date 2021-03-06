#! /usr/bin/env node

var burstsms = require('../src')()
var yargs = require('yargs')

yargs.command('sms', 'SMS methods', function(yargs){
  return yargs.command('send', 'Send an SMS', function(yargs){
    var args = yargs
    .options({
      number: {
        alias: 'n',
        demand: true,
        type: 'string'
      },
      message: {
        alias: 'm',
        demand: true,
        type: 'string'
      }
    })

    burstsms.sms.send(args.argv.message, args.argv.number)
      .then(function(body, res){
        console.log('Message Sent!')
        process.exit(1)
      })
      .catch(function(error){
        console.log('Message could not be sent. Reason: ')
        console.log(error)
        process.exit(0)
      })
  })
})
  .help('h')
  .showHelpOnFail(false, 'Specify --help for available options')
  .env('burstsms')
  .argv
