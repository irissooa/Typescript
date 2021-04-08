## Typescript_User

- api

```typescript
import axios, { AxiosPromise } from "axios";
import { setInterceptors } from "@/api/instance/intercepter.js";

export interface UserInfo {
  u_email: string;
  u_name: string;
}

export interface SubListItem {
  m_id: number;
  m_name: string;
}

export interface ModelItem {
  id: number;
  manufacturer: string;
  modelDetailList: ModelDetail[];
  name: string;
  segment: any;
}

export interface ModelDetail {
  effciency: number;
  exhaust: number;
  fuel: object;
  id: number;
  max_person: number;
  name: string;
  optionList: ModelOptionItem[];
}

export interface ModelOptionItem {
  id: number;
  name: string;
  price: number;
}

export interface NewsItem {
  description: string;
  link: string;
  originallink: string;
  pubDate: string;
  title: string;
}

export interface ShopItem {
  hprice: string;
  image: string;
  link: string;
  lprice: string;
  mallName: string;
  title: string;
}

const instance = setInterceptors();
// member api
function loginUser(): AxiosPromise<any> {
  return instance.get(`user/login`);
}

function logoutUser(): AxiosPromise<any> {
  return instance.post(`user/logout`);
}

function deleteUser(): AxiosPromise<any> {
  return instance.delete(`user/delete`);
}

function fetchUser(): AxiosPromise<any> {
  return instance.get(`user/info`);
}

// subscribe api
function addCar(modelId: number): AxiosPromise<any> {
  return instance.post(`mycar/add`, {
    m_id: modelId
  });
}

function deleteCar(modelId: number): AxiosPromise<any> {
  return instance.delete(`mycar/delte`, {
    params: {
      m_id: modelId
    }
  });
}

function fetchCars(): AxiosPromise<any[]> {
  return instance.get(`mycar/list`);
}

// model api
function searchModelImg(imagePic: any): AxiosPromise<string> {
  return axios.post(`https://j4b101.p.ssafy.io/predict/picture`, imagePic, {
    headers: {
      "Content-Type": "multipart/form-data"
      // "Access-Control-Allow-Origin": "*"
    }
  });
}

function findModelId(modelName: string): AxiosPromise<ModelItem> {
  return instance.get(`model/search/${modelName}`);
}

function fetchAllCars(): AxiosPromise<any[]> {
  return instance.get(`model/all_list`);
}

function fetchAllOptions(
  modelDetailId: number
): AxiosPromise<ModelOptionItem[]> {
  return instance.get(`model/option_list`, {
    params: {
      md_id: modelDetailId
    }
  });
}

function fetchLatest(modelId: number): AxiosPromise<ModelDetail> {
  return instance.get(`model/latest_model`, {
    params: {
      m_id: modelId
    }
  });
}

function searchCar(keyWord: string): AxiosPromise<ModelItem[]> {
  return instance.get(`model/search_list`, {
    params: {
      keyword: keyWord
    }
  });
}

function fetchModel(modelDetailId: number): AxiosPromise<any> {
  return instance.get(`model/info/${modelDetailId}`);
}

//가격 비교 api
function fetchPriceCompare(modelId: number): AxiosPromise<ModelItem[]> {
  return instance.get(`model/similar_price/${modelId}`);
}

//사이즈 비교 api
function fetchSizeCompare(modelId: number): AxiosPromise<ModelItem[]> {
  return instance.get(`model/same_segment/${modelId}`);
}

// etc
function fetchNews(words: string): AxiosPromise<NewsItem[]> {
  return instance.get(`news/${words}`);
}

function fetchShops(words: string): AxiosPromise<ShopItem[]> {
  return instance.get(`shop/${words}`);
}

export {
  loginUser,
  logoutUser,
  deleteUser,
  fetchUser,
  addCar,
  deleteCar,
  fetchCars,
  findModelId,
  fetchAllCars,
  fetchAllOptions,
  fetchLatest,
  fetchModel,
  searchModelImg,
  searchCar,
  fetchNews,
  fetchShops,
  fetchPriceCompare,
  fetchSizeCompare
};

```

- store

```typescript
// state
import jwtDecode from "jwt-decode";

