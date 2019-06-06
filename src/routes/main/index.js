import React, { Component } from "react";
import CardItem from "../../common/components/card";
import ResponsiveDialog from '../../common/components/dialog';
import Grid from "@material-ui/core/Grid";
import './index.css';

class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      title: 'Donate',
    }
    this.payDonate = this.payDonate.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  componentDidMount() {
    this.props.fetchCharities();
    this.props.fetchPayments();
  }

  payDonate(item, amount) {
    var params = {
      "charitiesId": item.id, "amount": amount, "currency": item.currency
    }
    this.props.updatePayment(params, true, res => {
      this.props.updateMessage('Thanks for donate ' + res.amount + '$!');
      this.setState({ open: true });
    });
  }

  handleClose() {
    this.setState({ open: false });
  }

  render() {
    const { charites, donate, message } = this.props;
    return (
      <div className="page" >
        <div className="header">
          <h1>Omise Tamboon React</h1>
          <strong className="all-donate">All donations: {donate}$</strong>
        </div>
        <div style={{ marginTop: 105 }}>
          <Grid container>
            {charites.map((item, i) => (
              <Grid key={i} item xs={12} md={6}>
                <div style={{ margin: 24 }}>
                  <CardItem
                    item={item}
                    payDonate={this.payDonate}
                  />
                </div>
              </Grid>
            ))}
          </Grid>
          <ResponsiveDialog
            fullScreen={false}
            open={this.state.open}
            title={this.state.title}
            content={message}
            close={this.handleClose}
            textClose={'Close'}
          />
        </div>
      </div>
    );
  }
}

export default Main;
