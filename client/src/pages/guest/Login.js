import React, { Fragment, useState } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { login } from "../../actions/auth";

const Login = ({ login, isAuthenticated }) => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const { email, password } = formData;

    const onChange = e =>
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });

    const onSubmit = async e => {
        e.preventDefault();
        login(email, password);
    };

    // Redirect if logged in
    if (isAuthenticated) return <Redirect to='/' />;

    return (
        <Fragment>
            <h1>Log in</h1>
            <form onSubmit={e => onSubmit(e)}>
                <input
                    type='email'
                    placeholder='Email'
                    name='email'
                    value={email}
                    onChange={e => onChange(e)}
                    required
                />
                <input
                    type='password'
                    placeholder='Password'
                    name='password'
                    value={password}
                    onChange={e => onChange(e)}
                    minLength='6'
                />
                <input type='submit' value='Login' />
            </form>
        </Fragment>
    );
};

Login.propTypes = {
    login: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
});

export default connect(
    mapStateToProps,
    { login },
)(Login);
