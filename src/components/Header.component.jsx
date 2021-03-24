import styled from "styled-components";
import React from "react";
import { Avatar } from "@material-ui/core";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import SearchIcon from "@material-ui/icons/Search";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";

function Header() {
  const [user] = useAuthState(auth);

  return (
    <HeaderContainer>
      {/* Header left */}
      <HeaderLeft>
        <HeaderAvatar
          // TODO : Add onclick
          onClick={() => auth.signOut()}
          alt={user?.displayName}
          src={user?.photoURL}
        />
        <AccessTimeIcon></AccessTimeIcon>
      </HeaderLeft>

      {/* Header Search */}
      <HeaderSearch>
        <SearchIcon />
        <input placeholder="Search" />
      </HeaderSearch>

      {/* Header Right */}
      <HeaderRight>
        <HelpOutlineIcon />
      </HeaderRight>
    </HeaderContainer>
  );
}

export default Header;

//We can move this into other file component, ex: in Header.style.js

const HeaderSearch = styled.div`
  flex: 0.4;
  opacity: 1;
  border-radius: 6px; //rounding of corners of border
  background-color: #421f44;
  text-align: center;
  display: flex;
  padding: 0 50px;
  color: gray; //Items in it will have this color like the icon, input tag
  border: 1px gray solid; //border itself with thickness - 1px

  > input {
    background-color: transparent; //will remove the color(white) from input field background
    border: none;
    text-align: center;
    min-width: 30vw;
    outline: 0; //outer box line which shows up on clicking input field.
    color: white;
  }
`;

const HeaderContainer = styled.div`
  display: flex;
  position: fixed;
  width: 100%;
  align-items: center;
  justify-content: space-between; //The justify-content property aligns the flexible container's items
  padding: 10px 0px;
  background-color: var(--slack-color);
  color: white;
`;

const HeaderLeft = styled.div`
  flex: 0.3; //meaning taking 3rd of the overall screen, as the above div covers the entire part.
  display: flex;
  align-items: center;
  margin-left: 20px;

  //Now if we have a material ui icon,they get by default a special-class (MuiSvgIcon-root)
  // Here the below syntax means inside the HeaderLeft div we are targeting the icon.
  > .MuiSvgIcon-root {
    margin-left: auto;
    margin-right: 30px;
  }
`;

const HeaderRight = styled.div`
  flex: 0.3;
  display: flex;
  align-items: flex-end; //don't use float as it is old school now.

  > .MuiSvgIcon-root {
    margin-left: auto;
    margin-right: 20px;
  }
`;

// That's how we make styled components for custom components.
const HeaderAvatar = styled(Avatar)`
  cursor: pointer;

  :hover {
    opacity: 0.8;
  }
`;
