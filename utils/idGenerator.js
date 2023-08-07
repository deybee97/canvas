function generateRandomId(length) {
    const idChars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let randomId = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * idChars.length);
      randomId += idChars.charAt(randomIndex);
    }
    return randomId;
  }
  