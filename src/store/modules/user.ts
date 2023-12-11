import { defineStore } from 'pinia';
import router from '@/router';
import { reqLogin, reqUserInfo, reqLogOut } from '@/api/user';
import type { LoginFormData, LoginResponseData, userInfoResponseData } from '@/api/user/type';
import type { UserState } from './types/types';
import { SET_TOKEN, GET_TOKEN, REMOVE_TOKEN } from '@/utils/token';
import { constantRoute, asyncRoute, anyRoute } from '@/router/routes';

import cloneDeep from 'lodash/cloneDeep';
import { get } from 'lodash';

function filterAsyncRoute(asyncRoute: any, routes: any) {
  return asyncRoute.filter((item: any) => {
    if (routes.includes(item.name)) {
      if (item.children && item.children.length > 0) {
        item.children = filterAsyncRoute(item.children, routes);
      }
      return true;
    }
  });
}

const useUserStore = defineStore('User', {
  state: (): UserState => {
    return {
      token: GET_TOKEN()!,
      menuRoutes: constantRoute,
      username: '',
      avatar: '',
      buttons: [],
    };
  },
  actions: {
    async userLogin(data: LoginFormData) {
      const res: LoginResponseData = await reqLogin(data);
      const message = get(res, 'data', '');
      const token = get(res, 'data', '');
      if (res.code === 200) {
        this.token = token;
        SET_TOKEN(token);
        return 'ok';
      } else {
        return Promise.reject(new Error(message));
      }
    },
    async userInfo() {
      const res: userInfoResponseData = await reqUserInfo();
      if (res.code === 200) {
        this.username = get(res, 'data.name', '');
        this.avatar = get(res, 'data.avatar', '');
        const userAsyncRoute = filterAsyncRoute(cloneDeep(asyncRoute), get(res, 'data.routes', ''));
        this.menuRoutes = [...constantRoute, ...userAsyncRoute, anyRoute];
        [...userAsyncRoute, anyRoute].forEach((route: any) => {
          console.log(route);

          router.addRoute(route);
          console.log('router', router);
        });
        return 'ok';
      } else {
        return Promise.reject(new Error(res.data.message));
      }
    },
    async userLogout() {
      const res = await reqLogOut();
      if (res.code === 200) {
        this.token = '';
        this.username = '';
        this.avatar = '';
        REMOVE_TOKEN();
      } else {
        return Promise.reject(new Error(res.message));
      }
    },
  },
  getters: {},
});

export default useUserStore;
