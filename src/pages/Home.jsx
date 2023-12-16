// eslint-disable-next-line no-unused-vars
import React, { useCallback, useEffect, useState } from "react";
import {
  FaHeadphonesAlt,
  FaSearch,
  FaHeart,
  FaPlayCircle,
  FaMoon,
  FaSun,
  FaAngleRight,
  FaAngleLeft,
  FaRandom,
  FaVolumeDown,
} from "react-icons/fa";
import { IoMdRepeat } from "react-icons/io";
import { BiSkipPrevious, BiSkipNext } from "react-icons/bi";
import "../assets/styles.css";
import { HiOutlineMenu } from "react-icons/hi";
import Avatar from "../assets/image/avatar.svg";
import HeroImage from "../assets/image/hero.svg";
import http from "../assets/helper/http";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  const [newRelease, setNewRelease] = useState([]);
  const [playlist, setPlaylist] = useState([]);
  const [categories, setCategories] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");

  const token = localStorage.getItem("token");
  console.log(token);
  // Get Data
  const getData = useCallback(async () => {
    try {
      const response1 = await http(token).get("/v1/browse/new-releases");
      const response2 = await http(token).get("/v1/browse/featured-playlists");
      const response3 = await http(token).get("/v1/browse/categories");

      setNewRelease(response1.data.albums.items);
      setPlaylist(response2.data.playlists.items);
      setCategories(response3.data.categories.items);
      // setProfile(response4);
    } catch (error) {
      console.error("Error:", error.response.data.error.message);
      setErrorMsg(error.response.data.error.message);
    }
  }, [token, setNewRelease]);

  // execute get data
  useEffect(() => {
    getData();
    errorMsg == "The access token expired" || errorMsg == "Unauthorized"
      ? navigate("login")
      : "";
  }, [getData, errorMsg, navigate]);

  console.log(newRelease == true);
  return (
    <div className="grid grid-cols-7">
      {/* menu */}
      <div className="bg-blue-600 col-span-2 flex flex-col gap-10 py-10 md:col-span-1">
        <div className="flex flex-col justify-center items-center gap-5">
          <img src={Avatar} alt="avatar" className="w-10 h-10" />
          <span className="hidden md:block">Bob Smith</span>
        </div>
        <div className="flex flex-col">
          <div className="flex items-center justify-center md:justify-normal gap-5 p-5 hover:bg-gradient-to-r from-slate-400 to-transparent cursor-pointer hover:text-white">
            <FaHeadphonesAlt />
            <span className="hidden md:block">Discover</span>
          </div>
          <div className="flex items-center justify-center md:justify-normal gap-5 p-5 hover:bg-gradient-to-r from-slate-400 to-transparent cursor-pointer hover:text-white">
            <FaSearch />
            <span className="hidden md:block">Search</span>
          </div>
          <div className="flex items-center justify-center md:justify-normal gap-5 p-5 hover:bg-gradient-to-r from-slate-400 to-transparent cursor-pointer hover:text-white">
            <FaHeart />
            <span className="hidden md:block">Favourites</span>
          </div>
          <div className="flex items-center justify-center md:justify-normal gap-5 p-5 hover:bg-gradient-to-r from-slate-400 to-transparent cursor-pointer hover:text-white">
            <FaPlayCircle />
            <span className="hidden md:block">Playlists</span>
          </div>
          <div className="flex items-center justify-center md:justify-normal gap-5 p-5 hover:bg-gradient-to-r from-slate-400 to-transparent cursor-pointer hover:text-white">
            <HiOutlineMenu />
            <span className="hidden md:block">Charts</span>
          </div>
        </div>
      </div>
      {/* end menu */}
      <main className="w-full box-border col-span-5 md:col-span-6">
        {/* Header */}
        <div className="bg-red-300 h-40 overflow-hidden flex justify-between px-10">
          <div className="img-hor hidden md:block">
            <img src={HeroImage} alt="" className="h-52 translate-y-[-20px]" />
          </div>
          <div className="text-white text-lg md:text-2xl flex flex-col justify-center">
            <span className="font-bold">Your favourite tunes</span>
            <div className="flex md:justify-end items-center gap-2">
              <span>All</span>
              <FaSun color="#FFFF00" />
              <span>and all</span>
              <FaMoon color="#000" />
            </div>
          </div>
        </div>
        {/* End Header */}

        <div className="px-10 flex flex-col gap-2 pt-5">
          {/* This Week */}
          <div className="w-full">
            <div className="flex items-center gap-4 text-slate-300">
              <span className="text-sm md:text-lg">RELEASE THIS WEEK</span>
              <hr className="hidden md:block w-4/5" />
              <div className="flex">
                <div>
                  <FaAngleLeft color="#0000ff" />
                </div>
                <div>
                  <FaAngleRight color="#0000ff" />
                </div>
              </div>
            </div>
            <div className="flex gap-5 p-5 overflow-x-scroll scrollbar-none">
              {newRelease?.map((item, index) => {
                return (
                  <div key={index} className="flex flex-col items-center gap-5">
                    <div className="h-20 w-40 md:h-14 md:w-20 flex flex-col items-center rounded-md overflow-hidden">
                      <img
                        src={item.images[1].url}
                        alt="album image"
                        width={90}
                      />
                    </div>
                    <span className="text-sm md:text-md text-center">
                      {item.name}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
          {/* End This Week */}

          {/* Playlists */}
          <div className="w-full">
            <div className="flex items-center gap-2 text-slate-300">
              <span className="text-sm md:text-lg">FEATURED PLAYLISTS</span>
              <hr className="hidden md:block w-4/5" />
              <div className="flex">
                <div>
                  <FaAngleLeft color="#0000ff" />
                </div>
                <div>
                  <FaAngleRight color="#0000ff" />
                </div>
              </div>
            </div>
            <div className="flex gap-5 p-5 overflow-x-scroll scrollbar-none">
              {playlist?.map((item, index) => {
                return (
                  <div key={index} className="flex flex-col items-center gap-5">
                    <div className="h-20 w-40 md:h-14 md:w-20 flex flex-col items-center rounded-md overflow-hidden">
                      <img
                        src={item.images[0].url}
                        alt="album image"
                        width={90}
                      />
                    </div>
                    <span className="text-sm md:text-md text-center">
                      {item.name}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
          {/* end playlist */}

          {/* genres */}
          <div className="w-full">
            <div className="flex items-center gap-2 text-slate-300">
              <span className="text-sm md:text-lg">FEATURED PLAYLISTS</span>
              <hr className="hidden md:block w-4/5" />
              <div className="flex">
                <div>
                  <FaAngleLeft color="#0000ff" />
                </div>
                <div>
                  <FaAngleRight color="#0000ff" />
                </div>
              </div>
            </div>
            <div className="flex gap-5 p-5 overflow-x-scroll scrollbar-none">
              {categories?.map((item, index) => {
                return (
                  <div key={index} className="flex flex-col items-center gap-5">
                    <div className="h-20 w-40 md:h-14 md:w-20 flex flex-col items-center rounded-md overflow-hidden">
                      <img
                        src={item.icons[0].url}
                        alt="album image"
                        width={90}
                      />
                    </div>
                    <span className="text-sm md:text-md text-center">
                      {item.name}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
          {/* end genres */}

          {/* Now Playing */}
          <div className="flex border-[1px] border-black items-center gap-5">
            <div className="hidden md:flex gap-2 items-center">
              <div className="h-10 w-10 bg-slate-400 rounded-lg"></div>
              <span className="text-sm">Now Playing</span>
            </div>
            <div className="flex items-center gap-10">
              <div className="flex items-center">
                <BiSkipPrevious color="#c7c7cf" />
                <FaPlayCircle color="#0000ff" className="text-4xl"/>
                <BiSkipNext color="#c7c7cf" />
              </div>
              <hr className="w-32 md:w-96 bg-slate-400 h-1 rounded-md" />
              <div className="flex gap-3">
                <FaHeart color="#c7c7cf" />
                <FaRandom color="#c7c7cf" />
                <IoMdRepeat color="#c7c7cf" />
                <FaVolumeDown color="#c7c7cf" />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
