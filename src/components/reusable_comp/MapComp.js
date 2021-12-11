import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import mapStyles from "../../assets/map/mapStyles";
import { AuthContext } from "../../context/AuthContext";
import { RiBellFill } from "react-icons/ri";
import { HiOutlineArrowsExpand } from "react-icons/hi";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en.json";

// const libraries = ["places"];
const mapContainerStyle = {
  height: "100%",
  width: "100%",
};
const options = {
  styles: mapStyles,
  disableDefaultUI: true,
};
const center = {
  lat: 47.023509,
  lng: 28.833464,
};

export default function MapComp({
  profileUser,
  selectedPostId,
  setSelectedPostId,
  fromCreatePost,
  coordinates,
  setCoordinates,
}) {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  });
  const [postMarkers, setPostMarkers] = useState([]);
  const [selected, setSelected] = useState(null);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (!fromCreatePost) {
      const fetchPosts = async () => {
        const res =
          profileUser != null && profileUser._id != null
            ? await axios.get("/posts/all_posts/" + profileUser._id, {
                headers: {
                  "x-access-token": localStorage.getItem("token"),
                },
              })
            : await axios.get(`/posts/get/all_posts/${user._id}`, {
                headers: {
                  "x-access-token": localStorage.getItem("token"),
                },
              });

        setPostMarkers(
          res.data.sort((post_data_1, post_data_2) => {
            return (
              new Date(post_data_2.createdAt) - new Date(post_data_1.createdAt)
            );
          })
        );
      };
      fetchPosts();
      if (selectedPostId != null) {
        setSelected(postMarkers.find((x) => x._id === selectedPostId));
      }
    }
  }, [user, profileUser, selectedPostId, fromCreatePost]);

  //removed postMarkers from here because the state is changed inside useEffect

  if (loadError) return "Error";
  if (!isLoaded) return "Loading...";

  return (
    <div className="w-screen h-full z-0">
      <h1
        className="flex flex-row text-lg items-center text-main font-bold absolute z-20 mt-2 ml-4"
        style={{ fontFamily: "Baloo2" }}
      >
        Recently Map
        <span className="ml-1 text-2xl text-logo mr-80">
          <RiBellFill />
        </span>
      </h1>

      <GoogleMap
        id="map"
        mapContainerStyle={mapContainerStyle}
        zoom={13}
        center={center}
        options={options}
        onClick={(e) => {
          if (fromCreatePost) {
            setCoordinates({
              lat: e.latLng.lat(),
              lng: e.latLng.lng(),
            });
          }
        }}
      >
        {postMarkers.map((marker) => (
          <Marker
            key={`${marker.createdAt}_${marker.longitude}_${marker._id}`}
            position={{ lat: marker.latitude, lng: marker.longitude }}
            onClick={() => {
              setSelectedPostId(null);
              setSelected(marker);
            }}
            icon={{
              url: process.env.REACT_APP_PUBLIC_FOLDER + "/posts/" + marker.img,

              scaledSize: new window.google.maps.Size(100, 60),
              origin: new window.google.maps.Point(0, 0),
              anchor: new window.google.maps.Point(50, 30),
            }}
          />
        ))}

        {fromCreatePost && (
          <Marker
            position={{
              lat: coordinates.lat,
              lng: coordinates.lng,
            }}
          />
        )}
        {selected != null && !fromCreatePost ? (
          <InfoWindow
            position={{
              lat: parseFloat(selected.latitude),
              lng: parseFloat(selected.longitude),
            }}
            onCloseClick={() => {
              setSelected(null);
              setSelectedPostId(null);
            }}
          >
            <InfoForPost postData={selected} />
          </InfoWindow>
        ) : null}
      </GoogleMap>
    </div>
  );
}

function InfoForPost({ postData }) {
  TimeAgo.addLocale(en);
  const timeAgo = new TimeAgo("en-US");
  const [postUser, setPostUser] = useState({});

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/users?userId=${postData.userId}`, {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      });
      setPostUser(res.data);
    };
    fetchUser();
    return () => {
      setPostUser({});
    };
  }, [postData.userId]);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  return postUser && postUser.profilePicture && postData.img ? (
    <div className="flex flex-col text-1xl p-2">
      <div className="flex flex-row items-center justify-between mb-4 break-words">
        <Link
          to={`/profile/${postUser.username}`}
          className=" w-12 h-12 ml-1 mr-3 rounded-full truncate "
        >
          <img
            src={PF + "/avatars/" + postUser.profilePicture}
            alt="Avatar_1"
            className=" object-cover w-12 h-12 rounded-full  border-2 border-logo "
          />
        </Link>

        <span
          className="font-bold text-2xl mr-1 text-logo"
          style={{ fontFamily: "Josefin" }}
        >
          {postUser.username}
        </span>
      </div>

      <div className="flex flex-row items-center justify-between mb-2 w-96">
        <span
          className="font-light text-2xl truncate text-secondary-dark break-words"
          style={{ fontFamily: "Baloo2" }}
        >
          {postData.title}
        </span>
        {/* <button className="ml-3 text-lg font-light hover:text-secondary-dark">
          <HiOutlineArrowsExpand />
        </button> */}
      </div>
      <span
        className="font-bold text-lg mb-1 w-96 overflow-ellipsis text-main break-words"
        style={{ fontFamily: "Josefin" }}
      >
        {postData.description}
      </span>

      <img
        src={PF + "/posts/" + postData.img}
        alt="Fr_media_1"
        className="rounded-lg object-contain w-96"
      />
      <div className="flex flex-row items-center  text-secondary-main justify-center w-96 mt-2">
        <span className="font-bold text-1xl " style={{ fontFamily: "Baloo2" }}>
          {timeAgo.format(new Date(postData.createdAt))}
        </span>
      </div>
    </div>
  ) : (
    <div>Loading...</div>
  );
}
