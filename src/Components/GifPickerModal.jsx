import ModalClose from "@mui/joy/ModalClose";
import {ModalDialog} from "@mui/joy";
import {Modal} from "@mui/material";
import GifPicker from "gif-picker-react";
import {useEffect, useState} from "react";


export function GifPickerModal(props){

    const toogle = props.toggle;
    const action = props.action;
    const setSelected = props.pickGif;

    // useEffect(() => {
    //     console.log(selected);
    //
    // }, [selected]);

    return <Modal
        open={toogle}
        onClose={action}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        }}
    >
        <ModalDialog minWidth={"50%"} sx={{overflowX: "auto"}}>
            <ModalClose onClick={action} sx={{marginBottom: 2}}/>
            <GifPicker height="100%" width="100%"
                       tenorApiKey={process.env.REACT_APP_TENOR_API_KEY}
                       onGifClick={setSelected}/>
        </ModalDialog>
    </Modal>
}