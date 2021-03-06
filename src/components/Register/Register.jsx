import React from "react";

class Register extends React.Component {
	constructor() {
		super();
		this.state = {
			name: "",
			password: "",
			email: "",
		};
		console.log(this.state);
	}
	onSubmitSignin = () => {
		fetch("https://shielded-reef-77697.herokuapp.com/", {
			method: "post",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				email: this.state.email,
				password: this.state.password,
				name: this.state.name,
			}),
		})
			.then((response) => response.json())
			.then((user) => {
				if (user.id) {
					this.props.loadUser(user);
					this.props.onRouteChange("home");
				}
			});
		}

	onNameChange = (event) => {
		this.setState({ name: event.target.value });
		console.log("name state", event.target.value);
	};
	onEmailChange = (event) => {
		this.setState({ email: event.target.value });
		console.log("email state", event.target.value);
	};
	onPasswordChange = (event) => {
		this.setState({ password: event.target.value });
		console.log("password state", event.target.value);
	};

	render() {	
		return (
			<div>
				<article className='br3 ba  b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center'>
					<main className='pa4 black-80'>
						<div className='measure'>
							<fieldset id='sign_up' className='ba b--transparent ph0 mh0'>
								<legend className='f1 fw6 ph0 mh0'>Register</legend>
								<div className='mt3'>
									<label className='db fw6 lh-copy f6' htmlFor='name'>
										Name
									</label>
									<input
										className='pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100'
										type='text'
										name='name'
										id='name'
										onChange={this.onNameChange}
									/>
								</div>
								<div className='mv3'>
									<label className='db fw6 lh-copy f6' htmlFor='password'>
										Email
									</label>
									<input
										className='b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100'
										type='email'
										email='email'
										id='email'
										onChange={this.onEmailChange}
									/>
								</div>
								<div className='mv3'>
									<label className='db fw6 lh-copy f6' htmlFor='password'>
										Password
									</label>
									<input
										className='b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100'
										type='password'
										name='password'
										id='password'
										autoComplete='current-password'
										onChange={this.onPasswordChange}
									/>
								</div>
							</fieldset>
							<div className=''>
								<input
									onClick={this.onSubmitSignin}
									className='b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib'
									type='submit'
									value='Register'
								/>
							</div>
						</div>
					</main>
				</article>
			</div>
		);
	}
}

export default Register;
