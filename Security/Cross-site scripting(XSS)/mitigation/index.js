const express = require('express');
const app = express();
const port = 3000;
//Added this middleware - whatever has to happen goes throgh this middleware
// app.use((req, res, next) => {
//     res.setHeader(
//     'Content-Security-Policy',
//     "default-src 'self';"
//     );
//     next();
//    })

//    We can define policies on script level as well.
//    modified middleware
// it means load script from self as well as unsecure.com domain
   app.use((req, res, next) => {
    res.setHeader(
    'Content-Security-Policy',
    "default-src 'self';" +
    "script-src 'self' 'nonce-randomKey' 'unsafe-inline' http://unsecure.com;"
    );
    next();
   })
//    You will not see console because it is inline script and we have not set CSP header for inline script.
// To execute inline script, we need to add 'unsafe-inline’

// Now only script which has nonce defined as randomKey is loaded.
// nonce is not visible in DOM(Element tab in inspect)


app.use(express.static('public'));
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


// We don’t want to execute any other script apart from the script from our own place.