import React, { PureComponent } from "react";
import { I18n, Trans } from "react-i18next";
import { getMainMinHeight } from "../../../../utils/util";
import Header from "../../../../components/header";
import Footer from "../../../../components/footer";
import LeftMenu from "../../../../components/leftmenu";
import Calendar from "../../../../components/calendar";
import "./index.less";
class Root extends PureComponent {
	componentDidMount() {
		document.title = "InWe-CandyBowl";
		let minH = getMainMinHeight();
		document.querySelector("#mainBox").style.minHeight = minH + "px";
		window.onresize = () => {
			let minH = getMainMinHeight();
			document.querySelector("#mainBox").style.minHeight = minH + "px";
		};
	}
	dayClick(res) {
		console.log(res);
	}
	render() {
		const { lng, changeLng } = this.props;
		return (
			<I18n>
				{(t, { I18n }) => (
					<div>
						<Header lng={lng} />
						<div className="main-box ui container" id="mainBox">
							<div className="candy-left">
								<LeftMenu lng={lng} />
							</div>
							<div className="ui f1">
								<div className="candy-calendar f1">
									<Calendar
										dayClick={this.dayClick.bind(this)}
									/>
									<div className="must-read">
										<span>必读：是大神大所</span>
									</div>
								</div>
								<div className="f1 ">
									<div className="data-box">
										<div className="calendar-data-title ui center">
											<i className="icon-cadenlar" />
											<span className="calendar-text f1">
												Today
											</span>
											<div className="switch open">
												<span className="switch-item" />
											</div>
										</div>
										<div className="data-group">
											<div className="data-item">
												<div className="title">222</div>
												<div className="content">
													2323
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
						<Footer lng={lng} changeLng={changeLng} />
					</div>
				)}
			</I18n>
		);
	}
}
export default Root;
