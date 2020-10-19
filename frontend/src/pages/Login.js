
import React, { useState, useEffect, useRef } from 'react';
import { Button, Icon, TextInput } from 'react-materialize';
import { Redirect, } from 'react-router-dom';

import '../App.css';

const Login = (props) => {
	 
	let [validationResult, setValidationResult] = useState('null');
	let [credentials, setCredentials] = useState({
		email: undefined,
		password: undefined
	});
	let [output, setOutput] = useState(undefined);
	let [toPosts, setToPosts] = useState('/login');
	
	let emailRef = useRef(null);
	let passRef = useRef(null);

	const fetchUsername = async () => {
		var firstResponse = await fetch('http://localhost:3001/login?email='+credentials.email+'&password='+credentials.password);
		var jsonResponse = await firstResponse.json();
		console.log('hello', jsonResponse); 
		validationResult = jsonResponse.username;
		changeDisplay();
	}
	useEffect(() => {
		//console.log(validationResult);
		if (validationResult === 'sent'){
			fetchUsername();
		}		
	}, [credentials]);
	const catchInput = async (e) => 
	{
		setValidationResult('sent');
		//console.log(validationResult);
		setCredentials({
		email: emailRef.current.value,
		password: passRef.current.value
		});	
	}
	const changeDisplay = () => {
		if (validationResult === undefined) {
			setOutput('invalid credentials');
		} else {
			//console.log(validationResult);
			props.setUsername(validationResult);
			setOutput('login successful!');
			setToPosts('/');
		};
	};

	return (
		<div className="loginBlock">
			<h1>Login</h1>
			<TextInput className="in" ref={emailRef} email id="TextInput-3" label="Email" validate />

			<TextInput className="in" ref={passRef} password id="TextInput-4" label="Password" />

			<Button className="submitButton"  node="button" type="submit" waves="light" onClick={catchInput}>
				Submit
			<Icon right>
					send
			</Icon>
			</Button>
			<p>{output}</p>
			<Redirect to={toPosts} />
		</div>	
	)
};

export default Login;


//box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);