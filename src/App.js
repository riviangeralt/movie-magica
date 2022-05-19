import "./App.less";
import "antd/dist/antd.less";
import { Route, Routes } from "react-router-dom";
import React, { Suspense } from "react";
import { Spin } from "antd";

const Header = React.lazy(() => import("./components/Header"));
const Footer = React.lazy(() => import("./components/Footer"));
const SingleMovie = React.lazy(() => import("./pages/SingleMovie"));
const Home = React.lazy(() => import("./pages/Home"));
const Search = React.lazy(() => import("./pages/Search"));

function App() {
  const Movies = () => {
    return <div>Movies</div>;
  };
  const TV = () => {
    return <div>TV</div>;
  };
  const Anime = () => {
    return <div>Anime</div>;
  };
  const Loading = () => {
    return (
      <div className="loading">
        <Spin
          size="large"
          style={{
            color: "white",
          }}
        />
      </div>
    );
  };
  return (
    <>
      <Suspense fallback={<Loading />}>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/tv" element={<TV />} />
          <Route path="/anime" element={<Anime />} />
          <Route path="/movie/:id" element={<SingleMovie isMovie={true} />} />
          <Route path="/tv/:id" element={<SingleMovie isTv={true} />} />
          <Route
            path="/collection/:id"
            element={<SingleMovie isCollection={true} />}
          />
          <Route path="/search" element={<Search />} />
        </Routes>
        <Footer />
      </Suspense>
    </>
  );
}

export default App;
