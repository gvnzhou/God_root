/* zc_person_index相关模版*/

function search_content_tlp(){//商品名搜索布局模板
        /*
            <div class="shadow4 w300 bg_1 c_25 b_3 b_w1 b_s fs14 shadow4">
                <div class="p5">
                    <input opt="search_input" type="text" onfocus="javascript:this.placeholder=''" onblur="javascript:(this.placeholder='搜索...')" class="b_0 bb_1 b_s b_15 ml4 ma0 inputBorder lh18 bg_1 h20 p2 r2 w94p fs14" style="text-indent: 1.4em;" placeholder="搜索..."/>
                </div>
                <div class="p5">
                    <ul opt="search_ul" class="cp mt8 ml2 fs14 fw100 f_df f_jcsb">
                        <li opt="0" class="bc_51 c_0 tac r2 pt3l8 mt-5">全部</li>
                        <li opt="1" class="c_26 pt3l8 mt-5 dn">自选</li>
                        <li opt="2" class="c_26 pt3l8 mt-5">迈鸿现货</li>
                        <li opt="3" class="c_26 pt3l8 mt-5">外汇</li>
                        <li opt="4" class="c_26 pt3l8 mt-5">股指</li>
                        <li opt="5" class="c_26 pt3l8 mt-5">国际商品</li>
                    </ul>
                </div>  
                <div opt="symbol_list" style="height:220px;" class="scrollbar fs14 fw100 mr5 oxh oya searchTab"></div>      
            </div>
        */
    }
function search_list_tlp(){//商品名搜索框列表
        /*
             <table class="wp fs10">
                <colgroup>
                    <col width="100px"/>
                    <col width="120px"/>
                </colgroup>
                {{# for(var i=0;i<d.length;i++){ }}
                    <tr>
                        <td style="padding-left:15px;">{{d[i].name}}</td>
                        <td>{{d[i].name_en}}</td>
                        <td class="c_16 {{d[i].isDn}}">{{d[i].type}}</td>
                    </tr>
                {{# } }}
            </table>
        */
    }

function menu_1_part(){
/*
	<div class="bc_19">
		<a t="mItem" itemId="{0}" class="c_12 hp db h18 p10 bb_15" href="javascript:void(0)">
	        <div class="fl ">{1}</div>
	        <div class="fr mr10"><img style="width:22px" src="imgs/{2}.png" alt="" /></div>
	    </a>
	</div>
 */
}
function menu_list(){
	/*
		<a t="mItem" itemCode="{0}" class="c_12 hp db h18 p10 bb_15 bc_19" href="javascript:void(0)">
			<div class="fl">{1}</div>
			<div class="fr mr10"><img style="width:14px" src="imgs/{2}.png" alt="" /></div>
		</a>
 */

}
function home_part(){
/*
	{{# for(var i=0;i<d.items.length;i++){ }}
		<li mname="{{d.items[i].name}}" mid="{{d.items[i].id}}" class="head_bottom_e pb8 r15 w95p ma0 bc_15">
			<div class="mw25 wp fl pr5 tac cf">
		    	<img id="img{{=d.items[i].id}}" src="imgs/Picture-4@2x.jpg" class="img1 r5" style="width:75px;box-shadow: 1px 0 1px rgba(45, 40, 40, 0.71);">
			</div>
			<div class="con_right fl cf">
				<p>
					<span class="c_11 fs15 ui-nowrap ui-whitespace dom-content">{{d.items[i].name}}</span>
				 
					<span class="fs13 r3 p2 mw40 dib tar wp"><i class="dib pr " style="top:5px"><img src="imgs/icon-location-b.png" class="" style="width:16px"></i>300m</span>
				 
				</p>		
				<p>
					<span class="c_23 fs14">{{=d.items[i].remain||'0'}}&nbsp;空桌</span>
					<span>|</span>
					<span class="c_29 fs14">19人在查看中...</span>
					{{# if(d.items[i].dietary>0){ }}
					<span class="pa p2 par25 fs14">闪订:10</span>
					{{# } }}
				</p>		
			</div>
			<div class="cf"></div>
			<div class="wp pt10">
			        <span class="c_24 fs14 dib mw60 wp pl20 "><i><img src="imgs/icon-favorable-2.png" class="" style="width:16px"></i>可使用团购</span>
				    <span class="pa par25 fs14 c_13">送:<i class="c_23">20</i></span>
			</div>
			
		</li>
	{{# } }}
*/
}
function my_order_part(){
/*
  {{# for(var i=0;i<d.items.length;i++){ }}
	<li class="p10 head_bottom_e" "  order_id="{{=d.items[i].id}}">
			<div class="mw25 wp fl pr3"><img id="img{{=d.items[i].id}}" src="imgs/Picture-4@2x.jpg" class="img1" style="width:100px;box-shadow: 1px 0 1px rgba(45, 40, 40, 0.71);"></div>
			<div class="con_right fl">
				<p>
					<span class="fs14"><i class="ui-nowrap ui-whitespace dom-content" style="width:120px;">{{=d.items[i].mert.name}}:</i>&nbsp;{{=d.items[i].amount}}元抵食券</span> 
				</p>		
				<p class="c_13">
					<span class=" fs13"> 1张</span>
					<span class=" fs13">总价:</span>
					<span class=" fs13 ">￥{{=d.items[i].amount}}</span>
				</p>		
				<p>
					{{# var status = {"NON_PAY":"未支付","PAY_SUCCESS":"已支付","REFUND_SUCCESS":"退款成功","PLATFORM_DEAL":"扫位平台处理中","THIRD_DEAL":"支付平台处理中","REFUND_FAIL":"退款失败 ","undefined":"停用状态"}[d.items[i].payStatus+""];if(d.items[i].payStatus==="PAY_SUCCESS"&&d.items[i].status==="NON_VERIFY") status="未消费";	if(d.items[i].payStatus==="PAY_SUCCESS"&&d.items[i].status==="VERIFY_SUCCESS") status="已消费";}}
					<span class="fs12 c_23">{{=status}}</span>
					{{# if(d.items[i].payStatus==="NON_PAY"){ }}
				    <span id="my_order_payBtn" class="pa par8 fs12 c_19 bc_26 pbt5 r2 mt-10 mr20">付款</span>
				    {{# } }}
				    {{# if(d.items[i].payStatus==="PAY_SUCCESS"&&d.items[i].status==="NON_VERIFY"){ }}
				    <span id="my_order_code" class="pa par8 fs16 c_23 pbt5 r2 mt-10 mr20">{{d.items[i].verifyCode}}</span>
				    {{# } }}
				</p>
			</div>
			<div class="cf"></div>
		</li>
	{{# } }}
*/
}
function my_red_part(){
/*
	{{# for(var i=0;i<d.items.length;i++){ }}
		<li class="w95p bc_25 ma0 c_19 mt15 rtl rtr rbl rbr" redId="{{=d.items[i].id}}">
				<p class="m0 p10 pl15 ">
					<span><img style="width:40px;vertical-align: middle;margin-top:-3px" src="imgs/red.png" alt="" /></span>
					<span style="margin-top: -10px;">￥<i class="fs30">{{=d.items[i].amount}}</i></span>
				</p>
				<p class="m0 p0 bc_19 tar c_13 p10 rbl rbr">
				{{# var _t=+(d.items[i].endTime||new Date()),_d=new Date(_t).date2Str().split(" ")[0]}}
					有效期至 {{=_d}}
				</p>
			</li>
	{{# } }}
*/
}
function order_detail_part(){
/*
		<ul style="background:none;">
			<li class="mt10 cf">
				<div id="od_stamps" class="list1 cf p10 pb3 head_bottom bc_19" >
					<div class="fl mw25"><img src="{{=d.mert.photoStr||'imgs/Picture-4@2x.jpg'}}" class="img1"></div>
					<div class="fl pt0l10">
							<div class="p0 fs13 wsn oh w180">{{=d.mert.name}}</div>
							<p class="m0 pt5 fs14 c_13">{{=d.voucher}}元抵食券</p>
							<p class="m0 pt5 fs14 c_13">1张</p>
							<p class="m0 pt5 fs14 c_13">金额:&nbsp;￥{{=d.voucher}}元</p>
					</div>
					 <div class="fr ptb30"><img style="width:8px" src="imgs/icon8.png" alt="" /></div>
	        	</div>
	        	
	        	<div class="head_bottom bc_19 lh25">
					<a class="c_12 wp hp db h25 p10">
						<div class="fl c_13 fs15">订单编号</div>
						<div class="fr mr20 fs14">{{d.id}}</div>
					</a>
				</div>
				
				<div class="head_bottom bc_19 lh25">
					<a class="c_12 wp hp db h25 p10">
						<div class="fl c_13 fs15">下单时间</div>
						{{# var cTime = new Date(d.createTime||d.updateTime).date2Str()}}
						<div class="fr mr20 fs14">{{=cTime}}</div>
					</a>
				</div>
				{{#if(d.payStatus==="PAY_SUCCESS"&&d.status==="NON_VERIFY"){ }}
				<div class="w95p ma0 mt10">
					<label class="c_13 fs15">抵食券</label>
					<div class="bc_19 wp mt5 r3">
						<p class="m0 wp cf p10 tac">
							<span class="fl c_13">购买单号</span>
							<span class="fr pr25 c_13">有效期</span>
						</p>
						<p class="m0 wp cf p10 pt5 tac">
							<span class="fl c_23 fs16">{{=d.verifyCode}}</span>
							{{# var eTime = d.endTime?new Date(d.endTime).date2Str():""}}
							<span class="fr pr25 fs14 c_13">{{=eTime}}</span>
						</p>
					</div>
				</div>
				{{# } }}
				
				{{#if(d.payStatus==="PLATFORM_DEAL"||d.payStatus==="THIRD_DEAL"){ }}
				<div class="w95p ma0 mt10">
					<label class="c_13 fs15">抵食券</label>
					<div class="bc_19 wp mt5 r3">
						<p class="m0 wp cf p10 tac">
							<span class="fl c_13">购买单号</span>
							<span class="fr pr25 c_27">退款中</span>
						</p>
						<p class="m0 wp cf p10 pt5 tac">
							<span class="fl c_13 fs16 tdl">{{=d.verifyCode}}</span>
							<span class="fr pr25 fs14 c_23">￥{{=d.realMoney}}</span>
						</p>
					</div>
				</div>
				{{# } }}
				{{#if(d.payStatus==="REFUND_SUCCESS"){ }}
				<div class="w95p ma0 mt10">
					<label class="c_13 fs15">抵食券</label>
					<div class="bc_19 wp mt5 r3">
						<p class="m0 wp cf p10 tac">
							<span class="fl c_13">购买单号</span>
							<span class="fr pr25 c_13">已退款</span>
						</p>
						<p class="m0 wp cf p10 pt5 tac">
							<span class="fl c_13 fs16 tdl">{{=d.verifyCode}}</span>
							<span class="fr pr25 fs14 c_23">￥{{=d.realMoney}}</span>
						</p>
					</div>
				</div>
				{{# } }}
				{{#if(d.payStatus==="PAY_SUCCESS"&&d.status==="VERIFY_SUCCESS"){ }}
				<div class="w95p ma0 mt10">
					<label class="c_13 fs15">抵食券</label>
					<div class="bc_19 wp mt5 r3">
						<p class="m0 wp cf p10 tac">
							<span class="fl c_13">购买单号</span>
							<span class="fr pr25 c_13">已使用</span>
						</p>
						<p class="m0 wp cf p10 pt5 tac">
							<span class="fl c_13 fs16 tdl">{{=d.verifyCode}}</span>
						</p>
					</div>
				</div>
				{{# } }}
			</li>
		</ul>

*/
}
 
function sysMsgTemp(){
	/*
		<div class="ma0 w800 h600 bc_10 fs14 mt5">
		<!--左侧-->
		<div class="fl w200 hp b_0 br_1 b_s b_15 " id = "index_sysMsg_nav">
			<div class="h50 cf wp b_0 bb_1 b_s b_16 bc_31 cp">
				<div class="fl mt13 ml5">
					<img src="./imgs/tactful/systemNotice.png" alt="" class="w25 h25 db" />
				</div>
				<div class="fl mt8 ml10">
					<div>系统公告</div>
					{{# if(d.system_msg.length<=0){ }}

					{{# }else{ }}
						<div class="c_18 fs8 mt10">您有<span id="index_sysNotice_sysUnread">{{d.system_msg.length}}</span>条新公告未读</div>
					{{# } }}
				</div>
			</div>
			<div class="h50 cf wp cp">
				<div class="fl mt13 ml5">
					<img src="./imgs/tactful/SocialNews.png" alt=""  class="w25 h25 db"/>
				</div>
				<div class="fl mt8 ml10">
					<div>社交消息</div>
					{{# if(d.private_msg.length<=0){ }}

					{{# }else{ }}
						<div class="c_18 fs8 mt10">您有<span id="index_sysNotice_sysUnread">{{d.private_msg.length}}</span>条消息未读</div>
					{{# } }}
				</div>
			</div>
			<div class="h50 cf wp b_0 bt_1 bb_1 b_s b_16 cp">
				<div class="fl mt13 ml5">
					<img src="./imgs/tactful/tactfulCom.png" alt=""  class="w25 h25 db"/>
				</div>
				<div class="fl mt8 ml10">
					<div>策略评论</div>
					{{# if(d.policy_comment.length<=0){ }}

					{{# }else{ }}
						<div class="c_18 fs8 mt10">您有<span id="index_sysNotice_sysUnread">{{d.policy_comment.length}}</span>条策略评论未读</div>
					{{# } }}
				</div>
			</div>
		</div>
		<!--右侧-->
		<div class="fl w600 hp oya oxh scrollbar" id="index_notice_container">
			
		</div>
	</div>
		
	*/
}

function sysSysnoticeTemp(){
	/*
		<div class="wp hp cf">
				<!--公告模板-->
				<div class="wp cf">
					<span class="fl ml5">
						<input id="index_sysNotice_start" name="index_sysNotice_start" class="laydate-icon w100 ti_1"/>
						<input id="index_sysNotice_end" name="index_sysNotice_end" class="laydate-icon w100 ti_1"/>
					</span>
					<span class="fr mr5"><span class="fa fa-search pa mt5 c_20"></span><input type="text" class="b_0 b_s bb_1 b_25 ti_2"/></span>
				</div>
				<div class="wp mt5 ">
					<table class="tac vam tlf c_25" id="index_sysNotice_list">
						<thead>
							<tr>
								<td class="h30 w240">公告名称</td>
								<td class="w120">发布机构</td>
								<td class="w120">发布日期</td>
								<td class="w100">有效期</td>
							</tr>
						</thead>
						<tbody>
						{{# for(var i=0;i<d.length;i++){ }}
							<tr class="cp" idx={{i}}>
								<td class="h30 w240">
									{{# if(d[i].ifread == 0){ }}
										<img src="../imgs/tactful/UnreadNews.png" alt="" class="fl ml5 mr5" />
									{{# }else if(d[i].ifread == 1){ }}
										<img src="../imgs/tactful/readNews.png" alt="" class="fl ml5 mr5" />
									{{# } }}
									
									<span class="fl w200 oh nowrap">{{JSON.parse(d[i].msg).title}}</span>
								</td>
								<td class="w120 c_51">系统管理员</td>
								<td class="w120">2016-06-05</td>
								<td class="w100">1天</td>
							</tr>
						{{# } }}
						</tbody>
					</table>
				</div>
			</div>
	*/
}

