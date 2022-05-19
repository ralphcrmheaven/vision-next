export const randomString = (length = 8) => {
    return Math.random().toString(16).substring(2, length);
};

export const getRandomString = (instanceCount: number, charCount:number, separator: string) => {
    let rs = '';
    const finalCharCount = charCount + 2; // Compensate for the missing char since substring starts at 2

    for (let i = 1; i <= instanceCount; i++) {
        rs += randomString(finalCharCount);
        if(i < instanceCount){
            rs += separator;
        }
    }

    return rs;
}