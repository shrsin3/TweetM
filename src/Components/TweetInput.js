/* eslint-disable jsx-a11y/img-redundant-alt */
import {ChartBarIcon, EmojiHappyIcon, PhotographIcon} from "@heroicons/react/outline";
import {useEffect, useState} from "react";
import {Avatar, IconButton} from "@mui/material";
import PollModal from "./PollModal";
import {GifPickerModal} from "./GifPickerModal";
import {PlusIcon} from "@heroicons/react/outline";


const TweetInput = () => {
  const [input, setInput] = useState("");
  const [pollModalState, setOpen] = useState(false);
  const [gifModalState, setGifModalOpen] = useState(false);
  const [ selected, setSelected ] = useState(null);
  const [addPostState, setPostState] = useState(false);
  const [addPollStatus, setAddPollStatus] = useState(false);
  const [isGifSelected, setGifSelected] = useState(false)

  const handleAddPost = ()=>{
    setOpen(true);
    setPostState(true);
  }

  const handleAddPoll = () => {
    setAddPollStatus(!addPollStatus);
    setOpen(true);
  }
  const handleOpenPollModal = ()=>{
    setOpen(true);
  }

  const handleCloseModal = ()=>{
    setOpen(false);
    setAddPollStatus(false);
    setPostState(false);
  }

  const handleGifOpenPollModal = ()=>{
    setGifModalOpen(!gifModalState);
  }

  useEffect(() => {
    if(selected){
      console.log(selected)
      handleGifOpenPollModal();
    }
    }, [selected]);


  return (
    <div className="flex border-b border-gray-200 p-3 space-x-3">
      {/*<NewPollModal toggle={pollModalState} action={handleCloseModal}*/}
      {/*           gif = {selected} addPost = {addPostState} addPoll = {addPollStatus}*/}
      {/*           handleAddPoll = {handleAddPoll}/>*/}
      <PollModal toggle={pollModalState} action={handleCloseModal}
      gif = {selected} addPost = {addPostState} addPoll = {addPollStatus}
      handleAddPoll = {handleAddPoll}
      isGifSelected = {isGifSelected}/>
      <GifPickerModal toggle={gifModalState} action={handleGifOpenPollModal}
                      pickGif={(e)=>{
                        setSelected(e)
                        setGifSelected(true);
                      }}/>
      <Avatar className={"w-full divide-y divide-gray-200"}
              sx={{ backgroundColor: "#ff5722" }}>H</Avatar>
      {/*<img*/}
      {/*  src="https://avatars.githubusercontent.com/u/39279529"*/}
      {/*  alt="Profile picture"*/}
      {/*  className="h-11 w-11 rounded-full cursor-pointer hover:brightness-95"*/}
      {/*/>*/}
      <div className="w-full divide-y divide-gray-200">
        <div>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="What's happening?"
            className="w-full border-none focus:ring-0 text-lg placeholder-gray-500 tracking-wide min-h-[50px] text-gray-500"
            rows="2"
          ></textarea>
        </div>
        {selected && (
            <>
              <img
                  src={selected.url}
                  className="gif-preview"
                  alt="Selected GIF"
              />
            </>
        )}
        <div className="flex items-center justify-between pt-2">
          <div className="flex">
            <IconButton>
            <EmojiHappyIcon className="h-10 w-10 hoverEffect p-2 text-sky-500 hover:bg-sky-100" />
            </IconButton>
            <IconButton onClick={handleAddPoll}
                        disabled={isGifSelected}>
              <ChartBarIcon className="h-10 w-10 hoverEffect p-2 text-sky-500 hover:bg-sky-100" />
            </IconButton>
            <IconButton onClick={handleGifOpenPollModal}>
              <PhotographIcon className="h-10 w-10 hoverEffect p-2 text-sky-500 hover:bg-sky-100"></PhotographIcon>
            </IconButton>
          </div>

          <div>
            {selected && <IconButton onClick={handleAddPost}>
            <PlusIcon className="h-10 w-10 hoverEffect p-2 text-sky-500 hover:bg-sky-100"></PlusIcon>
          </IconButton>}
          <button
            disabled={!input.trim()}
            className="bg-blue-400 text-white px-4 py-2 rounded-full font-bold shadow-md hover:brightness-95 disabled:opacity-50"
          >
            Tweet
          </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default TweetInput;