function sysSysNoticeDetaiTemp(){
	/*
		<div class="bc_10 fs14 ma0 mt20" style="width: 590px;height: 470px;">
			<div style="width:550px;height:436px;" class="bc_59 ma0 p10">
				<div class="wp h25">
					<span>尊敬的客户：</span><span class="c_51">{{user_info.name}}（{{user_info.id}}）</span>
				</div>
				<div class="h350 wp">{{JSON.parse(d.msg).msg}}</div>
				<div class="h40 wp cf">
					<div class="fr fs12 mt5">
						<div class="c_51 ">{{d.who_say}}（{{d.who_say_id}}）</div>
						<div class="mt5">{{new Date(d.time).date2Str()}}</div>
					</div>
					<img src="../imgs/appLogo@2x.png" alt="" class="fr w30 h30 r40 mt5 mr5" />
				</div>
			</div>
			<div class="wp cf c_20" id="index_sysMsg_page">
				<span class="fr cp mr30 mt10" name="next">下一条</span>
				<span class="fr cp mr10 mt10" name="preview">上一条</span>
			</div>
		</div>
	*/
}
function sysSysprivateTemp(){
	/*
		<div class="wp hp">
			<!--离线消息模板-->
			<ul class="db wp h310 p3" id="index_sysNotice_prList">
				{{# for(var i = 0;i<d.length;i++){ }}
					<li class="bc_10 p5 cf db cp" sender={{d[i].who_say}} senderId={{d[i].speaker_id}}>
						<img src="http://test.rtdream.com/avatar/{{d[i].icon}}" title={{d[i].who_say}}  class="w30 h30 r40 fl"/>
						<span class="c_51 ml10 fl mt8">{{d[i].who_say}}</span>
						<span class="c_20 ml10 fl mt8">发给你1条消息</span>
						<span class="c_18 fr mt8">{{new Date(d[i].time).date2Str()}}</span>
					</li>
				{{# } }}
			</ul>
		</div>
	*/
}

function sysSyspolicyTemp(){
	/*
		<div class="wp hp">
			<!--策略模板-->
			<div class="wp h40 cf p5">
				<span class="fl">
					<input id="index_sysNotice_start" name="index_sysNotice_start" class="laydate-icon w100 ti_1"/>
					<input id="index_sysNotice_end" name="index_sysNotice_end" class="laydate-icon w100 ti_1"/>
				</span>
				<span class="fr"><span class="fa fa-search pa mt5 c_20"></span><input type="text" class="b_0 b_s bb_1 b_25 ti_2"/></span>
			</div>
			<div class="wp h310 p5">
				{{# for(var i = 0;i<d.length;i++){ }}
					<div class="bc_31 p5 cf">
						<span class="c_20 fl">策略“<span class="c_51 cp" uuid={{JSON.parse(d[i].msg).uuid}} onclick="sysNoticeSysPolicyCl()">{{JSON.parse(d[i].msg).msg}}</span>”有一条新评论</span>
						<span class="c_18 fr">{{new Date(d[i].time).date2Str()}}</span>
					</div>
				{{# } }}
			</div>
		</div>
	*/
}
/* market相关模版*/

function zc_person_tableNav(){			//行情页面导航
	/*
		<div class="p2" id="zc_person_body_body_head">
			<ul class="fl cf cp mt8 ml2 fs14 fw100" id="proType" style="min-width:400px">
				{{# if(proTypeNum==1){ }}
					<li id="market_tab1" class="fl  bc_51 c_0 tac r2 pt3l10 mt-5" idx="1">自选品种</li>
				{{# }else{ }}
					<li  id="market_tab1" class="fl  c_26 pt3l10 mt-5" idx="1">自选品种</li>
				{{# } }}

				{{# if(proTypeNum==5){ }}
					<li  id="market_tab2" class="fl bc_51 c_0 tac r2 pt3l10 mt-5" idx="5" id="proType_free">国际商品</li>
				{{# }else{ }}
					<li  id="market_tab2" class="fl c_26 pt3l10 mt-5" idx="5" id="proType_free">国际商品</li>
				{{# } }}

				{{# if(proTypeNum==3){ }}
					<li  id="market_tab3" class="fl bc_51 c_0 tac r2 pt3l10 mt-5" idx="3">外汇市场</li>
				{{# }else{ }}
					<li  id="market_tab3" class="fl c_26 pt3l10 mt-5" idx="3">外汇市场</li>
				{{# } }}

				{{# if(proTypeNum==4){ }}
					<li  id="market_tab4" class="fl bc_51 c_0 tac r2 pt3l10 mt-5" idx="4">股指期货</li>
				{{# }else{ }}
					<li  id="market_tab4" class="fl c_26 pt3l10 mt-5" idx="4">股指期货</li>
				{{# } }}

				{{# if(proTypeNum==2){ }}
					<li  id="market_tab5" class="fl bc_51 c_0 tac r2 pt3l10 mt-5" idx="2">迈鸿现货</li>
				{{# }else{ }}
					<li  id="market_tab5" class="fl c_26 pt3l10 mt-5" idx="2">迈鸿现货</li>
				{{# } }}
			</ul>
		</div>
	*/
}

function zc_personContent(){       //行情数据模版
	/*
	            <div class="wp hp">
	           	  <div style="min-width:1340px;">
	           	  	<table class="wp fs14" id="market_title">
	           	  	  <col width='139px'/>
                  	  <col width='150px'/>
                  	  <col width='80px'/>
                  	  <col width='101px'/>
                  	  <col width='101px'/>
                  	  <col width='101px'/>
                  	  <col width='101px'/>
                  	  <col width='101px'/>
                  	  <col width='97px'/>
                  	  <col width='97px'/>
                  	  <col width='269px'/>
                  	  <tbody class="bc_opt2">
                  	  		<tr>
					  			  <td class="tal ti_1 p7"> 代码</td>
                                  <td class="tal"> 名称</td>
                                  <td class="tar"> 买价</td>
                                  <td class="tar"> 卖价</td>
                                  <td class="tar"> 最高价</td>
                                  <td class="tar"> 最低价</td>
                                  <td class="tar"> 今开</td>
                                  <td class="tar"> 昨收</td>
                                  <td class="tar w100"> 涨跌量</td>
                                  <td class="tar"> 涨跌幅%</td>
                                  <td class="tal tar pr15"> 更新时间</td>
                            </tr>
					  </tbody>
	           	  	</table>
	           	  </div>
	              <div class="fs14 oya scrollbar" style="min-width:1340px;height:calc(100% - 30px);">
	                  <table class="pr wp mt1"  id="market_symbolList">
	                  	  <col width='139px'/>
	                  	  <col width='150px'/>
	                  	  <col width='80px'/>
	                  	  <col width='101px'/>
	                  	  <col width='101px'/>
	                  	  <col width='101px'/>
	                  	  <col width='101px'/>
	                  	  <col width='101px'/>
	                  	  <col width='97px'/>
	                  	  <col width='97px'/>
	                  	  <col width='269px'/>
	                      <tbody  id="zc_person_table_body" class="c_17 tb_body">
	                      {{# for(var i=0;i<d.items.length;i++) { }}
	                      		{{# var _aProName = d.items[i].proName.split('/')}}
	                      		{{# var _aName = d.items[i].name.split('/')}}
		                      <tr class="h30 lh25" rowId={{d.items[i].rowId}} symProId={{d.items[i].id}} code = {{d.items[i].proName}}>
		                          <td class="c_22 oh pl15">
			                          <div class="fl w100 oh nowrap cd" title="{{_aProName[0]}}{{_aProName[1]?_aProName[1]:''}}">
			                          	{{_aProName[0]}}{{_aProName[1]?_aProName[1]:''}}
			                          </div>
		                          </td>
		                          <td class="oh c_30">
		                          	<div class="w120 oh nowrap fl cd" title="{{_aName[0]}}{{_aName[1]?_aName[1]:''}}">
		                          		{{_aName[0]}}{{_aName[1]?_aName[1]:''}}
		                          	</div>
									<span class="easeWebkit2s fa fr mt3"></span>
		                          </td>
		                          {{# if(d.items[i].Ask&&d.items[i].Ask!=0&&typeof(d.items[i].Ask)!='undefined'){ }}
									<td class="oh tar" price={{d.items[i].Ask}}>{{d.items[i].Ask}}</td>
		                          {{# }else{ }}
									<td class="oh tar"price={{d.items[i].Ask}}>---</td>
		                          {{# } }}

		                          {{# if(d.items[i].Bid&&d.items[i].Bid!=0&&typeof(d.items[i].Bid)!='undefined'){ }}
									<td class="oh tar" price={{d.items[i].Bid}}> {{d.items[i].Bid}}</td>
		                          {{# }else{ }}
									<td class="oh tar" price={{d.items[i].Bid}}>---</td>
		                          {{# } }}

		                          {{# if(d.items[i].High&&d.items[i].High!=0&&typeof(d.items[i].High)!='undefined'){ }}
									<td class="oh tar" price={{d.items[i].High}}> {{d.items[i].High}}</td>
		                          {{# }else{ }}
									<td class="oh tar" price={{d.items[i].High}}>---</td>
		                          {{# } }}

		                          {{# if(d.items[i].Low&&d.items[i].Low!=0&&typeof(d.items[i].Low)!='undefined'){ }}
									<td class="oh tar" price={{d.items[i].Low}}> {{d.items[i].Low}}</td>
		                          {{# }else{ }}
									<td class="oh tar" price={{d.items[i].Low}}>---</td>
		                          {{# } }}

		                          {{# if(d.items[i].Open&&d.items[i].Open!=0&&typeof(d.items[i].Open)!='undefined'){ }}
									<td class="oh tar" price={{d.items[i].Open}}> {{d.items[i].Open}}</td>
		                          {{# }else{ }}
									<td class="oh tar" price={{d.items[i].Open}}>---</td>
		                          {{# } }}

		                          {{# if(d.items[i].last_Close&&d.items[i].last_Close!=0&&typeof(d.items[i].last_Close)!='undefined'){ }}
									<td class=" c_22 oh tar" price={{d.items[i].last_Close}}> {{d.items[i].last_Close}}</td>
		                          {{# }else{ }}
									<td class="oh tar" price={{d.items[i].last_Close}}>---</td>
		                          {{# } }}

		                          {{# if(d.items[i].change_BidAmount&&d.items[i].change_BidAmount!=0&&typeof(d.items[i].change_BidAmount)!='undefined'){ }}
									<td class="oh tar" price={{d.items[i].change_BidAmount}}> {{d.items[i].change_BidAmount}}</td>
		                          {{# }else{ }}
									<td class="oh tar" price={{d.items[i].change_BidAmount}}>---</td>
		                          {{# } }}

		                          {{# if(d.items[i].change_BidRate&&d.items[i].change_BidRate!=0&&typeof(d.items[i].change_BidRate)!='undefined'){ }}
									<td class="oh tar" price={{d.items[i].change_BidRate}}> {{d.items[i].change_BidRate}}</td>
		                          {{# }else{ }}
									<td class="oh tar" price={{d.items[i].change_BidRate}}>---</td>
		                          {{# } }}

		                          {{# if(d.items[i].create_time&&typeof(d.items[i].create_time)!='undefined'&&typeof(d.items[i].create_time)!='number'){ }}
									<td class="c_22 tar pr15"> {{new Date(d.items[i].create_time).date2Str()}}</td>
		                          {{# }else{ }}
									<td class="oh tar pr15">---</td>
		                          {{# } }}
		                       </tr>
		                  {{# } }}
	                        </tbody>
	                  </table>
	              </div>
	          	</div>
	          */
}

/*left.html 相关模版*/

function pwdTipsContent(){		//修改密码弹框模版
	/*
		<div id="left_resetPwd_form" class="b_0 bt_1 fs14 pt20 pl30">
    		<div class="">
    			<span class="tar dib w100"><span class="c_41">*</span>原密码：</span>
    			<span class="b_0 bb_1 b_s b_15 h22 dib"><input id="left_opwd" class="b_0 w210" type="password" /></span>
    		</div>
    		<div class="mt10">
    			<span class="tar dib w100"><span class="c_41">*</span>新密码：</span>
    			<span class="b_0 bb_1 b_s b_15 h22 dib"><input id="left_npwd" class="b_0 w210" type="password" /></span>
    		</div>
    		<div class="mt5">
    			<span class="fs10 c_16 dib w210 ml100 lh20">密码由6-25个字符组成，区分大小写</span>
    		</div>
    		<div class="mt10">
    			<span class="tar dib w100 mr3">密码强度:</span>
    			<div class="dib" id="left_pwdLevel">
    				<span class="b_s b_w1 b_0 b_17 w30 h3 dib brl5"></span>
    				<span class="b_s b_w1 b_0 b_17 w30 h3 dib ml-3"></span>
    				<span class="b_s b_w1 b_0 b_17 w30 h3 dib ml-3 brr5"></span>
    				<span class="fr mt5 ml10"></span>
    			</div>
    		</div>
    		<div class="mt5">
    			<span class="fs10 c_16 dib w210 ml100 lh20">为了提升您的密码安全性，建议使用英文字母加数字或符号的混合密码</span>
    		</div>
    		<div class="mt10">
    			<span class="tar dib w100"><span class="c_41">*</span>确认新密码：</span>
    			<span class="b_0 bb_1 b_s b_15 h22 dib"><input id="left_confmNpwd" class="b_0 w210" type="password" /></span>
    		</div>
    		<div class="mt10">
    			<span class="tar dib w100"><span class="c_41">*</span>验证码：</span>
    			<span class="b_0 bb_1 b_s b_15 h22 dib"><input id="left_validate" class="b_0 w210" type="text" /></span>
    		</div>
    		<div class="mt5">
    			<span class="fs10 c_16 dib w210 ml100 lh20">请输入图中字符，不区分大小写</span>
    		</div>
    		<div class="mt5 pl100">
				<img src="" id="left_vcode_img" class="w70 h25 ml5 mt2"/>
				<span class="fs12 ml5 c_57 cp" id="left_changeVcode">换一张</span>
    		</div>
    		<div class="mt10 h20 fs12 pl100">
    			<span class="c_41" id="left_rePwd_msg"></span>
    		</div>
    		<div class="mt10 tar pr20">
    			<span id="left_resetPwd_ok" class="btn w60 h20 c_64 bc_52 r2 lh20">确定</span>
    			<span id="left_resetPwd_reset" class="btn w60 ml5 h20 bc_12 r2 lh20">重置</span>
    		</div>
    	</div>
  	*/
}

function feedBackTemp(){		//意见反馈模版
	/*
		<div id="left_feedBack_dom" class="hp pl10 tac">
			<div class="tac">
				<div>
					<img src="./imgs/rtdream/thinkman.png"/>
				</div>
				<div class="fs14">
					你要提供什么反馈？
				</div>
			</div>
			<div class="mt3">
				<span class="b_s b_51 b_w1 b_0 dib">
    				<textarea type="search" id="left_feedBack_content" name="content" class="oh w365 h150 b_0 ti_1" placeholder=""></textarea>
    			</span>
			</div>
			<div class="mt10 fs12 tal pl40">
				请您选择问题类别，以便为您提供更好的体验：
			</div>
			<div class="mt10 tal pl40">
				<span class="dib">
					<input type="radio" id="left_radio" name="feedback"class="dn" />
					<label for="left_radio" class="ro_ch"></label>
					<span class="fl ml5 mt2">功能不好用</span>
					
					<input type="radio" id="left_radio1" name="feedback" class="dn" />
					<label for="left_radio1" class="ro_ch  ml10"></label>
					<span class="fl ml5 mt2">界面效果</span>
					
					<input type="radio" id="left_radio2" name="feedback" class="dn" />
					<label for="left_radio2" class="ro_ch  ml10"></label>
					<span class="fl ml5 mt2">一点建议</span>
				</span>
			</div>
			<div class="mt10 fs12 tal pl40">
				您的联系方式：
			</div>
			<div class="mt5">
				<div class="dib">
					<img id="left_qq_img" src="./imgs/rtdream/qq_feedback0.png" class="fl"/>
					<span class="b_0 bb_1 b_s b_15 h22 dib ml5">
						<input id="left_qq" type="text" class="b_0" placeholder="QQ" name="QQ">
					</span>
				</div>
				<div class="dib">
					<img id="left_email_img" src="./imgs/rtdream/e-mail0.png" class="fl"/>
					<span class="b_0 bb_1 b_s b_15 h22 dib ml5">
						<input id="left_email" type="text" class="b_0" placeholder="E-mail" name="E-mail">
					</span>
				</div>
			</div>
    		<div class="mt10 tar pr25">
    			<span id="left_feedBack_msg" class="fs12 c_41 mr120"></span>
    			<span id="left_feedBack_ok" class="btn w60 h20 c_64 bc_15 r2 lh20">提交</span>
    		</div>
    	</div>
	*/
}

