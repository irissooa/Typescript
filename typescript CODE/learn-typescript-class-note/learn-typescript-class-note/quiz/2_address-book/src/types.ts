interface PhoneNumberDictionary {
  [phone: string]: {
    num: number;
  };
}

interface Contact {
  name: string;
  address: string;
  phones: PhoneNumberDictionary;
}

// 이넘 사용
enum PhoneType {
  Home = 'home',
  Office = 'office',
  Studio = 'studio',
}

// import를 할수있게 내보냄
export { Contact, PhoneType };
