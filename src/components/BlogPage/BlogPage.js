import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Footer } from "../Footer";
import { PostLi } from "./PostLi";
import { PostDetail } from "./PostDetail";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import { APIBASE } from "../Const";

export const BlogPage = () => {
  const [posts, setPosts] = useState([]);
  const { path, url } = useRouteMatch();

  const fetchData = () => {
    fetch(`${APIBASE}/posts/`)
      .then((response) => response.json())
      .then((data) => {
        setPosts(data);
        // console.log(data);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => fetchData(), []);
  return (
    <>
      <Switch>
        <Route
          exact
          path={path}
          render={() => (
            <SMyPosts id="SMyPosts">
              <section className="brief">
                <h3>
                  Post about my life and work... Lorem ipsum dolor sit amet,
                  consectetur adipiscing elit, sed do eiusmod tempor incididunt
                  ut labore et dolore magna aliqua.
                </h3>
              </section>

              <section className="posts">
                <ul>
                  {posts.map((post, index) => (
                    <PostLi key={index} post={post} url={url} />
                  ))}
                </ul>
              </section>
            </SMyPosts>
          )}
        />
        <Route
          exact
          path={`${path}/posts/:id/:slug`}
          validate={(params) => Number.isInteger(params.id)}
          render={() => <PostDetail posts={posts} />}
        />
      </Switch>
      <Footer />
    </>
  );
};

const SMyPosts = styled.div`
  max-width: 1000px;
  width: 100%;
  .brief {
    margin: 3vh 0 5vh 0;
    h3 {
      line-height: 30px;
      font-weight: 400;
      font-size: 25px;
      text-align: center;
      @media only screen and (max-width: 800px) {
        line-height: 25px;
        font-size: 20px;
      }
    }
  }
  .posts {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    ul {
      list-style: none;
      width: 100%;
      text-align: center;
    }
  }
`;
