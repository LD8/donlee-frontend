import React from "react";
import styled from "styled-components";
import { Route, Switch, useLocation } from "react-router-dom";
import { useTransition, animated } from "react-spring";

export default function Main({ params }) {
  const location = useLocation();
  // console.log(location)
  const transitions = useTransition(location, (location) => location.pathname, {
    from: { opacity: 0, transform: "translate3d(100%,0,0)" },
    enter: { opacity: 1, transform: "translate3d(0%,0,0)" },
    leave: { opacity: 0, transform: "translate3d(-100%,0,0)" },
  });
  return (
    <SMain>
      {transitions.map(({ item: location, props, key }) => (
        <animated.div key={key} style={props}>
          <Switch location={location}>
            <Route exact path="/" />
            {params.map(([param, Component]) => (
              <Route
                key={param}
                path={`/${param}`}
                render={() => (
                  <SPageContainer>
                    <div className="scroll-page">{Component}</div>
                  </SPageContainer>
                )}
              />
            ))}
          </Switch>
        </animated.div>
      ))}
    </SMain>
  );
}

const SMain = styled.main`
  position: relative;
  height: 100%;
  width: 100%;
  z-index: 5;
`;

const SPageContainer = styled.div`
  position: absolute;
  height: 93vh;
  width: 100vw;
  top: 7vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 5px 5px 0 0;
  box-shadow: 0 0 20px var(--bg-shadow-color);
  will-change: transform opacity;

  .scroll-page {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center; /* DO NOT USE 'justify-content: center', or it won't scroll */
    overflow-y: scroll;
    overflow-x: hidden;
    /* dark background, light font */
    color: silver;
    /* background-color: rgb(40, 43, 41); */
    background-image: linear-gradient(
      180deg,
      rgba(40, 43, 41, 0.85),
      rgba(40, 43, 41, 1)
    );

    ::-webkit-scrollbar {
      width: 4px;
    }
    ::-webkit-scrollbar-thumb {
      background-color: rgba(80, 100, 80, 0.3);
      border-radius: 3px;
    }
  }
`;
