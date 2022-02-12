import React from "react";
import "./About.css"
import kriselda from "../images/Kriselda.png"
import felix from "../images/Felix.png"
import linkedIn from "../images/LinkedIn.png"
import michelle from "../images/Michelle.jpg"
import ricky from "../images/Ricky.png"


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
            <img className="developerPhoto rickyPhoto" src={ricky} alt="profile silhouette" />  
            <p>
            Richard Brown, or Ricky, loves wine and cheese. He loves wine and cheese so much, he decided to use his newly honed skills in React, Express, Node, Javascript, HTML, CSS, and SQL. Thanks for looking at Porto3k! Please look for more projects or mine in the future and thanks to the others who helped make this project.
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
            <img className="developerPhoto michellePhoto" src={michelle} alt="profile silhouette" />
            <p>
            Born and raised in the San Francisco Bay Area, Michelle is no stranger to the beautiful Wine Country. Her love for red wine (and pizza) grew during a trip to Tuscany, Italy. You'll most likely find Michelle enjoying a glass or two of our red wine along with our smoked gouda and her homemade baked goods. 
            </p>
            <a href="https://www.linkedin.com/in/michellemalf/">
                <img className="linkedIn" src={linkedIn} alt="LinkedIn Profile" />
            </a>
        </div>
    </div>
    </>
}

export default About; 