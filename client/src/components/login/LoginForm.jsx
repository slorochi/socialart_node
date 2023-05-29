import { Button, Form, Input, } from 'antd';
import axios from 'axios';
import React, {useContext} from 'react';

// icons
import { ImMail2, ImLock} from "react-icons/im";
import { ThemeContext } from '../../contexts/ThemeContext';

// allow to send cookies
const axiosInstance = axios.create({
  withCredentials: true
})
export default function LoginForm({setTriggerUserConnexion, navigate}){

  const { darkMode } = useContext(ThemeContext);

  const onFinish = (values) => {
    console.log('Success:', values);
    axiosInstance.post("http://localhost:3001/users/login", values).then((resp)=>{
      console.log(resp);
      setTriggerUserConnexion(!false);
      navigate("/profile"); 
    }).catch((err)=>{
      console.log(err);
    }) 
  };
  
    
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  return (

    <div  style={{display:'flex', justifyContent:'center'}}>
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
      <div className="flex">
      <div >
        <ImMail2 style={{ marginRight: '8px' }} />
            Adresse email
         </div>  
      <Form.Item
        rules={[
            {
            required: true,
            message: "Saisissez votre email.",
            },
        ]}
        style={{backgroud:"red",color:"white !important"}}
       
        name="email"
        
      >
        <Input />
      </Form.Item>
      
      </div>

      <Form.Item
        rules={[
            {
            required: true,
            message: 'Renseignez votre mot de passe.',
            },
        ]}
        label={
          <>
            <ImLock style={{ marginRight: '8px' }} />
            Mot de passe
          </>
        }
        name="password"
        
      >
                <Input.Password />

      </Form.Item>

        {/* centre le bouton */}
      <div className="flex justify-center">

      <Button type="submit" className="py-1.5 px-2.5 inline-flex items-center text-white rounded w-30 bg-indigo-600 hover:bg-indigo-500" htmlType="submit">
          Connexion
        </Button>
        </div>
    </Form>
    </div>
  );

    }