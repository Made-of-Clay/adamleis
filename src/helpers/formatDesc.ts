const maxCharLength = 70;

export function formatDesc(desc: string) {
    if (desc.length <= maxCharLength)
        return desc;

    // starting at maxCharLength, go forward until you find a space
    // slice off before/after
    // return the 0-N slice
    let endSliceIndex = -1;
    for (let i = 70; i < desc.length; i++) {
        if (desc[i] === ' ') {
            endSliceIndex = i;
        }
    }
    if (endSliceIndex < 0)  
        return desc;
    else
        return `${desc.slice(0, endSliceIndex)}…`;
}