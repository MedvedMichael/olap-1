import readline from 'readline';

export default async function readConsole(connection: readline.Interface, question: string): Promise<string> {
    return new Promise((resolve, reject) => {
        connection.question(question, (answer) => {
            resolve(answer)
        })
    })
}