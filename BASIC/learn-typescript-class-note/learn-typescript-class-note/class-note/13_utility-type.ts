interface Product {
  id: number;
  name: string;
  price: number;
  brand: string;
  stock: number;
}

// 1. 상품 목록을 받아오기 위한 API 함수
function fetchProducts(): Promise<Product[]> {
  // ..
}

// interface ProductDetail {
//   id: number; 
//   name: string; 
//   price: number;
// }

// 2. 특정 상품의 상세 정보를 나타내기 위한 함수
// Pick(유틸리티타입) : Product에서 id, name, price를 뽑을거야 -> 이걸 이용해서 interface를 변환해서 쓸 수 있다.
type ShoppingItem = Pick<Product, 'id' | 'name' | 'price'>
function displayProductDetail(shoppingItem: Pick<Product, 'id' | 'name' | 'price'>) {
}

// interface UpdateProduct {
//   id?: number;
//   name?: string;
//   price?: number;
//   brand?: string;
//   stock?: number;
// }

// Partial
type UpdateProduct = Partial<Product>
// 3. 특정 상품 정보를 업데이트(갱신)하는 함수
function updateProductItem(productItem: Partial<Product>) {
// productItem: Product라고 하면 모든 속성을 다 정의해줘야되는데 Partial<Product>는 Product타입의 속성을 전부 옵션으로 처리하게됨(선택적으로 집어 넣을 수 있다)
}

// 4. 유틸리티 타입 구현하기 - Partial
interface UserProfile {
  username: string;
  email: string;
  profilePhotoUrl: string;
}
// interface UserProfileUpdate {
//   username?: string;
//   email?: string;
//   profilePhotoUrl?: string;
// }
// #1 유저프로필 인터페이스로 type별칭 만듦 :  유저프로필 인터페이스의 속성을 이용해 type을 정의(옵셔널하게)
// type UserProfileUpdate = {
//   username?: UserProfile['username'];
//   email?: UserProfile['email'];
//   profilePhotoUrl?: UserProfile['profilePhotoUrl'];
// }

// #2(#1을 줄여나감)
type UserProfileUpdate = {
  // 맵드타입(Mapped type) 속성을 반복문처럼 도는데 UserPRofile의 한 키가 [p]에 들어옴, '?' 옵셔널 추가
  [p in 'username' | 'email' | 'profilePhotoUrl']?: UserProfile[p]
}
type UserProfileKeys = keyof UserProfile

// #3
type UserProfileUpdate = {
  // #2의 속성 키들은 'keyof'로 줄일 수 있음, UserProfile의 key들을 하나씩 내보냄
  [p in keyof UserProfile]?: UserProfile[p]
}

// #4 이게 Partial의 구현모습(제너릭이용)
type Subset<T> = {
  [p in keyof T]?: T[p]
}
