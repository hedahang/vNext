import React, { PureComponent } from "react";
import closeImg from "../../assets/images/close_white.png";
import logoApp from "../../assets/images/logoapp.png";

import {
	isAndroidOrIos,
	getDownloadSit,
	openInstallApp
} from "../../utils/util.js";

import "./index.less";

class TurnApp extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			advHide: false
		};
	}
	componentDidMount() {
		window.CtrunappAdvHide = this;
	}
	componentWillMount() {
		let downloadHide = this.getCookie("downloadHide");
		if (downloadHide) {
			this.setState({
				advHide: true
			});
		}
	}
	setCookie(cname, cvalue, exdays) {
		var d = new Date();
		d.setTime(d.getTime() + exdays * 60 * 60 * 1000);
		var expires = "expires=" + d.toGMTString();
		document.cookie = cname + "=" + cvalue + "; " + expires;
	}
	getCookie(cname) {
		var name = cname + "=";
		var ca = document.cookie.split(";");
		for (var i = 0; i < ca.length; i++) {
			var c = ca[i].trim();
			if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
		}
		return "";
	}
	closePop(e) {
		this.setState({
			advHide: true
		});
		this.setCookie("downloadHide", true, 1);
	}

	downloadApp() {
		if (isAndroidOrIos() == "android") {
			openInstallApp();
			//window.location.href = getDownloadSit();
		} else if (isAndroidOrIos() == "ios") {
		}
	}
	render() {
		const { advHide } = this.state;
		if (!IsTouchDevice || advHide) {
			return null;
		}
		return (
			<div className="turnapp-box">
				<div className="turnapp-logo">
					<img src={logoApp} alt="" />
				</div>
				<div className="turnapp-text">
					<span className="text1">InWeCrpyto</span>
					<span className="text2">in crypto we trust</span>
				</div>
				<div
					className={
						isAndroidOrIos() == "android"
							? "turnapp-btn light"
							: "turnapp-btn"
					}
					onClick={this.downloadApp.bind(this)}
				>
					Download
				</div>
				<div />
				<div
					className="turnapp-close"
					onClick={this.closePop.bind(this)}
				>
					<img src={closeImg} alt="" />
				</div>
			</div>
		);
	}
}
export default TurnApp;
