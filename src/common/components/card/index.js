import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  Card,
  CardMedia,
  CardContent,
  Button,
  Typography,
  FormControlLabel,
  RadioGroup,
  Radio,
  IconButton
} from "@material-ui/core";
import ClearIcon from "@material-ui/icons/Clear";
import { withStyles } from '@material-ui/core/styles';
import ResponsiveDialog from '../dialog';
import './index.css';
const styles = theme => ({
  radio: {
    '&$checked': {
      color: 'blue'
    }
  },
  checked: {},
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9,
  },
})

class CardItem extends React.PureComponent {
  constructor(props) {
    super();
    this.state = {
      paymentShow: false,
      amount: "10",
      open: false,
      title: 'Donate',
      content: 'Are you sure you want to pay donate?',
    };

    this.btnDonate = this.btnDonate.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.btnPay = this.btnPay.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleOk = this.handleOk.bind(this);
  }

  btnDonate() {
    this.setState({ paymentShow: !this.state.paymentShow });
  }
  handleChange(event) {
    this.setState({ amount: event.target.value });
  }
  btnPay() {
    this.setState({ open: true });
  }
  handleClose() {
    this.setState({ open: false });
  }
  handleOk() {
    if (this.props.payDonate) this.props.payDonate(this.props.item, parseInt(this.state.amount));
    this.setState({ open: false, paymentShow: false });
  }

  renderPayment(item) {
    const { classes } = this.props;
    return (
      <div className="pay-card">
        <IconButton
          aria-label="clear"
          style={{ float: "right" }}
          onClick={this.btnDonate}
        >
          <ClearIcon />
        </IconButton>
        <div className="pay-item">
          <Typography gutterBottom variant="h5" component="h2">
            Select the amount to donate(USD)
          </Typography>
          <RadioGroup
            aria-label="payAmount"
            name="payAmount"
            row
            value={this.state.amount}
            onChange={this.handleChange}
          >
            {[10, 20, 50, 100, 500].map((amount, j) => (
              <FormControlLabel
                key={j}
                value={amount.toString()}
                control={<Radio classes={{ root: classes.radio, checked: classes.checked }}
                />}
                label={amount.toString()}
              />
            ))}
          </RadioGroup>
          <Button
            variant="outlined"
            style={{ color: 'blue', borderColor: 'blue' }}
            onClick={this.btnPay}
          >
            Pay
          </Button>
        </div>
      </div>

    );
  }

  render() {
    const { item, classes } = this.props;
    const { open, title, content } = this.state;
    return (
      <div>
        <Card style={{ position: "relative", height: "100%" }}>
          {
            this.state.paymentShow &&
            this.renderPayment(item)
          }
          <CardMedia
            image={"./images/" + item.image}
            className={classes.media}
          />
          <CardContent style={{ display: "flex" }}>
            <Typography
              gutterBottom
              variant="h5"
              component="h2"
              style={{ flex: 1 }}
            >
              {item.name}
            </Typography>
            <Button variant="outlined" style={{ color: 'blue', borderColor: 'blue' }} onClick={this.btnDonate}>
              Donate
          </Button>
          </CardContent>
        </Card>
        <ResponsiveDialog
          fullScreen={false}
          open={open}
          title={title}
          content={content}
          close={this.handleClose}
          ok={this.handleOk}
          showBtnOk={true}
          textOk="Agree"
          textClose="Disagree"
        />
      </div>
    );
  }
}

CardItem.propTypes = {
  item: PropTypes.object.isRequired,
  payDonate: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CardItem);
