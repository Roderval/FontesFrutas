import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import moment from 'moment';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Form, Input, Select, Button } from 'antd';
import './SignUpPage.css';

const Option = Select.Option;

class SignUpForm extends React.Component {
  constructor() {
    super();
    this.state = {
      confirmDirty: false,
      errors: {},
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
      console.log(nextProps.errors);
    }
  }

  handleSubmit = async e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, newUser) => {
      if (!err) {
        newUser.datacad_usuario = moment().format('YYYY-MM-DD');

        axios
          .post('http://localhost:4000/api/signup', newUser)
          .then(res => {
            this.props.history.push('/login');
            alert('Usuário cadastrado com sucesso');
          })
          .catch(err => alert(err));
      }
    });
  };

  handleConfirmBlur = e => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('senha_usuario')) {
      callback('As senhas inseridas são inconsistentes!');
    } else {
      callback();
    }
  };

  validateToNextPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  };

  render() {
    const { getFieldDecorator } = this.props.form;

    if (this.props.isAuthenticated) {
      return <Redirect to="/atividades" />;
    } else {
      return (
        <div className="signup-form">
          <h1 className="section-title">Registrar Usuário</h1>
          <Form onSubmit={this.handleSubmit}>
            <Form.Item label="Identificador">
              {getFieldDecorator('identificador_usuario', {
                rules: [
                  {
                    required: true,
                    message: 'Digite o identificador do usuário',
                  },
                ],
              })(<Input />)}
            </Form.Item>
            <Form.Item label="Nome">
              {getFieldDecorator('nome_usuario', {
                rules: [
                  {
                    required: true,
                    message: 'Digite o nome do usuário',
                  },
                ],
              })(<Input />)}
            </Form.Item>
            <Form.Item label="Cargo do usuário">
              {getFieldDecorator('cargo_usuario', {
                rules: [
                  { required: true, message: 'Selecione o cargo do usuário!' },
                ],
              })(
                <Select
                  showSearch
                  style={{ width: 200 }}
                  name="cargo_usuario"
                  label="cargo_usuario"
                  placeholder="Cargo"
                  filterOption={(input, option) =>
                    option.props.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  <Option value="adm">Administrador</Option>
                  <Option value="normal">Normal</Option>
                </Select>
              )}
            </Form.Item>
            <Form.Item label="Senha" hasFeedback>
              {getFieldDecorator('senha_usuario', {
                rules: [
                  {
                    required: true,
                    message: 'Digite uma senha!',
                  },
                  {
                    validator: this.validateToNextPassword,
                  },
                ],
              })(<Input.Password />)}
            </Form.Item>
            <Form.Item label="Confirmar Senha" hasFeedback>
              {getFieldDecorator('confirm', {
                rules: [
                  {
                    required: true,
                    message: 'Por favor confirme a senha!',
                  },
                  {
                    validator: this.compareToFirstPassword,
                  },
                ],
              })(<Input.Password onBlur={this.handleConfirmBlur} />)}
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="signup-form-button"
              >
                Registrar
              </Button>
            </Form.Item>
          </Form>
        </div>
      );
    }
  }
}

SignUpForm.propTypes = {
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
});

const SignUpPage = Form.create({ name: 'register' })(SignUpForm);

export default connect(mapStateToProps)(SignUpPage);
