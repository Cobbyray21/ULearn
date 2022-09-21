import { useContext, useState, useEffect } from "react";
import { Context } from "../../context";
import { Button } from "antd";
import axios from "axios";
import {
  SettingOutlined,
  UserSwitchOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import { toast } from "react-toastify";
import UserRoute from "../../components/routes/UserRoute";

const BecomeInstructor = () => {
  // state
  const [loading, setLoading] = useState(false);
  const {
    state: { user },
    dispatch,
  } = useContext(Context);


  
 const becomeInstructor = () => {
    // console.log("become instructor");
    setLoading(true);
    axios
      .post("/api/make-instructor")
      .then((res) => {
        console.log(res);
       // window.location.href = res.data;
       window.localStorage.setItem("user", JSON.stringify(res.data));
       window.location.href = "/instructor"
      })
      .catch((err) => {
        console.log(err.response.status);
        toast("Instructor onboarding failed. Try again.");
        setLoading(false);
      });
    };


  //const becomeInstructor = () => {
        // console.log("become instructor");
  //    setLoading(true);
 /* useEffect(() => {
    if (user && user.role && user.role.includes("Instructor")) {
      axios.post("/api/get-account-status").then((res) => {
        // console.log(res);
        /*dispatch({
          type: "LOGIN",
          payload: res.data,
        });
       // window.localStorage.setItem("user", JSON.stringify(res.data));
        window.location.href = "/instructor";
      });
    }
  }, [user]);*/



  

  return (
    <>
      <h1 className="jumbotron text-center square">Become Instructor</h1>

      <div className="container">
        <div className="row">
          <div className="col-md-6 offset-md-3 text-center">
            <div className="pt-4">
              <UserSwitchOutlined className="display-1 pb-3" />
              <br />
              <h2>Setup Instructor Account to publish courses on ULearn</h2>
              <p className="lead text-warning">
              ULearn partners with You to make courses available for free
              </p>

              <Button
                className="mb-3"
                type="primary"
                block
                shape="round"
                icon={loading ? <LoadingOutlined /> : <SettingOutlined />}
                size="large"
                onClick={becomeInstructor}
                disabled={
                  (user && user.role && user.role.includes("Instructor")) ||
                  loading
                }
              >
                {loading ? "Processing..." : "Setup Instructor Account"}
              </Button>

              <p className="lead">
              You need to be registered to complete this process.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BecomeInstructor;