function headPortrait(){		//上传头像模版
		/*
		<div class="b_0 bb_1 b_s b_15"></div>
		<div id="index_headPic" class="mt5">
			<div class="wp h30 cp" id="choose_headPic">
			<span class="fl ml10 w80 h20 lh20 tac c_5 r2" opt="file_deful">默认头像</span>
			<span class="fl ml10 w80 h20 lh20 tac r2" opt="file_upload">自定义头像</span>
			</div>
				<div class="wp p5 cp mt5 oh" style="height:385px;" id="file_deful">
					<div class="cf">
						<div class="w300 fl ml5" id="file_list" style="height:340px;">
						{{#  for(var i=0;i<d.items.length;i++){ }}
							<img src="imgs/headPic/{{d.items[i].idx}}.jpg" class="w50 h50 ml5 b_w1 b_s b_15 mt5" alt="{{d.items[i].idx}}" />
						{{#  } }}
						</div>
						<div class="fl w100 ml20 h100 b_w2 b_s b_16 bc_15">
								<img src="imgs/headPic/1.jpg" class="wp hp db" style="border-radius:100px;" id="refer_headPic" title="当前头像">
						</div>
					</div>
					<div class="mt5 cf">
						<span class="fr btn xs bc_14  mr10" id="cancel_head">取消</span>
						<span class="fr btn xs c_5 mr10" id="ensure_head">确定</span>
					</div>
				</div>
				<div class="wp p5 dn mt5" style="height:340px;" id="file_upload">
					<div class="cf">
							<form action="http://test.rtdream.com/upload/avatar?token={{d.token}}&width={{d.width}}&height={{d.height}}&x_pos={{d.x_pos}}&y_pos={{d.y_pos}}" method="post" target= img_data  enctype ="multipart/form-data" class="fl w300 mt5 ml10" id="form_data"> 
									<label for="head_picture" id="for_headPicture"  class="pt3l8 r2 h25 bc_12 cp">选择头像</label>
									<input type="file" name="zc_uploadFile" id="head_picture" class="dn">
									<input type="submit" value="上传头像" name="sunmit" id="submit_headPic"  class='btn xs bc_12 b_0 ml20'/>
							</form>
							<div class="b_w2 b_s b_15 fl w150 ml20 h150" id="img_head"/></div>
						</div>
						<div class="w300 h300 z10 b_w1 b_s b_15 p3 pr oh" style="top:-110px;" id="contain_drag">
								<div class="w150 h150 b_w2 b_s b_41 pa" style="left:75px;top:75px;" id="screenShot"></div>
							<img src="" class="pa" style="left:0;top:0;opacity:.5" id="upFile"/>
						</div>
						<div class="cf pa wp dn" id="upFile_become" style="margin-top:-101px;">
							<span class="fr btn xs bc_14  mr30" id="upFile_close">取消</span>
							<span class="fr btn xs c_5 mr10" id="upFile_ensure">确定</span>
					</div>
					<iframe src="http://test.rtdream.com/upload/avatar" frameborder="0" id="img_data" name="img_data" class=" dn"></iframe>
				</div>
		</div>
		*/
}

/*info_calendar.html 相关模版*/
WT.G.P.newLiveTemp = function(){		//新闻直播模版
	/*
	<div class="fs14 pr ml10 mr10 w800" style="margin:auto;">
	{{# var month=''}}
			<table class = "tal fs12 c_20">
			<tbody>
				<tr class="pr">
					<td class = "h50 w50 tal" style="min-width:50px">
						<span data-div class = "pa fs14 w100 h25 bc_44 c_10 tac z5 r5" style="top:21px;left:2px;line-height:25px"></span>	
					</td>
					<td class="w10" style="min-width:10px"><span class="pa h24 b_0 b_s bl_1 b_54" style="top:36px;left:52px;"></span></td>
					<td class ="lh20 vam" id="final_time">
						<div class = "fl fs30 mt10 c_25 dn"></div>
						<div class="fl ml2 dn">
							<div class="fs12 c_20 mt2 ml5"></div>
							<div class="fs12 c_20 ml5 mt-4"></div>
						</div>
						<div ></div>
						
					</td>
					
				</tr>
				{{#  for(var i=0;i<d.items.length;i++){ }}
					{{# if(d.items[i].brief_info != ''){ }}
						<tr class="fs14 lh30">
							<td class = "h30 w50 tal">
								{{# if(d.items[i].importance == '2'){ }}
									<span class="w40 h14 tac fs12 ml5 pa c_10 bc_41" style="line-height:1;margin-top:-7px" data-time>{{new Date(d.items[i].pub_time).date2Str().split(' ')[1].slice(0,5)}}</span>
									<span class="dn" data-date>{{d.items[i].pub_time.slice(0,19)}}</span>
									<b class="w6 h6 bc_41 m4 r10 pa oh" style ="left:46px;margin-top:-2px;"></b>
								{{# }else{ }}
									<span class="w40 h14 tac fs12 ml5 pa c_10 bc_44 mt-15" style="line-height:1;margin-top:-7px" data-time>{{new Date(d.items[i].pub_time).date2Str().split(' ')[1].slice(0,5)}}</span>
									<span class="dn" data-date>{{d.items[i].pub_time.slice(0,19)}}</span>
									<b class="w6 h6 bc_55 m4 r10 pa oh" style ="left:46px;margin-top:-2px;"></b>
								{{# } }}
								<div class="pa br_w7 b_s br_color6" style="left:56px;margin-top:-4px"></div>
								<div class="pa br_w6 b_s br_color4" triangle-skin style="left:59px;margin-top:-4px"></div>
							</td>
							<td class="b_0 bl_1 b_s b_54 w10"></td>
							<td class ="b_0 b_s bb_1 b_11 p5">
								<div set-skin class=" bc_45 r2 cf p5 b_w1 b_s b_14 shadow6">
									<div class ="lh20 news_img c_20 cd fl oh pr" style="height:43px;width:650px">
									{{# if(d.items[i].importance == '2'){ }}
										<span class='w600 oh fl p5 c_41' data-height>{{d.items[i].brief_info.reHtml()}}</span>
									{{# }else{ }}
										<span class='w600 oh fl p5' data-height>{{d.items[i].brief_info.reHtml()}}</span>
									{{# } }}
									<span class="fl cp pa b0 fa fa-caret-down c_51" data-show="whole"></span>
									</div>
									<div class="fr">
										<span class="fr mr20 cp fs14 mt5 dn"><img src="imgs/rtdream/market_line.png" opt ="market" title="市场"></span>
										<span class="fr mr10 cp fs14 mt5"><img src="imgs/rtdream/share.png" opt = "share" title="分享"></span>
										<span class="fr mr10 b_0 b_s b_14 h20 mt8"></span>
									</div>
								</div>
							</td>
						</tr>
					{{# } }}
				{{#  } }}
			</tbody>
		</table>
  </div>	
	*/
}; 


/*info_detail.html相关模版 */
function newsDetailTemp(){	//新闻详情模版
	 /*
        <div class="wp hp">
          <div class="oxh oyh wsn c_58 tac b_s bb_1 b_0 ml10 lh25 b_15 mr10">
            <span id="news_back" class="fl c_18 fs14 ml3 mt10 diagram_opt dib w30 h20 dn"></span>
            <span class="ofEllipsis dib w90p mt3">
              {{d.title}}
            </span>
          </div>
          <div class="pr ml10 h20 fs12 mt10 c_18">
            <div class="dib fl lh20">
              {{# if(d.author){ }}
                <span>{{d.author.split('/')[0]}}</span>
                {{# if(d.author.split('/')[1]){ }}
                  /<span class="c_51">{{d.author.split('/')[1]}}</span>
                {{# } }}
              {{# } }}
            </div>
            
            {{# if(d.pub_time=='0000-00-00 00:00:00'){ }}
                <span class="fs12 c_25"></span>
            {{# }else{ }}
                <span class="fs12 c_18 mr10 mt3 fr">
                  {{new Date(d.pub_time).getFullYear()}} 年 
                  {{new Date(d.pub_time).getMonth()+1}} 月 
                  {{new Date(d.pub_time).getDate()}} 日 
                  {{new Date(d.pub_time).date2Str().split(' ')[1]}}
                </span>
            {{# } }}
            <div class="fr dib mt3">
                <span class="w10 h10">
                  <img class="w18 h10" src="imgs/rtdream/view_count.png">
                </span>
                <span class="fs12 mr10">
                  {{# if(d.count){ }}
                    {{d.count}}
                  {{# }else{ }}
                    0
                  {{#} }}
                </span>
            </div>
            
          </div>
          <div class="pr ml10 fs14 oh lh23 line-clamp news_img mr10">
            {{# var chapters = d.body.split('  ')}}
            {{# for(var i=0;i<chapters.length;i++){ }}
              &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp{{chapters[i]}} </br>
            {{# } }}
          </div>
          <div class="pr ml10 h100 bc_33 mt10 mr10">
            <div class="c_58 lh30 pl10 fs14">
              相关文章
              <ul>
                {{# for(var i=0;i<d.sameArticle.length;i++){ }}
                  {{# if(i<3){ }}
                  <div class="lh20">
                    <span class="w5 h5 dib bc_18 r20 fl mt8 mr5"></span>
                    <li class="lh20 c_18 dib">{{d.sameArticle[i].title}}</li>
                  </div>
                  {{# } }}
                {{# } }}
              </ul>
            </div>
          </div>
          <div class="mt3 p5 mr10">
            <span class="ml5 fl fs14 mt3">分享到</span>
              <a id="share_to_weChat" class="ml10" href="javascript:share.weixin();"><img class="w22 h22" src="imgs/rtdream/share_weixin.png"/></a>
              <a class="sharetotqq" href="javascript:;"><img class="w22 h22" src="imgs/rtdream/signupqq.png"/></a>
              <a id="share_to_weibo" href="javascript:share.weibo();"><img class="w22 h22" src="imgs/rtdream/signupweibo.png"/></a>
            <span id="news_back_toList" class="cp fr fs14 c_36 pl10">返回</span>
            <span class="fr fs12 mr5 dn">13</span>
            <span  class="fr mt-3 cp dn">
              <img class="w20 h20" src="imgs/rtdream/admire.png"/>
            </span>
          </div>
            
        </div>
      */
}

/*info_live.html 相关模版*/

function finatialCalandarHeadTemp(){		//日历，重要性，国家模板
	/*

          <div class="p3" style = "height:55px;min-width:600px">
          <span class="fs16 c_21 fl mt25 dn">日期</span>

          <span id="baseTimeLine_month" class="fs26 fl mt5"></span>
          <span class="fs14 fl mt17">/月</span>
          <span class="dib fl">

            <div class="cf">
              <ul class="fl cf cp fs14" id ="current_week">
                <li class="fl c_26 ml10"style="width:30px">上周</li>
                <li class="fl c_26 ml10 w20">日</li>
                <li class="fl c_26 ml10 w20">一</li>
                <li class="fl c_26 ml10 w20">二</li>
                <li class="fl c_26 ml10 w20">三</li>
                <li class="fl c_26 ml10 w20">四</li>
                <li class="fl c_26 ml10 w20">五</li>
                <li class="fl c_26 ml10 w20">六</li>
                <li class="fl c_26 ml3 w30">下周</li>
              </ul>
            </div>
            <div class = "cf mt10 ml11">
              <span class="fl c_26 w30 cp fs20"><span class=" btn bc_34 c_10  dib w24 h24 r15 fa fa-angle-left" id="base_left" ></span></span>
              <ul class="fl cf cp fs14" id="base_calendar">
                <li class="fl w20 ml-5"><span class="dib w25 h25 lh25 r15 ml7 tac" alt ="0"></span></li>
                <li class="fl ml10 w20"><span class="dib w25 h25 lh25 r15 ml7 tac" alt ="1"></span></li>
                <li class="fl ml10 w20"><span class="dib w25 h25 lh25 r15 ml7 tac" alt ="2"></span></li>
                <li class="fl ml10 w20"><span class="dib w25 h25 lh25 r15 ml7 tac" alt ="3"></span></li>
                <li class="fl ml10 w20"><span class="dib w25 h25 lh25 r15 ml7 tac" alt ="4"></span></li>
                <li class="fl ml10 w20"><span class="dib w25 h25 lh25 r15 ml7 tac" alt ="5"></span></li>
                <li class="fl ml10 w20"><span class="dib w25 h25 lh25 r15 ml7 tac" alt ="6"></span></li>
              </ul>
              <span class="fl c_26 w30 cp fs20" style="margin-left:21px;"><span class="btn bc_34 c_10 dib w24 h24 r15 fa fa-angle-right" id="base_right"></span></span>
            </div>
          </span>
          <div class="fl ml10">
              <div class="fs14 c_20 mt-2" opt="check"><span class="mr5">开始:</span><input id="baseTimeLine_date1" name="baseTimeLine_date1" class="laydate-icon w100 ti_1"/></div>
              <div class="fs14 c_20 mt2"><span class="mr5">结束:</span><input id="baseTimeLine_date2" name="baseTimeLine_date2" class="laydate-icon w100 ti_1"/></div>
          </div>
        </div>
		<div class="b_0 bb_1 b_s b_15 mt5"></div>
          <span class="ml10 h80 p3 cf" style="display:none" id="search_importance">
              <span class="fs16 c_21 fl mt25">重要性</span>
              <span class = "db cf mt10 ml60 mt22">
                <span class="fl mt5">
                  <div class="selected_1" opt=" " status = "checked"></div>
                </span>
                <span class="fs14 ml5 fl mt5">全部</span>
                <span class="fl ml30 mt5">
                  <div class="select_1" opt="1" status = "checked"></div>
                </span>
                <span class="fl ml5 mt-3">
                    <span class="db">
                      <img class="w10 h10" src="imgs/rtdream/collected_min.png">
                      <img class="w10 h10" src="imgs/rtdream/uncollected_min.png">
                      <img class="w10 h10" src="imgs/rtdream/uncollected_min.png">
                    </span>
                    <span class="fs13 db ml2 mt3">一般</span>
                </span>
                 <span class="fl ml10 mt5">
                  <div class="select_1" opt="2" status = "checked"></div>
                </span>
                <span class="fl mt-5">
                    <span class="db">
                      <img class="w10 h10" src="imgs/rtdream/collected_min.png">
                      <img class="w10 h10" src="imgs/rtdream/collected_min.png">
                      <img class="w10 h10" src="imgs/rtdream/uncollected_min.png">
                    </span>
                      <span class="fs14 db ml2 mt5">重要</span>
                </span>
                <span class="fl ml10 mt5">
                  <div class="select_1" opt="3" status="checked"></div>
                </span>
                <span class="fl mt-5">
                    <span class="db">
                      <img class="w10 h10" src="imgs/rtdream/collected_min.png">
                      <img class="w10 h10" src="imgs/rtdream/collected_min.png">
                      <img class="w10 h10" src="imgs/rtdream/collected_min.png">
                    </span>
                    <span class="fs14 db mt5">非常重要</span>
                </span> 
              </span>
          </span>


          <span class="h80 p3 db mt5 mr15 cf" id ="search_country">
            <span class="fs16 c_21 fl mt25 dn">国家</span>
            <div class="fs14 w700">
              <span class= "db cf mt15"> 
                        <span class="fl dn">
                         <div class="check_1" opt="" status = "checked"></div>
                        </span>
                        <span class="fs14 fl dn">全部</span>
                        <span class="fl">
                          <div class="check_1" opt="US" status = "checked"></div>
                        </span>
                        <span class="fl mt-20">
                          <span class="mt8 pl5 db">
                            <span class="dib">
                              <img class="w22 h15"  src="imgs/country/US.png">
                            </span>
                          </span>
                          <div class="ml2 mt5">
                            <span class="fs14">美国</span>
                          </div>
                        </span>
                        <span class="fl ml10">
                          <div class="check_1" opt="DE" status = "checked"></div>
                        </span>
                        <span class="fl ml5 mt-12">
                          <span class="pl5 db">
                            <span class="r15 dib">
                              <img class="w22 h15" src="imgs/country/DE.png">
                            </span>
                          </span>
                          <div class="ml2 mt5">
                            <span class="fs14">德国</span>
                          </div>
                        </span>
                        <span class="fl ml10">
                          <div class="check_1" opt="JP" status = "checked"></div>
                        </span>
                        <span class="fl mt-12">
                          <span class="pl5 db">
                            <span class="r15 dib">
                              <img class="w22 h15" src="imgs/country/JP.png">
                            </span>
                          </span>
                          <div class="ml2 mt5">
                            <span class="fs14">日本</span>
                          </div>
                        </span>
                        <span class="fl ml10">
                          <div class="check_1" opt="GB" status = "checked"></div>
                        </span>
                        <span class="fl mt-12">
                          <span class="pl5 db">
                            <span class="r15 dib">
                              <img class="w22 h15" src="imgs/country/GB.png">
                            </span>
                          </span>
                          <div class="ml2 mt5">
                            <span class="fs14">英国</span>
                          </div>
                        </span>
                        <span class="fl ml10">
                    <div class="check_1" opt="FR" status = "checked"></div>
                  </span>
                  <span class="fl mt-12">
                    <span class="pl5">
                      <span class="r15 dib">
                        <img class="w22 h15"  src="imgs/country/FR.png">
                      </span>
                    </span>
                    <div class="ml2 mt5">
                      <span class="fs14">法国</span>
                    </div>
                  </span>
                  <span class="fl ml10">
                    <div class="check_1" opt="CA" status = "checked"></div>
                  </span>
                  <span class="fl mt-12">
                    <span class="pl10 db">
                      <span class="r15 dib">
                        <img class="w22 h15" src="imgs/country/CA.png">
                      </span>
                    </span>
                    <div class="ml2 mt5">
                      <span class="fs14">加拿大</span>
                    </div>
                  </span>
                  <span class="fl ml10">
                    <div class="check_1" opt="CN" status = "checked"></div>
                  </span>
                  <span class="fl mt-12">
                    <span class="pl5 db">
                      <span class="r15 dib">
                        <img class="w22 h15" src="imgs/country/CN.png">
                      </span>
                    </span>
                    <div class="mt5">
                      <span class="fs14">中国</span>
                    </div>
                  </span>
                  <span class="fl ml5 mt-12 dn">
                    <span class="pl5 db">
                      <span class="r15 dib">
                        <img class="w22 h15" src="imgs/countryCircle/America.png">
                      </span>
                    </span>
                    <div class="">
                      <span class="fs14">更多</span>
                    </div>
                  </span>
                </div>
              </span>
      */
}

