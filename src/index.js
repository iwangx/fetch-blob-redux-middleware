import { isFSA } from 'flux-standard-action';
import isPromise from 'is-promise';

export default function reduxFetchBlobMiddleware({ dispatch, getState }) {

    return  next => action => {

        if (!isFSA(action)) {
            return isPromise(action) ? action.then(dispatch) : typeof action=== "function"?action(dispatch, getState):next(action);
        }

        if(isPromise(action.payload)){
            action.payload
                .then(result => {
                    dispatch({ ...action, payload: result });
                })
                .catch(error => {
                    dispatch({ ...action, payload: error, error: true });
                    return Promise.reject(error);
                });
            return action.payload;
        }else{
            if (typeof action === 'function') {
                return action(dispatch, getState);
            }
            return next(action);
        }
    };
}