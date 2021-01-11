import React from 'react';
import Loader from 'react-loader-spinner';

export default function CustomLoader() {
  return <Loader type="ThreeDots" color="#3f51b5" height={80} width={80} />;
}
