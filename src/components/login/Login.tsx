import React from "react";
import { Authenticator } from "@aws-amplify/ui-react";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/system";

type Props = {};

const Login = (props: Props) => {
  const navigate = useNavigate();
  return (
    <Box sx={{height:"82.9vh"}}>
      <Authenticator loginMechanisms={["email"]}>
        {({ signOut, user }) => {
          navigate(-1);
          return <main></main>;
        }}
      </Authenticator>
    </Box>
  );
};

export default Login;
