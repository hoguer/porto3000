import React from "react";
import "./About.css"
import kriselda from "../images/Kriselda.png"
import felix from "../images/Felix.png"
import linkedIn from "../images/LinkedIn.png"

const About = () => {
    return <>
    <div className="aboutHeader">
            <h2>Hello to a new world</h2>
            <p>From the crisp air and radiant California sun, the drinks and products of Porto 3000 are of the finest nature. Ethically sourced from our own vineyards, we strive for excellence in every sip and bite.</p>
            <h2>Our founders</h2>
    </div>
    <div className="aboutContainer">
        <div className="kriselda">
            <h2>Kriselda Bonifacio</h2>
            <img className="developerPhoto" src={kriselda} alt="Kriselda's Headshot" />
            <p>
            A software developer by day and a cheese connoisseur by night, Kriselda is always on the search for the softest and most flavorful cheese to add to her charcuterie board. Alongside her love for the cheesy greatness, Kriselda is in pursuit of knowledge with the goal of becoming fluent in Japanese, Korean, and Spanish to help foster conversation over a wonderful glass of wine.
            </p>
            <a href="https://www.linkedin.com/in/kbonifacio/">
                <img className="linkedIn" src={linkedIn} alt="LinkedIn Profile" />
            </a>
        </div>

        <div className="ricky">
            <h2>Richard Brown</h2>
            <img className="developerPhoto" src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/Head_silhouette.svg/600px-Head_silhouette.svg.png" alt="profile silhouette" />  
            <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi nunc quam, elementum ut odio non, tempus varius risus. Duis sollicitudin enim et felis rhoncus, et ultricies lacus euismod. Aliquam tincidunt nec est ac lacinia. Quisque eget massa eget est facilisis pretium. Aenean enim lacus, ultricies non libero ut, aliquam accumsan.
            </p>
            <a href="https://www.linkedin.com/in/number1ricky/">
                <img className="linkedIn" src={linkedIn} alt="LinkedIn Profile" />
            </a>
        </div>
            
        <div className="felix">
            <h2>Felix Cadiz</h2>
            <img className="developerPhoto felixPhoto" src={felix} alt="profile silhouette" />  
            <p>
            Always open to a friendly drink, Felix's adoration for software development and wine—specifically our very own Port wine—began near the San Francisco Bay Area. In parallel to his thirst for knowledge of various tech stacks, musical instruments, and yoyoing, Felix is determined to create the optimal recipie for the perfect grilled cheese.
            </p>
            <a href="https://www.linkedin.com/in/felix-cadiz/">
                <img className="linkedIn" src={linkedIn} alt="LinkedIn Profile" />
            </a>
        </div>

        <div className="michelle">
            <h2>Michelle Malfabon</h2>
            <img className="developerPhoto" src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/Head_silhouette.svg/600px-Head_silhouette.svg.png" alt="profile silhouette" />
            <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi nunc quam, elementum ut odio non, tempus varius risus. Duis sollicitudin enim et felis rhoncus, et ultricies lacus euismod. Aliquam tincidunt nec est ac lacinia. Quisque eget massa eget est facilisis pretium. Aenean enim lacus, ultricies non libero ut, aliquam accumsan.
            </p>
            <a href="https://www.linkedin.com/in/michellemalf/">
                <img className="linkedIn" src={linkedIn} alt="LinkedIn Profile" />
            </a>
        </div>
    </div>
    </>
}

export default About; 