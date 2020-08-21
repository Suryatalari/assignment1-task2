//Execute this function when index page render is complete.
$(document).ready(function() {

    //binding modal and tabs classes, to display modal and tabs
    $('.modal').modal();
    $('.tabs').tabs();
    console.log("Web page is ready");

    //function to determine the highest bidder(winner)
    const winner = () => {
            //Updating retrieved details every 1 second.
            setInterval(function() {
                //Activate /Retrievemessages to get data from DB
                $.get('/Retrievemessages', function(messages) {
                    //Clear the output field first
                    $('#eBayprod').empty();
                    //For every record found in DB
                    messages.forEach((DB_data) => {
                        console.log("Highest bid: " + DB_data.bidder_amount + "Name: " + DB_data.bidder_name);
                        //Display appended data.
                        $('#eBayprod').html("Congratulations " + DB_data.bidder_name + ", you have won this item for AUD $" + DB_data.bidder_amount);
                    })
                })
            }, 1000)
        }
        //Timer for 2 minutes
    var timer2 = "2:00";
    var interval = setInterval(function() {
        var timer = timer2.split(':');
        //by parsing integer, we avoid all extra string processing
        var minutes = parseInt(timer[0], 10);
        var seconds = parseInt(timer[1], 10);
        //decrementing seconds
        --seconds;
        //decrementing minutes when seconds become lesser than 0
        minutes = (seconds < 0) ? --minutes : minutes;
        //perform action after timer is completed
        if (minutes < 0) {
            clearInterval(interval);
            //Remove button for bidding
            $('#this_btn').fadeOut();
            //Calling winner function
            winner();
        } else {
            seconds = (seconds < 0) ? 59 : seconds;
            seconds = (seconds < 10) ? '0' + seconds : seconds;
            //printing timer to the html page
            $('#timer').html("Time left: " + minutes + ':' + seconds);
            timer2 = minutes + ':' + seconds;
        }
    }, 1000);


})

//Binding place a bid button to perfoem the following function
const Buyer_detailsBtn = () => {
    //Capture the data elements like name, bid, bidder_email and product code 
    let bidder_name = $('#bidder_name').val();
    let bidder_amount = $('#bidder_amount').val();
    let bidder_email = $('#bidder_email').val();
    let product_code = $('#product_code').val();
    let PR = 214;
    //If bid is lesser than the initial bid, then display alert message.
    if (bidder_amount < PR) {
        alert("Please place your bid higher than the initial bidding price:" + PR + ". Bid you had entered was:" + bidder_amount);
    } else {
        console.log("Name, bidder_email, price and product code" + bidder_name + bidder_email + bidder_amount + product_code);
        //packing all the elements into the one object.
        let data = {
            bidder_name: bidder_name,
            bidder_amount: bidder_amount,
            bidder_email: bidder_email,
            product_code: product_code
        }
        console.log("Data:", data);

        //Sending data to /requiredparams function of server.js
        $.get('/requiredparams', data, function() {

        })
    }
}