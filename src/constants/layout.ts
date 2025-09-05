import {NativeStackNavigationOptions} from '@react-navigation/native-stack';
import { colors } from './tokens';

export const StackScreenWithSearchBar: NativeStackNavigationOptions = {
    headerTitle: true,
    headerStyle: {
        backgroundColor: colors.background,
    },
    headerTitleStyle: {
        color: colors.text,
    },
    headerTintColor: colors.text,
    headerTransparent: true,
    headerBlurEffect: 'prominent',
    headerShadowVisible: false,
};