import { Input, Typography } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";

const Banner = () => {
  const navigate = useNavigate();
  const onSearch = (data) => {
    navigate({
      pathname: "/search",
      search: `?q=${data}`,
    });
  };
  return (
    <div className="banner">
      <img
        src="https://www.themoviedb.org/t/p/w1920_and_h600_multi_faces_filter(duotone,032541,01b4e4)/fgYfch0MGfNEpgzPst49ThKUqA4.jpg"
        alt="banner"
        width="100%"
      />
      <div className="banner-content">
        <Typography.Title
          level={2}
          style={{
            color: "white",
          }}
        >
          What are you looking for?
        </Typography.Title>
        <Input.Search placeholder="Search..." enterButton onSearch={onSearch} />
      </div>
    </div>
  );
};

export default Banner;
