import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { Formik, Field, FormikProps, FormikHelpers } from "formik";
import * as Yup from "yup";
import { registerUser } from "../../service/index.service";
import {Link} from "react-router-dom";

/*interface FormValues {
  username: string;
  email: string;
  password: string;
}*/

const Tasks: React.FC = () => {
  //const [success, setSuccess] = useState("");

  const tasks = await registerUser(values);

  return (
    <div className="mx-auto max-w-md space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">Tasks assigned to user {}</h1>
      </div>
      <Link to="/login">Already a user? go to login page</Link>
      
    </div>
  );
};

export default Tasks;