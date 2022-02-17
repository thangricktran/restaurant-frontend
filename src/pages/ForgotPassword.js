/* /pages/ForgotPassword.js */
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
import forgotPasswordUser from "../strapi/forgotPasswordUser";
// import { useHistory } from "react-router-dom";
import { UserContext } from "../context/user";
import API_URL from "../utils/URL";

const ForgotPassword = () => {
  const {
    handleSubmit,
    setValue,
    // getValues,
    control,
    formState: { errors },
  } = useForm();
  const [stateData, setStateData] = useState({
    email: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { showAlert } = React.useContext(UserContext);
  // const history = useHistory();

  const handleForgotPasswordSubmit = async ({ email }) => {
    // e.preventDefault();
    // showAlert({ msg: 'creating user data, please wait...' });
    // console.log("pages/ForgotPassword.js handleForgotPasswordSubmit() email: \n", email);

    setLoading(true);
    setError(null);
    const userCredential = {
      email: email,
    };
    await forgotPasswordUser(userCredential)
      .then((res) => {
        // set authed user in global context object
        // showAlert({
        //   msg: `You are logged in: ${res.data.user.username}. shop away my friend.`
        // });

        // console.log("pages/ForgotPassword.js handleForgotPasswordSubmit() res.data: \n", res.data);
        setLoading(false);
        // history.push("/");
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
              <Form onSubmit={handleSubmit(handleForgotPasswordSubmit)}>
                <fieldset disabled={loading}>
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
                    <div style={{ margin: '0 auto', textAlign: 'center' }}>
                    <Button
                      style={{ width: 120 }}
                      color="primary"
                      disabled={loading}
                    >
                      {loading ? "Loading.." : "Submit"}
                    </Button>
                    </div>
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
export default ForgotPassword;
