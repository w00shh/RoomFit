import {View, Image, Dimensions, StyleSheet} from 'react-native';
import styles from './styles';

//images
import Front from '../../assets/images/bodypart/front_clean.png';
import Behind from '../../assets/images/bodypart/behind_clean.png';
//front images
import F0 from '../../assets/images/bodypart/f0.png';
import F1 from '../../assets/images/bodypart/f1.png';
import F2 from '../../assets/images/bodypart/f2.png';
import F3 from '../../assets/images/bodypart/f3.png';
import F4 from '../../assets/images/bodypart/f4.png';
import F5 from '../../assets/images/bodypart/f5.png';
import F6 from '../../assets/images/bodypart/f6.png';
import F7 from '../../assets/images/bodypart/f7.png';
import F8 from '../../assets/images/bodypart/f8.png';
import F9 from '../../assets/images/bodypart/f9.png';
import F11 from '../../assets/images/bodypart/f11.png';
//behind images
import B0 from '../../assets/images/bodypart/b0.png';
import B3 from '../../assets/images/bodypart/b3.png';
import B4 from '../../assets/images/bodypart/b4.png';
import B5 from '../../assets/images/bodypart/b5.png';
import B6 from '../../assets/images/bodypart/b6.png';
import B7 from '../../assets/images/bodypart/b7.png';
import B8 from '../../assets/images/bodypart/b8.png';
import B9 from '../../assets/images/bodypart/b9.png';
import B10 from '../../assets/images/bodypart/b10.png';
import B11 from '../../assets/images/bodypart/b11.png';

const width_ratio = Dimensions.get('window').width / 390;
const height_ratio = Dimensions.get('window').height / 844;

export const Person = props => {
  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      gap: 16 * width_ratio,
    },
    image: {
      width: (props.width ? props.width : 80) * width_ratio,
      height: (props.height ? props.height : 246) * height_ratio,
    },
  });

  const percent = {
    back: props.percent.back / 100 + 0.3 * !!props.percent.back,
    bicep: props.percent.bicep / 100 + 0.3 * !!props.percent.bicep,
    chest: props.percent.chest / 100 + 0.3 * !!props.percent.chest,
    core: props.percent.core / 100 + 0.3 * !!props.percent.core,
    leg: props.percent.leg / 100 + 0.3 * !!props.percent.leg,
    shoulder: props.percent.shoulder / 100 + 0.3 * !!props.percent.shoulder,
    tricep: props.percent.tricep / 100 + 0.3 * !!props.percent.tricep,
  };
  return (
    <View style={styles.container}>
      <View>
        <Image source={Front} style={styles.image} />
        <Image
          source={F0}
          style={[styles.image, {position: 'absolute', opacity: percent.back}]}
        />
        <Image
          source={F1}
          style={[styles.image, {position: 'absolute', opacity: percent.bicep}]}
        />
        <Image
          source={F2}
          style={[styles.image, {position: 'absolute', opacity: percent.chest}]}
        />
        <Image
          source={F3}
          style={[styles.image, {position: 'absolute', opacity: percent.leg}]}
        />
        <Image
          source={F4}
          style={[styles.image, {position: 'absolute', opacity: percent.leg}]}
        />
        <Image
          source={F5}
          style={[
            styles.image,
            {position: 'absolute', opacity: percent.shoulder},
          ]}
        />
        <Image
          source={F6}
          style={[
            styles.image,
            {position: 'absolute', opacity: percent.tricep},
          ]}
        />
        <Image
          source={F7}
          style={[
            styles.image,
            {position: 'absolute', opacity: percent.shoulder},
          ]}
        />
        <Image
          source={F8}
          style={[styles.image, {position: 'absolute', opacity: percent.leg}]}
        />
        <Image
          source={F9}
          style={[
            styles.image,
            {
              position: 'absolute',
              opacity: percent.bicep / 2 + percent.back / 2,
            },
          ]}
        />
        <Image
          source={F11}
          style={[styles.image, {position: 'absolute', opacity: percent.core}]}
        />
      </View>
      <View>
        <Image source={Behind} style={styles.image} />
        <Image
          source={B0}
          style={[styles.image, {position: 'absolute', opacity: percent.back}]}
        />
        <Image
          source={B3}
          style={[styles.image, {position: 'absolute', opacity: percent.leg}]}
        />
        <Image
          source={B4}
          style={[styles.image, {position: 'absolute', opacity: percent.leg}]}
        />
        <Image
          source={B5}
          style={[
            styles.image,
            {position: 'absolute', opacity: percent.shoulder},
          ]}
        />
        <Image
          source={B6}
          style={[
            styles.image,
            {position: 'absolute', opacity: percent.tricep},
          ]}
        />
        <Image
          source={B7}
          style={[styles.image, {position: 'absolute', opacity: percent.back}]}
        />
        <Image
          source={B8}
          style={[styles.image, {position: 'absolute', opacity: percent.leg}]}
        />
        <Image
          source={B9}
          style={[styles.image, {position: 'absolute', opacity: percent.back}]}
        />
        <Image
          source={B10}
          style={[styles.image, {position: 'absolute', opacity: percent.leg}]}
        />
        <Image
          source={B11}
          style={[styles.image, {position: 'absolute', opacity: percent.core}]}
        />
      </View>
    </View>
  );
};
