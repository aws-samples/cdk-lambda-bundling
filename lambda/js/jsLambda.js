const v = require('voca');

exports.handler = async function(event) {
    return `Hello, ${v.upperCase(event.firstName)} ${v.upperCase(event.lastName)}!`    
}