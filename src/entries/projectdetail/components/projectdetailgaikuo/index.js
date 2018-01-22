import React, { PureComponent } from "react";
import { I18n, Trans } from "react-i18next";
import { Link } from "react-router-dom";
import GaiKuo from "../../../../components/gaikuo";
import "./index.less";
class ProjectDetailGaiKuo extends PureComponent {
	render() {
		const { lng, changeLng, projectDetail, coinTimePrice } = this.props;
		return (
			<I18n>
				{(t, { I18n }) => (
					<div className="projectDetailGaiKuo ui">
						<div className="projectDetailCon1">
							<div className="projectDetailConTop ui">
								<div className="projectDetailConTopLeft">
									<div className="projectDetailCenter1">
										<div className="projectDetailImg">
											<img src={projectDetail.img} />
										</div>
										<span>{projectDetail.name}</span>
										<p>{projectDetail.industry}</p>
									</div>
								</div>
								<div className="projectDetailConTopRight">
									<GaiKuo changeLng={changeLng} lng={lng} />
								</div>
							</div>
							<div className="projectDetailCon1Box">
								<div
									className={
										coinTimePrice.percent_change_24h < 0
											? "gaiKuoMoney downs"
											: "gaiKuoMoney"
									}
								>
									<span>$ {coinTimePrice.price_usd}</span>
									<i>({coinTimePrice.percent_change_24h}%)</i>
									<b />
								</div>
								<p className="volume">
									Volume (24h)：${
										coinTimePrice["24h_volume_usd"]
									}{" "}
									USD
								</p>

								<table>
									<thead>
										<tr>
											<th>市值排名</th>
											<th>市值</th>
											<th>流通量</th>
											<th>总量</th>
											<th>ICO Price</th>
										</tr>
									</thead>
									<tbody>
										<tr>
											<td>{coinTimePrice.rank}</td>
											<td>
												${coinTimePrice.market_cap_usd}
											</td>
											<td>
												{coinTimePrice.available_supply}
											</td>
											<td>
												{coinTimePrice.total_supply}
											</td>
											<td>${coinTimePrice.price_usd}</td>
										</tr>
									</tbody>
								</table>
								<div className="gaiKuoChart">111</div>
							</div>
						</div>
						<div className="projectDetailCon2">
							<div className="projectDetailCon2Box">
								<div className="projectDetailCon2Title">
									Rank
								</div>
								<p>
									+关注热度：第{projectDetail.category_score &&
										projectDetail.category_score.sort}名
								</p>
								<p>
									+用户评分：{projectDetail.category_score &&
										projectDetail.category_score.value}
								</p>
							</div>
							<div className="projectDetailCon2Box">
								<div className="projectDetailCon2Title">
									Explore
								</div>
								{projectDetail &&
									projectDetail.category_explorer &&
									projectDetail.category_explorer.length >
										0 &&
									projectDetail.category_explorer.map(
										(item, index) => {
											return;
											<Link
												to={{
													pathname: item.url
												}}
											>
												<p>+{item.name}</p>
											</Link>;
										}
									)}
							</div>
							<div className="projectDetailCon2Box">
								<div className="projectDetailCon2Title">
									Wallet
								</div>
								{projectDetail &&
									projectDetail.category_wallet &&
									projectDetail.category_wallet.length > 0 &&
									projectDetail.category_wallet.map(
										(item, index) => {
											return;
											<Link
												to={{
													pathname: item.url
												}}
											>
												<p>+{item.name}</p>
											</Link>;
										}
									)}
							</div>
							<div className="projectDetailCon2Box">
								<div className="projectDetailCon2Title">
									Token Holders
								</div>
								<p className="viewMore">view more</p>
							</div>
							<div className="projectDetailCon2Box">
								<div className="projectDetailCon2Title">
									Social
								</div>
								<ul className="shareList ui center">
									{projectDetail &&
										projectDetail.category_media &&
										projectDetail.category_media.length >
											0 &&
										projectDetail.category_media.map(
											(item, index) => {
												return;
												<li>
													<Link
														to={{
															pathname: item.url
														}}
													>
														<img
															src={item.img}
															alt=""
														/>
													</Link>
												</li>;
											}
										)}
									{/* <li className="tele" />
									<li className="wx" />
									<li className="mail" /> */}
								</ul>
							</div>
						</div>
					</div>
				)}
			</I18n>
		);
	}
}
export default ProjectDetailGaiKuo;
