import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import withMobileDialog from '@material-ui/core/withMobileDialog';

class ResponsiveDialog extends React.Component {

  handleClose = () => {
    if (typeof this.props.close === "function")
      this.props.close();
  };
  handleOk = () => {
    if (typeof this.props.ok === "function")
      this.props.ok();
  }

  render() {
    const { fullScreen, open, content, title, showBtnOk, textClose, textOk } = this.props;

    return (
      <div>
        <Dialog
          fullScreen={fullScreen}
          open={open}
          onClose={this.handleClose}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">{title}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              {content}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            {
              showBtnOk &&
              <Button onClick={this.handleOk} color="primary">
                {textOk}
              </Button>
            }
            <Button onClick={this.handleClose} color="primary" autoFocus>
              {textClose}
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
ResponsiveDialog.defaultProps = {
  showBtnOk: false,
  textClose: 'Cancel',
  textOk: 'Ok',
};
ResponsiveDialog.propTypes = {
  fullScreen: PropTypes.bool.isRequired,
  open: PropTypes.bool.isRequired,
  title: PropTypes.string,
  content: PropTypes.string,
  close: PropTypes.func,
  ok: PropTypes.func
};

export default withMobileDialog()(ResponsiveDialog);
