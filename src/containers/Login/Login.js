import React from "react";
import Authorization from "../../components/Authorization/Authorization";
import Header from "../../components/Header/Header";

import "./Login.css";

export default function Login() {
  return (
    <>
      <Header type="authorization" hasNavigation={false} />
      <Authorization type={"login"} />
    </>
  );
}
