import React, { Component } from 'react';
import { connect } from 'react-redux';

export default function(ComposedComponent) {
  class Authentication extends Component {
    static contextTypes = {
      router: React.PropTypes.object
    }

    handleAuthentication(authenticated){
      console.log(this.context);
      if (!authenticated){
        this.context.router.push("/");
      }
    }

    componentWillMount(){
      this.handleAuthentication(this.props.authenticated);
    }

    componentWillUpdate(nextProps){
      this.handleAuthentication(nextProps.authenticated);
    }

    render(){
      return <ComposedComponent {...this.props} />
    }
  }

  function mapStateToProps(state){
    return { authenticated: state.authenticated };
  }

  return connect(mapStateToProps)(Authentication);
};
