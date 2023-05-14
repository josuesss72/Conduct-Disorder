import React, { useState } from "react";
import Home from "./screen/Home";
import SignUpScreen from "./screen/SignUp";

export default function App() {
  const [userCredent, setUserCredent] = useState();
  const [renderSign, setRenderSign] = useState(false);

  return (
    <SignUpScreen
      userCredent={userCredent}
      setUserCredent={setUserCredent}
      renderSign={renderSign}
    >
      <Home
        userCredent={userCredent}
        setRenderSign={setRenderSign}
        renderSign={renderSign}
      />
    </SignUpScreen>
  );
}