function finacialCalendarTemp(){	//财经日历模版
	 /*
      <div class="mt10 c_49 dn">财经日历</div>
      <div class="fs14 pr">
      {{# var month=''}}
          <table class = "tal fs14 c_20">
          <tbody>
            <tr>
              <td class = "h30 w60 tal">
                <span class = "pa" style="top:9px;left:20px" date-time>时间</span>
                <b class="w8 h8 b_w1 b_s b_51 m4 r10 pa oh" style ="left:52px;top:5px"></b>
              </td>
              <td class="w10"><span class="pa h15 b_0 b_s bl_1 b_15" style="top:17px;left:60px;"></span></td>
              <td class = "tac w50">重要性</td>
              <td class= "p5 tac w60">国家</td>
              <td class= "">指标</td>
              <td class="tar w110">今值</td>
              <td class="tar w110">预期</td>
              <td class="tar w110">前值</td>
              <td class="w80"></td>
            </tr>
            {{#  for(var i=0;i<d.items.length;i++){ }}
                <tr class="fs14">
                  <td class = "h30 tal ">
                    <span class="fs14 pa c_20 ml10" style="margin-top:-8px;">
                    	{{d.items[i].START_TIME}}
                    </span>
                    <b class="w6 h6 bc_55 m4 r10 pa oh" style ="left:54px;margin-top:-5px;"></b>
                  </td>
                  <td class="b_0 bl_1 b_s b_15 w10 "></td>
                  <td class ="tac">
                  	{{# if(!d.items[i].importance){ }}
                        <img class="w10 h10" src="imgs/rtdream/uncollected_min.png">
                        <img class="w10 h10" src="imgs/rtdream/uncollected_min.png">
                        <img class="w10 h10" src="imgs/rtdream/uncollected_min.png">
                    {{# } }}
                    
                  	{{# if(d.items[i].importance==0){ }}
                        <img class="w10 h10" src="imgs/rtdream/uncollected_min.png">
                        <img class="w10 h10" src="imgs/rtdream/uncollected_min.png">
                        <img class="w10 h10" src="imgs/rtdream/uncollected_min.png">
                    {{# } }}
                    
                    {{# if(d.items[i].importance==1){ }}
                        <img class="w10 h10" src="imgs/rtdream/collected_min.png">
                        <img class="w10 h10" src="imgs/rtdream/uncollected_min.png">
                        <img class="w10 h10" src="imgs/rtdream/uncollected_min.png">
                    {{# } }}
                   
                    {{# if(d.items[i].importance==2){ }}
                        <img class="w10 h10" src="imgs/rtdream/collected_min.png">
                        <img class="w10 h10" src="imgs/rtdream/collected_min.png">
                        <img class="w10 h10" src="imgs/rtdream/uncollected_min.png">
                    {{# } }}
                    
                    {{# if(d.items[i].importance==3){ }}
                        <img class="w10 h10" src="imgs/rtdream/collected_min.png">
                        <img class="w10 h10" src="imgs/rtdream/collected_min.png">
                        <img class="w10 h10" src="imgs/rtdream/collected_min.png">
                    {{# } }}
                  </td>
                  <td class= " p5 tac"><img class="w22 h15" src="imgs/country/{{d.items[i].country}}.png"></td>
                  {{# if(d.items[i].importance==3){ }}
                  <td class =" c_41" style='width:291px'><div class = "oh_text nowrap oh wp" style='width:291px'>{{d.items[i].SUMMARY}}</div></td>
                  {{# }else{ }}
                  <td class ="" style='width:291px'><div class = "oh_text nowrap oh wp">{{d.items[i].SUMMARY}}</div></td>
                  {{# } }}
                  {{# if(d.items[i].desc.Previous){ }}
                  <td class =" tar">{{d.items[i].desc.Previous}}</td>
                  {{# }else{ }}
                  <td class =" tar ">--</td>
                  {{# } }}
                  {{# if(d.items[i].desc.Consensus){ }}
                  <td class =" tar ">{{d.items[i].desc.Consensus}}</td>
                  {{# }else{ }}
                  <td class ="tar ">--</td>
                  {{# } }}
                  {{# if(d.items[i].desc.Actual){ }}
                  <td class ="tar ">{{d.items[i].desc.Actual}}</td>
                  {{# }else{ }}
                  <td class =" tar ">--</td>
                  {{# } }}
                  <td class ="w10">
                    <span class="fr mr10 c_55 cp fs14 mt5 dn"><img src="imgs/rtdream/market_line.png" opt ="market" title="市场"></span>
                    <span class="fr mr10 c_55 cp fs14 mt5"><img src="imgs/rtdream/share.png" opt = "share" title="分享"></span>
                    <span class="fr mr10 b_0 b_s b_15 h20"></span>
                  </td>
                </tr>
            {{#  } }}
          </tbody>
        </table>
        
      </div>  
      
      */
}

function importanceCountry(){	 //财经日历模版
	/*
      <div class = "mt10 c_49"><div>
      <div class="b_0 b_s b_15 bb_1 wp mt20" style="width:900px"></div>
      <div class="mt5 fs14 p2 pr" style="">
      {{# var month=''}}
          <table class = "tal fs14 c_20">
          <tbody>
            <tr>
              <td class="" style="width:57px">
					<span class="fs14 pa c_20 ml10" style="margin-top:-8px;">
                    	日期	
					</span>
              </td>
              <td class="w10 pr">
              <span class="pa h15 b_0 b_s bl_1 b_15" style="top:11px;left:0px;"></span>
              <b class="w8 h8 b_w1 b_s b_51 m4 r10 pa oh" style ="left:-8px;top:-2px"></b>
              </td>
              <td class = "tal w50">重要性</td>
              <td class="p5 tac w60">国家</td>
              <td class="tal">事件</td>
              <td class="tar w110"></td>
              <td class="tar w110"></td>
              <td class="tar w110"></td>
              <td class=""></td>
            </tr>
            {{#  for(var i=0;i<d.items.length;i++){ }}
                <tr class="fs14">
                  <td class="" style="width:57px">
                  	<span class="fs14 pa c_20 ml8" style="margin-top:-8px;">
                    {{d.items[i].DTEND_DATE}}
                    </span>
                  </td>
                  <td class="b_0 bl_1 b_s b_15 w10 pr">
                  	<b class="w6 h6 bc_55 m4 r10 pa oh" style ="left:-7px;top:5px"></b>
                  </td>
                  <td class ="tal">
                  	{{# if(!d.items[i].importance){ }}
                        <img class="w10 h10" src="imgs/rtdream/uncollected_min.png">
                        <img class="w10 h10" src="imgs/rtdream/uncollected_min.png">
                        <img class="w10 h10" src="imgs/rtdream/uncollected_min.png">
                    {{# } }}
                    
                  	{{# if(d.items[i].importance==0){ }}
                        <img class="w10 h10" src="imgs/rtdream/uncollected_min.png">
                        <img class="w10 h10" src="imgs/rtdream/uncollected_min.png">
                        <img class="w10 h10" src="imgs/rtdream/uncollected_min.png">
                    {{# } }}
                    
                    {{# if(d.items[i].importance==1){ }}
                        <img class="w10 h10" src="imgs/rtdream/collected_min.png">
                        <img class="w10 h10" src="imgs/rtdream/uncollected_min.png">
                        <img class="w10 h10" src="imgs/rtdream/uncollected_min.png">
                    {{# } }}
                   
                    {{# if(d.items[i].importance==2){ }}
                        <img class="w10 h10" src="imgs/rtdream/collected_min.png">
                        <img class="w10 h10" src="imgs/rtdream/collected_min.png">
                        <img class="w10 h10" src="imgs/rtdream/uncollected_min.png">
                    {{# } }}
                    
                    {{# if(d.items[i].importance==3){ }}
                        <img class="w10 h10" src="imgs/rtdream/collected_min.png">
                        <img class="w10 h10" src="imgs/rtdream/collected_min.png">
                        <img class="w10 h10" src="imgs/rtdream/collected_min.png">
                    {{# } }}
                  </td>
                  <td class=" p5 tac"><img class="w22 h15" src="imgs/country/{{d.items[i].country}}.png"></td>
                  {{# if(d.items[i].importance==3){ }}
                  <td class =" c_41"><div class = "oh_text nowrap oh">{{d.items[i].SUMMARY}}</div></td>
                  {{# }else{ }}
                  <td class =""><div class = "oh_text nowrap oh">{{d.items[i].SUMMARY}}</div></td>
                  {{# } }}
                  <td></td>
              		<td></td>
              		<td></td>
                  <td class ="w10">
                    <span class="fr mr10 c_55 cp fs14 mt5 dn"><img src="imgs/rtdream/market_line.png" opt ="market" title="市场"></span>
                    <span class="fr mr10 c_55 cp fs14 mt5" opt ="share"><img src="imgs/rtdream/share.png" opt = "share" title="分享"></span>
                    <span class="fr mr10 b_0 b_s b_15 h20"></span>
                  </td>
                </tr>
            {{#  } }}
          </tbody>
        </table>
      </div>  
      */
}

/*info_news 相关模版*/

function newsBannerTemp(){	//新闻左侧模版
	 /*
        <div class="wp oh b_s bb_1 b_0 b_15 pr" style="margin:0,auto;">
           <div id="baseInNews_swipercont" class="swiper-container">
                <div class="swiper-wrapper" id="alter_slide" style="z-index:-1;">
                    <div class="swiper-slide">
                      <img src="./imgs/news1.jpg" style="width:100%;height:100%" />
                    </div>
                    <div class="swiper-slide">
                       <img src="./imgs/news2.jpg" style="width:100%;height:100%" />
                    </div>
                    <div class="swiper-slide">
                       <img src="./imgs/news3.jpg" style="width:100%;height:100%" />
                    </div>
                </div>
                <!-- 如果需要分页器 -->  
                <div id="baseInNews_imgScroll_btn" class="swiper-pagination h30" style="bottom:-2px;">
                    
                </div>
                
                <!-- 如果需要导航按钮 -->
                <div id="baseInNews_prev" class="swiper-button-prev fs60 c_10"></div>
                <div id="baseInNews_next" class="swiper-button-next fs60 c_10"></div>
                
                <!-- 如果需要滚动条 -->
                <div class="swiper-scrollbar"></div>
                <div class="wp h50 mt-50 bc_62 news_banner_title z1 pa tac fs12 c_10 lh30">{{d.items[0].title}}</div>
           </div>
        </div>
		<div id="info_news_listContainer"></div>
       
      */
}

function newsListTemp(){
	/*
	 <ul class="oya" id="baseInNews_news_list">
          {{#  for(var i=0;i<d.items.length;i++){ }}
            <li class="p5 b_0 bb_1 b_s b_33 cp" idx={{i}} newsType="0" newsId={{d.items[i].id}}>  
            	{{# if(!(d.items[i].img == 'null')&&d.items[i].img.length>0){ }}
					<div class="dib w20p">
						<img class="wp h105" src={{d.items[i].img}}>
	                </div>
            	{{# } }}
                
				{{# if(!(d.items[i].img == 'null')&&d.items[i].img.length>0){ }}
					<div class="dib w78p">
            	{{# }else{ }}
					<div class="dib wp">
            	{{# } }}
					
	                <span class=" dib ofEllipsis dib c_58 cp mt8">
	                	<span class=" fl w16 h18 mr5">
		                  <img class="w15 h16" src="imgs/rtdream/news_icon.png">
		                </span>
	                	<span class="">
	                		{{d.items[i].title}}
	                	</span>
	                </span>
	                <div class="tar mb10 pr3 c_18 mt10 ofEllipsis">
	                    <span class="fs12 fl mt3">
	                      {{# if(d.items[i].author){ }}
	                        {{# if(d.items[i].author.indexOf('/')){ }}
	                          <span>{{d.items[i].author.split('/')[0]}}</span>
	                          {{# if(d.items[i].author.split('/')[1]){ }}
	                            /<span class="c_51">{{d.items[i].author.split('/')[1]}}</span>
	                          {{# } }}
	                        {{# } }}                 
	                      {{# } }}
	                    </span>
	                    <span class="w10 h10">
	                      <img class="w18 h10" src="imgs/rtdream/view_count.png">
	                    </span>
	                    <span class="fs12 mr10">
	                      {{# if(d.items[i].count){ }}
	                        {{d.items[i].count}}
	                      {{# }else{ }}
	                        0
	                      {{#} }}
	                    </span>
	                {{# if(d.items[i].pub_time=='0000-00-00 00:00:00'){ }}
	                    <span class="fs12 c_25"></span>
	                {{# }else{ }}
	                    <span class="fs12 c_18 mr-5">
	                      {{new Date(d.items[i].pub_time).getFullYear()}} 年 
	                      {{new Date(d.items[i].pub_time).getMonth()+1}} 月 
	                      {{new Date(d.items[i].pub_time).getDate()}} 日 
	                      {{new Date(d.items[i].pub_time).date2Str().split(' ')[1]}}
	                    </span>
	                {{# } }}
	                </div>
	                <span class="fc_3 fs14 oh db lh23 line-clamp text">
	                  {{d.items[i].brief_info.reHtml()}}
	                </span>
                </div>
                
            </li> 
          {{#  } }}
          {{# if(!d.items.length>0){ }}
          	{{# if($$('#baseInNews_news_list [name="no-more-news"]').length > 0){ }}
          		
          	{{# }else{ }}
				<li class="p5 b_0 bb_1 b_s b_15 cp ml30 mr30 tac c_15 h50 lh50" name="no-more-news">没有更多内容</li>
          	{{# } }}
          {{# } }}
        </ul>
	*/
}

