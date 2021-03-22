import * as FileSystem from 'expo-file-system'
import { fetchData, insertData } from '../helpers/db'

export const ADD_PLACE = 'ADD_PLACE'
export const SET_PLACE = 'SET_PLACE'

export const addPlace = (title, image, address, location) => {
    console.log(title)
    return async dispatch => {
        const name = image.split('/').pop()
        const filePath = FileSystem.documentDirectory + name
        try {
            await FileSystem.moveAsync({
                from: image,
                to: filePath
            })
            const res = await insertData(title, filePath, address, location.lat, location.lng)
            dispatch({ type: ADD_PLACE, data: { title, image: filePath, address, location } })
        } catch (err) {
            throw err
        }
    }
}

export const setPlace = () => {
    return async dispatch => {
        const data = await fetchData()
        dispatch({ type: SET_PLACE, placeData: data.rows._array })
    }
}