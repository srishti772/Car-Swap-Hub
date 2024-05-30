import React from 'react';
import { GoogleLogin } from '@react-oauth/google';

const GoogleLoginAPI = () => {
  return (
    <div className="w-100 mt-4 mx-auto">
      <GoogleLogin
        onSuccess={(credentialResponse) => {
          console.log(credentialResponse);
        }}
        onError={() => {
          console.log('Login Failed');
        }}
      />
    </div>
  );
};

export default GoogleLoginAPI;
