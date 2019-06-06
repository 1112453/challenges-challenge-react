import axios from 'axios';
import { store } from './../../../store/createStore';
import * as actionCreators from './ApiActions';

// var     vStore  = store.getState();
// const   baseUrl = vStore.main.hrefObject.baseURL;
const baseUrl = 'http://localhost:3001';
axios.interceptors.request.use(function (config){
    store.dispatch(actionCreators.update({
        loading: config && config.headers && config.headers.block ? Boolean(config.headers.block) : true,	
        waiting: true, 
    }));	
    return config;
}, function(e){
    store.dispatch(actionCreators.update({
        loading: false,	
        waiting: false, 
    }));	

    if (e.response && e.response.json) {
        e.response.json().then((json) => {
            if (json) throw json;
                throw e;
            });
    } else {
        throw e;
    }
});

axios.interceptors.response.use(function (response) {
	store.dispatch(actionCreators.update({
        loading: false,
        waiting: false,
    })); 	

	return response;
}, function (e) {
	store.dispatch(actionCreators.update({
        loading: false,	
        waiting: false, 
	}));
});

export const get = (endPoint, payload = {}, headers = {}, responseType = 'json') => {
	return axios({
		method: 'get',
		url: endPoint,
		params: payload,
		headers : headers,
        responseType: responseType,
        baseURL: baseUrl,
	})
	.then(function(response) {		
		return Promise.resolve(response.data);
	})
	.catch((e) => {		
		// Did with interceptors
	});
};

export const post = (endPoint, payload = {}, headers = {}) => {

	return axios({
		method: 'post',
		url: endPoint,		
		data: payload,
        headers : headers,
        baseURL: baseUrl,
	})
	.then(function(response) {
		return Promise.resolve(response.data);
	})
	.catch((e) => {		
		// Did with interceptors
	});
};
