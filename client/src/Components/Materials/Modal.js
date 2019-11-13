import React from 'react';
import 'rodal/lib/rodal.css';
import Rodal from 'rodal';
import { Container, Divider } from '@material-ui/core';

const Modal = ({showModal,status, closeModal, title, content}) => {
    if(status){
        return(
            <Rodal visible={showModal} 
                    onClose={() => closeModal('resultModal')}
                    animation={'rotate'} 
                    animationDuration={'300ms'}>
                <Container>
                    <h1>{title}</h1>
                    <Divider/>
                    <h3 style={{lineBreaker:'pre-wrap'}}>
                        {content}
                    </h3>
                </Container>  
            </Rodal>
        )
    }else{
        return(
            <Rodal visible={showModal} 
                    onClose={() => closeModal('resultModal')}>
                <h1>{title}</h1>
                <Divider/>
                <h3 style={{lineBreaker:'pre-wrap'}}>
                    {content}
                </h3>
            </Rodal>
        )
    }
}
export default Modal;