const state = {
  // 예시
  // news: [] as NewsItem[]
  token: sessionStorage.getItem("auth-token") || null,
  isLogin: sessionStorage.getItem("auth-token") === null ? false : true,
  userInfo:
    sessionStorage.getItem("auth-token") === null
      ? {}
      : jwtDecode(sessionStorage.getItem("auth-token")),
  modelInfo: JSON.parse(sessionStorage.getItem("model-info")) || {},
  latestModel: JSON.parse(sessionStorage.getItem("latest-model")) || {},
  modelName: JSON.parse(sessionStorage.getItem("model_name")) || "",
  similarModel: JSON.parse(sessionStorage.getItem("similar_model")) || [],
  sameSegment: JSON.parse(sessionStorage.getItem("same_segment")) || []
};

// node_modules/vuex/types/vue.d.ts 삭제

type RootState = typeof state;

export { state, RootState };

//actions
import { ActionContext } from "vuex";
import { Mutations, MutationTypes } from "./mutations";
import { RootState } from "./state";
import {
  fetchLatest,
  loginUser,
  fetchPriceCompare,
  fetchSizeCompare
} from "@/api/index";

enum ActionTypes {
  // 예시
  // FETCH_NEWS = "FETCH_NEWS"
  LOGIN = "LOGIN",
  FETCH_LATEST = "FETCH_LATEST",
  SIMILAR_PRICE = "SIMILAR_PRICE",
  SAME_SEGMENT = "SAME_SEGMENT"
}

type MyActionContext = {
  commit<K extends keyof Mutations>(
    key: K,
    payload: Parameters<Mutations[K]>[1]
  ): ReturnType<Mutations[K]>;
} & Omit<ActionContext<RootState, RootState>, "commit">;

const actions = {
  // 예시
  // async [ActionTypes.FETCH_NEWS](context: MyActionContext, payload?: number) {
  //   const { data } = await fetchNews();
  //   context.commit(MutationTypes.SET_NEWS, data);
  //   return data;
  // }
  async [ActionTypes.LOGIN](context: MyActionContext, payload?: any) {
    const { data } = await loginUser();
    if (data["auth-token"]) {
      context.commit(MutationTypes.SET_TOKEN, data["auth-token"]);
    } else {
      console.log("LOGIN ERROR");
    }
    return data;
  },
  async [ActionTypes.FETCH_LATEST](context: MyActionContext, payload?: number) {
    const { data } = await fetchLatest(payload);
    if (data) {
      context.commit(MutationTypes.LATEST_MODEL, data);
    } else {
      console.log("LATEST_MODEL ERROR");
    }
    return data;
  },
  async [ActionTypes.SIMILAR_PRICE](
    context: MyActionContext,
    payload?: number
  ) {
    const { data } = await fetchPriceCompare(payload);
    if (data) {
      context.commit(MutationTypes.SIMILAR_MODEL, data);
    } else {
      console.log("SIMILAR_MODEL ERROR");
    }
    return data;
  },
  async [ActionTypes.SAME_SEGMENT](context: MyActionContext, payload?: number) {
    const { data } = await fetchSizeCompare(payload);
    if (data) {
      context.commit(MutationTypes.SAME_SEGMENT_MODEL, data);
    } else {
      console.log("SAME_SEGMENT_MODEL ERROR");
    }
    return data;
  }
};

type Actions = typeof actions;

export { ActionTypes, actions, Actions };

//mutations
import { RootState } from "./state";
import jwtDecode from "jwt-decode";
import { logoutUser, ModelDetail, ModelItem } from "@/api/index";

enum MutationTypes {
  SET_TOKEN = "SET_TOKEN",
  LOGOUT = "LOGOUT",
  MODEL_INFO = "MODEL_INFO",
  LATEST_MODEL = "LATEST_MODEL",
  MODEL_NAME = "MODEL_NAME",
  SIMILAR_MODEL = "SIMILAR_MODEL",
  SAME_SEGMENT_MODEL = "SAME_SEGMENT_MODEL"
}

