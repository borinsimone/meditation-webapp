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
    // "https://api.api-ninjas.com/v1/quotes?category=inspirational";
    "https://dummyjson.com/products";
  let config = {
    headers: {
      "X-Api-Key":
        "pnJLrED905ZrTmnWS88uoQ==XtlBWnzorkutt0Ig",
    },
  };
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");

  //   const getQuotes = () => {
  //     axios.get(url, config).then((res) => {
  //       console.log(res);
  //       setQuote(res.data[0].quote);
  //       setAuthor(res.data[0].author);
  //     });
  //   };
  //   useEffect(() => {
  //     getQuotes();
  //   }, []);

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
        <div className="quote w-[80%]">
          Only those who have learned the power of sincere
          and selfless contribution experience life's
          deepest joy: true fulfillment.
          {/* {quote} */}
        </div>
        <div className="author  w-[70%] flex justify-end tracking-wide ">
          Tony Robbins
          {/* {author} */}
        </div>
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
