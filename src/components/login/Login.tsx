import React from "react";
import { Authenticator } from "@aws-amplify/ui-react";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/system";
import { setUserId } from "../../redux/reducers/checkoutDataSlice";
import { useAppDispatch } from "../../redux/store";

type Props = {};

const Login = (props: Props) => {
  const navigate = useNavigate();
  const reduxDispatch = useAppDispatch();
  return (
    <Box sx={{ height: "82.9vh" }}>
      <Authenticator loginMechanisms={["email"]}>
        {({ signOut, user }) => {
          console.log(user?.username);
          reduxDispatch(setUserId(user?.username));
          navigate(-1);
          return <main></main>;
        }}
      </Authenticator>
    </Box>
  );
};

export default Login;