function noDataTemp(){	//无新闻数据模版
	/*
        <div class="pl40 mt150" style="margin-left:372px;">
          <img src="imgs/news_img.png"/ class="w150">
        </div>
        <div class="mt20" style="margin-left:372px;">
          <span class="fs20 c_35">更多精彩资讯，即将上线！</span>
        </div>
      */
}

function rightTemp(){	//新闻排行模版
	/*
        <div class="">
          <ul class="cf h30 b_s b_w1 b_49 mb10" id="miniMarketHotNav">
          	<li class="fl w50p lh30 bc_49 c_64 tac cp" id="miniMarket_hot">本周热门点击</li>
          	<li class="fl w50p lh30 bc_68 tac cp">本周热门评论</li>
          </ul>
          <ul id="baseInNews_news_order" class="mt-2 oya h170 scrollbar scrolHide">
            {{#  for(var i=0;i<d.items.length;i++){ }}
              {{# if(d.items[i].title){ }}
                {{# if(i<3){ }}
                  <li class="cp p3 mt3 b_0 b_s b_12 ls oh wsn bc_68" idx={{i}} newsType="1" newsId={{d.items[i].id}}>
                      <span class="cp c_26 fs14 lh20">
	                      <span class="w20 lh20 r4 c_64 r5 dib tac hot_tag{{i+1}}">{{i+1}}</span>
	                        <span class="newsLiHov">
	                        	{{# if(d.items[i].title){ }}
	                          	  {{d.items[i].title}}
	                        	{{# } }}
	                        </span>
                      </span>
                  </li> 
                {{# }else{ }}
                  <li class="cp p3 mt3 b_0 b_s b_12 ls oh wsn bc_68 newsLiHov" idx={{i}} newsType="1" newsId={{d.items[i].id}}>
                      <span class="cp c_26 fs14 lh20">
                         <span class="w20 lh20 r4 r5 dib tac">{{i+1}}</span>
                         	<span class="newsLiHov">{{d.items[i].title}}</span>
                      </span>
                  </li> 
                {{# } }}
              {{# } }}
            {{#  } }}
          </ul>
        </div>
      */
}

/* info_right.html 相关模版*/

function marketDataTemp(){		//迷你市场行情模版
	/*
		<table id="miniMarket_table">
			<tbody>
				{{# for(var i=0;i<d.item.length;i++) { }}
					<tr class="tal fs14 lh23 b_s b_0 bc_68 miniHov" rowId={{d.item[i].rowId}} code={{d.item[i].proName}}>
						<td class="pl5"><div class="w120 oh wsn">{{d.item[i].name}}</div></td>
						{{# if(d.item[i].Ask && d.item[i].last_Close){ }}
							{{# if(d.item[i].Ask>d.item[i].last_Close){ }}
								<td class="c_41 tar">{{d.item[i].Ask}}</td>
							{{# }else{ }}
								<td class="c_46 tar">{{d.item[i].Ask}}</td>
							{{# } }}
						{{# }else{ }}
								<td class="c_17 tar">--</td>
						{{# } }}

						{{# if(d.item[i].Bid && d.item[i].last_Close){ }}
							{{# if(d.item[i].Bid>d.item[i].last_Close){ }}
								<td class="c_41 tar w80 pr5">{{d.item[i].Bid}}</td>
							{{# }else{ }}
								<td class="c_46 tar w80 pr5">{{d.item[i].Bid}}</td>
							{{# } }}
						{{# }else{ }}
								<td class="c_17 tar w80 pr5">--</td>
						{{# } }}
					</tr>
				{{# } }}
			</tbody>
		</table>
  	*/
}

function finacialCldTemp(){			//迷你财经日历模版
	/*
			<div class="wp hp mt8">
				<div id="miniMarket_count_down" class="p8 pl10 pr10 ml10 mr10 mt8 rgba_bg">
					<span class="fl fs16 dib w120 lh25">距离下次更新：</span>
					<div class="dib h25">
						<div class="fs16 c_51">
							<span id="miniMarket_h" class="w25 h25 lh25 r5 dib tac c_64 pr time_line timeGrad1">00</span>
							<span class="c_64">:</span>
							<span id="miniMarket_m" class="w25 h25 lh25 r5 dib tac c_64 pr time_line timeGrad2">00</span>
							<span class="c_64">:</span>
							<span id="miniMarket_s" class="w25 h25 lh25 r5 dib tac c_64 pr time_line timeGrad3">00</span>
						</div>
					</div>
				</div>
				<div class="oya scrollbar">
				{{# for(var i = 0;i<d.length;i++){ }}
					{{# if(d[i].START_TIME.split(':')[0] == d.leftStartTime.split(':')[0]&&d[i].START_TIME.split(':')[1] == d.leftStartTime.split(':')[1]){ }}
						<div class="h90 p10 ml10 mr10 mt8 rgba_bg">
							<div>
								<span class="fs14 c_51">
									<span class="dib fl mt-2">
										<img class = "w15 h15" src="imgs/time-hover.png">
									</span>
									<span class="pl10">{{d[i].START_TIME.split(':')[0]+':'+d[i].START_TIME.split(':')[1]}}</span>
									{{# if(d[i].importance == 0){ }}
										<span class="pl20">
										  <img class="w10 h10" src="imgs/rtdream/uncollected_min.png">
						                  <img class="w10 h10" src="imgs/rtdream/uncollected_min.png">
						                  <img class="w10 h10" src="imgs/rtdream/uncollected_min.png">
										</span>
									{{# } }}

									{{# if(d[i].importance == 1){ }}
										<span class="pl20">
										  <img class="w10 h10" src="imgs/rtdream/collected_min.png">
						                  <img class="w10 h10" src="imgs/rtdream/uncollected_min.png">
						                  <img class="w10 h10" src="imgs/rtdream/uncollected_min.png">
										</span>
									{{# } }}
									{{# if(d[i].importance == 2){ }}
										<span class="pl20">
										  <img class="w10 h10" src="imgs/rtdream/collected_min.png">
						                  <img class="w10 h10" src="imgs/rtdream/collected_min.png">
						                  <img class="w10 h10" src="imgs/rtdream/uncollected_min.png">
										</span>
									{{# } }}
									{{# if(d[i].importance == 3){ }}
										<span class="pl20">
										  <img class="w10 h10" src="imgs/rtdream/collected_min.png">
						                  <img class="w10 h10" src="imgs/rtdream/collected_min.png">
						                  <img class="w10 h10" src="imgs/rtdream/collected_min.png">
										</span>
									{{# } }}
								</span>
							</div>
							<div class="mt10 fs14">
								<span class="dib">
									<img class="fl" src="imgs/country/{{d[i].country}}.png">
									<span class="dib w200 lh15 ofEllipsis" title={{d[i].SUMMARY}}>{{d[i].SUMMARY}}</span>
								</span>
							</div>
							<div class="fs12 c_21 mt10">
								<span>今值：</span>
								{{#if(d[i].desc.Actual){ }}
									<span>{{d[i].desc.Actual}}</span>
								{{# }else{ }}
									<span>--</span>
								{{# } }}
								<span class="ml10">预测：</span>
								{{#if(d[i].desc.Consensus){ }}
									<span>{{d[i].desc.Consensus}}</span>
								{{# }else{ }}
									<span>--</span>
								{{# } }}
								<span class="ml10">前值：</span>
								{{#if(d[i].desc.Previous){ }}
									<span>{{d[i].desc.Previous}}</span>
								{{# }else{ }}
									<span>--</span>
								{{# } }}
							</div>
						</div>
					{{# } }}
				{{# } }}
				</div>
			</div>
  		*/
}

function policyOrderTemp(){		//策略评论排行模版
	/*
	<div class="wp hp pl10 pt10">
		<div class="wp dib">
			<ul class="w99p dib ">
				<li class="w40p tac fl h20 bc_49 c_64 cp pt3l10 lh20">收藏最多</li>
				<li class="w40p tac fl h20 bc_68 cp pt3l10 lh20">发布最多</li>
			</ul>
		</div>
		<div class="wp mt5">
			<ul class="wp dib">
				<li class="w25p fl h20 tac cp b_0 b_s bb_1 b_49">今天</li>
				<li class="w25p fl h20 tac cp b_0 b_s bb_1 b_15">本周</li>
				<li class="w25p fl h20 tac cp b_0 b_s bb_1 b_15">本月</li>
				<li class="w25p fl h20 tac cp b_0 b_s bb_1 b_15">所有</li>
			</ul>
		</div>
		<div class="wp">
			<ul class="wp dib">
				<li class="wp h30 pt5">
					<div class="dib w30p tac">
						<span class="dib w30 h30 fl">
							<img class="w30 h30 r20" src="http://test.rtdream.com/avatar/ddFM5x7UfjLl5G3uUvmYqsBM5uWVXN6OclrNk2i04rQ=.jpg?rnd=0.942638398070399" />
						</span>
						<span class="c_51 fl mt10 ml10">Tom</span>
					</div>
					<div class="dib w30p tac">
						<span class=" w20 h20 c_68 fa fa-heart fl ml20"></span>
						<span class="fl ml10">172</span>
					</div>
					<div class="dib w30p tac">
						<span class="fl ml20 mt-3">
							<img class="w20 h20" src="./imgs/trade1.png" />
						</span>
						<span class="fl mt1 ml10">29</span>
					</div>
				</li>
			</ul>
		</div>
	</div>
	*/
}

/* follow_fans.html follow_page.html相关模版*/
function  user_intro_temp(){
      /*
       {{# for(let i = 0; i < d.length; i++){ }}
       <div data-user={{d[i].name}} data-id={{d[i].id}} class="h80 m5 b_63 shadow6 hover_bg">
       <div class="fl w80 h80">
       <img class="m10 w60 h60 r40" data-user-avatar src="{{d[i].avatar}}" />
       </div>
       <div class="fl w180 h80 fs16">
       <div data-user-name class="fl w180 h20 mt5">
       {{d[i].name}}
       </div>
       <div class="fl w160 h20 mt5 c_67 fs14">
       会员号: <span data-user-id>{{d[i].id}}</span>
       </div>
       <div class="fl w80 h20 mt5 c_67 fs14">
       关注: <span data-user-follow>{{d[i].follow}}</span>
       </div>
       <div class="fl w80 h20 mt5 c_67 fs14">
       粉丝: <span data-user-followed>{{d[i].followed}}</span>
       </div>
       </div>
       <div class="fr w40 h80 fs20">
       <span class="dib cp m10 w20 h20 fa fa-heart {{d[i].already_follow==1?'c_68':'c_69'}}" data-user-following="{{d[i].already_follow}}"></span>
       </div>
       </div>
       {{# } }}
      */
    }

/*follow_market.html 相关模版*/

  	function marketMould(){//自选数据模板
  		/*
  		<div class="wp hp fs14 oa scrollbar" style="min-width: 1500px;">
  		 	<table class="wp hp">
					<col width='170px'/>
		  	  <col width='360px'/>
		  	  <col width='90px'/>
		  	  <col width='120px'/>
		  	  <col width='120px'/>
		  	  <col width='120px'/>
		  	  <col width='120px'/>
		  	  <col width='120px'/>
		  	  <col width='120px'/>
		  	  <col width='120px'/>
		  	  <col width='350px'/>
					<thead class="bc_opt2">
				  			  <th class="tal ti_1 p7"> 代码</th>
								  <th class="tal"> 名称</th>
								  <th class="tal tar"> 买价</th>
								  <th class="tal tar"> 卖价</th>
								  <th class="tal tar"> 最高价</th>
								  <th class="tal tar"> 最低价</th>
								  <th class="tal tar"> 今开</th>
								  <th class="tal tar"> 昨收</th>
								  <th class="tal tar"> 涨跌量</th>
								  <th class="tal tar"> 涨跌幅%</th>
								  <th class="tal tar pr15"> 更新时间</th>
				  </thead>
          <tbody  class="c_17 tb_body">
              {{# for(var i=0;i<d.items.length;i++) { }}
              	
                  <tr class="h30 lh25" symProId={{d.items[i].id}} code = {{d.items[i].proName}}>
                      <td class="c_22 oh pl15">{{d.items[i].proName}}</td>
                      <td class="oh c_30" >
                      	{{d.items[i].name}}
						<span class="easeWebkit2s fa fr mt3" style="font-size:20px;"></span>
                      </td>
                      {{# if(d.items[i].Ask&&d.items[i].Ask!=0&&typeof(d.items[i].Ask)!=undefined){ }}
						<td class="oh tar" price={{d.items[i].Ask}}>{{d.items[i].Ask}}</td>
                      {{# }else{ }}
						<td class="oh tar"price={{d.items[i].Ask}}>---</td>
                      {{# } }}

                      {{# if(d.items[i].Bid&&d.items[i].Bid!=0&&typeof(d.items[i].Bid)!=undefined){ }}
						<td class="oh tar" price={{d.items[i].Bid}}> {{d.items[i].Bid}}</td>
                      {{# }else{ }}
						<td class="oh tar" price={{d.items[i].Bid}}>---</td>
                      {{# } }}

                      {{# if(d.items[i].High&&d.items[i].High!=0&&typeof(d.items[i].High)!=undefined){ }}
						<td class="oh tar" price={{d.items[i].High}}> {{d.items[i].High}}</td>
                      {{# }else{ }}
						<td class="oh tar" price={{d.items[i].High}}>---</td>
                      {{# } }}

                      {{# if(d.items[i].Low&&d.items[i].Low!=0&&typeof(d.items[i].Low)!=undefined){ }}
						<td class="oh tar" price={{d.items[i].Low}}> {{d.items[i].Low}}</td>
                      {{# }else{ }}
						<td class="oh tar" price={{d.items[i].Low}}>---</td>
                      {{# } }}

                      {{# if(d.items[i].Open&&d.items[i].Open!=0&&typeof(d.items[i].Open)!=undefined){ }}
						<td class="oh tar" price={{d.items[i].Open}}> {{d.items[i].Open}}</td>
                      {{# }else{ }}
						<td class="oh tar" price={{d.items[i].Open}}>---</td>
                      {{# } }}

                      {{# if(d.items[i].last_Close&&d.items[i].last_Close!=0&&typeof(d.items[i].last_Close)!=undefined){ }}
						<td class=" c_22 oh tar" price={{d.items[i].last_Close}}> {{d.items[i].last_Close}}</td>
                      {{# }else{ }}
						<td class="oh tar" price={{d.items[i].last_Close}}>---</td>
                      {{# } }}

                      {{# if(d.items[i].change_BidAmount&&d.items[i].change_BidAmount!=0&&typeof(d.items[i].change_BidAmount)!=undefined){ }}
						<td class="oh tar" price={{d.items[i].change_BidAmount}}> {{d.items[i].change_BidAmount}}</td>
                      {{# }else{ }}
						<td class="oh tar" price={{d.items[i].change_BidAmount}}>---</td>
                      {{# } }}

                      {{# if(d.items[i].change_BidRate&&d.items[i].change_BidRate!=0&&typeof(d.items[i].change_BidRate)!=undefined){ }}
						<td class="oh tar" price={{d.items[i].change_BidRate}}> {{d.items[i].change_BidRate}}</td>
                      {{# }else{ }}
						<td class="oh tar" price={{d.items[i].change_BidRate}}>---</td>
                      {{# } }}

                      {{# if(d.items[i].create_time&&typeof(d.items[i].create_time)!=undefined&&typeof(d.items[i].create_time)!=number){ }}
						<td class="c_22 tar pr15"> {{new Date(d.items[i].create_time).date2Str()}}</td>
                      {{# }else{ }}
						<td class="oh tar pr15">---</td>
                      {{# } }}
                   </tr>
  
              {{# } }}
            </tbody>
				</table>
  		</div>
  		 */
}

