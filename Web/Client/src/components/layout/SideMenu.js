import React from 'react';
import PropTypes from 'prop-types';
import { Layout, Menu, Icon } from 'antd';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const { Sider } = Layout;

const SideMenu = ({ isAuthenticated }) => {
  let isVisible = 'none';

  if (isAuthenticated) {
    isVisible = 'block';
  }

  return (
    <Sider
      breakpoint="lg"
      collapsedWidth="0"
      onBreakpoint={broken => {
        console.log(broken);
      }}
      onCollapse={(collapsed, type) => {
        console.log(collapsed, type);
      }}
      style={{ display: isVisible }}
    >
      <div className="logo" />
      <Menu theme="dark" mode="inline">
        <Menu.Item style={{ fontSize: 16 }} key="1">
          <Link to="/monitoramento">
            <Icon style={{ fontSize: 17 }} type="dashboard" />
            <span className="nav-text">Monitoramento</span>
          </Link>
        </Menu.Item>
        <Menu.Item style={{ fontSize: 16 }} key="2">
          <Link to="/atividades">
            <Icon style={{ fontSize: 17 }} type="deployment-unit" />
            <span className="nav-text">Atividades</span>
          </Link>
        </Menu.Item>
        <Menu.Item style={{ fontSize: 16 }} key="3">
          <Link to="/cadastro">
            <Icon style={{ fontSize: 17 }} type="database" />
            <span className="nav-text">Cadastro</span>
          </Link>
        </Menu.Item>
        <Menu.Item style={{ fontSize: 16 }} key="4">
          <Link to="/relatorio">
            <Icon style={{ fontSize: 17 }} type="bar-chart" />
            <span className="nav-text">Relatório</span>
          </Link>
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

SideMenu.propTypes = {
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(SideMenu);
