import React, { useEffect, useState } from "react";
import axios from "axios";
import { useGlobalContext } from "../context/context";

function LandingQuote() {
  const {
    background,
    setBackground,
    bgSoundVolume,
    isLandingOpen,
    setIsLandingOpen,
    isMuted,
    bgSound,
    bgColor,
  } = useGlobalContext();
  const url =
    "https://api.api-ninjas.com/v1/quotes?category=inspirational";
  // "https://dummyjson.com/products";
  let config = {
    headers: {
      "X-Api-Key":
        "pnJLrED905ZrTmnWS88uoQ==XtlBWnzorkutt0Ig",
    },
  };
  const [quote, setQuote] = useState(null);
  const [author, setAuthor] = useState(null);
  const [data, setData] = useState(null);
  const getQuotes = () => {
    axios
      .get(url, config)
      .then((res) => {
        setData(res.data[0]);
        console.log(data);
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    getQuotes();
  }, []);

  return (
    <div
      className={`absolute h-full w-full ${bgColor}  text-white text-2xl font-bold 
    font-[italic] flex items-center justify-center flex-col duration-700 delay-200 ${
      isLandingOpen ? "z-50 opacity-1" : "-z-50 opacity-0"
    } `}
    >
      <div className="advice absolute bottom-[20%] text-center text-sm">
        Use headphone for optimal experience
      </div>
      <div className="quote-container w-full h-[40%] flex flex-col justify-center items-center">
        <div className="quote w-[80%] text-center">
          {/* Only those who have learned the power of sincere
          and selfless contribution experience life's
          deepest joy: true fulfillment. */}
          {data ? data.quote : "loading..."}
        </div>
        <div className="author  w-[70%] flex justify-end tracking-wide text-sm ">
          {/* Tony Robbins */}
          {data ? data.author : ""}
        </div>
        {/* <button onClick={getQuotes}>ciao</button> */}
        <div className="go-next">
          <button
            className=" py-1 px-3 mt-6 rounded-lg bg-indigo-700 hover:bg-[#330c59]  duration-500"
            onClick={() => {
              setIsLandingOpen(false);
              setBackground(background);
              console.log(bgSoundVolume);
              if (!isMuted) {
                bgSound.current.volume = bgSoundVolume;
                bgSound.current.play();
              }
              // document.body.requestFullscreen();
            }}
          >
            close this page
          </button>
        </div>
      </div>
    </div>
  );
}

export default LandingQuote;
