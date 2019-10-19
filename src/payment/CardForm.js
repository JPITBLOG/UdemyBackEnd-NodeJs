import React, { useState, useRef, useEffect } from 'react';

function App(props) {

    const [paidFor, setPaidFor] = useState(false);
    const [loaded, setLoaded] = useState(null);
    let paypalRef = useRef();

    const product = {
        price: props.totalPrice,
        description: 'Your total amount: '
    };

    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://www.paypal.com/sdk/js?client-id=AQOhKQdTt_MTGbRVWQDFmAB3m7Jv_K5ss45acLZ6IqkdAwHIMnd1DYloywJPYOM9JVsukz9tA67OmwJV";
        script.addEventListener("load",() => setLoaded(true));
        document.body.appendChild(script);

        if(loaded){
            setTimeout(() => {
                window.paypal
                    .Buttons({
                        createOrder: (data, actions) => {
                            return actions.order.create({
                                purchase_units: [
                                    {
                                        description: product.description,
                                        amount: {
                                            currency_code: 'USD',
                                            value: product.price,
                                        },
                                    },
                                ],
                            });
                        },
                        onApprove: async (data, actions) => {
                            const order = await actions.order.capture();
                            setPaidFor(true);
                        }

                    })
                    .render(paypalRef);
            });
        }
    })

    return (
        <div className="App">
            {paidFor ? (
                <div>
                    <h1>Congrats, you just bought comfy chair!</h1>
                </div>
            ): (
                <div>
                    <h4>{product.description}{product.price}</h4>
                    <div ref={v => (paypalRef = v)}/>
                </div>
            )
            }
        </div>
    );
}

export default App

//4067 4238 0706 0302
