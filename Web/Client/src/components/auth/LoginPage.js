import React from 'react';
import 'antd/dist/antd.css';
import './LoginPage.css';
import { withRouter } from 'react-router-dom';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/auth';

class LoginForm extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.login(values);
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;

    if (this.props.isAuthenticated) {
      return <Redirect to="/atividades" />;
    } else {
      return (
        <Form onSubmit={this.handleSubmit} className="login-form">
          <h1 className="section-title">Login</h1>
          <Form.Item>
            {getFieldDecorator('identificador_usuario', {
              rules: [
                {
                  required: true,
                  message: 'Digite o identificador do usuário!',
                },
              ],
            })(
              <Input
                prefix={
                  <Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />
                }
                placeholder="Identificador"
              />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('senha_usuario', {
              rules: [{ required: true, message: 'Digite sua senha!' }],
            })(
              <Input
                prefix={
                  <Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />
                }
                type="password"
                placeholder="Senha"
              />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('remember', {
              valuePropName: 'checked',
              initialValue: true,
            })(<Checkbox>Lembrar-me</Checkbox>)}
            <a className="login-form-forgot" href="">
              Esqueceu a senha
            </a>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Entrar
            </Button>
            Realizar <Link to="/signup">cadastro</Link>
          </Form.Item>
        </Form>
      );
    }
  }
}

LoginForm.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
});

const LoginPage = Form.create({ name: 'normal_login' })(LoginForm);

export default connect(
  mapStateToProps,
  { login }
)(withRouter(LoginPage));
