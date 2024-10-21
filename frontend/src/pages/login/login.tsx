import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { Formik, Field, FormikProps, FormikHelpers } from "formik";
import * as Yup from "yup";
import { loginUser } from "../../service/index.service";
//import {useNavigate} from "react-router-dom";

//const navigate = useNavigate();

interface FormValues {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const [success, setSuccess] = useState("");

  const validationSchema = Yup.object().shape({
    email: Yup.string().required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const handleSubmit = async (
    values: FormValues,
    { setSubmitting }: FormikHelpers<FormValues>
  ) => {
    // Handle form submission
    const submit = await loginUser(values);
    //console.log(submit.message);
    setSuccess(submit.message);
    setSubmitting(false);
    //navigate("/tasks");
  };

  return (
    <div className="mx-auto max-w-md space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">Login in</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Enter your details to get started.
        </p>
      </div>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ handleSubmit }: FormikProps<FormValues>) => (
          <Form className="space-y-4" onSubmit={handleSubmit}>
            {success && (
              <div
                className="text-green-500 "
                style={{
                  textAlign: "center",
                  fontSize: "1.2rem",
                  fontWeight: "bold",
                  backgroundColor: "#f0f0f0",
                  padding: "0.5rem",
                  borderRadius: "0.5rem",
                }}
              >
                {success}
              </div>
            )}
            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email</Form.Label>
              <Field type="email" name="email" as={Form.Control} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="password">
              <Form.Label>Password</Form.Label>
              <Field type="password" name="password" as={Form.Control} />
            </Form.Group>
            <Button variant="primary" type="submit" className="w-full">
              Sign In
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Login;