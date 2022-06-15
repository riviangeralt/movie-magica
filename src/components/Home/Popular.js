import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigation, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { getMovies } from "../../app/slices/movie";
import { getTvShows } from "../../app/slices/tvshows";
import MovieBox from "../MovieBox";

const Popular = () => {
  const navigationPrevRef = React.useRef(null);
  const navigationNextRef = React.useRef(null);
  const dispatch = useDispatch();
  const { movies } = useSelector((state) => state.movie);
  const { tvShows } = useSelector((state) => state.tvShows);
  useEffect(() => {
    dispatch(getMovies());
    dispatch(getTvShows());
  }, [dispatch]);
  return (
    <section className="popular container" id="popular">
      <div className="heading">
        <h2 className="heading-title">Popular Movies</h2>
        <div className="swiper-btn">
          <div className="prev" ref={navigationPrevRef}>
            <ChevronLeftIcon />
          </div>
          <div className="next" ref={navigationNextRef}>
            <ChevronRightIcon />
          </div>
        </div>
      </div>
      <div className="popular-content">
        <Swiper
          // spaceBetween={10}
          modules={[Navigation, Autoplay]}
          // slidesPerView={4}
          autoplay={{
            delay: 3000,
            disableOnInteraction: true,
          }}
          loop={true}
          navigation={{
            prevEl: navigationPrevRef.current,
            nextEl: navigationNextRef.current,
          }}
          onBeforeInit={(swiper) => {
            swiper.params.navigation.prevEl = navigationPrevRef.current;
            swiper.params.navigation.nextEl = navigationNextRef.current;
          }}
          breakpoints={{
            280: {
              slidesPerView: 1,
              spaceBetween: 10,
            },
            320: {
              slidesPerView: 2,
              spaceBetween: 10,
            },
            510: {
              slidesPerView: 2,
              spaceBetween: 10,
            },
            758: {
              slidesPerView: 3,
              spaceBetween: 15,
            },
            900: {
              slidesPerView: 4,
              spaceBetween: 15,
            },
          }}
        >
          {[...movies, ...tvShows].map((movie) => (
            <SwiperSlide key={movie.id}>
              <MovieBox movie={movie} isMovie={movie?.isMovie} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Popular;
