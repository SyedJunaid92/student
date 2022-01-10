import React from 'react';
import LinearGradient from 'react-native-linear-gradient';

const GradientView = props => {
  return (
    <LinearGradient colors={props.colors} style={props.style}>
      {props.children}
    </LinearGradient>
  );
};

export default GradientView;
