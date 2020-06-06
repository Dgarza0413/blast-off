import React from 'react'
import { useQuery } from "@apollo/react-hooks";
import gql from 'graphql-tag';

import { Loading, Header, LaunchDetail } from '../components';
import { ActionButton } from '../containers';

import { LAUNCH_TILE_DATA } from './launches';

export const GET_LAUNCH_DETAILS = gql`
    query LaunchDetails($launchId: ID!) {
        launch(id: $launchId){
            isInCart @client
            site
            rocket {
                type
            }
            ...LaunchTile
        }
    }
    ${LAUNCH_TILE_DATA}
`;

const Launch = ({ launchId }) => {
    const { data, loading, error } = useQuery(GET_LAUNCH_DETAILS, {
        variables: { launchId }
    });

    if (loading) return <Loading />
    if (error) return <p>ERROR: {error.message}</p>;
    if (!data) return <p>Not Found</p>;

    return (
        <>
            <Header image={data.launch && data.launch.mission && data.launch.mission.missionPatch} >
                {data && data.launch && data.launch.mission && data.launch.mission.name}
            </ Header>
            <LaunchDetail {...data.launch} />
            <ActionButton {...data.launch} />
        </>
    )
}

export default Launch