import React, {
  useContext,
  useEffect,
  useState,
} from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { useGlobalContext } from "../context/context";
function TimerSetting({
  isTimerOpen,
  setIsTimerOpen,
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
      className={`settings absolute h-full w-full ${bgColor} bg-opacity-80  rounded  flex flex-col items-center justify-center duration-500 gap-4 ${
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
          console.log(timerValue.current.value);
          setStartingMinute(timerValue.current.value);
          setIsTimerSettingOpen(false);
        }}
      >
        <input
          type="number"
          ref={timerValue}
          placeholder="set your time here"
          onChange={handleChange}
          className="w-[80%] h-10 md:h-14 rounded text-black pl-4"
        />
        <div className="choose-song w-[80%] flex  gap-4  justify-between">
          Song:
          <div
            className="song-choice relative bg-white/20 px-2 rounded capitalize cursor-pointer"
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
                    className="hover:bg-blue-500 hover:text-white duration-500 p-2 capitalize"
                    onClick={() => {
                      setIsSongPickerOpen(false);
                      setCurrentSong(songList[song.id]);
                      setIndex(song.id);
                      console.log(currentSong);
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

// <form
//   className={` rounded w-[70%] h-10  md:w-[50%] md:h-14 relative bg-red-300`}
//   onSubmit={(e) => {
//     e.preventDefault();
//     console.log(timerValue.current.value);
//     setStartingMinute(timerValue.current.value);
//     setIsTimerSettingOpen(false);
//   }}
// >
//   <input
//     type="number"
//     ref={timerValue}
//     placeholder="set your time here"
//     onChange={handleChange}
//     className="h-full w-full rounded text-black text-lg md:text-2xl pl-4"
//   />
//   <button
//     type="submit "
//     className="absolute bg-slate-900 right-0 h-full aspect-square rounded"
//   >
//     go
//   </button>
// </form>

// <div className="choose-song flex gap-4">
//   Song:
//   <div
//     className="song-choice relative bg-white/20 px-2 rounded"
//     onClick={() => {
//       setIsSongPickerOpen(!isSongPickerOpen);
//     }}
//   >
//     pick a song
//     <ul
//       className={`absolute bg-white text-black text-sm md:text-xl w-full -left-0 top-[calc(100%+10px)] rounded duration-500 ${
//         isSongPickerOpen
//           ? "opacity-1 z-10"
//           : "opacity-0 -z-10 pointer-events-none"
//       }`}
//     >
//       {songs.song.map((song) => {
//         return (
//           <li
//             className="hover:bg-blue-500 hover:text-white duration-500 p-2"
//             onClick={() => {
//               setIsSongPickerOpen(false);
//               setCurrentSong(tibetan_bowl_sound);
//             }}
//           >
//             {song.title}
//           </li>
//         );
//       })}
//       {/* <li
//         className="hover:bg-blue-500 hover:text-white duration-500 p-2"
//         onClick={() => {
//           setIsSongPickerOpen(false);
//           setCurrentSong(tibetan_bowl_sound);
//         }}
//       >
//         tibetan bowl
//       </li>
//       <li
//         className="hover:bg-blue-500 hover:text-white duration-500 p-2"
//         onClick={() => {
//           setIsSongPickerOpen(false);
//         }}
//       >
//         song
//       </li>
//       <li
//         className="hover:bg-blue-500 hover:text-white duration-500 p-2"
//         onClick={() => {
//           setIsSongPickerOpen(false);
//         }}
//       >
//         song
//       </li>
//       <li
//         className="hover:bg-blue-500 hover:text-white duration-500 p-2"
//         onClick={() => {
//           setIsSongPickerOpen(false);
//         }}
//       >
//         song
//       </li>
//       <li
//         className="hover:bg-blue-500 hover:text-white duration-500 p-2"
//         onClick={() => {
//           setIsSongPickerOpen(false);
//         }}
//       >
//         pick from yt
//       </li> */}
//     </ul>
//   </div>
// </div>

// <div className="song-volume">volume here</div>
// <div className="end-meditation-setting w-[80%] flex gap-2">
//   Sound when the timer ends?
//   <button
//     onClick={() => {
//       setEndMeditationSound(!endMeditationSound);
//     }}
//     className="bg-white/20 px-2 rounded"
//   >
//     {endMeditationSound ? "Active" : "Not active"}
//   </button>
// </div>