/*follow_trends.html 相关模版*/

function trendsTemp(){		//用户“动态”模版
	 /*
          <div id="trendsNews" class="easeWebkit pa bc_10 z20 dn"></div>
          <ul class="pr">
              {{# for(var i=0;i<d.length;i++){ }}
                {{# var _date = new Date(d[i].u_time).date2Str().split(' ')[0] }}
                {{# var _time = new Date(d[i].u_time).date2Str().split(' ')[1] }}
                {{# var _timeShow = _time.split(':')[0] + ':' + _time.split(':')[1]}}
                {{# if(d[i-1]){ }}
                  {{# var _dateLast = new Date(d[i-1].u_time).date2Str().split(' ')[0] }}
                  {{# if(+(_date.split('-')[2])!=+(_dateLast.split('-')[2])){ }}
                    <li>
                      <span class="dib w15 h15 r20 b_s bl_1 b_w1 b_55 pa bc_10 z1 ml-8"></span>
                      <span class="ml30 fs16">{{_date}}</span>
                    </li>
                  {{# } }}
                {{# }else if(+(_date.split('-')[2])!=new Date().getDate() || +(_date.split('-')[1])!=new Date().getMonth()+1){ }}
                    <li>
                      <span class="dib w15 h15 r20 b_s bl_1 b_w1 b_55 pa bc_10 z1 ml-8"></span>
                      <span class="ml30 fs16">{{_date}}</span>
                    </li>
                {{# }else{ }}
                    <li>
                      <span class="dib w15 h15 r20 b_s bl_1 b_w1 b_55 pa bc_10 z1 ml-8"></span>
                      <span class="ml30 fs16">今天</span>
                    </li>
                {{# } }}
                <li class="b_s bl_1 b_17 lh50 b_0">
                  <span class="ml-50">{{_timeShow}}</span>
                  <span class="h6 w6 bc_55 dib r20 ml7"></span>
                  <span class="fs14 ml20">云端发布了一条策略</span>
                  <a href="javascript:" class="fs14 cp c_55" type={{d[i].type}} source={{d[i].screenshot}} uuid={{d[i].uuid}} 
                  	name={{d[i].name}} time={{new Date(d[i].u_time).date2Str().split(' ')[0]}} >{{d[i].name}}</a>
                </li>
              {{# } }}
          <ul>
      */
}

function newsMediaTemp(){		//行业资讯小框模版
	  /*
       <span style="display: inline-block"></span>
       <div data-media="news" contenteditable="false" data-params='{{d.items.params_str}}' class="dib cp h90 b_w1 b_s b_15 bc_10 mb10 cd" style="width:320px">
       <div class="h18 fs10 c_20 b_0 b_s bb_1 b_15" style="width:320px;">
       <span class="fl ml5">{{d.items.source}}</span><span class="fr mr5">{{d.items.time}}</span>
       </div>
       <div class="h60 mt3 p3 cf" style="width:320px">
       <div class="fl hp ml3 c_10"><span class="dib w50 h50 p3 fa fa-link bc_12" style="font-size:50px;border:1px solid #bbb"></span></div>
       <div class="fl hp ml10 oh c_58 lh18" style="width:230px">{{d.items.body}}</div>
       </div>
       </div>
       <span style="display: inline-block"></span>
       */
}

function miniChartTemp(){		//策略缩略图模版
	  /*
      <div data-media="canvas" contenteditable="false" 
      data-params={"src":"{{d.src}}","uuid":"{{d.uuid}}"} class="dib oh w300 h120 b_w1 b_s b_15 bc_10 mb10">
      	<div style="width:320px;height:20px;font-size:13px;border-bottom:1px solid #dcdcdc;color:gray;">
			<span class="dib fl h20 lh20 ml5 fa fa-cloud-download"></span>
		 	<span class="dib fl h20 lh20 ml5">{{d.name}}</span>
			<span class="dib fr h20 lh20 mr25" style="color:#15a9fd">{{d.uname}}</span>
			<span class="dib fr h20 lh20 mr5">{{d.time}}</span>
		 </div>
        <img class="w300 h120" src={{d.src}}>
      </div>
      */
}

/*right.html相关模版*/

function proDetailTemp(){		//market right 产品详情模版
	 /*
        <div class="mt15 ml10 c_25">
          <span id='table_pname' class="fs18">{{d.items.name}}</span>
          <span id='table_pcode' class="fs18 ml5">({{d.items.proName}})</span>
          <span class="fr dib mr15 mt5">
            {{# if(d.items.is_self_list==0){ }}
              <span id="addIcon" class="cp pa t10r2" symProId={{d.items.id}}>
                <img  src="imgs/rtdream/tableCollect.png"/>
              </span>
            {{# } }}
            {{# if(d.items.is_self_list==1){ }}
              <span id="delIcon" class="cp pa t10r2" symProId={{d.items.id}} code={{d.items.proName}}>
                <img  src="imgs/rtdream/alreadyCollect.png"/>
              </span>
            {{# } }}
          </span>
        </div>
        <div class="mt10 ml10 fs12 c_15">
          <span id="table_utime">
          </span>
        </div>
        <div class="mt9 ml10">
          {{# if(d.items.Bid){ }}
            <span class="fs14 c_20">
              {{d.items.Bid}}
            </span>
          {{# } }}

          {{# if(!d.items.Bid){ }}
            <span class="fs16">
              --
            </span>
          {{# } }}

          {{# if(+d.items.change_BidAmount > 0){ }}
            <span class="fs14 ml10 c_41">
              {{(+d.items.change_BidAmount).toFixed(3)}}
            </span>
          {{# } }}

          {{# if(+d.items.change_BidAmount < 0){ }}
            <span class="fs14 ml10 c_46">
              {{(+d.items.change_BidAmount).toFixed(3)}}
            </span>
          {{# } }}

          {{# if(!d.items.change_BidAmount){ }}
            <span class="fs16">
              --
            </span>
          {{# } }}

          {{# if(+d.items.change_BidRate > 0){ }}
            <span class="fs14 ml10 c_41">
              {{(d.items.change_BidRate*100).toFixed(3)}}%
            </span>
          {{# } }}

          {{# if(+d.items.change_BidRate < 0){ }}
            <span class="fs14 ml10 c_46">
              {{(d.items.change_BidRate*100).toFixed(3)}}%
            </span>
          {{# } }}

          {{# if(!d.items.change_BidRate){ }}
            <span class="fs16">
              --
            </span>
          {{# } }}
        </div>
        <div class="ml10 c_20">
          <ul class="cf fs14">
            {{# if(d.items.Open&&d.items.Open!=0){ }}
              <li class="fl w120 mt10">今开: <span id='table_open'>{{d.items.Open}}</span></li>
            {{# }else{ }}
              <li class="fl w120 mt10">今开: <span id='table_open'>---</span></li>
            {{# } }}

            {{# if(d.items.last_Close&&d.items.last_Close!=0){ }}
              <li class="fl w120 mt10 ml20">昨收: <span id='table_lc'>{{d.items.last_Close}}</span></li>
            {{# }else{ }}
              <li class="fl w120 mt10 ml20">昨收: <span id='table_lc'>---</span></li>
            {{# } }}

            {{# if(d.items.Ask&&d.items.Ask!=0){ }}
              <li class="fl w120 mt10">买价: <span id='table_ask'>{{d.items.Ask}}</span></li>
            {{# }else{ }}
              <li class="fl w120 mt10">买价: <span id='table_ask'>---</span></li>
            {{# } }}

            {{# if(d.items.Bid&&d.items.Bid!=0){ }}
              <li class="fl w120 mt10 ml20">卖价: <span id='table_bid'>{{d.items.Bid}}</span></li>
            {{# }else{ }}
              <li class="fl w120 mt10 ml20">卖价: <span id='table_bid'>---</span></li>
            {{# } }}

            {{# if(d.items.High&&d.items.High!=0){ }}
              <li class="fl w120 mt10">最高: <span id='table_high'>{{d.items.High}}</span></li>
            {{# }else{ }}
              <li class="fl w120 mt10">最高: <span id='table_high'>---</span></li>
            {{# } }}

            {{# if(d.items.Low&&d.items.Low!=0){ }}
              <li class="fl w120 mt10 ml20">最低: <span id='table_low'>{{d.items.Low}}</span></li>
            {{# }else{ }}
              <li class="fl w120 mt10 ml20">最低: <span id='table_low'>---</span></li>
            {{# } }}

            {{# if(d.items.change_BidAmount&&d.items.change_BidAmount!=0){ }}
              <li class="fl w120 mt10">涨跌量: <span id='table_cba'>{{d.items.change_BidAmount}}</span></li>
            {{# }else{ }}
              <li class="fl w120 mt10">涨跌量: <span id='table_cba'>---</span></li>
            {{# } }}

            {{# if(d.items.change_BidRate&&d.items.change_BidRate!=0){ }}
              <li class="fl w120 mt10 ml20">涨跌幅%: <span id='table_cbr'>{{d.items.change_BidRate}}</span></li>
            {{# }else{ }}
              <li class="fl w120 mt10 ml20">涨跌幅%: <span id='table_cbr'>---</span></li>
            {{# } }}

          </ul>
        </div>
      */
}

function historyTemp(){		//market right交易记录模版
	/*
        <div class="c_20 mt15"></div>
          <table id="price_record" class="ml8">
            <tbody class="tar c_17 ">
            {{# for(var i=0;i<d.items.length;i++){ }}

              <tr class="tal b_4 fs14 lh20 b_s bt_1 b_0">
                <td class="c_20">{{new Date(d.items[i].create_time).date2Str().split(' ')[1]}}</td>
                {{# if(d.items[i].Bid){ }}
                  <td class="c_20">{{d.items[i].Bid}}</td>
                {{# }else{ }}
                  <td class="c_20">--</td>
                {{# } }}

                {{# if(d.items[i].Bid-d.items[i].Open>0){ }}
                  <td class="c_41">{{(d.items[i].Bid-d.items[i].Open).toFixed(4)}}</td>
                {{# }else{ }}
                  <td class="c_46">{{(d.items[i].Bid-d.items[i].Open).toFixed(4)}}</td>
                {{# } }}

                {{# if(d.items[i].Bid>d.items[i].Open>0){ }}
                  <td class="c_41 fa fa-angle-up w20"></td>
                {{# }else{ }}
                  <td class="c_46 fa fa-angle-down w20"></td>
                {{# } }}
              </tr>
            {{# } }}
            </tbody>
          </table>
        </div>
      */
}
function systemNotice(){//系统公告
	/*
	 <div class="bc_10 fs14 ma0 mt50" style="width: 590px;height: 470px;">
		<div style="width:550px;height:436px;" class="bc_59 ma0 p10">
			<div class="wp h25">
				<span>尊敬的客户：</span><span class="c_51">kitty（123456）</span>
			</div>
			<div class="h350 wp">公告内容</div>
			<div class="h40 wp cf">
				<div class="fr fs12 mt5">
					<div class="c_51 ">系统管理员（007）</div>
					<div class="mt5">2016-06-05 15:13</div>
				</div>
				<img src="../imgs/appLogo@2x.png" alt="" class="fr w30 h30 r40 mt5 mr5" />
			</div>
		</div>
		<div class="wp cf c_20">
			<span class="fr cp mr30 mt10">下一条</span>
			<span class="fr cp mr10 mt10">上一条</span>
		</div>
	</div>
	 */
}
function MessageAlert(){//消息提醒
	/*
	 <div class="ma0 w800 h600 bc_10 mt50 fs14">
		<!--左侧-->
		<div class="fl w200 hp b_0 br_1 b_s b_15 ">
			<div class="h50 cf wp b_0 bb_1 b_s b_16 bc_31 cp">
				<div class="fl mt13 ml5">
					<img src="../imgs/tactful/systemNotice.png" alt="" class="w25 h25 db" />
				</div>
				<div class="fl mt8 ml10">
					<div>系统公告</div>
					<div class="c_18 fs8 mt10">您有3条新公告未读</div>
				</div>
			</div>
			<div class="h50 cf wp cp">
				<div class="fl mt13 ml5">
					<img src="../imgs/tactful/SocialNews.png" alt=""  class="w25 h25 db"/>
				</div>
				<div class="fl mt8 ml10">
					<div>社交消息</div>
					<div class="c_18 fs8 mt10">您有3消息告未读</div>
				</div>
			</div>
			<div class="h50 cf wp b_0 bt_1 bb_1 b_s b_16 cp">
				<div class="fl mt13 ml5">
					<img src="../imgs/tactful/tactfulCom.png" alt=""  class="w25 h25 db"/>
				</div>
				<div class="fl mt8 ml10">
					<div>策略评论</div>
					<div class="c_18 fs8 mt8">您有3条策略未读</div>
				</div>
			</div>
		</div>
		<!--右侧-->
		<div class="fl w600 hp">
			<div class="wp hp cf">
				<!--公告模板-->
				<div class="wp cf">
					<span class="fl ml5"><input type="date" /></span>
					<span class="fr mr5"><span class="fa fa-search pa mt5 c_20"></span><input type="text" class="b_0 b_s bb_1 b_25 ti_2"/></span>
				</div>
				<div class="wp mt5 ">
					<table class="tac vam tlf c_25">
						<thead>
							<tr>
								<td class="h30 w240">公告名称</td>
								<td class="w120">发布机构</td>
								<td class="w120">发布日期</td>
								<td class="w100">有效期</td>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td class="h30 w240"><img src="../imgs/tactful/UnreadNews.png" alt="" class="fl ml5 mr5" /><span class="fl w200 oh nowrap">adsffwsadaaaaaaaaaaafffffffffffffffffffffffffffff</span></td>
								<td class="w120 c_51">系统管理员</td>
								<td class="w120">2016-06-05</td>
								<td class="w100">1天</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
			<div class="wp hp dn">
				<!--离线消息模板-->
				<div class="wp h40 cf p5">
					<span class="fl"><input type="date" /></span>
					<span class="fr"><span class="fa fa-search pa mt5 c_20"></span><input type="text" class="b_0 b_s bb_1 b_25 ti_2"/></span>
				</div>
				<div class="wp h310 p5">
					<div class="bc_31 p5 cf">
						<img src="../imgs/appLogo@2x.png" alt=""  class="w30 h30 r40 fl"/>
						<span class="c_51 ml10 fl mt8">Tom</span>
						<span class="c_20 ml10 fl mt8">发给你1条消息</span>
					</div>
				</div>
			</div>
			<div class="wp hp dn">
				<!--策略模板-->
				<div class="wp h40 cf p5">
					<span class="fl"><input type="date" /></span>
					<span class="fr"><span class="fa fa-search pa mt5 c_20"></span><input type="text" class="b_0 b_s bb_1 b_25 ti_2"/></span>
				</div>
				<div class="wp h310 p5">
					<div class="bc_31 p5 cf">
						<span class="c_20 fl">策略“<span class="c_51">USDJYP 日线分析</span>”有一条新评论</span>
						<span class="c_18 fr">2016-06-05 15:12</span>
					</div>
				</div>
			</div>
		</div>
	</div>
	 */
}
 function CloudUpload(){//云端上传模板
 	/*
 	 	<div style="width: 910px;height: 490px;" class="bc_10 fs14">
		<div class="fl w230 hp b_0 b_s br_1 b_15" style="margin-left:-2px">
			<div class="wp h170">
				<div class="cf h25 fs12" id="canvas_cloud_upload_info">

				</div>
				<div class="h140" id="canvas_cloud_upload_preview"></div>
			</div>
			<div class="h30 wp"><input type="text" id="canvas_cloud_upload_name" placeholder="请输入策略名称(必填)" class="b_0 b_s bb_1 b_16 ti_1 pl10 w200" /></div>
			<textarea placeholder="请添加文字描述" maxlength="2000" class="w200 p5 h240 ma0 lh20 c_25 oya oxh scrollbar no" id="canvas_cloud_upload_describe"></textarea>
			<div class="w230 h35 b_0 b_s bt_1 b_15 ma0 c_20 pr">
				<ul class="cf mt10">
					<li class="fl cp mt5">时效:</li>
					<li class="fl cp b_w1 b_s b_20 pt3l8 ml5" style='width:30px' id="canvas_cloud_upload_time_num" data-value="-1"><span data-text class="fl">--</span><span class="fa fa-caret-down c_59 ml5 fr"></span></li>
					<li class="fl cp b_w1 b_s b_20 pt3l8 ml5" style="width:41px" id="canvas_cloud_upload_time_frame" data-value="-1"><span data-text class="fl">----</span><span class="fa fa-caret-down c_59 ml5 fr"></span></li>
					<li class="fl cp ml5 mt5"><img src="imgs/tactful/look.png" alt="" title="表情"  id="canvas_cloud_expresion"/></li>
					<li class="fl cp ml5 mt5"><img id="canvas_cloud_upload_pub" data-value="1" src="imgs/tactful/open.png" alt="" /></li>
					<li class="fl bc_51 c_10 ml5 mt2 h20 lh18 fs12 r2 tac cp" style="width: 36px;" id="canvas_cloud_upload_save">保存</li>
				</ul>
				<div class="pa w50" style="top:40px;z-index:510;" id="canvas_cloud_upload_time_list"></div>
			</div>
		</div>
		<div class="fl hp" style="width:680px;">
			<div class="mt10 ml10"><span class="fa fa-search c_20 pa mt5"></span><input id="canvas_cloud_upload_search" type="text" placeholder="请输入名称" class="ti_2 b_0 bb_1 b_s b_18 w200"/></div>
			<div class="wp c_25 mt10">
				<table class="tac">
					<tr>
						<td class="w120">名称</td>
						<td class="w60 b_0 bl_1 b_s b_25">品类</td>
						<td class="w80 b_0 bl_1 b_s b_25">商品</td>
						<td class="w115 b_0 bl_1 b_s b_25">指标类型</td>
						<td class="w40 b_0 bl_1 b_s b_25">周期</td>
						<td class="w95 b_0 bl_1 b_s b_25"><span>发布日期</span><span></span></td>
						<td class="w60 b_0 bl_1 b_s b_25">时效</td>
						<td class="w110 b_0 bl_1 b_s b_25">操作</td>
					</tr>
				</table>
			</div>
			<div class="wp c_25 oh oya scrollbar" style="height:430px">
				<table class="tal fs12 vam cd" id="canvas_cloud_upload_list">

				</table>
			</div>
		</div>
	</div>
 	 */
 }
