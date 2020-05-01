import React from 'react';
import styled from 'styled-components';

const Image = styled.img`
    min-width: 50%;
    max-width: 400px;
    border: 1px solid #D3D3D3;
    margin: 24px auto;
`;

const Home: React.FC = () => {
    const dataFlow = require('assets/webFlow.png');
    const browsers = require('assets/browsers.png');
    return <div>
        <h3>Basics concepts that every web developer should know</h3>
        <section>
            In this post, we will discuss the fundamental concepts of website development. First, to get the general
            idea, it's useful to see a overal data flow between browsers and servers.
            <div>
                <Image src={dataFlow.default} alt="general data flow of websites"/>
            </div>
            Data flow begin from browsers, it could be mobile, desktop or any smart devices that have browsers installed. In this scheme, 
            there are 3 main components that we'll discuss as follows: browsers, network and servers. 
        </section>
        <section>
            <h4>1. Brosers: How does it work ?</h4>
            <div style={{ width: '50%'}}><Image src={browsers.default} alt="most popular browsers"></Image></div>
            The main responsibility of browser is to display a HTML page. The process start when users input the URL of 
            the website they want to view (e.g. http://www.foo.com), broswer then convert it to network request and send to servers.
            The response of server is alway an HTML file for browser. In the HTML file may include more links for images,
            videos, javascripts or others files. 
            {/* insert image descript request and response with  html */}
            One of the main components in browser is rendering engine. It is responsible for interpreting html file
            and css to generate the layout and content of a web page. There are some main popular engines for browsers 
            at the moment:
            <ul>
                <li>Internet Explorer: Trident</li>
                <li>Firfox: Gecko</li>
                <li>Chrome: Blink</li>
                <li>Chrome (iphone) + Safari: Webkit</li>
            </ul>
            Some other components of browsers which are very important for developers to know are: networking, javascript intepreter
             and storage.

        </section>
        <section>
            <h4>2. Network communication</h4>
        </section>
        <section>
            <h4>3. Servers architecture</h4>
        </section>
    </div>;
}

export default Home;