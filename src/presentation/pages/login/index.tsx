// import { Formik } from "formik";
import { LoginUseCases } from "../../../application/use-cases/login.use.cases";
import { LoginApi } from "../../../insfrastructure/Login-api";
import { useState } from "react";
// import * as Yup from "yup";
import { useForm } from "../../hooks/useForm";
import { useNavigate } from "react-router";
import { useAuthStore } from "../../store/zustand/AuthStore";

const LoginPage = () => {
  const navigate = useNavigate();
  const { setUser } = useAuthStore();
  const [messageResponse, setMessageResponse] = useState<string>("");
  const { form, onChange, email, password, isValid } = useForm(
    {
      email: "",
      password: "",
    },
    ["email", "password"],
    {
      minLength: {
        email: 5,
        password: 5,
      },
    }
  );
  // const login = async (email: string, password: string) => {
  //   email = "emilys";
  //   const useCases = new LoginUseCases(new LoginApi());
  //   const response = await useCases.login(email, password);
  //   if (response.status === 200) {
  //     if ("response" in response) {
  //       setMessageResponse("Login successful");
  //       localStorage.setItem("token", response.response.accessToken);
  //     }
  //   } else {
  //     setMessageResponse("Login failed");
  //   }
  // };

  // const validates = (values: { email: string; password: string }) => {
  //   const errors: { email?: string; password?: string } = {};
  //   if (!values.email) {
  //     errors.email = "Required";
  //   } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
  //     errors.email = "Invalid email address";
  //   }

  //   if (!values.password) {
  //     errors.password = "Required";
  //   }
  //   return errors;
  // };

  // const validatesYup = Yup.object().shape({
  //   email: Yup.string().email("Invalid email").required("Required"),
  //   password: Yup.string()
  //     .required("Required")
  //     .max(35, "Max 35 characters")
  //     .min(5, "Min 5 characters"),
  // });

  const login = async () => {
    form.email = "emilys";
    const useCases = new LoginUseCases(new LoginApi());
    const response = await useCases.login("emilys", password);
    if (response.status === 200) {
      if ("response" in response) {
        setMessageResponse("Login successful");
        setUser(response.response.username);
        localStorage.setItem("token", response.response.accessToken);
        localStorage.setItem("user", response.response.username);
        localStorage.setItem("image", response.response.image);
        navigate("/home");
      }
    } else {
      setMessageResponse("Login failed");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form className="w-full max-w-md p-6 bg-white rounded-md shadow-md">
        <h1 className="text-3xl font-bold mb-4">Ingrese sus credenciales!</h1>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-gray-700 font-medium mb-1"
          >
            Email
          </label>
          <input
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="email"
            name="email"
            id="email"
            onChange={(e) => onChange(e.target.value, "email")}
            // onBlur={handleBlur}
            value={email}
          />
          {/* {errors.email && touched.email && errors.email} */}
        </div>
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-gray-700 font-medium mb-1"
          >
            Password
          </label>
          <input
            id="password"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="password"
            name="password"
            onChange={(e) => onChange(e.target.value, "password")}
            // onBlur={handleBlur}
            value={password}
          />
          {/* {errors.password && touched.password && errors.password} */}
        </div>
        <button
          disabled={!isValid()}
          className="w-full px-3 py-2 text-white bg-blue-500 rounded-md"
          type="submit"
          onClick={(e) => {
            e.preventDefault();
            login();
          }}
          // disabled={isSubmitting}
        >
          Submit
        </button>
        <div className="mt-4">
          {messageResponse && (
            <p className="mt-4 text-warning-500 text-center fw-bold">
              {messageResponse}
            </p>
          )}
        </div>
      </form>

      {/* <Formik
        initialValues={{ email: "", password: "" }}
        // validate={(values) => validates(values)}
        validationSchema={validatesYup}
        onSubmit={(values, { setSubmitting }) => {
          login(values.email, values.password);
          setTimeout(() => {
            setSubmitting(false);
          }, 400);
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
        }) => (
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-md p-6 bg-white rounded-md shadow-md"
          >
            <h1 className="text-3xl font-bold mb-4">
              Ingrese sus credenciales!
            </h1>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-gray-700 font-medium mb-1"
              >
                Email
              </label>
              <input
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="email"
                name="email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
              />
              {errors.email && touched.email && errors.email}
            </div>
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-gray-700 font-medium mb-1"
              >
                Password
              </label>
              <input
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="password"
                name="password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
              />
              {errors.password && touched.password && errors.password}
            </div>
            <button
              className="w-full px-3 py-2 text-white bg-blue-500 rounded-md"
              type="submit"
              disabled={isSubmitting}
            >
              Submit
            </button>
            <div className="mt-4">
              {messageResponse && (
                <p className="mt-4 text-warning-500 text-center fw-bold">
                  {messageResponse}
                </p>
              )}
            </div>
          </form>
        )}
      </Formik> */}
    </div>
  );
};
export default LoginPage;
