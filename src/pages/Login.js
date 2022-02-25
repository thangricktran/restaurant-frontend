/*  /pages/Login.js */
import React, { useState, useEffect } from "react";
import { Controller, useForm } from 'react-hook-form';
import {
  Container,
  Row,
  Col,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import url from '../utils/URL';
// import { login } from "../lib/auth";
import { useHistory } from "react-router-dom";
import { UserContext } from "../context/user";
// strapi function
import loginUser from "../strapi/loginUser";

export default function Login() {
  const {
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm();
  const history = useHistory();
  // setup user userContext
  const { userLogin, isAuthenticated, showAlert } = React.useContext(UserContext);

  // state values
  const [stateData, setStateData] = useState({ identifier: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleLoginSubmit = async ({ identifier, password }) => {
    // e.preventDefault();
    // showAlert({ msg: 'accessing user data, please wait...' });
    // console.log("pages/Login.js handleLoginSubmit() identifier: \n", identifier);
    // console.log("pages/Login.js.js handleLoginSubmit() password: \n", password);

    setLoading(true);
    setError(null);
    const loginCredential = { email: identifier, password: password.trim() };
    await loginUser(loginCredential)
      .then((res) => {
        const { jwt: token, user } = res.data;
        const { username } = user;
        userLogin({ username, token, user });
        setLoading(false);
        showAlert({
          msg: `you are logged in: ${username}. shop away my friend.`
        });
        history.push("/");
      })
      .catch((err) => {
        try {
          if (typeof err.response.data != "undefined") {
            setError(err.response.data);
            showAlert({
              msg: err.response.data.message[0].messages[0].message,
              type: "danger"
            });
          }
        } catch (errObj) {
          setError(null);
        }
        setLoading(false);
      });
  };

  useEffect(() => {
    if (isAuthenticated) {
      history.push("/"); // redirect if you're already logged in
    }
  }, [isAuthenticated, history]);

  function onChange(event) {
    setStateData({ ...stateData, [event.target.name]: event.target.value });
    setValue(event.target.name, event.target.value);
  }
  function handleForgotPassword(evt) {
    evt.preventDefault();
    history.push("/forgotpassword");
  }

  return (
    <Container className="with_fixed_header">
      <Row>
        <Col sm="12" md={{ size: 5, offset: 3 }}>
          <div className="signup_paper">
            <div className="signup_header">
              <img src={`${url}/uploads/logo.png`} alt="strapi header img" />
            </div>
            <section className="wrapper">
              { error && error.length !== 0 &&
                error.constructor === Object &&
                error.message.map((error) => {
                  return (
                    <div
                      key={error.messages[0].id}
                      style={{ marginBottom: 10 }}
                    >
                      <small style={{ color: "red" }}>
                        {error.messages[0].message}
                      </small>
                    </div>
                  );
                })}
              <Form onSubmit={handleSubmit(handleLoginSubmit)} noValidate>
                <fieldset disabled={loading}>
                  <FormGroup>
                    <Label>Email:</Label>
                    <Controller
                      name="identifier"
                      control={control}
                      defaultValue=""
                      rules={{
                        required: true,
                        pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                      }}
                      render={({ field }) => (
                        <Input
                          {...field}
                          id="identifier"
                          onChange={(event) => onChange(event)}
                          value={stateData.identifier}
                          type="email"
                          name="identifier"
                          style={{ height: 50, fontSize: "1.2em" }}
                        />
                      )}
                    ></Controller>
                    {errors.identifier
                      ? errors.identifier.type === 'pattern'
                        ? <span style={{color: 'red'}}>Email is not valid.</span>
                        : <span style={{color: 'red'}}>Email is required.</span>
                      : ''}
                  </FormGroup>
                  <FormGroup style={{ marginBottom: 30 }}>
                    <Label>Password:</Label>
                    <Controller
                      name="password"
                      control={control}
                      defaultValue=""
                      rules={{
                        required: true,
                        minLength: 8,
                      }}
                      render={({ field }) => (
                        <Input
                          id="password"
                          autoComplete="on"
                          onChange={(event) => onChange(event)}
                          value={stateData.password}
                          type="password"
                          name="password"
                          style={{ height: 50, fontSize: "1.2em" }}
                        />
                      )}
                    ></Controller>
                    {errors.password
                      ? errors.password.type === 'minLength'
                        ? <span style={{color: 'red'}}>Password length should be more than 7.</span>
                        : <span style={{color: 'red'}}>Password is required.</span>
                      : ''}
                  </FormGroup>

                  <FormGroup>
                    <span>
                      <Button
                        className="btn btn-succeed btn-text-color"
                        onClick={handleForgotPassword}
                      >
                        <small>Forgot Password?</small>
                      </Button>
                    </span>
                    <Button
                      style={{ float: "right", width: 120 }}
                      color="primary"
                      disabled={loading}
                    >
                      {loading ? "Loading... " : "Login"}
                    </Button>
                  </FormGroup>
                </fieldset>
              </Form>
            </section>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
