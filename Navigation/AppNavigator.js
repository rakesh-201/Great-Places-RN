import { createStackNavigator } from "react-navigation-stack";
import PlacesOverviewScreen from "../Screens/PlacesOverviewScreen";
import PlaceDetailScreen from "../Screens/PlaceDetailScreen";
import NewPlaceScreen from "../Screens/NewPlaceScreen";
import { createAppContainer } from "react-navigation";
import Color from "../Constants/Color";

const AppNavigator = createStackNavigator({
    Main: PlacesOverviewScreen,
    Detail: PlaceDetailScreen,
    NewPlace: NewPlaceScreen,
}, {
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: Color.primary,
        },
        headerTintColor: 'white',
    }
})

export default createAppContainer(AppNavigator)