function CloudUploadList(){
	/*
	{{# for(let i = 0; i< d.length; i++){ }}

	 <tr class="tac" data-uuid="{{d[i].uuid}}" data-name="{{d[i].name}}">
	 <td class="tal pl10 w110 c_20 h30"><div title="{{d[i].name}}" class="w100 oh nowrap h16 highlight">{{d[i].name}}</div></td>

	 <td class="w60 b_0 bl_1 b_s b_10 c_15">{{d[i].type}}</td>
	 <td class="w80 b_0 bl_1 b_s b_10 fs12"><div class="w60 oh nowrap pt0lr2 bc_44 r2 c_10 ml9">{{d[i].symbol}}</div></td>
	 <td class="w115 b_0 bl_1 b_s b_10 c_10">
	 {{# for(let j = 0; j <d[i].idcs.length&&j<3; j++){ }}
	 <span class="bc_42 fl fs12 pt0lr2 r2 ml4">{{d[i].idcs[j]}}</span>
	 {{# } }}

	 </td>
	 <td class="w40 b_0 bl_1 b_s b_10">{{d[i].frame}}</td>
	 <td class="w95 b_0 bl_1 b_s b_10" title="{{d[i].full_time}}">{{d[i].time}}</td>
	 <td class="w60 b_0 bl_1 b_s b_10">{{d[i].validity}}</td>
	 <td class="w110 b_0 bl_1 b_s b_10">
		 <span class="cp ml5"><img opt="upload_search" title="查看" src="imgs/tactful/preview.png" alt="" /></span>
		 <span class="cp ml5"><img opt="upload_share" title="分享" src="imgs/tactful/share.png" alt="" /></span>
		 <span class="cp ml5"><img opt="upload_pub" title="{{d[i].pub == 1?'对所有人可见':'仅自己可见'}}" data-pub="{{d[i].pub}}" src="imgs/tactful/{{d[i].pub == 1?'open':'close'}}.png" alt="" /></span>
		 <span class="cp ml5"><img opt="upload_del" title="删除" src="imgs/tactful/delate.png" alt="" /></span>
	 </td>
	 </tr>
	 {{# } }}
	 */
}
function CloudUploadInfo(){
	/*
	 <span class="fl mt5"><span class="bc_44 r2 c_10 pt0lr2">{{d.symbol}}</span><span class="ml5">{{d.frame}}</span></span>
	 {{# for(let i = 0; i< d.idc.length && i < 3;i++){ }}
	 <span class="fr bc_42 c_10 mt5 mr5 pt0lr2 r2">{{d.idc[i]}}</span>
	 {{# } }}
	 */
}
 function collectionMaximizing(){//双击收藏的策略大图模板
 	/*
 	 <div class="ma0 mt10 bc_10 fs14" style="width:1100px;height: 650px;">
		<!--左侧部分-->
		<div class="fl hp bc_10 " style="width:780px;">
			<!--头部-->
			<div class="h50 wp cf">
				<div class="fl mt10"><img src="../imgs/appLogo@2x.png" alt="" class="db w30 h30 r40"/></div>
				<div class="fl mt5 ml10">
					<div>
						<span class="c_59">Tom</span>
						<span class="c_16">2016-05-31 20:20:20</span>
					</div>
					<div class="mt5">
						<span class="bc_42 r2 c_10">SMA</span>
						<span>小星星</span>
					</div>
				</div>
				<div class="fl c_59 mt20 ml50 fs14">联储官员再放话，美股小幅收跌</div>
				<div class="fr cf mt15 mr10">
					<div class="fl w25 h25 r40 bc_59 tac lh23 fs12 c_10 mr10"><span class="fa fa-heart"></span></div>
					<div class="fl w25 h25 r40 bc_51 tac fs12 c_10"><span class="fa fa-comment"></span><div class="fs10">10</div></div>
				</div>
			</div>
			<!--body-->
			<div class="wp bc_55" style="height: 450px;">
				这儿canvas
			</div>
			<!--foot-->
			<div class="h150 wp oh oya c_20">
				这儿是新闻区域
			</div>
		</div>
		<!--右侧部分-->
		<div class="fl hp cf" style="width:320px">
			<!--留空处-->
			<div class="fl hp w5"></div>
			<div class="fl hp bc_59" style="width:315px">
				<!--head-->
				<div class="h35 c_20">
					<div class="fl mt10"><i>评分： </i><span>小星星</span></div>
					<div class="fr">
						<span class="fl mt10 mr10">分享到:</span>
						<span class="fl mt8 mr5 cp">
							<img src="../imgs/rtdream/share_weixin.png" alt="分享到微信" title="分享到微信" />
							<img src="../imgs/rtdream/signupqq.png" alt="分享到qq" title="分享到qq" />
							<img src="../imgs/rtdream/signupweibo.png" alt="分享到微博" title="分享到微博" />
						</span>
					</div>
				</div>
				<!--body-->
				<div class="h100 wp oh bc_10">
					<div contenteditable="true" class="h80 p5 no" style="width:300px;"></div>
					<div class="wp cp">
						<span class="pt0l10 c_5 fr mr10 h18 fs14 lh18">评论</span>
						<img src ='imgs/tactful/look.png' class='fr mr10'/>
					</div>
				</div>
				<!--foot-->
				<div class="" style="height:515px;">
					<!--评论人的模板-->
					<div class="h50 cf">
						<div class="fl mt10"><img src="../imgs/appLogo@2x.png" alt="" class="w30 h30 r40"/></div>
						<div class="fl mt8">
							<div class="ml5">
								<span class="c_59">Tom</span>
								<span class="c_16">2016-05-31 20:20:20</span>
							</div>
							<div class="c_23 ml5 mt8">标注很有用,看完很有收获</div>
						</div>
					</div>
				</div>
			</div>
			
		</div>
	</div>
 	 */
 }
function chartShareComment(){
	/*
	 {{# for(let i = 0; i< d.length; i++){ }}
	 <div class="cf ml5" data-user-name="{{d[i].user_name}}" data-comment="{{d[i].comment_id}}">
	 <div class="fr cp m8 c_20 fs12" data-hover style="display:none"></div>
	 <div class="fl hp mt5 ml3"><img data-hover-card="{{d[i].user_name}}" data-user="{{d[i].user_name}}" src="{{d[i].user_icon}}" alt="" class="w30 h30 r40"/></div>
	 <div class="fl mt8">
	 <div class="ml5">
	 <span class="c_59"  data-hover-card="{{d[i].user_name}}">{{d[i].user_name}}</span>
	 <span class="c_16">{{d[i].time}}</span>

	 </div>
	 <div class="c_23 ml5 mt8 w220 hh">{{d[i].comment}}</div>
	 </div>
	 </div>
	 {{# } }}
	 */
}
 function tactfulMini(){//策略分享小框
 	/*
 	{{# for(let i=0;i<d.length;i++){ }}
 	 <div class="bc_10 fl p3 m5 fs14 shadow6 easeWebkit2s" style="width: 290px; height: 168px;outline:1px solid #e6e6e6" data-uuid="{{d[i].uuid}}">
		<div class="h48 b_0 b_s bb_1 b_15 wp">
			<div class="fl cf">
				<img data-hover-card="{{d[i].user_name}}" data-user="{{d[i].user_name}}" src="http://test.rtdream.com/avatar/{{d[i].user_avatar}}" alt="" class="w40 h40 r40 fl mt3" />
				<div class="fl ml8">
					<div class="c_51 cf mt2">
						<span class="fl" data-hover-card="{{d[i].user_name}}">{{d[i].user_name}}</span>
						<img src="imgs/tactful/cellected1.png" alt="被收藏量" title="被收藏量" class="fl ml5 w15 h15" />
						<img src="imgs/tactful/comment2.png" alt="发布量" title="发布量" class="fl w15 h15"/>
						<img src="imgs/tactful/Release3.png" alt="评论量" title='评论量' class="fl w15 h15"/>
					</div>
					<div class="mt8 fs12">
						<span class="bc_44 c_10 r2 pt0lr2">{{d[i].strategy_symbol}}</span>
						<span class="c_18">{{d[i].strategy_frame}}</span>
					</div>
				</div>
			</div>
			<div class="fr fs12 mt5 mr5 cf">
				<div class="c_15 tar">{{d[i].pass_time}}</div>
				<div class="c_15 mt8 cf ">
	 				<img src="imgs/tactful/comment_count.png" alt="" class="fl mt2" />
					<span class="fl ml2">{{d[i].comment_count}}</span>
					<img src="imgs/rtdream/view_count.png" alt="" class="fl ml3 mt2"/>
					<span class="fl ml3">{{d[i].scan_count}}</span>
				</div>
			</div>
		</div>
		<div class="wp mt3" style="height: 114px;">
			<div class="fl w100 h100 b_w1 b_s b_15 mt5">
				<img class="wp hp" src="http://test.rtdream.com/screenshot/{{d[i].strategy_img}}"/>
			</div>
			<div class="fl hp ml5 pr" style='width:178px'>
				<div class="wp c_51 mt5 lh20 fs14">{{d[i].strategy_name}}</div>
				<div class="wp h40 oh lh20 mt5">{{d[i].strategy_description}}</div>
				<div class="wp pa" style="bottom:8px;">
					<span class="fl"><img src="imgs/tactful/star{{d[i].strategy_score}}.png"></span>
					{{# for(let j = 0; j < d[i].strategy_idc.length&&j<3; j++){ }}
					<span class="fr bc_42 c_10 fs12 mr5 pt0lr2 r2">{{d[i].strategy_idc[j]}}</span>
					{{# } }}

				</div>
			</div>
		</div>
	</div>
	{{# } }}
 	 */
 	
 }
