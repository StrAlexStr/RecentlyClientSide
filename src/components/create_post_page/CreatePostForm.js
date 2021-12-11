import { BsPatchPlus } from "react-icons/bs";
import { AuthContext } from "../../context/AuthContext";
import { useContext, useEffect, useRef, useState } from "react";
import { IoMdImage } from "react-icons/io";
import { GrMapLocation } from "react-icons/gr";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CreatePostForm({ coordinates }) {
  let navigate = useNavigate();

  const { user } = useContext(AuthContext);
  const postDesc = useRef();
  const postTitle = useRef();
  const [file, setFile] = useState(null);
  useEffect(() => {}, [user, file, coordinates]);

  const submitHandler = async (e) => {
    e.preventDefault();
    const newPost = {
      userId: user._id,
      title: postTitle.current.value,
      description: postDesc.current.value,
      latitude: coordinates.lat,
      longitude: coordinates.lng,
    };
    const data = new FormData();
    const fileName = Date.now() + file.name;
    data.append("name", fileName);
    data.append("file", file);
    newPost.img = fileName;
    try {
      await axios.post("/upload/post_img", data, {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      });
      await axios.post("/posts/create", newPost, {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      });
      navigate("/profile/" + user.username);
    } catch (err) {
      console.log(err);
    }
  };

  return user ? (
    <div
      className="ml-6 w-4/5 md:w-3/5 xl:w-2/5 2xl:w-2/6 flex flex-col items-center rounded-lg py-9
    px-6 bg-bg_login scale-75 lg:scale-100 my-10 scrollbar scrollbar-thumb-logo scrollbar-thin scrollbar-thumb-rounded-lg overflow-x-hidden absolute z-10 inset-y-0 left-24"
    >
      <span
        className="flex flex-col w-full items-center justify-center text-5xl  font-bold mb-9 mx-5 text-secondary text-center"
        style={{ fontFamily: "Josefin" }}
      >
        New stuff to share {user.username}?
        <BsPatchPlus
          className="animate-spin mt-2"
          style={{ animationDuration: "5s" }}
        />
      </span>
      <form onSubmit={submitHandler} className="w-full max-w-sm flex flex-col">
        <label
          htmlFor="post_title"
          className="mt-6 block text-logo text-lg font-bold ml-2"
          style={{ fontFamily: "Baloo2" }}
        >
          Post title:
        </label>
        <div className="flex items-center border-b border-secondary py-2">
          <input
            maxlength="100"
            required
            ref={postTitle}
            type="text"
            placeholder="Title"
            aria-label="PostTitle"
            className="appearance-none bg-bg_login border-none w-full text-main mr-3 py-1 px-2 leading-tight focus:outline-none"
            id="post_title"
          />
        </div>

        <label
          htmlFor="post_desc"
          className="mt-6  block text-logo text-lg font-bold ml-2"
          style={{ fontFamily: "Baloo2" }}
        >
          Post description:
        </label>
        <div className="flex items-center border-b border-secondary py-2 ">
          <textarea
            maxlength="250"
            required
            ref={postDesc}
            type="text"
            placeholder="Description"
            aria-label="PostTitle"
            className="h-28 resize-none appearance-none bg-bg_login border-none w-full text-main mr-3 py-1 px-2 leading-tight focus:outline-none scrollbar scrollbar-thumb-logo scrollbar-thin scrollbar-thumb-rounded-lg"
            id="post_desc"
          />
        </div>
        {file && (
          <div className="mt-8">
            <img
              src={URL.createObjectURL(file)}
              alt="Post"
              className="rounded-lg border-2 border-logo"
            />
          </div>
        )}
        <div className="flex flex-row justify-center w-full mt-4">
          <label
            htmlFor="file"
            className=" w-2/4  text-main cursor-pointer bg-no_acc hover:bg-no_acc-light px-4 py-2 rounded-lg"
          >
            <span
              className="text-center flex flex-row items-center justify-center font-bold"
              style={{ fontFamily: "Josefin" }}
            >
              {file ? "Change Image" : "Load Image"}
              <IoMdImage className="text-1xl ml-2 " />
            </span>
            <input
              className="hidden"
              type="file"
              id="file"
              accept=".png,.jpg,.jpeg"
              onChange={(e) => setFile(e.target.files[0])}
            />
          </label>
        </div>

        {file && coordinates.lat != null && coordinates.lng != null && (
          <div className="flex flex-row justify-center w-full mt-4">
            <button
              className="bg-secondary text-main px-4 py-2 rounded-md font-bold text-lg hover:bg-secondary-light cursor-pointer w-2/4"
              style={{ fontFamily: "Josefin" }}
              type="submit"
              id="login_submit"
              name="login_submit"
            >
              <span
                className="text-center flex flex-row items-center justify-center font-bold"
                style={{ fontFamily: "Josefin" }}
              >
                Publish
                <GrMapLocation className="text-1xl ml-2 opacity-80" />
              </span>
            </button>
          </div>
        )}
      </form>
    </div>
  ) : (
    "Loading..."
  );
}

export default CreatePostForm;
