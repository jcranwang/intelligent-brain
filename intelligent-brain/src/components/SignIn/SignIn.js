import React from "react";

class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      signEmail: "",
      signPassword: ""
    };
  }

  onEmailChange = event => {
    this.setState({ signEmail: event.target.value });
  };

  onPasswordChange = event => {
    this.setState({ signPassword: event.target.value });
  };

  onSubmitChange = () => {
    fetch("http://localhost:3001/signin", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: this.state.signEmail,
        password: this.state.signPassword
      })
    })
      .then(response => response.json())
      .then(user => {
        if (user.email) {
          this.props.receiveUserProfile(user);
          this.props.onRouteChange("home");
        }
      });
  };

  render() {
    const { onRouteChange } = this.props;
    return (
      <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
        <main className="pa4 black-80">
          <div className="measure">
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className="f2 fw6 ph0 mh0">Sign In</legend>
              <div className="mt3">
                <label className="db fw6 lh-copy f5" htmlFor="email-address">
                  Email
                </label>
                <input
                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="email"
                  name="email-address"
                  id="email-address"
                  onChange={this.onEmailChange}
                />
              </div>
              <div className="mv3">
                <label className="db fw6 lh-copy f5" htmlFor="password">
                  Password
                </label>
                <input
                  className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="password"
                  name="password"
                  id="password"
                  onChange={this.onPasswordChange}
                />
              </div>
            </fieldset>
            <div className="">
              <input
                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f5 dib"
                type="submit"
                value="Sign in"
                onClick={this.onSubmitChange}
              />
            </div>
            <div className="lh-copy mt3">
              <p
                onClick={() => {
                  onRouteChange("register");
                }}
                className="f5 link dim black db pointer"
              >
                Register
              </p>
            </div>
          </div>
        </main>
      </article>
    );
  }
}

export default SignIn;
