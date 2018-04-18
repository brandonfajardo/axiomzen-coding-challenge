export const getLastPageNumber = headers => {
    const arr = headers.link.split('issues?')
        .map(issues => issues.substr(0, 10).substr(5,5).match(/[0-9]+/g))
        .filter(str => {
            if (str !== null){
                return Number(str[0])
            }
        })
        .map(nums => nums[0])
    
    return Math.max(...arr)
}