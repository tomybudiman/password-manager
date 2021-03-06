import React,{Component} from 'react';
import {connect} from 'react-redux';

import {deleteAccountFirebase} from '../redux/actions/action-accounts';
import Modal from './Modal';
import './Home.css';

class Home extends Component {
  constructor(){
    super();
    this.state = {
      editValue : {
        id : null,
        website : null,
        username : null,
        password : null
      }
    }
  }
  setEditValue(account){
    this.setState({
      editValue : account
    });
  }
  render(){
    return(
      <div>
        <Modal editValue={this.state.editValue}/>
        <ul className="home-wrapper">
          {this.props.accounts.map((account,i) => {
            return(
              <li key={i}>
                <div className="col-sm-4">
                  <span className="info-label">Website :</span>
                  <span className="info-value">{account.website}</span>
                </div>
                <div className="col-sm-4">
                  <span className="info-label">Email / Username :</span>
                  <span className="info-value">{account.username}</span>
                </div>
                <div className="col-sm-4">
                  <span className="info-label">Password :</span>
                  <span className="info-value">{account.password}</span>
                </div>
                <div className="action-group">
                  <button className="btn btn-primary btn-sm" data-toggle="modal" data-target="#edit-account" onClick={() => this.setEditValue(account)}>Edit</button>
                  <button className="btn btn-danger btn-sm" onClick={() => this.props.deleteAccount(account.id)}>Delete</button>
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    accounts : state.reducerAccounts.accounts
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    deleteAccount : (targetId) => dispatch(deleteAccountFirebase(targetId))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Home);
