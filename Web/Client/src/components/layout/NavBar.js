import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Layout, Menu, Button } from 'antd';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../../actions/auth';

const { Header } = Layout;

const NavBar = ({ auth: { isAuthenticated, loading }, logout }) => {
  const guestMenu = (
    <Menu
      theme="light"
      mode="horizontal"
      defaultSelectedKeys={['1']}
      style={{ lineHeight: '64px', float: 'right' }}
    >
      <Menu.Item key="1">
        <Link to="/login">Login</Link>
      </Menu.Item>
      <Menu.Item key="2">
        <Link to="/signup">Cadastro</Link>
      </Menu.Item>
    </Menu>
  );

  const loggedMenu = (
    <Menu
      theme="light"
      mode="horizontal"
      style={{ lineHeight: '64px', float: 'right' }}
    >
      <Button
        type="danger"
        style={{ marginRight: '10px' }}
        ghost
        onClick={logout}
      >
        Logout
      </Button>
    </Menu>
  );

  return (
    <Header
      style={{
        background: '#fff',
        padding: 0,
        boxShadow: '0 2px 10px 0 rgba(0, 0, 0, 0.04)',
      }}
    >
      {!loading && (
        <Fragment>{isAuthenticated ? loggedMenu : guestMenu}</Fragment>
      )}
    </Header>
  );
};

NavBar.propTypes = {
  auth: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(
  mapStateToProps,
  { logout }
)(NavBar);
