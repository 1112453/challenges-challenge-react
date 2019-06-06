import Main from '../index';
import { connect } from 'react-redux';

import {
    fetchCharities
    , fetchPayments
    , updatePayment
    , updateMessage
} from '../controller/MainActions';

const mapStateToProps = (state) => ({
    charites: state.main.charites,
    donate: state.main.donate,
    message: state.main.message,
})

const mapActionCreators = {
    fetchCharities
    , fetchPayments
    , updatePayment
    , updateMessage
}

export default connect(mapStateToProps, mapActionCreators)(Main);