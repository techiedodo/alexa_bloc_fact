/**
    Copyright 2014-2015 Amazon.com, Inc. or its affiliates. All Rights Reserved.

    Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at

        http://aws.amazon.com/apache2.0/

    or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
*/

/**
 * This simple sample has no external dependencies or session management, and shows the most basic
 * example of how to create a Lambda function for handling Alexa Skill requests.
 *
 * Examples:
 * One-shot model:
 *  User: "Alexa, ask Einstein Factoids for an Einstein fact"
 *  Alexa: "Here's your Einstein fact: ..."
 */

/**
 * App ID for the skill
 */
var APP_ID = undefined; //replace with "amzn1.echo-sdk-ams.app.[your-unique-value-here]";

/**
 * Array containing Einstein facts.
 */
var EINSTEIN_FACTS = [
    "Einstein was born in Germany on March 14, 1879.",
    "He died on April 18, 1955 at the age of 76 in Princeton, New Jersey, United States.",
    "He was born in a middle-class Jewish family and had a sister named Maja who was two years younger to him.",
    "Albert Einstein completed his elementary education from Luitpold Gymnasium in Munich.",
    "The first scientific paper he wrote was at the age of 16.",
    "Einstein and Maric had a daughter named Lieserl.",
    "Einstein took a clerical job in a Swiss patent office.",
    "Einstein became director of Kaiser Wilhelm Institute for Physics and served from 1913 to 1933.",
    "His work on General Theory of Relativity was eventually completed by Einstein in 1915.",
    "In 1921, Einstein received the Noble Prize for Physics, but he did not win for his Theory of Relativity as it was not completely understood by many.",
    "Einstein really hated wearing socks.",
    "Einstein was asked to become the President of Zionist Israel in 1952 but he declined the offer.",
    "Einstein invented a refrigerator that used alcohol gas for operating.",
    "His eyeballs are preserved in a safe box in New York City.",
    "He never failed math.",
    "He was a great musician.",
    "His two favourite subjects in school were geometry and philosophy.",
    "Einstein was left handed.",
    "Arthur Sasse was the fortunate photographer to secure a close-up of Einstein jokingly sticking out a tongue in front of a camera."
];

/**
 * The AlexaSkill prototype and helper functions
 */
var AlexaSkill = require('./AlexaSkill');

/**
 * EinsteinFactoid is a child of AlexaSkill.
 * To read more about inheritance in JavaScript, see the link below.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Introduction_to_Object-Oriented_JavaScript#Inheritance
 */
var EinsteinFactoid = function () {
    AlexaSkill.call(this, APP_ID);
};

// Extend AlexaSkill
EinsteinFactoid.prototype = Object.create(AlexaSkill.prototype);
EinsteinFactoid.prototype.constructor = EinsteinFactoid;

EinsteinFactoid.prototype.eventHandlers.onSessionStarted = function (sessionStartedRequest, session) {
    console.log("EinsteinFactoid onSessionStarted requestId: " + sessionStartedRequest.requestId
        + ", sessionId: " + session.sessionId);
    // any initialization logic goes here
};

EinsteinFactoid.prototype.eventHandlers.onLaunch = function (launchRequest, session, response) {
    console.log("EinsteinFactoid onLaunch requestId: " + launchRequest.requestId + ", sessionId: " + session.sessionId);
    handleNewFactRequest(response);
};

/**
 * Overridden to show that a subclass can override this function to teardown session state.
 */
EinsteinFactoid.prototype.eventHandlers.onSessionEnded = function (sessionEndedRequest, session) {
    console.log("EinsteinFactoid onSessionEnded requestId: " + sessionEndedRequest.requestId
        + ", sessionId: " + session.sessionId);
    // any cleanup logic goes here
};

EinsteinFactoid.prototype.intentHandlers = {
    "GetNewFactIntent": function (intent, session, response) {
        handleNewFactRequest(response);
    },

    "AMAZON.HelpIntent": function (intent, session, response) {
        response.ask("You can ask Einstein Factoid tell me an Einstein fact, or, you can say exit... What can I help you with?", "What can I help you with?");
    },

    "AMAZON.StopIntent": function (intent, session, response) {
        var speechOutput = "Goodbye";
        response.tell(speechOutput);
    },

    "AMAZON.CancelIntent": function (intent, session, response) {
        var speechOutput = "Goodbye";
        response.tell(speechOutput);
    }
};

/**
 * Gets a random new fact from the list and returns to the user.
 */
function handleNewFactRequest(response) {
    // Get a random space fact from the space facts list
    var factIndex = Math.floor(Math.random() * EINSTEIN_FACTS.length);
    var fact = EINSTEIN_FACTS[factIndex];

    // Create speech output
    var speechOutput = "Here's your Einstein fact: " + fact;

    response.tellWithCard(speechOutput, "EinsteinFactoid", speechOutput);
}

// Create the handler that responds to the Alexa Request.
exports.handler = function (event, context) {
    // Create an instance of the EinsteinFactoid skill.
    var einsteinFactoid = new EinsteinFactoid();
    einsteinFactoid.execute(event, context);
};

