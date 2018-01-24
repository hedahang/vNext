import React, { PureComponent } from "react";
import { I18n, Trans } from "react-i18next";
import { NavLink, Link } from "react-router-dom";

import { getMainMinHeight, getQuery } from "../../../../utils/util";
import Header from "../../../../components/header";
import Footer from "../../../../components/footer";
import LeftMenu from "../../../../components/leftmenu";
import "./index.less";

export default class Root extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			minH: "auto",
			newsTextCur: 1,
			newsImgCur: 1,
			newsVideoCur: 1
		};
	}
	componentWillReceiveProps(nextProps) {}
	componentDidMount() {
		document.title = "InWe-Trading";
		this.getNewsTextList(this.state.newsTextCur);
		this.getNewsImgList(this.state.newsImgCur);
		this.getNewsVideoList(this.state.newsVideoCur);
		let minH = getMainMinHeight();
		this.setState({
			minH: minH,
			activeIndex: 0
		});
		document.querySelector("#mainBox").style.minHeight = minH + "px";
	}
	getNewsTextList(page) {
		this.props
			.getNewsText({
				type: 1,
				per_page: 5,
				page: page
			})
			.then(res => {
				if (res.code === 4000) {
					this.setState({
						newsTextCur: res.data.current_page
					});
				}
			});
	}
	getNewsImgList(page) {
		this.props
			.getNewsImg({
				type: 2,
				per_page: 4,
				page: page
			})
			.then(res => {
				if (res.code === 4000) {
					this.setState({
						newsImgCur: res.data.current_page
					});
				}
			});
	}
	getNewsVideoList(page) {
		this.props
			.getNewsVideo({
				type: 3,
				per_page: 5,
				page: page
			})
			.then(res => {
				if (res.code === 4000) {
					this.setState({
						newsVideoCur: res.data.current_page
					});
				}
			});
	}
	toggleNewsText(val, allPage) {
		if (val == "prev") {
			// 上一页
			if (this.state.newsTextCur > 1) {
				let page = this.state.newsTextCur - 1;
				this.getNewTextList(page);
			}
		} else if (val == "next") {
			if (this.state.newsTextCur < allPage) {
				let page = this.state.newsTextCur + 1;
				this.getNewTextList(page);
			}
		}
	}
	toggleNewsImg(val, allPage) {
		if (val == "prev") {
			// 上一页
			if (this.state.newsImgCur > 1) {
				let page = this.state.newsImgCur - 1;
				this.getNewsImgList(page);
			}
		} else if (val == "next") {
			if (this.state.newsImgCur < allPage) {
				let page = this.state.newsImgCur + 1;
				this.getNewsImgList(page);
			}
		}
	}
	toggleNewsVideo(val, allPage) {
		if (val == "prev") {
			// 上一页
			if (this.state.newsVideoCur > 1) {
				let page = this.state.newsVideoCur - 1;
				this.getNewsVideoList(page);
			}
		} else if (val == "next") {
			if (this.state.newsVideoCur < allPage) {
				let page = this.state.newsVideoCur + 1;
				this.getNewsVideoList(page);
			}
		}
	}
	changeNav(idx) {
		this.setState({
			activeIndex: idx
		});
	}
	render() {
		const { minH, liW, activeIndex } = this.state;
		const {
			lng,
			changeLng,
			sendEmailCode,
			registerUser,
			loginIn,
			userInfo,
			setReduxUserInfo,
			forgetUser,
			newsText,
			newsImg,
			newsVideo
		} = this.props;
		return (
			<I18n>
				{(t, { i18n }) => (
					<div className="container">
						<Header
							userInfo={userInfo}
							registerUser={registerUser}
							sendEmail={sendEmailCode}
							loginIn={loginIn}
							setReduxUserInfo={setReduxUserInfo}
							forgetUser={forgetUser}
							lng={lng}
							nofixed={true}
						/>
						<div id="mainBox" className="news ui">
							<div className="left-menus ui center m-hide">
								<div className="left-menus-news">
									<LeftMenu lng={lng} />
								</div>
							</div>
							<div id="newsBox" className="newsBox ui f1">
								{IsTouchDevice && (
									<div
										className={
											this.navFixed
												? "newsNav ui center fixed"
												: "newsNav ui center "
										}
									>
										{[
											"24H News",
											"图文资讯",
											"视频咨询"
										].map((val, idx) => {
											return (
												<div
													className={
														activeIndex == idx
															? "item active"
															: "item"
													}
													key={idx}
													onClick={this.changeNav.bind(
														this,
														idx
													)}
												>
													{val}
												</div>
											);
										})}
									</div>
								)}
								<div
									className={
										IsTouchDevice
											? activeIndex == 0
												? "newsBoxMod"
												: "newsBoxMod m-hide"
											: "newsBoxMod"
									}
								>
									<div className="newsBoxModTop">
										<p>
											<span className="title">
												24H News
											</span>
											<span className="nums m-hide">
												{newsText.current_page}/{
													newsText.last_page
												}
											</span>
										</p>
									</div>
									<div className="newsBoxModCon ui center">
										<span
											className={
												newsText.current_page > 1
													? "leftArrow m-hide more"
													: "leftArrow m-hide"
											}
											onClick={() => {
												this.toggleNewsText(
													"prev",
													newsText.current_page
												);
											}}
										/>
										<ul className="ui ">
											{newsText &&
												newsText.data &&
												newsText.data.length > 0 &&
												newsText.data.map(
													(item, index) => {
														return (
															<li
																className="m-news-textNews"
																key={index}
															>
																<Link
																	to={{
																		pathname:
																			"/newsdetail",
																		search: `?art_id=${
																			item.id
																		}`
																	}}
																>
																	<p className="desc">
																		{
																			item.title
																		}
																	</p>
																	<div className="newsBoxModConDate">
																		<p className="">
																			{
																				item.updated_at
																			}
																		</p>

																		<img
																			src={
																				item
																					.category
																					.img
																			}
																			alt=""
																		/>
																	</div>
																</Link>
															</li>
														);
													}
												)}
										</ul>
										<span
											className={
												newsText.current_page <
												newsText.last_page
													? "rightArrow more"
													: "rightArrow"
											}
											onClick={() => {
												this.toggleNewsText(
													"next",
													newsText.last_page
												);
											}}
										/>
									</div>
								</div>
								<div
									className={
										IsTouchDevice
											? activeIndex == 1
												? "newsBoxMod ceefax"
												: "newsBoxMod ceefax m-hide"
											: "newsBoxMod ceefax"
									}
								>
									<div className="newsBoxModTop">
										<p>
											<span className="title">
												{t("news.ceefax", lng)}
											</span>
											<span className="nums">
												{newsImg.current_page}/{
													newsImg.last_page
												}
											</span>
										</p>
									</div>
									<div className="newsBoxModCon ui center">
										<span
											className={
												newsImg.current_page > 1
													? "leftArrow more m-hide"
													: "leftArrow m-hide"
											}
											onClick={() => {
												this.toggleNewsImg(
													"prev",
													newsImg.current_page
												);
											}}
										/>
										<ul className="ui imgNewsUl">
											{newsImg &&
												newsImg.data &&
												newsImg.data.length > 0 &&
												newsImg.data.map(
													(item, index) => {
														console.log(item);
														return (
															<li
																className="m-news-imgNews"
																key={index}
															>
																<Link
																	to={{
																		pathname:
																			"/newsdetail",
																		search: `?art_id=${
																			item.id
																		}`
																	}}
																>
																	<p className="desc">
																		{
																			item.title
																		}
																	</p>
																	<div className="newsBoxModConDate">
																		<p>
																			{
																				item.updated_at
																			}
																		</p>
																		<img
																			className="m-hide"
																			src={
																				item
																					.category
																					.img
																			}
																			alt=""
																		/>
																	</div>
																	<div className="newsBoxModConShow">
																		<img
																			src={
																				item.img
																			}
																			alt=""
																		/>
																	</div>
																</Link>
															</li>
														);
													}
												)}
										</ul>
										<span
											className={
												newsImg.current_page <
												newsImg.last_page
													? "rightArrow more"
													: "rightArrow"
											}
											onClick={() => {
												this.toggleNewsImg(
													"next",
													newsImg.last_page
												);
											}}
										/>
									</div>
								</div>
								<div
									className={
										IsTouchDevice
											? activeIndex == 2
												? "newsBoxMod ceefax"
												: "newsBoxMod ceefax m-hide"
											: "newsBoxMod ceefax"
									}
								>
									<div className="newsBoxModTop">
										<p>
											<span className="title">
												{t("news.videoTitle", lng)}
											</span>
											<span className="nums">
												{newsVideo.current_page}/{
													newsVideo.last_page
												}
											</span>
										</p>
									</div>
									<div className="newsBoxModCon ui center ">
										<span
											className={
												newsVideo.current_page > 1
													? "leftArrow more m-hide"
													: "leftArrow m-hide"
											}
											onClick={() => {
												this.toggleNewsVideo(
													"prev",
													newsVideo.current_page
												);
											}}
										/>
										<ul className="ui ">
											{newsVideo &&
												newsVideo.data &&
												newsVideo.data.length > 0 &&
												newsVideo.data.map(
													(item, index) => {
														return (
															<li
																className="m-news-videoNews"
																key={index}
															>
																<Link
																	to={{
																		pathname:
																			"/newsdetail",
																		search: `?art_id=${
																			item.id
																		}`
																	}}
																>
																	<p className="desc m-hide">
																		{
																			item.title
																		}
																	</p>
																	<div className="newsBoxModConDate m-hide">
																		<p>
																			{
																				item.updated_at
																			}
																		</p>
																		<img
																			src={
																				item
																					.category
																					.img
																			}
																			alt=""
																		/>
																	</div>
																	<div className="newsBoxModConShow">
																		<img
																			src={
																				item.img
																			}
																			alt=""
																		/>
																	</div>
																	{IsTouchDevice && (
																		<div className="modDateText">
																			{
																				item.updated_at
																			}
																		</div>
																	)}
																</Link>
															</li>
														);
													}
												)}
										</ul>
										<span
											className={
												newsVideo.current_page <
												newsVideo.last_page
													? "rightArrow more"
													: "rightArrow"
											}
											onClick={() => {
												this.toggleNewsVideo(
													"next",
													newsVideo.last_page
												);
											}}
										/>
									</div>
								</div>
							</div>
						</div>
						<Footer changeLng={changeLng} lng={lng} />
					</div>
				)}
			</I18n>
		);
	}
}
