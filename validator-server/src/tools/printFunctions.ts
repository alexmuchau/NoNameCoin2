export function printHeader(text: string) {
    console.log('================================')
    console.log(text + '\n')
}

export function printFooter(text: string) {
    console.log('\n' + text)
    console.log('================================')
}

export function printInit(text: string) {
    console.log('==========================')
    console.log("-->" + text)
    console.log('==========================')
}