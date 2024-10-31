function countChars(inputString: string): {[key: string]: number} {
    const res: {[key: string]: number} = {}
    for (const char of inputString) {
        if (char == " ") continue;
        res[char] = res[char] ? res[char]+1 : 1;
        // if (res[char]){
        //     res[char]++;            
        // }else {
        //     res[char] = 1;
        // }
    }
    return  res;
}

const res = countChars("anticonstitutionnellement")
console.log(res);


