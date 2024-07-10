import {Modal, Typography} from "@mui/material";
import ModalClose from "@mui/joy/ModalClose";
import {ModalDialog} from "@mui/joy";

export function SuccessModal(props) {
    const toogle = props.toggle;
    const action = props.action;
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
        <ModalDialog sx={{p: 2}} alignItems={"center"}>
         <ModalClose onClick={action}/>
            <Typography variant={"h6"} textAlign={"center"}
                        fontWeight={"bold"}
            color={"green"}>Tweet Posted!</Typography>
        </ModalDialog>
    </Modal>
}