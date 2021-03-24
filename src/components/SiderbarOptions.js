import React from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { enterRoom } from '../features/appSlice';
import {db} from '../firebase';

//Here we are passing the whole icon as a prop, that's why used Uppercase "I", cause we will be rendering it.
function SiderbarOptions({Icon, title, addChannelOption, id}) {

    // Can name it dispatch gun, used to shoot actions into the global store
    const dispatch = useDispatch();

    const addChannel = () => {
        const channelName = prompt('Please enter the channel name');

        if(channelName){
            db.collection('rooms').add({
                name: channelName,
            })
        }
    }

    // Here we are going to use redux
    const selectChannel = () => {
        //If there is an id we want to dispatch an action into the global store, thus we need something that allow us to dispatch the action 
        // into the global store, thus we useDispatch. 
        if(id){
            dispatch(enterRoom({
                roomId: id
            }))
        }

    }
    
    return (
        <SidebarOptionsContainer
            onClick={addChannelOption ? addChannel : selectChannel}
        >
          {/* Here passing the Icon && beacuse you might actually render a component out without actually passing in a icon */}
          { Icon && <Icon fontSize='small' style={{ padding: 10 }} />}  
          {Icon ? (
              <h3>{title}</h3>
          ): (
            <SidebarOptionChannel>
                <span>#</span> {title}
            </SidebarOptionChannel>
          )}
        </SidebarOptionsContainer>
    )
}

export default SiderbarOptions

const SidebarOptionsContainer = styled.div`
    display: flex;
    font-size: 12px;
    align-items: center;
    padding-left: 2px;
    cursor: pointer;

    :hover {
        opacity: 0.9;
        background-color: #340e36;
    }

    > h3 {
        font-weight: 500;
    }

    > h3 > span {
        padding: 15px;
    }
`;

const SidebarOptionChannel = styled.h3`
    padding: 10px 0;
    font-weight: 300;
`;