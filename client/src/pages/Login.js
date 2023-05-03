import React from 'react';
import { Button, Checkbox, Form, Input, Row, Col, } from 'antd';
import axios from 'axios';

const { TextArea } = Input;


const Login = () => {
  const onFinish = (values) => {
    console.log('Success:', values);
    /* axios.post("http://localhost:3001/mangas",values).then((resp)=>{
      console.log(resp)
    }).catch((err)=>{
      console.log(err);
    }) */
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <div style={{display:'flex', justifyContent:'center'}}>
    <Form
    style={{width:'600px', marginTop:'20px'}}
      name="basic"
      labelCol={{
        span: 6,
      }}
      wrapperCol={{
        span: 16,
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        rules={[
            {
            required: true,
            message: "Saisissez votre nom d'utilisateur.",
            },
        ]}
        label="username"
        name="username"
        
      >
        <Input />
      </Form.Item>

      <Form.Item
        rules={[
            {
            required: true,
            message: 'Renseignez votre mot de passe.',
            },
        ]}
        label="Password"
        name="Password"
        
      >
                <Input.Password />

      </Form.Item>

      
        <Button type="primary" htmlType="submit">
          Login
        </Button>
    </Form>
    </div>
  );
};
export default Login;