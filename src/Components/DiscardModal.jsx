import {Button, Modal, Typography} from "@mui/material";
import ModalClose from "@mui/joy/ModalClose";
import {ModalDialog} from "@mui/joy";

export function DiscardModal(props) {
    const toogle = props.toggle;
    const onClose = props.onClose;
    const onDiscard = props.onDiscard;
    return <Modal
        open={toogle}
        onClose={()=>{
            onClose(false);
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        }}
    >
        <ModalDialog sx={{p: 4}} alignItems={"center"}>
            <ModalClose onClick={()=>{
                onClose(false);
            }}/>
            <h1 style={{fontWeight: "bolder", fontSize: "24px"}}>Discard thread?</h1>
            <body>This can’t be undone and you’ll lose your draft. </body>
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
                gap: '10px', // adds space between the buttons
            }}>
                <Button onClick={onDiscard} color="primary" variant="contained"
                        sx={{borderRadius: "20px", bgcolor: "red"}}>
                    Discard
                </Button>
                <Button onClick={()=>{
                    onClose(false);
                }} variant="outlined"
                        sx={{borderRadius: "20px", color: "black", borderColor: "black"}}>
                    Cancel
                </Button>
            </div>
        </ModalDialog>
    </Modal>
}

