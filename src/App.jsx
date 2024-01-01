import { useState } from "react";
import successTick from "./images/icon-success.svg";
import listTick from "./images/icon-list.svg";
import { useEffect } from "react";
function App() {
    // eslint-disable-next-line no-useless-escape
    var emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState(false);
    const [signupVisible, setSignupVisible] = useState(true);
    const [successVisible, setSuccessVisible] = useState(false);

    useEffect(() => {
        document.getElementById("email").addEventListener("focus", (e) => {
            e.target.classList.remove("error");
            setEmailError(false);
        });
    });

    const toggleSubscription = () => {
        setSignupVisible(!signupVisible);
        setSuccessVisible(!successVisible);
        setEmail("");
        setEmailError(false);
    };

    function verifyEmail(e) {
        e.preventDefault();
        if (emailRegex.test(email)) {
            toggleSubscription();
        } else {
            setEmailError(!emailError);
        }
    }

    return (
        <main>
            <h1 className="sr-only">Newsletter</h1>
            <section
                className={`baseStyling newsletterStyling ${signupVisible ? "visible" : "hidden"}`}
            >
                <h2 className="sr-only">Signup section</h2>
                <section id="newsletterSignupText">
                    <h2>Stay updated!</h2>
                    <p>Join 60,000+ product managers receiving monthly updates on:</p>
                    <ul>
                        <li>
                            <img src={listTick} alt="" />
                            <span>Product discover and building what matters</span>
                        </li>
                        <li>
                            <img src={listTick} alt="" />
                            <span>Measuring to ensure updates are a success</span>
                        </li>
                        <li>
                            <img src={listTick} alt="" />
                            <span>And much more!</span>
                        </li>
                    </ul>
                    <form onSubmit={verifyEmail}>
                        <label htmlFor="email">
                            Email Address{" "}
                            <span id="emailError">{emailError && "Valid email required"}</span>
                        </label>
                        <input
                            type="text"
                            id="email"
                            placeholder="email@company.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className={emailError ? "error" : "valid"}
                        />
                        <button id="subscribeToNewsletter">Subscribe to monthly newsletter</button>
                    </form>
                </section>
                <figure id="newsletterSignupArtwork"></figure>
            </section>
            <section
                className={`baseStyling successSignupStyling ${
                    successVisible ? "visible" : "hidden"
                }`}
            >
                <h2 className="sr-only">Successful Sign up</h2>
                <img src={successTick} alt="succesfull signup icon" id="successIcon" />
                <section>
                    <h2>Thanks for subscribing!</h2>
                    <p id="successMessage">
                        A confirmation email has been sent to <span id="signupEmail">{email}</span>.
                        Please open it and click the button inside to confirm your subscription.
                    </p>
                </section>
                <button id="dismissSuccessMessage" onClick={toggleSubscription}>
                    Dismiss message
                </button>
            </section>
        </main>
    );
}

export default App;
