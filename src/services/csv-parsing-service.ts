import csv from 'csv-parser';
import fs from 'fs';
import * as stream from  'stream'

export default function processDataFromCSV(filename: string, callback: (data: any, stream: stream.Transform) => Promise<void>) {
    return new Promise(async (resolve, reject) => {
        const stream = fs.createReadStream(filename).pipe(csv())
        stream.on('data', async (data) => await callback(data, stream))
            .on('close', () => resolve(null))
            .on('end', () => resolve(null))
            .on('error', (err) => reject(err))
    })
}