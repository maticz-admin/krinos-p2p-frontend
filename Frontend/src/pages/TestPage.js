// import package
import React, { memo, useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import {
    GoogleReCaptchaProvider,
    useGoogleReCaptcha
} from 'react-google-recaptcha-v3';

const MyAppp = () => {
    const { executeRecaptcha } = useGoogleReCaptcha();
    const { t, i18n } = useTranslation();
    // Create an event handler so you can call the verification on button click event or form submit
    const handleReCaptchaVerify = async () => {
        if (!executeRecaptcha) {
            return;
        }

        const token = await executeRecaptcha('yourAction');
        // Do whatever you want with the token
    }

    const onClicktest = () => {
        handleReCaptchaVerify()
    }
    const handleRecaptcha = () => {
        window.grecaptcha.execute('6Lfa3NYqAAAAAOPNURwGG_sO4YqgDX5iwJZmj7T1', { action: 'homepage' }).then((token) => {
          console.log('reCAPTCHA token:', token);
          // Use the token, for example, send it to your server
        }).catch(error => {
          console.error('Error generating reCAPTCHA token:', error);
        });
      };

      useEffect(() => {
        // Check if grecaptcha is available
        const loadRecaptchaScript = () => {
          if (window.grecaptcha) {
            window.grecaptcha.ready(() => {
              console.log('reCAPTCHA is ready');
            });
          } else {
            const script = document.createElement('script');
            script.src = `https://www.google.com/recaptcha/api.js?render=6Lfa3NYqAAAAAOPNURwGG_sO4YqgDX5iwJZmj7T1`;
            script.async = true;
            script.onload = () => {
              console.log('reCAPTCHA script loaded');
              window.grecaptcha.ready(() => {
                console.log('reCAPTCHA is ready');
              });
            };
            document.body.appendChild(script);
          }
        };
    
        loadRecaptchaScript(); // Load reCAPTCHA script
    
        return () => {
          // Cleanup when the component is unmounted
          const script = document.querySelector('script[src="https://www.google.com/recaptcha/api.js?render=6Lfa3NYqAAAAAOPNURwGG_sO4YqgDX5iwJZmj7T1"]');
          if (script) {
            script.remove();
          }
        };
      }, []);

    // You can use useEffect to ttrigger the verification as soon as the component being loaded
    // useEffect(() => {
    //   handleReCaptchaVerify();
    // }, [handleReCaptchaVerify]);
    return (
        <div>
        <button onClick={handleRecaptcha}>Verify reCAPTCHA</button>
      </div>
    );
    // return <button onClick={onClicktest}>Verify recaptcha</button>;
};

export default MyAppp
// export default function App() {
//     return (
//         <GoogleReCaptchaProvider reCaptchaKey="6Ld9F-QcAAAAAD8m9qE00vekxCSzVwmU94L4eb8P">
//             <MyAppp />
//         </GoogleReCaptchaProvider>
//     );
// }
