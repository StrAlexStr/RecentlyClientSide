import AvatarUserFeed from "./AvatarUserFeed";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { SpinnerDotted } from "spinners-react";

//sec
function UserFeed({ sortElement }) {
  const [users, setUsers] = useState([]);
  const [usersLoaded, setUsersLoaded] = useState(false);
  const [followingOnly, setFollowingOnly] = useState(false);

  const { user } = useContext(AuthContext);

  const handleFollowingCheckbox = () => {
    setFollowingOnly(!followingOnly);
  };

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await axios.get(`/users/get/all_users/${user._id}`, {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      });
      setUsers(res.data);
      setUsersLoaded(true);
    };
    fetchUsers();
  }, [user, followingOnly]);

  return (
    <div className="flex flex-col w-full p-4 mt-4 overflow-auto scrollbar scrollbar-thumb-logo scrollbar-thin scrollbar-thumb-rounded-lg">
      <div>
        <label class="inline-flex items-center">
          <input
            type="checkbox"
            class="form-checkbox"
            onChange={handleFollowingCheckbox}
          />
          <span class="ml-2">Following only</span>
        </label>
      </div>
      {usersLoaded ? (
        users.map((userData) => {
          if (followingOnly) {
            if (sortElement) {
              if (
                userData.followers.includes(user._id) &&
                userData.username
                  .toLowerCase()
                  .includes(sortElement.toLowerCase())
              ) {
                return (
                  <AvatarUserFeed userData={userData} key={userData._id} />
                );
              }
              return null;
            } else {
              if (userData.followers.includes(user._id)) {
                return (
                  <AvatarUserFeed userData={userData} key={userData._id} />
                );
              }
              return null;
            }
          } else {
            if (sortElement) {
              if (
                userData.username
                  .toLowerCase()
                  .includes(sortElement.toLowerCase())
              ) {
                return (
                  <AvatarUserFeed
                    userData={userData}
                    key={userData._id}
                    includesCurrentUser={userData.followers.includes(user._id)}
                  />
                );
              }
              return null;
            } else {
              return (
                <AvatarUserFeed
                  userData={userData}
                  key={userData._id}
                  includesCurrentUser={userData.followers.includes(user._id)}
                />
              );
            }
          }
        })
      ) : (
        <SpinnerDotted
          size={50}
          thickness={120}
          speed={100}
          className="pt-4"
          color="rgba(155,106,108, 1)"
        />
      )}
    </div>
  );
}

export default UserFeed;
