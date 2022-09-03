import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export default () => Math.round(wp("100%") + hp("100%")) / 2;
