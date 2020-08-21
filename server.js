//Initializing and calling express application
var express = require("express");
var app = express();
const bodyParser = require('body-parser')

//Listen to a particular port
var port = process.env.PORT || 8080;
app.listen(port);
console.log("Listening on port ", port);

//Static files(html)
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

//Initialize MongoDB to send and retrieve data
const MongoClient = require('mongodb').MongoClient;

//Endpoint to insert user details into mongoDB
app.get('/requiredparams', function(request, response) {
    //stroring name, bid amount, bidder_email and product code into variables
    let bidder_name = request.query.bidder_name;
    let bidder_amount = parseInt(request.query.bidder_amount);
    let bidder_email = request.query.bidder_email;
    let product_code = request.query.product_code;
    console.log('Added message' + bidder_name + bidder_amount + product_code + bidder_email);
    //Calling insert data function
    insertMessage(bidder_name, bidder_amount, bidder_email, product_code);
})

//Endpoint to retrieve user details from mongoDB
app.get('/Retrievemessages', function(request, response) {
    //Calling retrieve data function
    retrieveMessages(response);
})

//mongoDB URI to access the remote database
const uri = "mongodb+srv://sit725:sit725@sit725.nzg9x.mongodb.net/Auctionsite?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });

let collectionMessage;

//DB connection
client.connect(err => {
    collectionMessage = client.db("Auctionsite").collection("auction");
})

//This function inserts data to mongoDB
const insertMessage = (bidder_name, bidder_amount, bidder_email, product_code) => {
    //insert records one by one
    collectionMessage.insertOne({
        bidder_name: bidder_name,
        bidder_amount: bidder_amount,
        bidder_email: bidder_email,
        product_code: product_code
    });

}

//This function retrieves data from DB
const retrieveMessages = (response) => {
    //Finding the highest bidder
    collectionMessage.find().sort({ bidder_amount: -1 }).limit(1).toArray(function(err, result) {
        //Catch and throw errors 
        if (err) throw err;
        console.log(result);
        //Sending the details of the highest bidder
        response.send(result);
    })
}