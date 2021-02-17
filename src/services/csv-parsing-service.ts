import csv from 'csv-parser';
import fs from 'fs';
import * as stream from  'stream'

export default function processDataFromCSV(filename: string, callback: (data: any, stream: stream.Transform) => void) {
    return new Promise((resolve, reject) => {
        const stream = fs.createReadStream(filename).pipe(csv())
        stream.on('data', (data) => callback(data, stream))
            .on('close', () => resolve(null))
            .on('end', () => resolve(null))
            .on('error', (err) => reject(err))
    })
}