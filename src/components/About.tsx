import React from 'react';

const About: React.FC = () => {
    return <div>
    <h1>About me</h1>
    <section>
        I am ThangLe, a software engineer, although I'd like to consider myself as a practisioner of software craftmanship. Since graduation, I've been
         working primarily with web development, my current company is Agoda, an online travel agency, where I work as a fullstack developer.
        <br/>
        My main interest lies in solving complex problems with simple and elegant
        solutions. I've become big fan of functional programming and micro services. 
    </section>
    <section>
        <h3>What is this blog for?</h3>
        I build this site mainly to consolidate my knowlege in software development and hopefully it can help people sometimes when they 
        need to look for related insights. I am very open for ideas and suggestions, so please reach out me at <a href="mailto:thangle.engineer@gmail.com" >thangle.engineer@gmail.com</a>.
        <br/>
        you can also find me via <a target="blank" href='https://www.linkedin.com/in/thang-le-a9695341'>LinkedIn</a> or <a target='blank' href='https://twitter.com/ThangLeQuoc'>Twitter</a>
    </section>
    </div>;
}

export default About;