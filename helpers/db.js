import { openDatabase } from 'expo-sqlite'

const db = openDatabase('places')

export const init = () => {
    const promise = new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                'CREATE TABLE IF NOT EXISTS places (id INTEGER NOT NULL PRIMARY KEY, title TEXT NOT NULL, imageUri TEXT NOT NULL, address TEXT NOT NULL, lat INTEGER NOT NULL, lng INTEGER NOT NULL)', [],
                (_, result) => {
                    resolve(result)
                },
                (_, err) => {
                    reject(err)
                }
            )
        })
    })
    return promise;
}

export const insertData = (title, imageUrl, address, lat, lng) => {
    const promise = new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                `INSERT INTO places (title , imageUri , address , lat , lng ) VALUES (?, ?, ?, ?, ?) `, [title, imageUrl, address, lat, lng],
                (_, result) => {
                    resolve(result)
                },
                (_, err) => {
                    reject(err)
                }
            )
        })
    })
    return promise;
}

export const fetchData = () => {
    const promise = new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                'SELECT * FROM places', [],
                (_, result) => {
                    resolve(result)
                },
                (_, err) => {
                    reject(err)
                }
            )
        })
    })
    return promise;
}