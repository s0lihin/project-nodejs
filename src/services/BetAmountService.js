export const countTotalBetAmount = (rowsInput) => {
    let total = parseFloat(0);

    for (let i = 0; i < rowsInput.length; i++) {
       
        if (rowsInput[i]['checked']) {
            total += parseFloat(rowsInput[i]['betAmount']);
        }
    }

    return total;
}