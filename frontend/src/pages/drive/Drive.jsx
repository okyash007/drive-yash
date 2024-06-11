import { Link, Outlet, useNavigate, useParams } from "react-router-dom";
import { makeGetRequest } from "../../apis/makeGetRequest";
import { backendUrl } from "../../utils/constants";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPresentFolder } from "../../store/folderSlice";
import { setUser } from "../../store/userSlice";

const Drive = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const [folders, setFolders] = useState(null);
  const user = useSelector((store) => store.user.data);

  async function getPath(id) {
    const allFolders = await makeGetRequest(`${backendUrl}/folder/all/${id}`);
    console.log(allFolders);
    setFolders([{ name: "drive" }, ...allFolders.data.reverse()]);
  }

  async function getFolder(id) {
    const data = await makeGetRequest(`${backendUrl}/folder/${id}`);
    if (data.success === true) {
      console.log(data);
      dispatch(
        setPresentFolder({
          images: data.data.images,
          folders: data.data.sub_folder,
          _id: data.data._id,
          parent_folder: data.data.parent_folder,
        })
      );
    }
  }

  useEffect(() => {
    if (params.id) {
      getPath(params.id);
      getFolder(params.id);
    } else {
      setFolders([{ name: "drive" }]);
      getFolder(user.root_folder._id);
    }
  }, [params]);

  return (
    <>
      {folders ? (
        <div className="bg-[#ffffff1a] py-3 px-4 m-3 rounded-md flex justify-between items-center">
          <div className="flex gap-2 items-center ">
            <p>/</p>
            {folders.map((m, i) => {
              if (m.type === "root") {
                return <></>;
              }
              if (folders.length - 1 == i) {
                return (
                  <>
                    <Link to={m._id ? `/drive/${m._id}` : "/drive"}>
                      <p className="bg-[#ffffff2a] text-4xl  py-2 px-4 rounded-lg">
                        {m.name}
                      </p>
                    </Link>
                  </>
                );
              }
              return (
                <>
                  <Link to={m._id ? `/drive/${m._id}` : "/drive"}>
                    <p className="bg-[#ffffff2a] py-2 px-4 rounded-lg">
                      {m.name}
                    </p>
                  </Link>
                  <p>/</p>
                </>
              );
            })}
          </div>
          <div className="flex gap-2">
            <Link
              to={"/search"}
              className="bg-[#ffffff1a] px-4 py-4 rounded-md hover:bg-[#ffffff2a]"
            >
              search
            </Link>
            <button
              className="bg-[#ffffff1a] px-4 py-4 rounded-md hover:bg-[#ffffff2a]"
              onClick={() => {
                localStorage.removeItem("access_token");
                dispatch(setUser(null));
                navigate("/login");
              }}
            >
              Logout
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="flex gap-2 items-center justify-center bg-[#ffffff1a] py-6 px-4 m-3 rounded-md">
            <l-ring
              size="30"
              stroke="5"
              bg-opacity="0"
              speed="1.5"
              color="white"
            ></l-ring>
          </div>
        </>
      )}
      <Outlet />
    </>
  );
};

export default Drive;
