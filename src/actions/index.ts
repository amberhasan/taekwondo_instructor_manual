import {Action} from '../types';

export const SET_TAEGEUK_DATA = 'SET_TAEGEUK_DATA';
export const SET_PALGWAE_DATA = 'SET_PALGWAE_DATA';
export const SET_LOADING = 'SET_LOADING';

export const setTaegeukData = (payload: any): Action => ({
  type: SET_TAEGEUK_DATA,
  payload,
});

export const setPalgwaeData = (payload: any) => ({
  type: SET_PALGWAE_DATA,
  payload,
});

export const setLoading = (payload: boolean) => ({
  type: SET_LOADING,
  payload,
});

export const xyz = (payload: boolean): Action => ({
  type: SET_LOADING,
});
