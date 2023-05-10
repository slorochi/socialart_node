import { Button, Form, Input, } from 'antd';
import axios from 'axios';

export default function SignupForm(){

const onFinish = (values) => {
    console.log('Success:', values);
    axios.post("http://localhost:3001/users/signup",values).then((resp)=>{
      console.log(resp)
    }).catch((err)=>{
      console.log(err);
    })
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
            message: "Saisissez votre adresse email.",
            },
        ]}
        label="adresse mail"
        name="email"
        
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
        label="Mot de passe"
        name="password"
        
      >
                <Input.Password />

      </Form.Item>

      
        <Button type="submit" className="py-1.5 px-2.5 inline-flex items-center text-white rounded w-30 bg-indigo-600 hover:bg-indigo-500" htmlType="submit">
          Inscription
        </Button>
    </Form>
    </div>
  );

}