
export const randomInt = (max) => {
  return Math.floor(Math.random() * Math.floor(max));
}


export const isValidBet = (amount, fv, currentAmount, currentFv) => {
  if (currentAmount === undefined || currentFv === undefined) {
    return true;
  }
  if (amount === -1 && fv === -1) {
    return true;
  }

  if (amount < currentAmount) {
    return false;
  }

  if (amount === currentAmount) {
    if (fv <= currentFv) {
      return false;
    }
  }

  return true;
}
  