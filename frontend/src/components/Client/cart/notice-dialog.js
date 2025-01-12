import { Button, Dialog, DialogTitle, DialogActions, DialogContentText, DialogContent } from '@mui/material';
import { IoWarningOutline } from "react-icons/io5";

const NoticeDialog = ({ open, message, onClose, onLink, button1, button2 }) => {
    return (
        <>
            <Dialog
                open={open}
                onClose={onClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    <div className="d-flex align-items-center justify-content-center">
                        <IoWarningOutline className="text-warning" style={{ fontSize: '4rem' }} />
                    </div>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description" className='fs-3'>
                        {message}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose} color="error">
                        {button1}
                    </Button>
                    <Button onClick={() => {
                        onClose()
                        onLink()
                    }} color="primary" autoFocus>
                        {button2}
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default NoticeDialog;