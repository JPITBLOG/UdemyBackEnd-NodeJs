const Insta = require('instamojo-nodejs');
const makePayment = (req,res) => {
    Insta.setKeys('test_26d6db7fdb9cf8319c5413c8454', 'test_5c2bc0dd788ecd74e17052e5541');

    const data = new Insta.PaymentData();
    Insta.isSandboxMode(true);

    data.purpose =  "testing payment";
    data.amount = req.body.amount;
    data.buyer_name =  "jigar patel";
    data.redirect_url =  "http://localhost:3000/successful-payment/";
    data.email =  "jigspatel1177@gmail.com";
    data.phone =  9726866688;
    data.send_email =  false;
    data.webhook= 'http://www.example.com/webhook/';
    data.send_sms= false;
    data.allow_repeated_payments =  false;

    Insta.createPayment(data, function(error, response) {
        if (error) {
            // some error
        } else {
            // Payment redirection link at response.payment_request.longurl
            const responseData = JSON.parse( response );
            const redirectUrl = responseData.payment_request.longurl;
            console.log( redirectUrl);

            res.status( 200 ).json( redirectUrl );
        }
    });

}

module.exports = {
    makePayment
}