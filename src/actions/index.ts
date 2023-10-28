export const SET_TAEGEUK_DATA = 'SET_TAEGEUK_DATA';
export const SET_PALGWAE_DATA = 'SET_PALGWAE_DATA';
export const SET_LOADING = 'SET_LOADING';

export const setTaegeukData = payload => ({
  type: SET_TAEGEUK_DATA,
  payload,
});

export const setPalgwaeData = payload => ({
  type: SET_PALGWAE_DATA,
  payload,
});

export const setLoading = (payload: boolean) => ({
  type: SET_LOADING,
  payload,
});
