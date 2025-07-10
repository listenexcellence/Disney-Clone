// components/SkeletonBox.js
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { MotiView } from 'moti';

const SkeletonBox = ({ width = 100, height = 100, borderRadius = 8 }) => {
  return (
    <MotiView
      from={{ opacity: 0.3 }}
      animate={{ opacity: 1 }}
      transition={{
        loop: true,
        type: 'timing',
        duration: 1000,
      }}
      style={[styles.skeleton, { width, height, borderRadius }]}
    />
  );
};

export default SkeletonBox;

const styles = StyleSheet.create({
  skeleton: {
    backgroundColor: '#333',
  },
});
