import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'
import StarBorderOutlinedIcon from '@material-ui/icons/StarBorderOutlined';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import { selectRoomId } from '../features/appSlice';
import { useSelector } from 'react-redux';
import ChatInput from './ChatInput';
import { useCollection, useDocument } from 'react-firebase-hooks/firestore';
import { db } from '../firebase';
import Message from './Message';

function Chat() {
    const chatRef = useRef(null);
    const roomId = useSelector(selectRoomId)
    const [roomDetails] = useDocument(
        //If id exists then querying it to the database.
        roomId && db.collection('rooms').doc(roomId)
    );

    const [roomMessages,loading] = useCollection(
        roomId && 
            db
            .collection("rooms")
            .doc(roomId)
            .collection("messages")
            .orderBy("timestamp", "asc")
    );

    //Want this to run when the components mounts or roomId changes.
    //While loading get the chatRef then what it is currently pointing at and then scroll it into
    // the view, thus it will scroll us to the bottom of the chat. 
    useEffect(() => {
            chatRef?.current?.scrollIntoView({
                behaviour:"smooth",
            });

        }, [roomId, loading]);


    return (
        <ChatContainer>
        {/* This means only if we have these values then load up the chat screen, 
        this will take care of the initial undefined value and room for that. */}
        { roomDetails && roomMessages && (
        //  In react we are not allowed to have one component next to another component, thus 
        //  we will use react fragment(<>), then we are to have something next to header. 

            <>
            <Header>
                <HeaderLeft>
                    <h4>
                        <strong>#{roomDetails?.data().name}</strong>
                    </h4>
                    <StarBorderOutlinedIcon /> 

                </HeaderLeft>

                <HeaderRight>
                    <p>
                        <InfoOutlinedIcon /> Details
                    </p>

                </HeaderRight>
            </Header>

            <ChatMessages>
                {/* Listing out the messages here. */}
                {roomMessages?.docs.map((doc) => {
                    const {message, timestamp, user, userImage} = doc.data();

                    return(
                        <Message
                            key= {doc.id}
                            message = {message}
                            timestamp = {timestamp}
                            user = {user}
                            userImage = {userImage}
                        />
                    );
                })}
                <ChatBottom ref={chatRef} />
            </ChatMessages>

            <ChatInput 
                chatRef = {chatRef}
                channelName = {roomDetails?.data().name}
                channelId  = {roomId}
            />

        </>

        )}
                </ChatContainer>
    )
}


export default Chat


const ChatBottom = styled.div`
    padding-bottom: 200px;
`;

const Header = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 20px;
    border-bottom: 1px solid lightgray;
`;

const HeaderLeft = styled.div`
    
    display: flex;

    > h4 {
        display: flex;
        text-transform: lowercase;
        margin-right: 10px;
    }

    > h4 > .MuiSvgIcon-root {
        margin-left: 10px;
        font-size: 18px;
    } 
`;
const HeaderRight = styled.div`
    > p {
        display: flex;
        align-items: center;
        font-size: 14px;
    }

    > p > .MuiSvgIcon-root {
        margin-right: 5px !important;
        font-size: 16px;
    }
`;

const ChatMessages = styled.div``;


const ChatContainer = styled.div`
    flex:0.7;
    flex-grow: 1; //How much this will grow with respect to other flex containers.
    overflow-y: scroll; //If contents clips the top or bottom edges thus adjusting for that using scroll.
    margin-top: 60px;
`;

