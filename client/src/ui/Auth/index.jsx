import React, { Component } from 'react'
import {
	Switch,
	Route,
	Link
} from "react-router-dom";
import Register from "./Register";
import Login from "./Login";

export default class index extends Component {
	render() {
		return (
			<div>
			<form>
				<p>logare</p>
			</form>
				<ul>
					<li><Link to="/register">Register</Link></li>
				</ul>
				<p>Authentication</p>
				<Switch>
					<Route exact path="/login">
						<Login />
					</Route>
					<Route exact path="/register">
						<Register />
					</Route>
				</Switch>
			</div>
		)
	}
}
