import Axios, {
	type AxiosRequestConfig,
	type InternalAxiosRequestConfig,
} from "axios";

export const axios = Axios.create({
	baseURL: "http://localhost:3000/api", // TODO: change to env
});

export const customInstance = <T>(config: AxiosRequestConfig): Promise<T> => {
	const source = Axios.CancelToken.source();
	const promise = axios({
		...config,
		cancelToken: source.token,
	}).then(({ data }) => data);

	// @ts-ignore
	promise.cancel = () => source.cancel();
	return promise;
};
