import React from 'react'
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import { LaunchTile, Header, Button, Loading } from '../components';

const GET_LAUNCHES = gql`
    query launchList($after: String){
        
    }
`

export default function launches() {
    return (
        <div>

        </div>
    )
}
