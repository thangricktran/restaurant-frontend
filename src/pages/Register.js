/* /pages/Register.js */
import React, { useState } from "react";
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
import registerUser from "../strapi/registerUser";
import { useHistory } from "react-router-dom";
import { UserContext } from "../context/user";
import API_URL from "../utils/URL";

const Register = () => {
  const {
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm();
  const [stateData, setStateData] = useState({
    email: "", username: "", password: "", confirmedPassword: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { userLogin, showAlert } = React.useContext(UserContext);
  const history = useHistory();

  const handleRegisterSubmit = async ({ username, email, password, confirmedPassword }) => {
    // e.preventDefault();
    // showAlert({ msg: 'creating user data, please wait...' });

    // console.log("pages/Register.js handleRegisterSubmit() username: \n", username);
    // console.log("pages/Register.js handleRegisterSubmit() email: \n", email);
    // console.log("pages/Register.js handleRegisterSubmit() password: \n", password);

    if (password.trim() !== confirmedPassword.trim()) {
      window.alert("Sorry, password and confirmed password \ndon't much. Please re-type them.");
      return;
    };

    setLoading(true);
    setError(null);
    const userCredential = {
      username: username.trim(),
      email: email,
      password: password.trim()
    };
    await registerUser(userCredential)
      .then((res) => {
        // set authed user in global context object
        const { jwt: token, user } = res.data;
        const { username } = user;
        userLogin({ username, token, user });
        showAlert({
          msg: `You are logged in: ${res.data.user.username}. shop away my friend.`
        });
        setLoading(false);
        history.push("/");
      })
      .catch((err) => {
        if (err.response.data) {
          setError(err.response.data);
          showAlert({
            msg: err.response.data.message[0].messages[0].message,
            type: "danger"
          });
        }
        setLoading(false);
      });
  };

  function onChange(event) {
    setStateData({ ...stateData, [event.target.name]: event.target.value });
    setValue(event.target.name, event.target.value);
  }
  function handleForgotPassword(evt) {
    evt.preventDefault();
    history.push("/forgotpassword");
  }

  return (
    <Container>
      <Row>
        <Col sm="12" md={{ size: 5, offset: 3 }}>
          <div className="signup_paper">
            <div className="signup_header">
              <img src={`${API_URL}/uploads/logo.png`} alt="strapi header img" />
            </div>
            <section className="wrapper">
              {error && error.length !== 0 &&
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
              <Form onSubmit={handleSubmit(handleRegisterSubmit)} noValidate>
                <fieldset disabled={loading}>
                  <FormGroup>
                    <Label>Username:</Label>
                    <Controller
                      name="username"
                      control={control}
                      defaultValue=""
                      rules={{
                        required: true,
                        minLength: 2,
                      }}
                      render={({ field }) => (
                        <Input
                          {...field}
                          id="username"
                          disabled={loading}
                          onChange={(event) => onChange(event)}
                          value={stateData.username}
                          type="text"
                          name="username"
                          style={{ height: 50, fontSize: "1.2em" }}
                        />
                      )}
                    ></Controller>
                    {errors.username
                      ? errors.username.type === 'minLength'
                        ? <span style={{color: 'red'}}>User Name length should be more than 1 characters.</span>
                        : <span style={{color: 'red'}}>User Name is required.</span>
                      : ''}
                  </FormGroup>
                  <FormGroup>
                    <Label>Email:</Label>
                    <Controller
                      name="email"
                      control={control}
                      defaultValue=""
                      rules={{
                        required: true,
                        pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                      }}
                      render={({ field }) => (
                        <Input
                          {...field}
                          id="email"
                          onChange={(event) => onChange(event)}
                          value={stateData.email}
                          type="email"
                          name="email"
                          style={{ height: 50, fontSize: "1.2em" }}
                        />
                      )}
                    ></Controller>
                    {errors.email
                      ? errors.email.type === 'pattern'
                        ? <span style={{color: 'red'}}>Email is not valid.</span>
                        : <span style={{color: 'red'}}>Email is required.</span>
                      : ''}
                  </FormGroup>
                  <FormGroup>
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
                  <FormGroup style={{ marginBottom: 30 }}>
                    <Label>Confirmed Password:</Label>
                    <Controller
                      name="confirmedPassword"
                      control={control}
                      defaultValue=""
                      rules={{
                        required: true,
                        minLength: 8,
                      }}
                      render={({ field }) => (
                        <Input
                          id="confirmedPassword"
                          autoComplete="on"
                          onChange={(event) => onChange(event)}
                          value={stateData.confirmedPassword}
                          type="password"
                          name="confirmedPassword"
                          style={{ height: 50, fontSize: "1.2em" }}
                        />
                      )}
                    ></Controller>
                    {errors.confirmedPassword
                      ? errors.confirmedPassword.type === 'minLength'
                        ? <span style={{color: 'red'}}>Confirmed Password length should be more than 7.</span>
                        : <span style={{color: 'red'}}>Confirmed Password is required.</span>
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
                      {loading ? "Loading.." : "Register"}
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
};
export default Register;
