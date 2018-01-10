import React, { PureComponent } from "react";
import { getMainMinHeight } from "../../../../utils/util";
import Header from "../../../../components/header";
import Footer from "../../../../components/footer";
import "./index.less";

export default class Root extends PureComponent {
	componentDidMount() {
		document.title = "InWe-Trading";
		this.props.getProject();
		let minH = getMainMinHeight();
		let liW = (this.refs.projectContentRef.clientWidth - 187) / 2;
		this.setState({
			minH: minH,
			liW: liW
		});
		this.refs.mainBox.style.height = minH + "px";
		this.refs.projectUlRef.style.width = liW * 4 + "px";
	}
	listMove() {
		let showArrow = this.state.showArrow;
		if (showArrow == "right") {
			let marLeft = 2 * this.state.liW;
			this.refs.projectUlRef.style.marginLeft = -marLeft + "px";
		} else if (showArrow == "left") {
			this.refs.projectUlRef.style.marginLeft = 0 + "px";
		}
		this.setState({
			showArrow: showArrow == "left" ? "right" : "left"
		});
	}
	constructor(props) {
		super(props);
		this.state = {
			minH: "auto",
			showArrow: "right",
			liW: "auto"
		};
	}
	render() {
		const { minH, showArrow, liW } = this.state;
		return (
			<div className="container">
				<Header />
				<div ref="mainBox" className="project ui">
					<div style={{ width: 582, backgroundColor: "#C9C6C6" }} />
					<div
						ref="projectContentRef"
						className="projectContent ui f1"
					>
						<ul ref="projectUlRef" className="ui">
							{[1, 2, 3, 4, 5, 6, 7, 8].map((item, index) => {
								return (
									<li
										style={{
											height: minH / 2 + "px",
											width: liW
										}}
										key={index}
									>
										<div className="projectLiTop ui center">
											<div className="projectLiTopLeft ui center">
												<img src="" />
												<p>
													<span>NEO</span>
													<b>(neo)</b>
												</p>
											</div>
											<div
												className={
													index == 4
														? "projectLiTopRight collect"
														: "projectLiTopRight nocollect"
												}
											/>
										</div>
										<div className="projectLiType">
											<span className="ellitext">
												Blockchain
											</span>
										</div>
										<div className="projectLiDesc">
											<p className="ellitext">
												高盛将构建加密货币交易平台
											</p>
										</div>
										<div className="projectLiImg">
											<img src="" alt="" />
										</div>
										<div className="projectLiDate">
											2017-11-16 11:35:33
										</div>
									</li>
								);
							})}
						</ul>
						<div className="viewAllProject ui center">
							<span>view all the project</span>
						</div>
						{showArrow == "left" && (
							<span
								className="projectSpanLeft"
								onClick={() => {
									this.listMove();
								}}
							/>
						)}
						{showArrow == "right" && (
							<span
								className="projectSpanRight"
								onClick={() => {
									this.listMove();
								}}
							/>
						)}
					</div>
				</div>
				<Footer />
			</div>
		);
	}
}