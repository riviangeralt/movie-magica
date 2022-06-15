import { CaretRightOutlined } from "@ant-design/icons";
import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <section className="home container" id="home">
      <img
        src="https://image.tmdb.org/t/p/original/zGLHX92Gk96O1DJvLil7ObJTbaL.jpg"
        alt=""
        className="home-img"
      />
      <div className="home-text">
        <h1 className="home-title">
          Fantastic Beasts: The Secrets of Dumbledore
        </h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
        </p>
        <Link className="watch-btn" to={"/movie/1"}>
          <CaretRightOutlined />
          <span>Watch Now</span>
        </Link>
      </div>
    </section>
  );
};

export default Home;