function privateCard(){
	/*
	 <div class="wp h70 cd">
	 <img src="{{d.avatar}}" alt=""  class="w50 h50 fl mt10 ml10" style="border-radius: 50px;"/>

	 <ul class="fl mt15 ml20 fs14">
	 <li>{{d.name}}</li>
	 <li class="c_15 mt15"><span>会员号:</span><span>{{d.id}}</span></li>
	 </ul>
	 </div>
	 <div class="wp bc_11 h110 cd">
	 <ul class="w240 p5 tac cf">
	 <li class="w33p fl h50 mt5">
	 <div class="mt8">{{d.follow}}</div>
	 <div class="mt5 c_51">关注</div>
	 </li>
	 <li class="w33p fl h50 b_0 bl_1 b_s b_14 mt5">
	 <div class="mt8">{{d.followed}}</div>
	 <div class="mt5 c_51">粉丝</div>
	 </li>
	 <li class="w33p fl h50 b_0 bl_1 b_s b_14 mt5">
	 <div class="mt8">{{d.trend}}</div>
	 <div class="mt5 c_51">动态</div>
	 </li>
	 </ul>
	 <div class="wp mt5">
	 <span data-home class="btn xs c_9 w90 h20 lh20 ml10"><span class="fa fa-home mr5 fs16"></span>主页</span>
	 {{# if(d.is_follow ==1){ }}
	 <span data-follow="{{d.is_follow}}" class="btn xs w90 h20 lh20 c_9"><img src="imgs/chart/followed.png"  class="mr5"/>已关注</span>
	 {{# }else{ }}
	 <span data-follow="{{d.is_follow}}" class="btn xs w90 h20 lh20 c_5"><img src="imgs/chart/follow_plus.png"  class="mr5"/>关注</span>
	 {{# } }}

	 </div>
	 </div>
	 */
}
 function popNewTactful(){//新建策略弹出框选择
 	/*
 	 <div class="bc_10 pa l50p t50p fs14" style="width:420px;height: 150px;margin-top: -180px;margin-left: -180px;">
		<div class="mt50 ml30 cf">
			<img src="../imgs/rtdream/notice.png" alt="" class="fl"/>
			<span class="fl ml20 mt8">新建策略需在市场单图界面，是否现在进行切换？</span>
		</div>
		<div class="mt40">
			<span class="fr pt3l8 bc_31 c_28 mr30 cp">取消</span><span class="fr pt3l8 c_5 mr10 cp">确定</span>
		</div>
	</div>
 	 */
 }

 var expressionData={//表情选择弹框
				'愤怒':{idx:1,img:"imgs/emojis/angry.png"},
				'痛苦':{idx:2,img:"imgs/emojis/anguished.png"},
				'脸红':{idx:3,img:"imgs/emojis/blush.png"},
				'哭':{idx:4,img:"imgs/emojis/cry.png"},
				'失望':{idx:5,img:"imgs/emojis/disappointed.png"},
				'很失望':{idx:6,img:"imgs/emojis/disappointed_relieved.png"},
				'晕':{idx:7,img:"imgs/emojis/dizzy_face.png"},
				'混乱':{idx:8,img:"imgs/emojis/confounded.png"},
				'困惑':{idx:9,img:"imgs/emojis/confused.png"},
				'冷汗':{idx:10,img:"imgs/emojis/cold_sweat.png"},
				'面无表情':{idx:11,img:"imgs/emojis/expressionless.png"},
				'可怕':{idx:12,img:"imgs/emojis/fearful.png"},
				'冲洗':{idx:13,img:"imgs/emojis/flushed.png"},
				'皱眉':{idx:14,img:"imgs/emojis/frowning.png"},
				'笑脸':{idx:15,img:"imgs/emojis/full_moon_with_face.png"},
				'鬼脸1':{idx:16,img:"imgs/emojis/grimacing.png"},
				'咧嘴':{idx:17,img:"imgs/emojis/grin.png"},
				'笑嘻嘻':{idx:18,img:"imgs/emojis/grinning.png"},
				'色':{idx:19,img:"imgs/emojis/heart_eyes.png"},
				'寂静':{idx:20,img:"imgs/emojis/hushed.png"},
				'无辜':{idx:21,img:"imgs/emojis/innocent.png"},
				'鬼脸':{idx:22,img:"imgs/emojis/imp.png"},
				'快乐':{idx:23,img:"imgs/emojis/joy.png"},
				'吻':{idx:24,img:"imgs/emojis/kissing.png"},
				'接吻闭着眼睛':{idx:25,img:"imgs/emojis/kissing_closed_eyes.png"},
				'吻面':{idx:26,img:"imgs/emojis/kissing_face.png"},
				'亲心':{idx:27,img:"imgs/emojis/kissing_heart.png"},
				'亲吻含笑的眼睛':{idx:28,img:"imgs/emojis/kissing_smiling_eyes.png"},
				'大笑':{idx:29,img:"imgs/emojis/laughing.png"},
				'男人':{idx:30,img:"imgs/emojis/man.png"},
				'人与瓜皮毛':{idx:31,img:"imgs/emojis/man_with_gua_pi_mao.png"},
				'男子用头巾':{idx:32,img:"imgs/emojis/man_with_turban.png"},
				'虫子':{idx:33,img:"imgs/emojis/bug.png"},
				'面具':{idx:34,img:"imgs/emojis/mask.png"},
				'按摩':{idx:35,img:"imgs/emojis/massage.png"},
				'钱袋':{idx:36,img:"imgs/emojis/moneybag.png"},
				'山地自行车':{idx:37,img:"imgs/emojis/mountain_bicyclist.png"},
				'肌肉':{idx:38,img:"imgs/emojis/muscle.png"},
				'美甲':{idx:39,img:"imgs/emojis/nail_care.png"},
				'中性面':{idx:40,img:"imgs/emojis/neutral_face.png"},
				'黑脸':{idx:41,img:"imgs/emojis/new_moon_with_face.png"},
				'不要':{idx:42,img:"imgs/emojis/no_good.png"},
				'嘘':{idx:43,img:"imgs/emojis/no_mouth.png"},
				'好女人':{idx:44,img:"imgs/emojis/ok_woman.png"},
				'老男人':{idx:45,img:"imgs/emojis/older_man.png"},
				'老女人':{idx:46,img:"imgs/emojis/older_woman.png"},
				'张嘴':{idx:47,img:"imgs/emojis/open_mouth.png"},
				'牛':{idx:48,img:"imgs/emojis/ox.png"},
				'椰树':{idx:49,img:"imgs/emojis/palm_tree.png"},
				'表演':{idx:51,img:"imgs/emojis/performing_arts.png"},
				'努力':{idx:52,img:"imgs/emojis/persevere.png"},
				'人皱眉':{idx:53,img:"imgs/emojis/person_frowning.png"},
				'外国人':{idx:54,img:"imgs/emojis/person_with_blond_hair.png"},
				'臭脸':{idx:55,img:"imgs/emojis/person_with_pouting_face.png"},
				'电话':{idx:56,img:"imgs/emojis/phone.png"},
				'猪':{idx:57,img:"imgs/emojis/pig.png"},
				'大肥猪':{idx:58,img:"imgs/emojis/pig2.png"},
				'吃药啦':{idx:59,img:"imgs/emojis/pill.png"},
				'菠萝':{idx:60,img:"imgs/emojis/pineapple.png"},
				'强':{idx:61,img:"imgs/emojis/plus1.png"},
				'便便':{idx:62,img:"imgs/emojis/poop.png"},
				'发怒的猫':{idx:63,img:"imgs/emojis/pouting_cat.png"},
				'公主':{idx:64,img:"imgs/emojis/princess.png"},
				'打你':{idx:65,img:"imgs/emojis/punch.png"},
				'紫心勋章':{idx:66,img:"imgs/emojis/purple_heart.png"},
				'愤怒1':{idx:67,img:"imgs/emojis/rage1.png"},
				'愤怒2':{idx:68,img:"imgs/emojis/rage2.png"},
				'愤怒3':{idx:69,img:"imgs/emojis/rage3.png"},
				'愤怒4':{idx:70,img:"imgs/emojis/rage4.png"},
				'举手':{idx:71,img:"imgs/emojis/raising_hand.png"},
				'吃面':{idx:72,img:"imgs/emojis/ramen.png"},
				'老鼠':{idx:73,img:"imgs/emojis/rat.png"},
				'轻松':{idx:74,img:"imgs/emojis/relaxed.png"},
				'松了一口气':{idx:75,img:"imgs/emojis/relieved.png"},
				'米饭':{idx:76,img:"imgs/emojis/rice.png"},
				'划船':{idx:77,img:"imgs/emojis/rowboat.png"},
				'橄榄球':{idx:78,img:"imgs/emojis/rugby_football.png"},
				'跑步':{idx:79,img:"imgs/emojis/running.png"},
				'满意吗':{idx:80,img:"imgs/emojis/satisfied.png"},
				'吓死宝宝了':{idx:81,img:"imgs/emojis/scream.png"},
				'吓死喵喵了':{idx:82,img:"imgs/emojis/scream_cat.png"},
				'看不见':{idx:83,img:"imgs/emojis/see_no_evil.png"},
				'骷髅':{idx:84,img:"imgs/emojis/skull.png"},
				'睡了':{idx:85,img:"imgs/emojis/sleeping.png"},
				'好困':{idx:86,img:"imgs/emojis/sleepy.png"},
				'发财了':{idx:87,img:"imgs/emojis/slot_machine.png"},
				'好开心':{idx:88,img:"imgs/emojis/smile.png"},
				'真开心':{idx:89,img:"imgs/emojis/smiley.png"},
				'奸笑':{idx:90,img:"imgs/emojis/smiling_imp.png"},
				'切':{idx:91,img:"imgs/emojis/smirk.png"},
				'给哥点一根':{idx:92,img:"imgs/emojis/smoking.png"},
				'小蜗牛':{idx:93,img:"imgs/emojis/snail.png"},
				'蛇':{idx:94,img:"imgs/emojis/snake.png"},
				'滑雪':{idx:95,img:"imgs/emojis/snowboarder.png"},
				'大哭':{idx:96,img:"imgs/emojis/sob.png"},
				'足球':{idx:97,img:"imgs/emojis/soccer.png"},
				'乱炖':{idx:98,img:"imgs/emojis/stew.png"},
				'草莓':{idx:99,img:"imgs/emojis/strawberry.png"},
				'调皮':{idx:100,img:"imgs/emojis/stuck_out_tongue.png"},
				'好傻':{idx:101,img:"imgs/emojis/stuck_out_tongue_closed_eyes.png"},
				'真傻':{idx:102,img:"imgs/emojis/stuck_out_tongue_winking_eye.png"},
				'阳光帅气':{idx:103,img:"imgs/emojis/sun_with_face.png"},
				'向日葵':{idx:104,img:"imgs/emojis/sunflower.png"},
				'狂拽炫酷':{idx:105,img:"imgs/emojis/sunglasses.png"},
				'晴天':{idx:106,img:"imgs/emojis/sunny.png"},
				'大雨':{idx:107,img:"imgs/emojis/sweat_drops.png"},
				'游泳':{idx:108,img:"imgs/emojis/swimmer.png"},
				'打针':{idx:109,img:"imgs/emojis/syringe.png"},
				'竹子':{idx:110,img:"imgs/emojis/tanabata_tree.png"},
				'橙子':{idx:111,img:"imgs/emojis/tangerine.png"},
				'出租车':{idx:112,img:"imgs/emojis/taxi.png"},
				'弱爆了':{idx:113,img:"imgs/emojis/thumbsdown.png"},
				'好累啊':{idx:114,img:"imgs/emojis/tired_face.png"},
				'王者':{idx:115,img:"imgs/emojis/tiger.png"},
				'好急':{idx:116,img:"imgs/emojis/toilet.png"},
				'车站':{idx:117,img:"imgs/emojis/train.png"},
				'地铁站':{idx:118,img:"imgs/emojis/train2.png"},
				'高铁':{idx:119,img:"imgs/emojis/tram.png"},
				'我嘲笑你':{idx:120,img:"imgs/emojis/trollface.png"},
				'下午茶':{idx:121,img:"imgs/emojis/tropical_drink.png"},
				'自由自在':{idx:122,img:"imgs/emojis/tropical_fish.png"},
				'小乌龟':{idx:123,img:"imgs/emojis/turtle.png"},
				'革命情谊':{idx:124,img:"imgs/emojis/two_men_holding_hands.png"},
				'好姐妹':{idx:125,img:"imgs/emojis/two_women_holding_hands.png"},
				'不开心':{idx:126,img:"imgs/emojis/unamused.png"},
				'散步':{idx:127,img:"imgs/emojis/walking.png"},
				'x-box':{idx:128,img:"imgs/emojis/video_game.png"},
				'疲倦':{idx:129,img:"imgs/emojis/weary.png"},
				'眨眨眼':{idx:130,img:"imgs/emojis/wink.png"},
				'狗狗':{idx:131,img:"imgs/emojis/wolf.png"},
				'中年女人':{idx:132,img:"imgs/emojis/woman.png"},
				'女式衬衫':{idx:133,img:"imgs/emojis/womans_clothes.png"},
				'好担心':{idx:134,img:"imgs/emojis/worried.png"},
				'变心了':{idx:135,img:"imgs/emojis/yellow_heart.png"},
				'好吃吧':{idx:136,img:"imgs/emojis/yum.png"},
				'闪电':{idx:137,img:"imgs/emojis/zap.png"},
				'祖国的花朵':{idx:138,img:"imgs/emojis/tulip.png"},
				'装':{idx:139,img:"imgs/emojis/squirrel.png"},
				'你想干啥':{idx:140,img:"imgs/emojis/finnadie.png"},
				'最后一球':{idx:141,img:"imgs/emojis/8ball.png"},	
				'缆车':{idx:142,img:"imgs/emojis/aerial_tramway.png"},
				'拜拜':{idx:143,img:"imgs/emojis/airplane.png"},
				'可以有':{idx:144,img:"imgs/emojis/accept.png"},
				'看看几点了':{idx:145,img:"imgs/emojis/alarm_clock.png"},
				'请叫我哔哔':{idx:146,img:"imgs/emojis/alien.png"},
				'不要来看我':{idx:147,img:"imgs/emojis/ambulance.png"},
				'天屎':{idx:148,img:"imgs/emojis/angel.png"},
				'泰迪':{idx:149,img:"imgs/emojis/bear.png"},
				'我才是大黄蜂':{idx:150,img:"imgs/emojis/bee.png"},
				'喝奶奶':{idx:151,img:"imgs/emojis/baby_bottle.png"},
				'我是小鸟哔哔':{idx:152,img:"imgs/emojis/baby_chick.png"},
				'你就飘吧':{idx:153,img:"imgs/emojis/balloon.png"},
				'谁做的':{idx:154,img:"imgs/emojis/bamboo.png"},
				'香蕉':{idx:155,img:"imgs/emojis/banana.png"},
				'炫酷':{idx:156,img:"imgs/emojis/beginner.png"},
				'嘿嘿':{idx:157,img:"imgs/emojis/bikini.png"},
				'不要太感动':{idx:158,img:"imgs/emojis/birthday.png"},
				'你好毒':{idx:159,img:"imgs/emojis/blowfish.png"},
				'心碎了':{idx:160,img:"imgs/emojis/broken_heart.png"},
				'新娘':{idx:161,img:"imgs/emojis/bride_with_veil.png"}
				
	}
function expression(){//表情模板
			/*
		<div class="oya pa mt2 r0 scrollbar" id="chat_pop" style="width:402px;height:153px;">
			<ul class="cf cp db b_w1 b_s b_15" id="chat_brow">
			{{# for(var j in expressionData) { }}
						<li class="fl b_0 br_1 bb_1 b_s b_15 c_6" idx={{expressionData[j].idx}}> <img class="w25 h25 p5 " title = '{{j}}' src="{{expressionData[j].img}}"/></li>
			{{# } }}
			</ul>
		</div>
		*/
}
function cloudTemp(){//chat页面云端下载模板
		/*
		 <div class="fl w40 h20 m10 mt20 r3 lh20 tac" opt="search_type_3" data-name="search_type" style="margin-left:30px">全部</div>
		 <div class="fl w40 h20 m10 mt20 r3 lh20 tac" opt="search_type_1" data-name="search_type">私人</div>
		 <div class="fl w40 h20 m10 mt20 r3 lh20 tac" opt="search_type_2" data-name="search_type">收藏</div>
		 <div class="fl mt10 ml30">
		 <input type="text" placeholder="请输入名称" class="b_w1 b_s b_15 ti_2 w150 inputBorder"
		 	onfocus="javascript:this.placeholder=''" onblur="javascript:this.placeholder='请输入名称'" id="search_cloud"/>
		 </div>
		 <div class="wp c_20 mt20 h250 oh oya scrollbar">
			 <table class="vam wp" id="cloud_load_panel">
			 <table>
		 </div>
		 */
}
function cloudTableTemp(){//chat页面云端下载模板
	/*
	 {{# for(var i=0; i<d.items.length;i++) { }}
	 <tr class="h30 b_0 b_s b_15" data-uuid="{{d.items[i].uuid}}">
	 <td class="w90 pl30 lh20"><div class="w80 nowrap oh"><span class="highlight">{{d.items[i].name}}</span></div></td>
	 <td class="w110">{{d.items[i].date}}</td>
	 <td class="w80">{{d.items[i].author}}</td>
	 <td>
	 <div class="fl c_52"><img class="cp" title="查看" opt="check" src="imgs/rtdream/cloud_check.png"> </div>
	 <div class="fl w10 h10 ml20"><img opt="share" class="cp" title="分享" src="imgs/rtdream/cloud_share.png"></div>
	 </td>
	 </tr>
	 {{# } }}
	*/
}
/*
 * 1 NON_PAY未支付  2 PAY_SUCCESS已支付 3 REFUND_SUCCESS退款成功
   4 5 PLATFORM_DEAL 扫位平台处理中 6 THIRD_DEAL支付平台处理中 7 REFUND_FAIL退款失败 8 退款成功

 * /
 */



