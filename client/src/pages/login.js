import React from 'react'
import { useApolloClient, useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import { LoginForm, Loading } from '../components';
import ApolloClient from 'apollo-client';

export const LOGIN_USER = gql`
mutation login($email: String!){
    login(email: $email)
}
`

const Login = () => {
    const client = useApolloClient();
    const [login, { data }] = useMutation(LOGIN_USER);
    return <LoginForm login={login} />;
}

export default Login;