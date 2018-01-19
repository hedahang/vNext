import { handleActions } from "redux-actions";
import {
	LNG,
	EMAILCODE,
	USERINFO,
	NICKNAME,
	USERHEADER
} from "./globalactions";
export const lng = handleActions(
	{
		[LNG]: (state, { payload }) => {
			return payload;
		}
	},
	"zh"
);
export const userInfo = handleActions(
	{
		[USERINFO]: (state, { payload }) => payload,
		[NICKNAME]: (state, { payload }) => ({
			...state,
			name: payload
		}),
		[USERHEADER]: (state, { payload }) => ({
			...state,
			img: payload
		})
	},
	null
);
export const emailCode = handleActions(
	{
		[EMAILCODE]: (state, { payload }) => payload
	},
	null
);
