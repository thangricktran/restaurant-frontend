/* /pages/Register.js */
import React, { useState } from "react";
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
  const [data, setData] = useState({ email: "", username: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { userLogin, showAlert } = React.useContext(UserContext);
  const history = useHistory();
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    showAlert({ msg: 'creating user data, please wait...' });
    setLoading(true);
    setError(null);
    const userCredential = { 
      username: data.username,
      email: data.email, 
      password: data.password 
    };
    await registerUser(userCredential)
      .then((res) => {
        // set authed user in global context object
        const { jwt: token, user } = res.data;
        const { username } = user;
        userLogin({ username, token, user });
        showAlert({ 
          msg: `you are logged in: ${res.data.user.username}. shop away my friend.` 
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
    setData({ ...data, [event.target.name]: event.target.value });
  }

  return (
    <Container>
      <Row>
        <Col sm="12" md={{ size: 5, offset: 3 }}>
          <div className="signup_paper">
            <div className="signup_header">
              <img src={`${API_URL}/uploads/logo.png`} alt="strapi header img" classNam="signup_signin_img" />
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
              <Form>
                <fieldset disabled={loading}>
                  <FormGroup>
                    <Label>Username:</Label>
                    <Input
                      disabled={loading}
                      onChange={(event) => onChange(event)}
                      value={data.username}
                      type="text"
                      name="username"
                      style={{ height: 50, fontSize: "1.2em" }}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label>Email:</Label>
                    <Input
                      onChange={(event) => onChange(event)}
                      value={data.email}
                      type="email"
                      name="email"
                      style={{ height: 50, fontSize: "1.2em" }}
                    />
                  </FormGroup>
                  <FormGroup style={{ marginBottom: 30 }}>
                    <Label>Password:</Label>
                    <Input
                      onChange={(event) => onChange(event)}
                      value={data.password}
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
                      disabled={loading}
                      onClick={(e) => {
                        handleSubmit(e);
                      }}
                    >
                      {loading ? "Loading.." : "Submit"}
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
