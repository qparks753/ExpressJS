const { info } = require('console');
const express = require('express'),
    path = require('path'),
    fs = require('fs'),
    bodyParser = require('body-parser'),
dirname = require('path');

let app = express();

app.use((req, res, next) => {
    console.log(req.url);
    next();
});

app.use((req, res, next) => {
    fs.appendFileSync('server.txt', `${req.url}\n`);
    next();
});
let array = []; //empty array
app.use(bodyParser.urlencoded({ extended: false }));
app.post('/contact-form', (req, res) => {
    //info in object form
    let formData = {
        name: req.body.name,
        email: req.body.email
    };
    
    fs.readFile("contact-form.json",(err,data) =>{
        let dataJson = JSON.parse(data);
        dataJson.forEach(element => {
            array.push(element);
        });
        array.push(formData);
        fs.writeFile("contact-form.json", JSON.stringify(array),(err)=>{
            console.log(err);
        });
    })
    
    // console.log(req.body.email);
    // console.log(req.body.name);
    res.send("Thank you for submitting the contact form!");
     
});

//lists data under form submission route
app.get('/formsubmissions', (req, res) => {
    fs.readFile('contact-form.json', (err, data) => {
        if (err) throw err;
        let info = JSON.parse(data);
        res.send(info);
    })
})

// app.get('/', (req,res)=>{
//     res.send("Hello from the web server side..."); 
// });


app.use(express.static(path.join(__dirname, '../public')));



app.listen(3000);




