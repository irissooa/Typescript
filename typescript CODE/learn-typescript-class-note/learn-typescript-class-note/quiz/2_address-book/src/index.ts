// type을 따로 정의하고 불러옴
import { Contact, PhoneType } from './types';

// api
// TODO: 아래 함수의 반환 타입을 지정해보세요.
// return type은 Promise 반환 type을 Contact[]로 지정
function fetchContacts(): Promise<Contact[]> {
  // TODO: 아래 변수의 타입을 지정해보세요.
  const contacts: Contact[] = [
    {
      name: 'Tony',
      address: 'Malibu',
      phones: {
        home: {
          num: 11122223333,
        },
        office: {
          num: 44455556666,
        },
      },
    },
    {
      name: 'Banner',
      address: 'New York',
      phones: {
        home: {
          num: 77788889999,
        },
      },
    },
    {
      name: '마동석',
      address: '서울시 강남구',
      phones: {
        home: {
          num: 213423452,
        },
        studio: {
          num: 314882045,
        },
      },
    },
  ];
  return new Promise(resolve => {
    setTimeout(() => resolve(contacts), 2000);
  });
}

// main
class AddressBook {
  // TODO: 아래 변수의 타입을 지정해보세요.
  // type이 Contact인터페이스의 배열
  contacts: Contact[] = [];

  // 초기화 코드를 constructor에 넣어줌
  constructor() {
    this.fetchData();
  }

  fetchData(): void {
    // response의 type은 Contact[], fetchContacts의 return값을 Promise<Contact[]>로 지정했기 때문
    fetchContacts().then(response => {
      this.contacts = response;
    });
  }

  /* TODO: 아래 함수들의 파라미터 타입과 반환 타입을 지정해보세요 */
  // Contact 인터페이스의 name값과 동일한 type string
  // 반환값도 Contact[](filter이기 때문에 조건에 맞는 배열을 반환함)
  findContactByName(name: string): Contact[] {
    return this.contacts.filter(contact => contact.name === name);
  }

  findContactByAddress(address: string): Contact[] {
    return this.contacts.filter(contact => contact.address === address);
  }

  //phoneType : home, office, studio -> 이넘 사용
  findContactByPhone(phoneNumber: number, phoneType: PhoneType): Contact[] {
    return this.contacts.filter(
      // contact의 phones라는 속성 중 어떤 값이든 그 안의 num에 접근
      contact => contact.phones[phoneType].num === phoneNumber
    );
  }
  // findContactByPhone('office');

  addContact(contact: Contact): void {
    this.contacts.push(contact);
  }

  // contact.name값은 string이기 때문에 반환값 string[]
  displayListByName(): string[] {
    return this.contacts.map(contact => contact.name);
  }

  displayListByAddress(): string[] {
    return this.contacts.map(contact => contact.address);
  }
  /* ------------------------------------------------ */
}
// 타입단언
// class가 container인것이 null일 수 있기 때문에 HTMLDivElement로 type을 정함
let div = document.querySelector('.container') as HTMLDivElement;
div.innerText;

// map이란? => 기존의 값을 변화할 수 있다
// let heroes = [
//   { name: 'Tony', age: 30 },
//   { name: 'Captain', age: 100 },
// ];
// heroes.map(function (hero) {
//   return hero.name;
// }); // ['Tony', 'Captain']

new AddressBook();
