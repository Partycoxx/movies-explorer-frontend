import React, { useRef } from "react";
import AboutMe from "../../components/AboutMe/AboutMe";
import AboutProject from "../../components/AboutProject/AboutProject";
import ContentBlock from "../../components/ContentBlock/ContentBlock";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import Promo from "../../components/Promo/Promo";
import Techs from "../../components/Techs/Techs";

export default function Main({ isLoggedIn }) {
  const sectionRef = useRef(null);

  return (
    <>
      <Header type="promo" hasNavigation={true} isLoggedIn={isLoggedIn} />
      <ContentBlock bgColor="dark-grey">
        <Promo refLink={sectionRef} />
      </ContentBlock>
      <ContentBlock>
        <AboutProject refLink={sectionRef} />
      </ContentBlock>
      <ContentBlock bgColor="light-grey">
        <Techs />
      </ContentBlock>
      <ContentBlock>
        <AboutMe />
      </ContentBlock>
      <Footer />
    </>
  );
}
