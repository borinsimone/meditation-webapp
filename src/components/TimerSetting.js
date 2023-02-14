import React, { useState } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { useGlobalContext } from "../context/context";
function TimerSetting({
  isTimerSettingOpen,
  setIsTimerSettingOpen,
  timerValue,
  setStartingMinute,
  handleChange,
  setEndMeditationSound,
  endMeditationSound,
  currentSong,
  setCurrentSong,

  songs,
  songList,
}) {
  const { bgColor } = useGlobalContext();
  const [isSongPickerOpen, setIsSongPickerOpen] =
    useState(false);
  const [index, setIndex] = useState();

  return (
    <div
      className={`settings absolute h-full w-full ${bgColor} bg-opacity-90   rounded  flex flex-col items-center justify-center duration-500 gap-4 ${
        isTimerSettingOpen
          ? "opacity-1 z-40 delay-100"
          : "opacity-0 -z-10"
      } text-xl md:text-3xl`}
    >
      <AiOutlineCloseCircle
        className="absolute top-5 right-5 text-3xl cursor-pointer z-30"
        onClick={() => {
          setIsTimerSettingOpen(false);
        }}
      />
      <form
        className=" w-[80%] h-[80%] rounded-md flex flex-col items-center justify-evenly "
        onSubmit={(e) => {
          e.preventDefault();
          setStartingMinute(timerValue.current.value);
          setIsTimerSettingOpen(false);
        }}
      >
        <input
          type="number"
          min="0"
          ref={timerValue}
          placeholder="set your time here"
          onChange={handleChange}
          className="w-[80%] h-10 md:h-14 rounded text-black pl-4"
        />
        <div className="choose-song w-[80%] flex  gap-4  justify-between">
          Song:
          <div
            className="song-choice relative bg-white/20 px-2 rounded capitalize cursor-pointer text-sm flex items-center "
            onClick={() => {
              setIsSongPickerOpen(!isSongPickerOpen);
            }}
          >
            {currentSong === ""
              ? "pick a song"
              : songs.song[index].title}

            <ul
              className={`absolute bg-white text-black text-sm md:text-xl w-full -left-0 top-[calc(100%+10px)] rounded duration-500 ${
                isSongPickerOpen
                  ? "opacity-1 z-10 "
                  : "opacity-0 -z-10  pointer-events-none"
              }`}
            >
              {songs.song.map((song) => {
                return (
                  <li
                    key={song.id}
                    className="hover:bg-blue-500 hover:text-white duration-500 p-2 capitalize "
                    onClick={() => {
                      setIsSongPickerOpen(false);
                      setCurrentSong(songList[song.id]);
                      setIndex(song.id);
                    }}
                  >
                    {song.title}
                  </li>
                );
              })}
              <li
                className="hover:bg-blue-500 hover:text-white duration-500 p-2 capitalize"
                onClick={() => {
                  setIsSongPickerOpen(false);
                  setCurrentSong("");
                }}
              >
                no song
              </li>
            </ul>
          </div>
        </div>
        <div className="end-meditation-setting w-[80%] flex gap-2">
          Sound when the timer ends?
          <button
            type="button"
            onClick={() => {
              setEndMeditationSound(!endMeditationSound);
            }}
            className="bg-white/20 px-2 rounded"
          >
            {endMeditationSound ? "Active" : "Not active"}
          </button>
        </div>

        <button
          type="submit"
          className=" bg-slate-900 rounded w-[40%]"
        >
          go
        </button>
      </form>
    </div>
  );
}

export default TimerSetting;
