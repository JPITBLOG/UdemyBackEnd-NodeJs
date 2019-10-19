import React from 'react';
import PaypalExpressBtn from 'react-paypal-express-checkout';

export default class MyApp extends React.Component {
    render() {
        const client = {
            sandbox:'sb-icza4181969@personal.example.com'
        }
        return (
            <PaypalExpressBtn client={client} currency={'USD'} total={1.00} />
        );
    }
}
