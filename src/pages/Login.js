/*  /pages/Login.js */
import React, { useState, useEffect } from "react";
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
  const history = useHistory();
  // setup user userContext
  const { userLogin, isAuthenticated, showAlert } = React.useContext(UserContext);
  
  // state values
  const [data, setData] = useState({ identifier: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    showAlert({ msg: 'accessing user data, please wait...' });
    setLoading(true);
    setError(null);
    const loginCredential = { email: data.identifier, password: data.password };
    loginUser(loginCredential)
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
    setData({ ...data, [event.target.name]: event.target.value });
  }

  return (
    <Container>
      <Row>
        <Col sm="12" md={{ size: 5, offset: 3 }}>
          <div className="signup_paper">
            <div className="signup_header">
              <img src={`${url}/uploads/logo.png`} alt="strapi header img" className="signup_signin_img" />
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
              <Form>
                <fieldset disabled={loading}>
                  <FormGroup>
                    <Label>Email:</Label>
                    <Input
                      onChange={(event) => onChange(event)}
                      name="identifier"
                      style={{ height: 50, fontSize: "1.2em" }}
                    />
                  </FormGroup>
                  <FormGroup style={{ marginBottom: 30 }}>
                    <Label>Password:</Label>
                    <Input
                      onChange={(event) => onChange(event)}
                      type="password"
                      name="password"
                      style={{ height: 50, fontSize: "1.2em" }}
                    />
                  </FormGroup>

                  <FormGroup>
                    <span>
                      <Button
                        className="btn btn-succeed btn-text-color">
                        <small>Forgot Password?</small>
                      </Button>
                    </span>
                    <Button
                      style={{ float: "right", width: 120 }}
                      color="primary"
                      onClick={(e) => {
                        handleSubmit(e);
                      }}
                    >
                      {loading ? "Loading... " : "Submit"}
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
