import React from "react";
import "./help.css";

const HelpPage = () => {
  return (
    <div className="help-container">
      <h1>Help</h1>
      <h2>Steps:</h2>

      <div className="step">
        <p className="step-number">Step 01:</p>
        <p>Log in to the page</p>
        <p>Enter username and password</p>
        <p>If the account is not available, ask the admin user.</p>
      </div>

      <div className="step">
        <p className="step-number">Step 02:</p>
        <p>You will land on this page.</p>
        <img src="/Image1.PNG" alt="Step 2 Image" />
        <p>Select the required option:</p>
        <ul>
          <li>Add student: For adding a new student</li>
        </ul>
      </div>

      <div className="step">
        <p className="step-number">Step 03:</p>
        <p>You will land on this page.</p>
        <img src="/Image2.PNG" alt="Step 3 Image" />
        <p>Enter the details of the student.</p>
      </div>

      <div className="step">
        <p className="step-number">Step 04:</p>
        <p>For class selection.</p>
        <img src="/Image3.PNG" alt="Step 3 Image" />
        <p>Select the relevant class and press the submit button.</p>
      </div>
    </div>
  );
};

export default HelpPage;
