import React, {Component} from 'react';
import Logo from '../../Asset/logo-coral.svg';
import {Col, Container} from 'reactstrap';

class Footer extends Component {
    render() {
        const divStyle = {
            borderBottom:'5px solid red',
        }
        return (

            <footer className="w-100 ant-page-header-footer " style={divStyle}>
                <hr/>
                <Container>

                    <div className="footer_bottom col-md-12">
                        <div className="row">
                            <Col md={6}>
                                <div className="d-flex">
                                    <a className="dib mr-3" href="/">
                                        <img alt="udemy" src={Logo} className="ufb-logo" width="110" height="50"/>
                                    </a>
                                    <p className="footer__copyright dib mr20 text-midnight-lighter">
                                        Copyright © 2019 Udemy, Inc.
                                    </p>
                                </div>
                            </Col>
                            <Col md={6}>
                                <div className="text-right footer__links--bottom mt-3">
                                    <ul className="links list-inline d-flex float-right">
                                        <li className="pr-3">
                                            <a data-purpose="terms-link" href="/terms/">
                                                Terms
                                            </a>
                                        </li>
                                        <li className="pr-3">
                                            <a data-purpose="privacy-link" href="/terms/privacy/">
                                                Privacy Policy and Cookie Policy
                                            </a>
                                        </li>
                                        <li className="pr-3">
                                            <a className=" " data-purpose="footer.links.sitemap" href="/sitemap/">
                                                Sitemap
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </Col>
                        </div>
                    </div>
                </Container>
            </footer>
        );
    }
}

export default Footer;
