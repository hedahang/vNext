import { createAction } from "redux-actions";
import http from "./utils/ajax";
import { setLocalItem, getLocalItem } from "./utils/util";
export const LNG = "LNG";
export const USERINFO = "USERINFO";
export const EMAILCODE = "EMAILCODE";
export const changeLng = createAction(LNG, lng => {
	return lng;
});
export const sendEmailCode = createAction(EMAILCODE, email => {
	return http
		.post({
			url: `send_code/${email}`
		})
		.then(res => {
			if (res.code === 4000) {
				Msg.prompt(
					i18n.t("success.emailSend", getLocalItem("language").data)
				);
			} else {
				Msg.prompt(res.msg);
			}
			return res;
		});
});
export const registerUser = createAction(USERINFO, params => {
	return http
		.post({
			url: "register",
			params: params
		})
		.then(res => {
			console.log(res);
			if (res.code === 4000) {
				setLocalItem("userInfo", JSON.stringify(res.data));
			}
			return res;
		});
});
export const loginIn = createAction(USERINFO, params => {
	return http
		.post({
			url: "login",
			params: params
		})
		.then(res => {
			if (res.code === 4000) {
				setLocalItem("userInfo", JSON.stringify(res.data));
			}
			return res;
		});
});
export const setReduxUserInfo = createAction(USERINFO, data => {
	return data;
});
export const forgetUser = createAction(USERINFO, params => {
	return http
		.post({
			url: "forgot_password",
			params: params
		})
		.then(res => {
			return {
				code: res.code,
				data: null
			};
		});
});
export const resetPassword = createAction(USERINFO, params => {
	return http
		.put({
			url: "user/reset_password",
			params: params
		})
		.then(res => {
			if (res.code === 4000) {
				Msg.prompt(
					i18n.t("success.resetPass", getLocalItem("language").data)
				);
			} else {
				Msg.prompt(res.msg);
			}
			return res;
		});
});
export const resetNickName = createAction(USERINFO, params => {
	return http.put({
		url: ""
	});
});
