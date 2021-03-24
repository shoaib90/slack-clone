import React, {useState} from 'react';
import {Button} from '@material-ui/core';
import styled from 'styled-components';
import {auth, db} from "../firebase";
import firebase from 'firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

function ChatInput({channelName, channelId, chatRef}) {
    //We need the value of text out of input tag, cleaner than useState.
    // const inputRef = useRef(null);
    // <input ref={inputRef} placeholder={`Message #ROOM`}/>

    const [input, setInput] = useState("");
    const [user] = useAuthState(auth);

    const sendMessage = (e) => {
        e.preventDefault(); //In a form if you click enter, it will refresh the page and we don't want that.
        
        if (!channelId){
            return false;
        }

        db.collection('rooms').doc(channelId).collection('messages').add({
            //get the input ref then current thing it's pointing to and get the value of it.
            message: input,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            user: user.displayName,
            userImage: user.photoURL });
        
            chatRef?.current.scrollIntoView({
                behavior: "smooth",
            });
        
            setInput(""); //After clicking message will disappear.
    };

    return (
        <ChatInputContainer>
            <form>
                <input onChange={e => setInput(e.target.value)} value={input} placeholder={`Message #${channelName}`}/>
                <Button hidden type='submit' onClick={sendMessage}>
                    SEND
                </Button>
            </form>
        </ChatInputContainer>
    )
}

export default ChatInput

const ChatInputContainer = styled.div`
    border-radius: 20px;

    > form {
        position: relative;
        display: flex;
        justify-content: center;
    } 

    > form > input {
        position: fixed;
        bottom: 30px;
        width: 60%;
        border: 1px solid gray;
        border-radius: 3px;
        padding: 20px;
        outline: none;
    } 

    > form > button {
        /* Cause material UI button sometimes overrides the CSS */
        display: none !important; 
    }
`;