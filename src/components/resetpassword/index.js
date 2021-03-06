import React, { PureComponent } from "react";
import { I18n, Trans } from "react-i18next";
import "./index.less";

class ResetPassword extends PureComponent {
	constructor() {
		super();
		this.state = {
			passwordOld: "",

			password1: "",

			password2: "",
			seePass: false,
			isShowError: false,
			btnType: 1
		};
	}
	inpputChange(type, e) {
		let set = {};
		//const { passwordOld, password1, password2 } = this.state;

		set[type] = e.target.value;
		this.setState({
			...set
		});
	}
	changePassShow() {
		let s = !this.state.seePass;
		this.setState({
			seePass: s
		});
	}
	componentWillMount() {
		this.setState({ btnType: 1 });
	}
	componentWillUpdate(nextProps, nextState) {
		if (
			nextState.passwordOld != this.state.passwordOld ||
			nextState.password1 != this.state.password1 ||
			nextState.password2 != this.state.password2
		) {
			if (
				nextState.passwordOld.length >= 6 &&
				nextState.password1.length >= 6 &&
				nextState.password2.length >= 6
			) {
				this.setState({
					btnType: 2
				});
			} else {
				this.setState({
					btnType: 1
				});
			}
		}
	}
	resetPass() {
		if (
			this.state.passwordOld.length <= 0 ||
			this.state.password1.length <= 0 ||
			this.state.password2.length <= 0
		) {
			Msg.prompt(i18n.t("error.emailEmpty", this.props.lng));
			return;
		}
		if (this.state.password1 != this.state.password2) {
			Msg.prompt(i18n.t("error.passLength", this.props.lng));
			return;
		}
		this.setState({
			btnType: 3
		});
		this.props
			.resetPass({
				password_old: this.state.passwordOld,
				password: this.state.password1,
				password_confirmation: this.state.password2
			})
			.then(res => {
				if (res.code === 4000) {
					this.props.close();
					localStorage.removeItem("userInfo");
					window.location.href = "/";
				} else {
					this.setState({
						btnType: 2
					});
				}
			});
	}
	render() {
		const { lng } = this.props;
		const { passwordOld, seePass, isShowError, btnType } = this.state;
		return (
			<I18n>
				{(t, { I18n }) => (
					<div className="resetp-box">
						<div className="resetp-bg" />
						<div className="resetp-cont">
							<div className="resetp-container">
								<i
									onClick={this.props.close}
									className="icon-close"
								/>
								<div className="resetp-title">
									{t("resetPassword.title", lng)}
								</div>
								<div className="resetp-group">
									<div className="resetp-item center ui">
										<div className="key">
											{t("resetPassword.t", lng)}:
										</div>
										<div className="value ui center f1">
											<div className="f1">
												<input
													type={(() =>
														seePass
															? "text"
															: "password")()}
													onChange={e => {
														this.inpputChange(
															"passwordOld",
															e
														);
													}}
												/>
											</div>
											<i
												className={(() =>
													seePass
														? "icon-see show-text"
														: "icon-see")()}
												onClick={() => {
													this.changePassShow();
												}}
											/>
										</div>
									</div>
									<div className="resetp-item center ui">
										<div className="key">
											{t("resetPassword.t1", lng)}:
										</div>
										<div className="value ui center f1">
											<div className="f1">
												<input
													type={(() =>
														seePass
															? "text"
															: "password")()}
													onChange={e => {
														this.inpputChange(
															"password1",
															e
														);
													}}
												/>
											</div>
											{/* <i
												className={(() =>
													isShowPass1
														? "icon-see show-text"
														: "icon-see")()}
												onClick={() => {
													this.changePassShow(
														"isShowPass1"
													);
												}}
											/> */}
										</div>
									</div>
									<div className="resetp-item center ui">
										<div className="key">
											{t("resetPassword.t2", lng)}:
										</div>
										<div className="value ui center f1">
											<div className="f1">
												<input
													type={(() =>
														seePass
															? "text"
															: "password")()}
													onChange={e => {
														this.inpputChange(
															"password2",
															e
														);
													}}
												/>
											</div>
											{/* <i
												onClick={() => {
													this.changePassShow(
														"isShowPass2"
													);
												}}
												className={(() =>
													isShowPass2
														? "icon-see show-text"
														: "icon-see")()}
											/> */}
										</div>
									</div>
								</div>
								<div className="resetp-btn">
									<div>
										{btnType === 1 && (
											<span className="btn disable">
												{t("resetPassword.btn", lng)}
											</span>
										)}
										{btnType === 2 && (
											<span
												onClick={this.resetPass.bind(
													this
												)}
												className="btn"
											>
												{t("resetPassword.btn", lng)}
											</span>
										)}
										{btnType === 3 && (
											<span className="btn">
												{t("resetPassword.btn", lng)}...
											</span>
										)}
									</div>
								</div>
							</div>
						</div>
					</div>
				)}
			</I18n>
		);
	}
}
export default ResetPassword;
