import React, { useState } from 'react';
import styled from 'styled-components';

const StateBlock = styled.div`
  position: absolute;
  z-index: 2;
  top: 7px;
  right: 7px;
  width: 300px;
  height: 100px;

  .textBox {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: absolute;
    z-index: 3;
    width: 100%;
    height: 100%;
  }

  .back {
    position: absolute;
    background-color: #a0ffe7;
    width: 100%;
    height: 100%;
    opacity: 0.5;
  }
`;

const State = () => {

    const [questNum, setQuestNum] = useState(0);
    const questContent = ['주변을 탐색하세요.', '우주선에 들어가세요.'];

    return (
        <>
        <StateBlock>
            <div className='textBox'>
                <div className='content'>{questContent[questNum]}</div>
            </div>
            <div className='back'/>
        </StateBlock>
        </>
    );
};

export default State;