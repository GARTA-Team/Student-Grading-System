import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import { t } from "react-i18nify";
import { Button } from "@material-ui/core";
import Axios from "axios";

export default class App extends Component {
	state = {
		data: {
			username: "",
			email: "",
			password: "",
		}
	};

	handleChange = name => (e) => {
		const { value } = e.target;

		this.setState(prevState => ({
			data: {
				...prevState.data,
				[name]: value,
			},
		}));
	};

	handleSubmit = async (e) => {
		e.preventDefault();

		const { data = {} } = this.state;
		const { username, email, password } = data;

		try {
			Axios.post(
				"/signup",
				{ username, email, pass: password },
			).then(response => {
				console.log(response);
				if (response.status === 201) {
					const { handleRegisterSubmit } = this.props;

					handleRegisterSubmit();
				}
			});

		} catch (error) {
			console.error(error);
		}
	};

	render() {
		return (
			<form onSubmit={this.handleSubmit}>
				<TextField
					required
					id="standard-required"
					label={t("Auth.Username")}
					// className={classes.textField}
					margin="normal"
					onChange={this.handleChange("username")}
				/>
				<TextField
					required
					id="standard-required"
					label="Email"
					// className={classes.textField}
					margin="normal"
					onChange={this.handleChange("email")}
				/>
				<TextField
					id="standard-password-input"
					label={t("Auth.Password")}
					// className={classes.textField}
					type="password"
					autoComplete="current-password"
					margin="normal"
					onChange={this.handleChange("password")}
				/>


				<Button type="submit">{t("Auth.Register")}</Button>
			</form>
		);
	}
}
