import React, { useEffect } from 'react';
import { useJwt } from 'react-jwt';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../slices/authSlice';

const IsLoggedinHOC = (WrappedComponent) => {
  const HocComponent = ({ ...props }) => {
    const dispatch = useDispatch();
    const { token } = useSelector((state) => state.auth); 

    console.log("Token:", token);

    const { isExpired } = useJwt(token); 

    console.log("Is Token Expired:", isExpired);

    useEffect(() => {
      if (isExpired) {
        dispatch(logout()); 
      }
    }, [isExpired, dispatch]);

    if (!token || isExpired) {
      return null; 
    }
 
    return <WrappedComponent {...props} isTokenExpired={isExpired} />;
  };

  return HocComponent;
};

export default IsLoggedinHOC;
