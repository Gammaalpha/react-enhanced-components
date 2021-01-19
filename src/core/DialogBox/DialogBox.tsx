import { render } from '@testing-library/react'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import { WindowClose } from "@styled-icons/boxicons-regular/WindowClose";
import ReactDOM from 'react-dom';

interface DialogProps {
  id: string;
  open: boolean;
  onClose: () => void;
  title?: string
  class?: string
  children?: any;
  width?: number;
  height?: number;
  // modalContent: JSX.Element;
}

const Wrapper = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 700;
  width: inherit;
  outline: 0;
`;

const Backdrop = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.3);
  z-index: 500;
`;

type StyledModalProps = {
  fadeType: string;
  width: number;
  height: number;
}

const StyledModal = styled.div<StyledModalProps>`
  z-index: 100;
  background: white;
  position: relative;
  margin: auto;
  border-radius: 8px;
  width: ${(props: StyledModalProps) => props.width}px;
  height: ${(props: StyledModalProps) => props.height}px;
  opacity: ${(props: StyledModalProps) => {
    switch (props.fadeType) {
      case "in":
        return "1";
      default:
        return "0";
    };
  }};
  transition: ${(props: StyledModalProps) => {
    switch (props.fadeType) {
      case "in":
        return `opacity linear 0.25s;`;
      case "out":
        return `opacity linear 0.25s;`;
      default:
        return "";
    }
  }};
`;

const Header = styled.div`
  border-radius: 8px 8px 0 0;
  display: flex;
  justify-content: space-between;
  padding: 0.3rem;
`;

const HeaderText = styled.div`
    padding:15px;
    font-weight:500;
    font-size:20px;
    color: #000000;
    align-self: center;
`;

const CloseButton = styled.button`
  font-size: 0.8rem;
  border: none;
  border-radius: 3px;
  width:40px;
  margin-left: 0.5rem;
  background: none;
  :hover {
    cursor: pointer;
  }
`;
const Content = styled.div`
  padding: 10px;
  max-height: 30rem;
  overflow-x: hidden;
  overflow-y: auto;
  
`;

export function DialogBox(props: DialogProps) {

  const [fade, setFade] = useState({ fadeType: '' })

  const transitionEnd = (e: any) => {
    if (e.propertyName !== "opacity" || fade.fadeType === "in") {
      return;
    }
    if (fade.fadeType === "out") {
      props.onClose();
    }
  }


  useEffect(() => {
    if (props.open) {
      window.addEventListener("keydown", onEscKeyDown, false);
      setTimeout(() => {
        setFade({ fadeType: "in" })
      }, 0);
    }
    if (!props.open) {
      setTimeout(() => {
        setFade({ fadeType: "out" })
      }, 0);
    }
    return () => {
      window.removeEventListener("keydown", onEscKeyDown, false);

    }
  }, [props])


  const onEscKeyDown = (e: any) => {
    if (e.key !== "Escape") { return }
    else {
      setFade({ fadeType: "out" })
    }
  }

  const handleClick = (e: any) => {
    e.preventDefault();
    setFade({ fadeType: "out" })
  }

  const render = () => {
    return (
      <React.Fragment >
        <Backdrop />
        <Wrapper>
          <StyledModal
            role="dialog"
            id={props.id}
            className={props.class}
            onTransitionEnd={transitionEnd}
            onClick={handleClick}
            fadeType={fade.fadeType}
            width={!!props.width ? props.width : 800}
            height={!!props.height ? props.height : 400}
          >
            <Header>
              <HeaderText>{props.title || "Dialog"}</HeaderText>
              <CloseButton onClick={handleClick}>
                <WindowClose />
              </CloseButton>
            </Header>
            <Content>
              {props.children}
            </Content>
          </StyledModal>
        </Wrapper>
      </React.Fragment >
    )
  }


  return props.open ? ReactDOM.createPortal(render(), document.body) : null;
}