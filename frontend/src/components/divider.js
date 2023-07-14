import {View} from 'react-native';

export const Divider = props => {
  const height_ratio = props.height_ratio || 1;
  return (
    <View
      style={{
        height: 1 * height_ratio,
        width: '100%',
        backgroundColor: '#F5F5F5',
        marginVertical: 16 * height_ratio,
      }}
    />
  );
};
