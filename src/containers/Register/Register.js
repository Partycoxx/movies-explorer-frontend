import React from "react";
import Authorization from "../../components/Authorization/Authorization";
import Header from "../../components/Header/Header";

export default function Register({ handleSignUp }) {
  return (
    <>
      <Header type="authorization" hasNavigation={false} />
      <Authorization type={"register"} handleSignUp={handleSignUp} />
    </>
  );
}
