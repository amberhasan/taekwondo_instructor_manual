import {Action, ActionType} from '../types';

export const setTaegeukData = (payload: any): Action => ({
  type: ActionType.SET_TAEGEUK_DATA,
  payload,
});

export const setPalgwaeData = (payload: any) => ({
  type: ActionType.SET_PALGWAE_DATA,
  payload,
});

export const setLoading = (payload: boolean) => ({
  type: ActionType.SET_LOADING,
  payload,
});
