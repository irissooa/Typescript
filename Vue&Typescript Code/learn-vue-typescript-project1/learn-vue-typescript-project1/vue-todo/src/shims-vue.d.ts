// .vue라는 확장자를 만나면 전부 아래와같이 해석해줘(.vue 파일을 모두 Vue타입으로 인식해줘!)
declare module "*.vue" {
  import Vue from "vue";
  export default Vue;
}
