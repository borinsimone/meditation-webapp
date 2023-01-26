import React, { useEffect, useRef, useState } from "react";
import { useGlobalContext } from "../context/context";
import { GoUnmute, GoMute } from "react-icons/go";

function Menu() {
  const {
    isMenuOpen,
    background,
    setBackground,
    bgSoundVolume,
    setBgSoundVolume,
    isBgRelated,
    setIsBgRelated,
    isMuted,
    setIsMuted,
    bgSound,
  } = useGlobalContext();
  const [previousVolume, setPreviousVolume] = useState(
    () => {
      const data = localStorage.getItem("previousVolume");
      if (data !== null) {
        const parsedData = JSON.parse(data);
        return parsedData;
      } else {
        return 0.2;
      }
    }
  );
  useEffect(() => {
    localStorage.setItem("previousVolume", previousVolume);
  }, [previousVolume]);
  //iOs adapt
  const sliderElement = useRef();
  function sliderIos(TouchEvent) {
    if (
      (navigator.platform === "iPhone") | "iPad" | "iPod" ||
      navigator.platform.indexOf("iPhone" | "iPad" | "iPod")
    ) {
      console.log("ciao");
      // var element = TouchEvent.srcElement as HTMLInputElement;
      if (
        sliderElement.min &&
        sliderElement.max &&
        TouchEvent.changedTouches &&
        TouchEvent.changedTouches.length > 0
      ) {
        const max = Number(sliderElement.max);
        const min = Number(sliderElement.min);
        let step = 1;
        if (sliderElement.step) {
          step = Number(sliderElement.step);
        }
        //Calculate the complete range of the slider.
        const range = max - min;

        const boundingClientRect =
          sliderElement.getBoundingClientRect();
        const touch = TouchEvent.changedTouches[0];

        //Calculate the slider value
        const sliderValue =
          ((touch.pageX - boundingClientRect.left) /
            (boundingClientRect.right -
              boundingClientRect.left)) *
            range +
          min;

        //Find the closest valid slider value in respect of the step size
        for (let i = min; i < max; i += step) {
          if (i >= sliderValue) {
            const previousValue = i - step;
            const previousDifference =
              sliderValue - previousValue;
            const currentDifference = i - sliderValue;
            if (previousDifference > currentDifference) {
              //The sliderValue is closer to the previous value than the current value.
              sliderElement.value =
                previousValue.toString();
            } else {
              sliderElement.value = i.toString();
            }

            //Trigger the change event.
            sliderElement.dispatchEvent(
              new Event("change")
            );
            break;
          }
        }
      }
    }
  }
  return (
    <div
      className={`bg-slate-600/80 w-screen h-[93%] absolute duration-500 bottom-0 z-50 flex flex-col items-center p-10 text-white ${
        isMenuOpen ? "left-0" : "-left-[100%]"
      }`}
    >
      <div className="change-background md:w-[90%] h-20  md:text-2xl flex gap-2 items-center justify-between">
        Choose your background:
        <div className="btn-container flex gap-3">
          <button
            className={` py-2 px-5 rounded duration-500 ${
              background === "rain"
                ? "bg-red-400 text-white"
                : "bg-white text-black"
            }`}
            onClick={() => {
              if (isBgRelated) {
                bgSound.current.pause();

                setBackground("rain");
              }
            }}
          >
            rain
          </button>
          <button
            className={`py-2 px-5 rounded  duration-500 ${
              background === "beach"
                ? "bg-red-400 text-white"
                : "bg-white text-black"
            }`}
            onClick={() => {
              if (isBgRelated) {
                bgSound.current.pause();

                setBackground("beach");
              }
            }}
          >
            beach
          </button>
        </div>
      </div>
      <div className="change-background-music md:w-[90%] h-20  md:text-2xl flex gap-2 items-center justify-between">
        Choose your background music:
        <div className="btn-container flex gap-3">
          <button
            className={` py-2 px-5 rounded duration-500  ${
              isBgRelated
                ? "bg-red-400 text-white"
                : "bg-white text-black"
            }`}
            onClick={() => {
              setIsBgRelated(true);
            }}
          >
            bg-related
          </button>
          <button
            onClick={() => {
              setIsBgRelated(false);
            }}
            className={` py-2 px-5 rounded duration-500  ${
              !isBgRelated
                ? "bg-red-400 text-white"
                : "bg-white text-black"
            }`}
          >
            relax
          </button>
        </div>
      </div>
      <div className="bg-volume-management relative md:w-[90%] h-20  md:text-2xl flex gap-2 items-center justify-between">
        set background volume
        <input
          className="volume-slider"
          ref={sliderElement}
          type="range"
          min={0}
          max={0.7}
          step={0.01}
          // default={0.2}
          value={bgSoundVolume}
          // onBlur={(event) => {
          //   setBgSoundVolume(event.target.value);
          //   console.log("fire");
          // }}
          // onInput={(event) => {
          //   console.log("ios");
          //   setBgSoundVolume(event.target.value);
          // }}
          onChange={(event) => {
            setBgSoundVolume(event.target.value);
          }}
          onTouchEnd={(event) => {
            setBgSoundVolume(event.target.value);

            console.log("ciao");
          }}
          // onTouchEnd={sliderIos(TouchEvent)}
        />
        <div
          className="be-careful absolute  p-2 right-[10%] -bottom-10 bg-black 
        "
        >
          the sound could be very high
        </div>
        <button
          onClick={() => {
            setIsMuted(!isMuted);
            if (isMuted === true) {
              // setPreviousVolume(bgSoundVolume);
              // setBgSoundVolume(0);
            } else {
              // setBgSoundVolume(previousVolume);
            }
          }}
        >
          {bgSoundVolume === 0 || isMuted ? (
            <GoMute className="text-2xl md:text-4xl" />
          ) : (
            <GoUnmute className="text-2xl md:text-4xl" />
          )}
        </button>
        {/* {bgSoundVolume} */}
      </div>
      <div className="test bg-green-500 mt-10">
        {bgSoundVolume} <br />
        {navigator.userAgent}
      </div>
    </div>
  );
}

export default Menu;