const mutations = {
  [MutationTypes.SET_TOKEN](state: RootState, token: any) {
    state.token = token;
    sessionStorage.setItem("auth-token", token);
    state.isLogin = true;
    state.userInfo = jwtDecode(token);
  },
  async [MutationTypes.LOGOUT](state: RootState) {
    await logoutUser();
    state.token = "";
    state.isLogin = false;
    sessionStorage.clear();
  },
  async [MutationTypes.MODEL_INFO](state: RootState, modelInfo: ModelItem) {
    state.modelInfo = modelInfo;
    sessionStorage.setItem("model-info", JSON.stringify(modelInfo));
  },
  async [MutationTypes.LATEST_MODEL](state: RootState, modelInfo: ModelDetail) {
    state.latestModel = modelInfo;
    sessionStorage.setItem("latest-model", JSON.stringify(modelInfo));
  },
  async [MutationTypes.MODEL_NAME](state: RootState, modelname: string) {
    state.modelName = modelname;
    sessionStorage.setItem("model_name", JSON.stringify(modelname));
  },
  async [MutationTypes.SIMILAR_MODEL](
    state: RootState,
    modelInfo: ModelItem[]
  ) {
    state.modelName = modelInfo;
    sessionStorage.setItem("similar_model", JSON.stringify(modelInfo));
  },
  async [MutationTypes.SAME_SEGMENT_MODEL](
    state: RootState,
    modelInfo: ModelItem[]
  ) {
    state.modelName = modelInfo;
    sessionStorage.setItem("same_segment", JSON.stringify(modelInfo));
  }
};

type Mutations = typeof mutations;

export { MutationTypes, mutations, Mutations };

```



- Google

```vue
<template>
  <div id="google-signin-btn">
    <button @click="login">
      <img
        src="@/assets/images/btn_google_signin_light_normal_web@2x.png"
        width="70%"
        alt="google-login-btn"
      />
    </button>
  </div>
</template>

<script lang="ts">
/* eslint-disable */
import Vue from 'vue'
import { loginUser } from "@/api/index";

export default Vue.extend({
  methods: {
    // async login() {
    //   try {
    //   await this.$store.dispatch('LOGIN')
    // } catch (error) {
    //   console.log(error)
    // }
    // },
    login() {
      loginUser()
    },
  //   handleClickGetAuth(){
  //     this.$gAuth.getAuthCode()
  //     .then(authCode => {
  //       //on success
  //       console.log('Authcode',authCode)
  //       return this.$http.post('http://your-backend-server.com/auth/google', { code: authCode, redirect_uri: 'postmessage' })
  //     })
  //     .then(response => {
  //       //and then
  //       console.log(response)
  //       // this.handleClickSignIn()
  //       // 만약 토큰이 없으면 signin하고,,,이건 api만든 뒤에 다시 확인 필요
  //     })
  //     .catch(error => {
  //       //on fail do something
  //       console.log(error)
  //     })
  //   },
  
  // handleClickSignIn(){
  //     this.$gAuth.signIn()
  //   .then(GoogleUser => {
  //     //on success do something
  //     console.log('GoogleUser', GoogleUser) 
  //   })
  //   .catch(error  => {
  //     //on fail do something
  //     console.log(error)
  //   })
    // }
    }
})
</script>

<style>

</style>
```

- webcam

```vue
<template>
  <div class="container">
    CarCamera
    <div class="row">
      <div class="col-md-6">
        <h2>Current Camera</h2>
        <code v-if="device">{{ device.label }}</code>
        <div class="border">
          <vue-web-cam
              ref="webcam"
              :device-id="deviceId"
              width="100%"
              @started="onStarted"
              @stopped="onStopped"
              @error="onError"
              @cameras="onCameras"
              @camera-change="onCameraChange"
          />
        </div>

        <div class="row">
          <div class="col-md-12">
            <select v-model="camera">
              <option>-- Select Device --</option>
              <option
                  v-for="device in devices"
                  :key="device.deviceId"
                  :value="device.deviceId"
              >{{ device.label }}</option>
            </select>
          </div>
          <div class="col-md-12">
            <button type="button" class="btn btn-primary" @click="onCapture">Capture Photo</button>
            <button type="button" class="btn btn-danger" @click="onStop">Stop Camera</button>
            <button type="button" class="btn btn-success" @click="onStart">Start Camera</button>
          </div>
        </div>
      </div>
      <div class="col-md-6">
        <h2>Captured Image</h2>
        <figure class="figure">
            <img :src="img" class="img-responsive" />
        </figure>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  data() {
      return {
          img: null,
          camera: null,
          deviceId: null,
          devices: []
      };
  },

  computed: {
      device: function() {
          return this.devices.find(n => n.deviceId === this.deviceId);
      }
  },

  watch: {
      camera: function(id) {
          this.deviceId = id;
      },
      devices: function() {
          // Once we have a list select the first one
          const [first, ...tail] = this.devices;
          if (first) {
              this.camera = first.deviceId;
              this.deviceId = first.deviceId;
          }
      }
  },

  methods: {
      onCapture() {
          this.img = this.$refs.webcam.capture();
      },
      onStarted(stream) {
          console.log("On Started Event", stream);
      },
      onStopped(stream) {
          console.log("On Stopped Event", stream);
      },
      onStop() {
          this.$refs.webcam.stop();
      },
      onStart() {
          this.$refs.webcam.start();
      },
      onError(error) {
          console.log("On Error Event", error);
      },
      onCameras(cameras) {
          this.devices = cameras;
          console.log("On Cameras Event", cameras);
      },
      onCameraChange(deviceId) {
          this.deviceId = deviceId;
          this.camera = deviceId;
          console.log("On Camera Change Event", deviceId);
      }
  }
})
</script>

