import { ADD_PLACE, SET_PLACE } from './places-action'
import Place from '../models/places'

const initialState = {
    places: []
}

export default (state = initialState, action) => {
    switch (action.type) {
        case ADD_PLACE:
            const newPlace = new Place(new Date().toString(), action.data.title, action.data.image, action.data.address, action.data.location.lat, action.data.location.lng)
            return {
                places: state.places.concat(newPlace)
            }
        case SET_PLACE:
            var places = []
            places = places.concat(action.placeData.map(place => new Place(place.id.toString(), place.title, place.imageUri, place.address, place.lat, place.lng)))
            console.log(places)
            return {
                places: places
            }

        default:
            return state

    }
}