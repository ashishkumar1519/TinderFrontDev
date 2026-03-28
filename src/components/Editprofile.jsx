import React from "react";
import Card from "./card";
import { BaseUrl } from "../utils/constant/constant";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/store/userSlice";
import axios from "axios";
function Editprofile({ userInfo }) {
  const [firstname, setFirstName] = React.useState(userInfo?.firstname || "");
  const [lastname, setLastname] = React.useState(userInfo?.lastname || "");
  const [age, setAge] = React.useState(userInfo?.age || "");
  const [about, setAbout] = React.useState(userInfo?.about || "");
  const [skills, setSkills] = React.useState(userInfo?.skills || "");
  const [photoUrl, setphotoUrl] = React.useState(userInfo?.photoUrl || "");
  const [toast, setToast] = React.useState({ show: false, message: "", type: "" });
  const dispatch = useDispatch()

  const saveProfile = async () => {
    try{

          const res = await axios.patch(BaseUrl + "/profile/edit",{
          firstname,
          lastname,
          age,
          about,
          skills,
          photoUrl,  // ADD THIS
        },{withCredentials: true})
        dispatch(addUser(res.data.user))
        setToast({ show: true, message: res.data.message, type: "success" });
        setTimeout(() => setToast({ show: false, message: "", type: "" }), 3000);
    }

    catch(err){

      setToast({ show: true, message: err.message, type: "error" });
      setTimeout(() => setToast({ show: false, message: "", type: "" }), 3000);

    }

  }


  return (
    <div className="flex items-center gap-4" >
    <Card userInfo = {{firstname ,lastname,age,photoUrl,skills,about}} />
      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
        <legend className="fieldset-legend 2xl:text-lg">Edit Profile</legend>

        <label className="label 2xl:text-lg">First Name</label>
        <input
          type="text"
          className="input"
          placeholder="First Name"
          value={firstname}
          onChange={(e) => setFirstName(e.target.value)}
        />

        <label className="label 2xl:text-lg">Last Name</label>
        <input
          type="text"
          className="input"
          placeholder="Last Name"
          value={lastname}
          onChange={(e) => setLastname(e.target.value)}
        />

        <label className="label 2xl:text-lg">photoUrl</label>
        <input
          type="text"
          className="input"
          placeholder="photoUrl"
          value={photoUrl}
          onChange={(e) => setphotoUrl(e.target.value)}
        />

        <label className="label 2xl:text-lg">Age</label>
        <input
          type="number"
          className="input"
          placeholder="Age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />

        <label className="label 2xl:text-lg">About</label>
        <textarea
          className="textarea"
          placeholder="About you"
          value={about}
          onChange={(e) => setAbout(e.target.value)}
        />

        <label className="label 2xl:text-lg">Skills</label>
        <input
          type="text"
          className="input"
          placeholder="Skills (comma separated)"
          value={skills}
          onChange={(e) => setSkills(e.target.value)}
        />


        <button className="btn btn-neutral mt-4" onClick={saveProfile}>Save </button>
      </fieldset>

    {toast.show && (
      <div className="toast toast-top toast-start">
        <div className={`alert ${toast.type === "success" ? "alert-success" : "alert-error"}`}>
          <span>{toast.message}</span>
        </div>
      </div>
    )}
    </div>
  );
}

export default Editprofile;