<style>

</style>
```

- carimgpage

```vue
<template>
  <div>
      <div class="container" id="scanIdCardPage">
        <button @click="updateDeviceList">START</button>
      <div class="scanIdCardDiv">
        <div id="videoList"></div>
        {{myPreferredCameraDeviceId}}
              <div class="scanCardContainer" v-show="afterTakingPhoto">
                  <video ref="video" id="video"  autoplay></video>
                  <canvas ref="canvas" id="canvas" width="320" height="240" style="display: none;"></canvas>
              </div>
          </div>
      </div>

      <div class="takePhotoBtnDiv">
          <div>
              <button type="button" class="btn btn-info" @click="Camera">Camera</button>
          </div>
      </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  data() {
    return {
      myPreferredCameraDeviceId: "" as any,
      afterTakingPhoto:false as boolean,
      videoLabel: false as any,
      front:false as boolean,
    }
    },
    methods: {
        Camera() {
            if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
              navigator.mediaDevices.enumerateDevices().then((devices) => {
          devices.forEach((device) => {
            console.log(device.kind + ": " + device.label +
                        " id = " + device.deviceId);
            // console.log('디바이스종류',device.kind, device)
            this.myPreferredCameraDeviceId = device.kind;
            console.log('???',this.videoLabel)
            if (device.kind === "videoinput" && !this.videoLabel) {
              console.log('디바이스ID?',device.deviceId)
              this.videoLabel = device.label;
              // this.myPreferredCameraDeviceId = device.deviceId;
              const constraints = { video: { facingMode: (this.front? "user" : "environment") } };
              // { video: { deviceId: device.deviceId } }
              navigator.mediaDevices.getUserMedia(constraints).then(stream => {
                  // console.log('내디바이스',this.myPreferredCameraDeviceId)
                  console.log("내디바이스",stream)
                  document.querySelector('video').srcObject = stream;
                  const track = stream.getVideoTracks()[0];
                  console.log('트랙',track)
                  // const imagePic = new FormData();
                  // const pic = "보낼 이미지 이름";
                  // imagePic.append("profile", this.imageUrl, String(pic+'.jpg'))
                  this.afterTakingPhoto = true
                });
            }
          });
        })
        .catch(function(err) {
          console.log(err.name + ": " + err.message);
        });
                
            }
        },
        findDeviseInfo() {
          if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) {
          console.log("enumerateDevices() not supported.");
          return;
        }

        // List cameras and microphones.

        navigator.mediaDevices.enumerateDevices()
        .then(function(devices) {
          devices.forEach(function(device) {
            console.log(device.kind + ": " + device.label +
                        " id = " + device.deviceId);
                        console.log('??',device.kind)
            if (device.kind === "videoinput") {
              this.myPreferredCameraDeviceId = device.deviceId;
              console.log('난 뭘까',typeof this.myPreferredCameraDeviceId,this.myPreferredCameraDeviceId)
            }
          });
        })
        .catch(function(err) {
          console.log(err.name + ": " + err.message);
        });
        },
  updateDeviceList() {
  const videoList = document.getElementById("videoList");
  navigator.mediaDevices.enumerateDevices()
  .then(function(devices) {
    videoList.innerHTML = "";
    devices.forEach((device) => {
      const elem = document.createElement("li");
      const [kind, type, direction] = device.kind.match(/(\w+)(input|output)/i);

      elem.innerHTML = "<strong>" + device.label + "</strong> (" + direction + ")";
      if (type === "video") {
        videoList.appendChild(elem);
      }
    });
  });
}
    },
    mounted() {
      // this.findDeviseInfo();
      // this.Camera();
    }
})
</script>

<style>

</style>
```

