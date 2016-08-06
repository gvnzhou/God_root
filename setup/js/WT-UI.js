'use strict';
/*global WT*/
/*global laytpl*/
/*global $DB*/

(function() {
    var color_picker_html = `
    <div class="blocks">

    </div>

    <div class="preview">
    <span>当前选择:</span>
    <div class="current-pick"></div>
    </div>

    <div class="alpha">
      <span>透明度:</span>

      <label value="1" class="checked">不透明</label>
      <label value="0.75">低透明</label>
      <label value="0.5">中透明</label>
      <label value="0.25">高透明</label>
    </div>
  `;

    var selectAll = function(elem, selector) {
        return [].slice.call(elem.querySelectorAll(selector));
    };
    var createColorBlock = function(h, s, l, a) {
        var elem = document.createElement('span');
        elem.className = 'block';
        elem.style.background = 'hsla(' + h + ',' + s + '%,' + l + '%,' + a + ')';
        elem.hsl = [h, s, l];
        return elem;
    }
    var selectedCallback = function() {};

    var ColorPicker = {
        init: function(container) {
            var color_picker = document.createElement('div');
            color_picker.className = 'color-picker';
            color_picker.innerHTML = color_picker_html;
            container.appendChild(color_picker);

            var __blocks = color_picker.querySelector('.blocks');
            var __current_pick = color_picker.querySelector('.current-pick');
            var __labels = selectAll(color_picker, '.alpha label');

            for (var l = 20; l < 80; l += 10) {
                for (var h = 0; h < 360; h += 16) {
                    __blocks.appendChild(createColorBlock(h, 80, l, 1));
                }
            }
            __blocks.appendChild(createColorBlock(h, 100, 100, 1));
            __blocks.appendChild(createColorBlock(h, 0, 0, 1));

            __blocks.addEventListener('click', function(e) {
                if (e.target.className === 'block') {
                    selectAll(color_picker, '.blocks .block').forEach(function(block) {
                        block.style.border = '2px solid #ccc';
                        block.selected = false;
                    });
                    e.target.style.border = '2px solid teal';
                    e.target.selected = true;
                    __current_pick.style.background = e.target.style.background;
                    selectedCallback(__current_pick.style.background);
                }
            });
            __labels.forEach(function(elem) {
                elem.addEventListener('click', function(e) {
                    __labels.forEach(function(__label) {
                        __label.className = '';
                    });

                    var val = e.target.getAttribute('value');
                    e.target.className = 'checked';
                    selectAll(color_picker, '.blocks .block').forEach(function(block) {
                        var h = block.hsl[0],
                            s = block.hsl[1],
                            l = block.hsl[2];
                        block.style.background = 'hsla(' + h + ',' + s + '%,' + l + '%,' + val + ')';
                        if (block.selected) {
                            __current_pick.style.background = block.style.background;
                            selectedCallback(__current_pick.style.background);
                        }
                    })
                })
            })

            return color_picker;
        },
        setColor: function(color_picker, color) {
            color_picker.querySelector('.current-pick').style.background = color;
        },
        getColor: function(color_picker) {
            return color_picker.querySelector('.current-pick').style.background;
        },
        setSelectedCallback: function(fn) {
            selectedCallback = fn;
        }
    };

    window.ColorPicker = ColorPicker;
})();

WT.UI = {};
WT.Util = {
	_fn: function() {},
	r: function() {
		this.base.r();
	},
	get: function(k) {
		return this.args[k];
	},
	set: function(k, v) {
		this.args[k] = v;
		return v;
	},
	show: function() {
		if (this.get('tips_mask')) {
			if (WT.$('tips_mask')) WT.$('tips_mask').show()
		}
		this.base.show();
	},
	hide: function() {
		if (this.get('tips_mask')) {
			if (WT.$('tips_mask')) WT.$('tips_mask').hide()
		}
		this.base.hide();
	},
	initArgs: function(oArgs, nArgs) {
		var _args = oArgs || {};
		for (var i in nArgs) {
			if (_args[i] == null) {
				_args[i] = nArgs[i];
			} else {
				if (i == 'p' || i == 'pBody') {
					_args[i] = WT.$(_args[i]);
				}
			}
		}
		return _args;
	}
};
WT.Tool ={};
WT.Tool = {
	groupClass: function(j) {
		var me = this;
		if (j) {
			me.items = j.items || [];
			me.sel = WT.$(j.sel) || null;
			var a = me.items;
			for (var i = 0; i < a.length; i++) {

				me.items[i] = (typeof a[i] === 'string') ? WT.$(a[i]) : a[i];
			}
		}
		me.change = function(elm, cn) {
			var _elm = typeof elm === 'number' ? me.items[elm] : WT.$(elm);
			if (_elm === me.sel) return;
			for (var i = 0; i < me.items.length; i++) {
				me.items[i].ac(cn)
			}
			_elm.dc(cn)
			me.sel = _elm;
		}
		return me;
	},
	printDate: function(date, is_utc){
		if (is_utc){
			var ret = date.toISOString();
			return '美东时间 '+ ret.split('.')[0].replace('T', ' ');
		} else {
	        var time_str = date.toTimeString().split(' ')[0];
	        var date_str = date.toLocaleString().split(' ')[0].split('/').slice(0, 3).join('-');
	        return '北京时间 '+ date_str + ' ' + time_str;
		}
	},
	listFilter: function(a, b) {
		var aFilter = [];
		for (var i = 0; i < a.length; i++) {
			if (a[i].text.indexOf(b) >= 0) {
				aFilter.push(a[i]);
			}
		}
		return aFilter;
	},
	ajax: function(j) {
	
		var url =  WT.url ;
		var me = this;
		WT.ext(me, WT.Util);
		var _args = {
			apiName: '/',
			param: {},
			ifShowTips: true,
			cbFn: {
				onSuccess: me._fn,
				onError: me._fn
			}
		};
		me.args = me.initArgs(j, _args);
		var ifShowTips = me.get('ifShowTips');
		var apiName = me.get('apiName');

		if (!apiName) {
			if (ifShowTips) {
				showTips('danger', '无此API')
			};
			return;
		}
		var apiParam = WT.toUrl(me.get('param'));
		//var method = WT.api[me.get('apiName')].method.toUp();

		var method = me.get('method');

		var callBackFn = me.get('cbFn');
		//console.log(['--> ', url + apiName, JSON.stringify(apiParam), method]);
		new WT.ajax(url + apiName, apiParam, {
			onSuccess: function(d) {
				var data = JSON.parse(d);
				callBackFn.onSuccess(data);
				if (ifShowTips) {
					showMsg(data.code, data.msg)
				}
				if(data.code === 406){				//token没有的情况，重新登录
					if(window.gui){
					var win = gui.Window.open('http://127.0.0.1:9557/zc_person_login.html', {
				        "title": "Trader",
				        "position": "center",
				        "frame": false,
						"icon": "trader.png",
				        "toolbar": false,
				        "focus": true,
				        "width": 350,
				        "resizable": false,
				        "height": 380,
				        "transparent": true
				    });
		            win.on('loaded', function(){
			        	window.close();
			    	});
				}else{
					location.href = 'zc_person_login.html';
				}
				}
			},
			onError: function(d) {
				try {
					var data = JSON.parse(d);
					callBackFn.onError(data);
					if (ifShowTips) {
						showMsg(data.code, data.msg)
					};
				} catch (e) {
					if (ifShowTips) {
						showMsg(600, webError[d])
					};
				}
			}
		}, method);

		function showMsg(code, msg) {
			var sta = ~~(+code / 100);
			var s = msg || '';
			if (s.length > 0) {
				switch (sta) {
					case 2:
						showTips('success', msg);
						break;
					case 4:
						showTips('danger', msg);
						break;
					case 5:
						showTips('danger', msg);
						break;
					case 6:
						showTips('danger', msg);
						break;
					default:
						showTips('danger', '未知状态');
						break;
				}
			}
			loadingHide();
		}
	}
}

WT.G.popDiv = $DB.adElm('', 'div').cn("pa oa").css("z-index:1");
WT.G.showPopElm = null;
WT.Util.initArgs = function(oArgs, nArgs) {
	var _args = oArgs || {};
	for (var i in nArgs) {
		if (_args[i] == null) {
			_args[i] = nArgs[i];
		} else {
			if (i == 'p' || i == 'pBody') {
				_args[i] = WT.$(_args[i]);
			}
		}
	}
	return _args;
}
WT.UI.Temp = {
	SelCellCount: function() {
		/*
		 {{# for(var i=0;i<25;i++){ }}
		 	<div idx={{i}} class="r2 w35 h35 m1 fl b_57 b_1s bc_50 {{i==0?'fc_1':''}}"></div>
		 {{# } }}
		 	<div id="canvas_sel_canvas_ping"></div>
		 	<hr style="height:1px;border:none;border-top:1px solid #DEDEDE; padding: 0 5px;"/>
		 	<div class="tac c_20">显示: 0行 X 0列<div>
		 */
	},
	ListSimple: function() {
		/*
			<ul>
				{{# for(var i=0;i<d.items.length;i++){ }}
					<li idx={{d.items[i].idx}} class="list h20 fs14 c_63 oh oh_text">{{d.items[i].text}}</li>
				{{# } }}
			</ul>
		 */
	},
	listTips1: function() {
		/*
			<div class="dib pb5 mt5 b_64 ml50 bc_67 fs12">
				<span class="dib pa ml40 l_table_triangle1"></span>
				<span class="dib pa ml40 l_table_triangle2"></span>
				<div class="mr10 ml10 cf ">
				<ul class="mt10 bc_61">
					<li>{{d.title}}</li>
					<li>
						<ul class="fl mt5 ml20 cf bc_61">
							{{# for(var i=0;i<d.items.length;i++){ }}
								<li idx={{d.items[i].idx}} class="mt10">{{d.items[i].val}}</li>
							{{# } }}
						</ul>
					</li>
				</ul>
				</div>
			</div>
		*/
	},
	calendar_head: function() {
		/*
			<div class="tac p2">
				<span opt="left" class="fa fa-arrow-left mr30 c_13"></span>
				<div class="dib">
					<select opt="head_month">
						{{# for(var i=0;i<d.month.length;i++){ }}
							{{# if(d.computeM == d.month[i].text){ }}
								<option selected idx={{d.month[i].idx}}>{{d.month[i].text}}</option>
							{{# }else{ }}
								<option idx={{d.month[i].idx}}>{{d.month[i].text}}</option>
							{{# } }}
						{{# } }}
					</select>
					<select opt="head_year">
						{{# for(var i=0;i<d.year.length;i++){ }}
							{{# if(d.computeY == d.year[i].text){ }}
								<option selected idx={{d.year[i].idx}}>{{d.year[i].text}}</option>
							{{# }else{ }}
								<option idx={{d.year[i].idx}}>{{d.year[i].text}}</option>
							{{# } }}

						{{# } }}
					</select>
				</div>
				<span opt="right" class="fa fa-arrow-right ml30 c_13"></span>
				<div opt="calendarWeek" class="pt10">
					{{# for(var i=0;i<d.dateHead.length;i++){ }}
						<span class="m0lr5 fwb">{{d.dateHead[i]}}</span>
					{{# } }}
				</div>
			</div>
		 */
	}


}

WT.UI.SelCellCount = function(j) {
		var me = this;
		me.comType = 'SelCellCount'; //增加反射
		WT.ext(me, WT.Util);
		var _args = {
			p: WT.G.popDiv,
			onClick: me._fn
		};
		me.args = me.initArgs(j, _args);
		var pan = me.args.p.adElm('', 'div')
			.cn('pa w200 ml5 pt55lr57 cp bg_1 b_58 b_1s List_bs_sign')
			.h(laytpl(WT.UI.Temp.SelCellCount.help()).render({}));
		me.base = pan;
		me.draw = function(idx) {
			if (idx) {
				var x = idx % 5 + 1;
				var y = ~~(idx / 5) + 1;
				for (var i = 0; i < 25; i++) {
					pan.chr(i)[i % 5 < x && ~~(i / 5) < y ? 'dc' : 'ac']('bc_50');
				}
				pan.chr(27).h('显示: '+y + "行 X " +x+'列');
				return [y, x];
			}
		}
		pan.evt('mouseover', function(e) {
				var e = WT.e.fix(e),
					_e = e.t;
				me.draw(_e.attr('idx'));
			})
			.evt('mousedown', function(e) {
				var e = WT.e.fix(e),
					_e = e.t;
				var idx = _e.attr('idx');
				if (idx) {
					me.args.onClick(me.draw(idx));
					me.hide();
					WT.G.popDiv.hide();
				}

			})

	}
	/********************tab***********************/
WT.UI.Tab = function(j) {
		var me = this;
		WT.ext(me, WT.Util);
		var _args = {
			p: $DB,
			items: [{
				opt: "tab1",
				text: "tab框1"
			}, {
				opt: "tab2",
				text: "tab框2"
			}, {
				opt: "home_right1",
				text: "没有权限1",
				disable: true
			}, {
				opt: "home_right2",
				text: "没有权限2",
				disable: true
			}],
			selItem:1,
			onItemClick: me._fn

		}
		me.args = me.initArgs(j, _args);
		var items = me.args.items;
		me.items = items;
		var layout = function() {
			me.base = me.get('p').adElm('', 'div');
			var elm = me.base;
			me.head = elm.adElm('', "div").cn("fs14").adElm('', "ul").cn("tab");
			me.content = me.head.pn().adElm("", "div");
			me.body = me.content;
			for (var i = 0; i < items.length; i++) {
				if (items[i].disable) {
					me.head.adElm("", "li").attr("opt", items[i].opt).attr("itemIdx", i).attr("disable", true).cn("tabDisable").h(items[i].text)
				} else {
					me.head.adElm("", "li").attr("opt", items[i].opt).attr("itemIdx", i).cn("tabDefault").h(items[i].text)
				}
			}
			me.selItem = me.head.chr(+me.args.selItem-1).dc("tabDefault").ac("tabDefault_focus");
		}
		var eventBind = function() {
			me.head.evt("click", function(e) {
				var e = WT.e.fix(e),
					_e = e.t;
				if (_e.tagName === "LI" && !_e.attr("disable")) {
					if (me.selItem) {
						me.selItem.dc("tabDefault_focus").ac("tabDefault");
					}
					_e.dc("tabDefault").ac("tabDefault_focus");
					me.selItem = _e;
					me.selItemIdx = _e.attr("itemIdx");
					//点击tab时，回调函数
					me.get('onItemClick')(me);
				}
			})
		}
		me.init = function() {
			layout();
			eventBind();
		}
		if (arguments.length) {
			me.init();
		}
		return me;
	}
	/********************TabPopUp(弹出框tab)***********************/
WT.UI.TabPopUp = function(j) {
	var me = this;
	WT.ext(me, WT.Util);
	var _args = {
		p: $DB,
		items: [{
			opt: "pop1",
			text: "tab框1"
		}, {
			opt: "pop2",
			text: "tab框2"
		}, {
			opt: "home_right1",
			text: "没有权限1",
			disable: true
		}, {
			opt: "home_right2",
			text: "没有权限2",
			disable: true
		}],
		onItemClick: me._fn

	}
	me.args = me.initArgs(j, _args);
	var items = me.args.items || [];
	me.items = items;
	me.base = me.get('p').adElm('', 'div');

	var elm = me.base;
	var layout = function() {
		me.head = elm.adElm("", "div").cn("fs14").adElm("", "ul").cn("tabPop");
		me.content = me.head.pn().adElm("", "div");
		me.body = me.content;
		for (var i = 0; i < items.length - 1; i++) {
			if (items[i].disable) {
				me.head.adElm("", "li").attr("opt", items[i].opt).attr("itemIdx", i).attr("disable", true).cn("tabPopDisable").css("width:" + Math.floor(100 / items.length) + "%;").h(items[i].text)
			} else {
				me.head.adElm("", "li").attr("opt", items[i].opt).attr("itemIdx", i).cn("tabPopDefault").css("width:" + Math.floor(100 / items.length) + "%;").h(items[i].text)
			}
		}
		if (items[items.length - 1].disable) {
			me.head.adElm("", "li").attr("opt", items[i].opt).attr("itemIdx", i).attr("disable", true).cn("tabPopDisable").css("width:" + parseInt(Math.floor(100 / items.length) + (100 % items.length)) + "%;").h(items[i].text)
		} else {
			me.head.adElm("", "li").attr("opt", items[i].opt).attr("itemIdx", i).cn("tabPopDefault").css("width:" + parseInt(Math.floor(100 / items.length) + (100 % items.length)) + "%;").h(items[i].text)
		}
	}
	var eventBind = function() {
		me.head.evt("click", function(e) {
			var e = WT.e.fix(e),
				_e = e.t;
			if (_e.tagName === "LI" && !_e.attr("disable")) {
				if (me.selItem) {
					me.selItem.dc("tabPopDefault_focus").ac("tabPopDefault");
				}
				_e.dc("tabPopDefault").ac("tabPopDefault_focus");
				me.selItem = _e;
				me.selItemIdx = _e.attr("itemIdx");
				//点击tab时，回调函数
				me.get('onItemClick')(me);
			}
		})
	}
	me.init = function() {
		layout();
		eventBind();
	}
	if (arguments.length) {
		me.init();
	}
	return me;
}
WT.UI.BaseDivH = function(j) {
	var me = this;
	var _super = WT.ext(me, WT.Util);
	var _args = {
		p: $DB,
		head_h: 0,
		foot_h: 0,
		skin: {
			base: {
				cn: '',
				css: ''
			},
			head: {
				cn: '',
				css: ''
			},
			body: {
				cn: '',
				css: ''
			},
			foot: {
				cn: '',
				css: ''
			}
		},
		onChange: me._fn
	};
	me.args = me.initArgs(j, _args);

	function layout() {
		var _oBase = me.args.skin.base,
			_oHead = me.args.skin.head,
			_oBody = me.args.skin.body,
			_oFoot = me.args.skin.foot;
		var baseCn = _oBase.cn || '',
			baseCss = _oBase.css || '',
			headCn = _oHead.cn,
			headCss = WT.box(',,' + me.args.head_h + ',') + _oHead.css,
			bodyCn = _oBody.cn,
			bodyCss = _oBody.css,
			footCn = _oFoot.cn,
			footCss = WT.box(',,' + me.args.foot_h + ',') + _oFoot.css;
		var base = me.args.p.adElm('', 'div').cn('hp ' + baseCn).css(baseCss);
		me.base = base;
		me.head = base.adElm('', 'div').cn('pa hp tl0 ' + headCn).css(headCss);
		me.body = base.adElm('', 'div').cn('pr hp' + bodyCn).css('margin-right:' + me.args.foot_h + 'px;margin-left:' + (me.args.head_h) + 'px;');
		me.foot = base.adElm('', 'div').cn('pa hp tr0 ' + footCn).css(footCss);
	}
	me.setHead = function(n) {
		me.head.css("width:" + n + "px");
		me.body.css('margin-left:' + n + 'px;');
		me.set("head_h", n);
	}
	me.setFoot = function(n) {
		me.foot.css("width:" + n + "px");
		me.body.css('margin-right:' + n + 'px;');
		me.set("foot_h", n);
	}
	me.init = function(j) {
		layout();
	}
	if (arguments.length) {
		me.init(j);
	}
	return me;
}
WT.UI.BaseDiv = function(j) {
	var me = this;
	WT.ext(me, WT.Util);
	var _args = {
		p: $DB,
		head_h: 0,
		foot_h: 0,
		ifFixedHeight: true,
		cn: '',
		css: '',
		onChange: me._fn
	};
	me.args = me.initArgs(j, _args);
	var _hh, _fh, ver = WT.$('').split(','),
		_ver1 = ver[0],
		_ver2 = +ver[1];

	_hh = me.args.head_h;
	_fh = me.args.foot_h;

	function layout() {
		var htmlTemp;
		if (me.args.ifFixedHeight) {
			htmlTemp = '<div class="pa wp " style="{0}"></div><div class="pa wp" style="{1}"><div class="hp pr"></div></div><div class="pa wp" style="{2}"></div>';
			htmlTemp = htmlTemp.format('height:' + _hh + 'px;', 'left:0;top:' + _hh + 'px;bottom:' + _fh + 'px;', 'bottom:0px;height:' + _fh + 'px;');
		} else {
			htmlTemp = '<div class="pa wp" style="{0}"></div><div class="scroll-webkit pa wp" style="{1}"></div><div class="pa wp" style="{2}"></div>';
			htmlTemp = htmlTemp.format('height:' + _hh + 'px;line-height:' + _hh + 'px;', 'height:auto;', 'height:' + _fh + 'px;line-height:' + _fh + 'px;');
		}
		me.base = me.args.p.adElm('', 'div').cn('pa wp hp tl0 ' + me.args.cn).css(me.args.css).h(htmlTemp);
		me.head = me.base.fc();
		me._body = me.head.ns();
		me.foot = me._body.ns();
		if (me.args.ifFixedHeight) {
			me.body = me._body.fc();
		} else {
			me.body = me._body;
			me.base.dc('pa wp hp tl0');
		}
	}
	me.setHead = function(v) {
		me.head.css("height:" + v + "px;");
		me.body.css("top:" + v + "px;");
		if (_ver1 == 'msie' && _ver2 < 7) {
			me._body.css("bottom:" + (_fh + v) + "px;");
		}
		me.set('head_h', v);
	}
	me.setFoot = function(v) {
		me.foot.css('height:' + v + 'px;');
		if (_ver1 == 'msie' && _ver2 < 7) {
			me._body.css('bottom:' + (v + _hh) + 'px;');
		}
		me._body.css('bottom:' + v + 'px;');
		me.set('foot_h', v);
	}
	me.init = function(j) {
		layout();
		return me;
	};

	if (arguments.length) {
		me.init(j);
	}
	return me;
}
WT.UI.Tips = function(j) {
	var me = this;
	var _super = WT.ext(me, WT.Util);
	var _args = {
		p: $DB,
		cn: '',
		css: '',
		title: '请设置弹框标题',
		body: '请设置弹框内容',
		w: 480,
		h: 640,
		ifCenter:false,//
		ifDrag: true,//ifDrag，ifCenter不能同时为true，否则ifCenter会覆盖ifdrag的样式
		//TODO:如果不居中，样式由css cn定
		tips_mask: true,
		foot_h:0,
		headBtn: [{
			opt: "setting",
			icon: "fa fa-cog"
		}, {
			opt: "home",
			icon: "fa fa-bar-chart"
		}],
		footBtn: [{
			opt: "cancle",
			text: "取消",
			type: "primary",
			icon: "fa fa-cog"
		}, {
			opt: "ok",
			text: "确认",
			type: "success",
			icon: "fa fa-home"
		}, {
			opt: "close",
			text: "关闭",
			type: "danger",
			icon: "fa fa-home"
		}],
		onClose: me._fn
	};
	me.args = me.initArgs(j, _args);
	//全局变量
	var initWH = WT.wh();
	var _base = null;
	var layout = function() {
		_base = new WT.UI.BaseDiv({
			p: me.get('p'),
			head_h: 20,
			foot_h:me.get('foot_h'),
			css: WT.box(',,' + me.get('w') + ',' + me.get('h')) + ";z-index:403;" + me.get('css'),
			cn: 'pa ' + me.get('cn')
		});
		_base.base.ac('tips_sign');
		me.base = _base.base;
		me.body = _base.body;
		var resizeBrowse = function(){
			if (document.body.clientHeight > 450) {
				if (me.get('ifDrag')) {
					var wh= WT.wh();
					initWH = wh;
					me.base.ac('shadow4 pa').css('left:' + (wh[0]-me.get('w') / 2) + 'px;top:' + (wh[1]-me.get('h') / 2) + 'px');
				}
				if(me.get('ifCenter')){
					me.base.ac('tl50p shadow4').css('margin-left:' + (-me.get('w') / 2) + 'px;margin-top:' + (-me.get('h') / 2) + 'px');
				}
				WT.drag.init(_base.head,me.base,0,initWH[0]*2-me.get('w')-5,0,initWH[1]*2-me.get('h')-5);
			}else{
				if (me.get('ifDrag')) {
					var wh= WT.wh();
					initWH = wh;
					me.base.ac('shadow4 pa').css('left:' + (wh[0]-me.get('w') / 2) + 'px;top:10px');
				}
				if(me.get('ifCenter')){
					me.base.ac('tl50p shadow4').css('margin-left:' + (-me.get('w') / 2) + 'px;margin-top:10px');
				}
				WT.drag.init(_base.head,me.base,0,initWH[0]*2-me.get('w')-5,0,10);
			}
				
		}
		resizeBrowse();
		if (me.get('tips_mask')) {
			if (WT.$("tips_mask")) {
				WT.$("tips_mask").show();
			} else {
				$DB.adElm("tips_mask", "div")
					.css("top:0;z-index:402")
					.cn("pf bc_64 hp wp dn pne")
					.show().alpha(10);
			}
		}
		$(_base.head).css('cursor: pointer;').ac('cf ml-5 pt3');
		me._baseHead = _base.head
			.adElm('', 'div').cn('fl ml5 fs16').h(me.get("title"));
		var headItem = me.get('headBtn');
		for (var i = 0; i < headItem.length; i++) {
			_base.head
				.adElm('', 'div').cn('pa').h('<i opt="' + headItem[i].opt + '" class="' + headItem[i].icon + ' cp"></i>').css("right:" + (20 * (i + 1) + 30) + "px;")
		}
		_base.head.adElm('', 'div').cn('p3 mr8 pa r0 cp').css('z-index:1000;')
			.evt('click', function() {
				var e = WT.e.fix(e),
					_e = e.t;
				e.stop();
				if (WT.$("tips_mask")) WT.$("tips_mask").hide();
				me.hide();
				me.get('onClose')();
			})
			.h('<img opt="headClose" src="imgs/rtdream/close.png" />')

		_base.body.ac("p5").h(me.get("body"));
		var btnFootTemp = function() {
			/*
			<div class="fs14">
			{{# for(var i=0;i<d.length;i++){ }}
				<button idx="{{i}}" opt="{{d[i].opt}}" class="btn {{d[i].type}}"><i class="{{d[i].icon}}"></i> {{d[i].text}}</button>
			{{# } }}
			</div>
			 */
		}

		_base.foot.adElm('', 'div').cn('p5 tar')
			.h(laytpl(btnFootTemp.help()).render(me.get('footBtn')));
		 
		
		 $(window).evt('resize',resizeBrowse);
		
	}
	me.init = function(j) {
		layout();
		return me;
	}

	if (arguments.length) {
		me.init(j);
	}
	return me;
}


WT.UI.ListSimple = function list(j) {
	var me = this;
	WT.ext(me, WT.Util);
	var _args = {
		p: $DB,
		items: [{
			idx: 1,
			text: "aaa"
		}, {
			idx: 2,
			text: "aaa"
		}, {
			idx: 3,
			text: "aaa"
		}, {
			idx: 4,
			text: "aaa"
		}, {
			idx: 5,
			text: "aaa"
		}],
		onItemClick: me._fn,
		ifCheckBox: false
	}
	me.args = me.initArgs(j, _args);
	var items = me.args.items;
	me.items = items;
	me.sel = null;
	var layout = function() {
		me.base = me.get('p').adElm('', 'div');
		var _elm = me.base;
		var _head = _elm.adElm('', 'div').cn('cf cp r2 b_63 h24 w140');
		var _head_div = _head.adElm('', 'div').cn('w100 nowrap oh_text mt4 h24 pl5 fl');
		_head.adElm('', 'div').cn('w20 h24 bc_66 fr r2').adElm('', 'i').cn('fa fa-angle-down ml5 mt3');

		var _body = _elm.adElm('', 'div').cn('w140 b_64 h200 oya oxh pa dn');
		var _body_input = _body.adElm('', 'input').cn('w140 h24 ml-1');
		var _body_li = _body.adElm('', 'div').h(laytpl(WT.UI.Temp.ListSimple.help()).render(me.args));
		me.head = _head;
		me.head_div = _head_div;
		me.body = _body;
		me.body_input = _body_input;
		me.body_li = _body_li;
	}

	var eventBind = function() {
		//点击实现toggle
		me.head.evt('click', function(e) {
			var e = WT.e.fix(e),
				_e = e.t;
			var _className = me.body.cn().ec('dn')
			if (_className) {
				me.body.dc('dn');
			} else {
				me.body.ac('dn');
			}
		});

		//在list中选择元素
		me.body.evt('click', function(e) {
			var e = WT.e.fix(e),
				_e = e.t;
			me.sel = _e.attr('idx');
			if (_e.tagName === 'LI') {
				me.head_div.ht(_e.ht());
				me.body.ac('dn');
			};
		});

		//元素匹配
		me.body_input.evt('keyup', function(e) {
			var e = WT.e.fix(e),
				_e = e.t;
			e.stop();
			if (_e.tagName === 'INPUT') {
				var b = _e.val().trim();
				var aFilter = WT.Tool.listFilter(items, b);
				var _p = {};
				_p.items = aFilter;
				me.render(_p);
				//me.body_li.h(laytpl(WT.UI.Temp.ListSimple.help()).render(_p));
			};
		})
	}

	me.render = function(d) {
		me.body_li.h(laytpl(WT.UI.Temp.ListSimple.help()).render(d));
	}

	me.init = function() {
		layout();
		eventBind();
	}
	if (arguments.length) {
		me.init();
	}
	return me;
}


WT.UI.ListTips1 = function list(j) {
		var me = this;
		WT.ext(me, WT.Util);
		var _args = {
			p: $DB,
			title: 'aaa',
			items: [{
				idx: 0,
				val: '文本描述000'
			}, {
				idx: 1,
				val: '文本描述111'
			}, {
				idx: 2,
				val: '文本描述222'
			}, {
				idx: 3,
				val: '文本描述333'
			}, {
				idx: 4,
				val: '文本描述444'
			}],
			onItemClick: me._fn
		}
		me.args = me.initArgs(j, _args);
		var items = me.args.items;
		me.items = items;

		var layout = function() {
			me.base = me.get('p').adElm('', 'div');
			me.render(me.args);
		}

		var eventBind = function() {
			// me.base.evt('mouseover',function(e){
			// 	var e=WT.e.fix(e),_e=e.t;
			// 	me.content.dc('dn');
			// })
			// me.base.evt('mouseout',function(e){
			// 	var e=WT.e.fix(e),_e=e.t;
			// 	me.content.ac('dn');
			// })
		}

		me.render = function(d) {
			me.base.h(laytpl(WT.UI.Temp.listTips1.help()).render(d));
		}
		me.init = function() {
			layout();
			eventBind();
		}
		if (arguments.length) {
			me.init();
		}
		return me;
	}
	/***********searchList**********/
WT.UI.searchList = function(j) {
		var $ = WT.$;
		var me = this;
		var timer = null;
		me.selElm = null;
		me.items = null;
		me.comType = 'searchList'; //增加反射
		WT.ext(me, WT.Util);
		var _args = {
			ifToLow: true,
			p: $DB,
			items: [],
			onClick: me._fn,
			onKeyUp: me._fn
		};
		me.args = me.initArgs(j, _args);
		var _baseDiv = new WT.UI.BaseDiv({
			p: me.get('p'),
			head_h: 26,
			foot_h: 0
		})
		me.base = _baseDiv.base;
		me.base.chr(0).ac('bc_10');
		_baseDiv.head.h('<input type="text" class="b0 b_65 lh15 bg_1 h20 p2 r2 w94p c_25 ti_2 searchIcon fs14" placeholder="搜索"/>');
		me.input = _baseDiv.head.fc();
		var _list = new WT.UI.List_bs({
			p: _baseDiv.body,
			ifIncr: false,
			ifCheckBox: false,
			items: me.get('items'),
			onClick: function(o) {
				me.sInput.val('');
				_list.items = _list.items.map(function(item, i) {
					if (+item.idx === +o.idx) {
						return {
							idx: item.idx,
							ifSelect: true,
							txt: item.txt,
							val: item.val
						}
					} else {
						return {
							idx: item.idx,
							txt: item.txt,
							val: item.val
						}
					}
				});
				_list.render();
				me.selElm = o;
				me.get('onClick')(o);
			}
		});
		_list.render();
		_list.show();
		_baseDiv.head.evt('click', function(e) {
			var e = WT.e.fix(e),
				_e = e.t;
			e.stop();
		})

		_baseDiv.head.evt('keyup', function(e) {
			var e = WT.e.fix(e),_e = e.t;
			e.stop();
			clearTimeout(timer);
	        timer = setTimeout(function(){

				if (_e.tagName === 'INPUT') {
					var _val;
					if (!me.get('ifToLow')) {
						_val = _e.val().trim();
					} else {
						_val = _e.val().toLow().trim();
					};
					var _a = [];
					_a = _list.items.filter(function(o) {
						if (!me.get('ifToLow')) {
							return o.txt.indexOf(_val) > -1;
						} else {
							return o.txt.toLow().indexOf(_val) > -1;
						}
					});
					_list.render(_a);
					me.get('onKeyUp')(me.input);
				}
	        }, 400);

		});
		me.show = function() {
			_list.show();
			me.base.show();
		}


		me.render = _list.render;
		me.setVal = function(v) {//FIX:函数使用无效，重新渲染请用search.render(list);
			_list.render(v);
			me.selElm = _list.setVal(v);
		};
		me.sInput = _baseDiv.head.fc();
}
	/***********select**************/
WT.UI.List_bs = function(j) {
	var $ = WT.$;
	var me = this;
	me.selElm = null;
	me.items = null;
	var defHead = [{
		txt: '',
		type: 'incr',
		w: 20
	}, {
		txt: '',
		type: 'checkbox',
		w: 20
	},{
		txt:'',
		type:'icon',
		w:20
	},{
		txt:'',
		type:'content',
		w:100
	},{
		txt:'',
		type:'save',
		w:20
	}];
	me.comType = 'List_bs'; //增加反射
	WT.ext(me, WT.Util);
	var _args = {
		p: $DB,
		ifIncr: false, //是否有自增列
		ifCheckBox: false, //是否有选择checkbox
		ifIcon:false,
		ifSave:false,
		ifRight:false,
		ifCenter:false,
		ifLeft:false,
		ifScroll:false,
		iftriangle:false,
		headOption: {
			txt: '',
			w: null
		},
		defHead:defHead,
		items: [],
		onClick: me._fn
	};
	me.args = me.initArgs(j, _args);
	me.items = me.get('items');
	me.base = me.get('p').adElm('', 'div').cn('list_bs bg_1 b_65 dn List_bs_sign pr'); //所有弹出组件放在z1
	me.ajaxData = function(apiName, param, cbFn) {};
	me.loadData = function() {};
	me.setVal = function(v) {
		for (var i = 0, l = me.items.length; i < l; i++) {
			var _it = me.items[i];
			if (_it.val === v) {
				var _tr = me.base.find('table')[0].rows[i];
				if (me.selElm) {
					me.items[me.selElm.y].ifSelect = null;
					changeTrColor(me.selElm.elm.pn(), _tr);
				} else {
					changeTrColor({}, _tr);
				}
				_it.ifSelect = true;
				me.selElm = {
					elm: _tr.find('td')[0],
					idx: _it.idx,
					val: _it.val,
					txt: _it.txt,
					x: 0,
					y: i
				};
				break;
			}
		}
		return me.selElm;
	};
	me.render = function(a) {
		a = (a instanceof Array) ? a : me.items;
		me.base.h('');
		if(me.get('iftriangle')){
			var _div = me.base.adElm('','div').ac('br_w7 b_s pa br_color1').css('margin-top:-14px');
			var _triangle = me.base.adElm('','div').ac('br_w6 b_s pa br_color').css('margin-top:-12px');
			if(me.get('ifRight')){_triangle.css('left:90%');_div.css('left:90%');}
			if(me.get('ifCenter')){_triangle.css('left:36%');_div.css('left:35%');}
			if(me.get('ifLeft')){_triangle.css('margin-left:5px');_div.css('margin-left:4px');}
		}
		var _tbody;
		if(me.get('ifScroll')){
			_tbody = me.base.adElm('', 'div').ac('h200 oh oya scrollbar2').adElm('', 'table').ac('fs14 c_25');
		}else{
			_tbody = me.base.adElm('', 'table').ac('fs14 c_25');
		}
		var _cg = _tbody.adElm('', 'colgroup');
		if (me.get('ifIncr')) _cg.adElm('', 'col').attr('width', me.get('defHead')[0].w + 'px;');
		if (me.get('ifCheckBox')) _cg.adElm('', 'col').attr('width', me.get('defHead')[1].w + 'px');
		if (me.get('ifIcon')) _cg.adElm('', 'col').attr('width', me.get('defHead')[2].w + 'px');
		if (me.get('ifSave')) {
			_cg.adElm('', 'col').attr('width', me.get('defHead')[3].w + 'px');
			_cg.adElm('', 'col').attr('width', me.get('defHead')[4].w + 'px');
		}

		for (var i = 0, l = a.length; i < l; i++) { //循环TD
			var _it = a[i];
			var _tr = WT.$(_tbody.insertRow(i));
			_tr.attr('idx', _it.idx); //.attr('tabindex',1);
			_tr.attr('val', _it.val);
			var _tdAry = [];
			if (me.get('ifIncr')) {
				_tdAry.push('<td>' + (i + 1) + '</td>');
			}
			if (me.get('ifCheckBox')) {
				_tdAry.push('<td><input type="checkbox" ' + (_it.ifSelect ? 'checked' : '') + '/></td>');
			}
			if (me.get('ifIcon')) {
				_tdAry.push('<td class="p3"> <img src='+ _it.imgSrc +' class="w15 h15"/> </td>');
			}
			var _td = _it.txt.length<10 ? '<td>' + _it.txt + '</td>' : '<td title="'+_it.txt+'">' + _it.txt + '</td>';//当内容超过15个字符会有title
			_tdAry.push(_td);

			if (me.get('ifSave')) {
				_tdAry.push('<td> <img opt="save" isSelect='+_it.isSelect+' src='+ _it.save +' /> </td>');
			}
			_tr.h(_tdAry.join(''));

			if (_it.ifSelect) {
				me.selElm = {
					elm: _tr.chr(0),
					idx: _it.idx,
					val: _it.val,
					txt: _it.txt,
					x: 2,
					y: i
				};
				changeTrColor({}, _tr);
			}
		}

		_tbody.evt('mousedown', function(e) {
			var e = WT.e.fix(e),
				_e = e.t;
			e.stop();
			while (_e.tagName != 'TABLE') {
				if (_e.tagName === 'TD') {
					if (me.selElm) {
						if (a[me.selElm.y]) a[me.selElm.y].ifSelect = null;
						changeTrColor(me.selElm.elm.pn(), _e.pn());

					} else {
						changeTrColor({}, _e.pn());
					}

					var rIdx = _e.pn().rowIndex;
					me.selElm = {
						elm: _e,
						items: a[rIdx],
						idx: +_e.pn().attr('idx'),
						val: a[rIdx].val,
						txt: a[rIdx].txt,
						x: _e.cellIndex,
						y: rIdx
					};
					a[rIdx].ifSelect = true;
				}
				_e = _e.pn();
			}
			if (!me.get('ifSave')) {
				me.hide();
			}
			me.get('onClick')(me.selElm);
		});
	}
	var changeTrColor = function(tr1, tr2) {
		for (var i in tr1.cells) {
			if (tr1.cells[i].tagName === 'TD') WT.$(tr1.cells[i]).dc('bc_opt1');
		}
		for (var i in tr2.cells) {
			if (tr2.cells[i].tagName === 'TD') WT.$(tr2.cells[i]).ac('bc_opt1');
		}
	}
	var fliterFn = function() {}
	me.init = function() {

	}
	if (arguments.length) {
		me.init();
	}
}
//form组件
WT.UI.Form= function(j){
	var $ = WT.$;
	var me = this;
	me.items = null;
	me.selElm = null;
	var F_input = null;
	me.comType = 'Form';
	WT.ext(me, WT.Util);
	var _args = {
			p: $DB,
			items:[
			]
		}
		me.args = me.initArgs(j, _args);
		me.items = me.get('items');
		me.base = me.get('p').adElm('', 'form').ac('wp');
		me.render = function(a){
			a = (a instanceof Array) ? a : me.items;
			for(var i=0; i<a.length;i++){
				var _it = a[i];
				if(_it.type!=='radio' && _it.type!== 'checkbox'&& _it.type!== 'select'&& _it.type!== 'img'&& _it.type!== 'textarea'&&_it.type!=='hr'){
					var F_input = me.base.adElm('','div').ac('mt3 fs14 wp');
					var F_input_pos = parseInt(F_input.pos().w);

						if(_it.span){
							var lab = F_input.adElm('','span').ac('c_25 mr2 w60 tar dib').h(_it.span+':');
							var lab_pos = parseInt(lab.pos().w);
						}
						if(_it.Icon){
							 F_input.adElm('','label').ac('fa c_28 ml5').ac(_it.Icon);
						}
						var _input_w = F_input_pos-lab_pos-20;
						var _input = F_input.adElm('','input').attr('type',_it.type).ac('c_25 p2 bc_opt4 ti_1').css('width:'+_input_w+'px').attr('placeholder',_it.tips);
						if(_it.val){_input.attr('value',_it.val)}
						if(_it.idx){_input.attr('id',_it.idx)}
						if(_it.Rcon){F_input.adElm('','label').ac('fa c_28 p2').ac(_it.Rcon);}
						if(_it.h){
							if(_it.h==='xs'){
								_input.ac('input_xs')}else if(_it.h==='ms'){
									_input.ac('input_sm')}else if(_it.h==='lg'){
										_input.ac('input_lg')}else if(_it.h==='xl'){
											_input.ac('input_xl')}else{_input.ac('input_md')}
						}
					if(_it.val){_input.attr('value',_it.val)}
					if(_it.state==='disabled'){_input.attr('disabled','disabled').ac('bc_16 c_12')}
					if(_it.msgLevel==='error'){_input.ac('b_w1 b_s b_41 input_danger')}else if(_it.msgLevel==='warning'){_input.ac('b_w1 b_s b_42 input_warning')}else if(_it.msgLevel==='success'){_input.ac('b_w1 b_s b_46  input_success')}else{_input.ac('b_w1 b_s b_3')}
				}
				if(_it.type=='radio'){
					var F_radio = me.base.adElm('','div').ac('dib mt10 cf');
					if(_it.span){F_radio.adElm('','div').h(_it.span+':').ac('fl c_25 fs14 mr10 w60 tar')}
					var _radio =F_radio.adElm('','input').ac('dn').attr('type',_it.type).attr('name',_it.uname).attr('id',_it.idx).attr('value',_it.val);
					F_radio.adElm('','label').attr('for',_it.idx).ac('ro_ch ml5');
					if(_it.state){
						if(_it.state==='disabled'){
							_radio.attr('disabled','disabled')
							}else if(_it.state==='checked'){
								_radio.attr('checked','checked')
								}
						}
					if(_it.txt){F_radio.adElm('','label').h(_it.txt).ac('c_25 fs14 ml5')}
				}
				if(_it.type==='checkbox'){
					var _ckdiv = me.base.adElm('','div').ac('dib mt10 cf');
					if(_it.span){_ckdiv.adElm('','div').h(_it.span+':').ac('fl c_25 fs14 mr10 w60 tar')}
					var _check = _ckdiv.adElm('','input').ac('dn').attr('type',_it.type).attr('name',_it.uname).attr('id',_it.idx).attr('value',_it.val).ac('ml10');
					var _clabel = _ckdiv.adElm('','label').attr('for',_it.idx).ac('fl');
					if(!_it.switchType){
						_clabel.ac('choseBox');
					}else{
						if(_it.checkStyle==='lg'){_clabel.ac('ui_switch_lg')}else if(_it.checkStyle==='sm'){_clabel.ac('ui_switch_sm')}else{_clabel.ac('ui_switch')}
						}
					if(_it.state){
							if(_it.state==='disabled'){
								_check.attr('disabled','disabled')
								}else if(_it.state==='checked'){
									_check.attr('checked','checked')
									}
						}
					if(_it.txt){_ckdiv.adElm('','label').h(_it.txt).ac('c_25 fs14 ml5 mr10 fl')}
				}
				if(_it.type==='select'){
					var F_select = me.base.adElm('','div').ac('mt3');
					if(_it.span){F_select.adElm('','span').h(_it.span+':').ac('c_25 fs14 w60 tar dib')}
					var selc = F_select.adElm('','span').ac('b_w1 b_s b_3 cp fs14 dib c_25 pt3l8').css('width:'+_it.width+'px').h('请选择');
						var _pos=selc.pos();
						var list = F_select.adElm('','div').ac('pa b_w1 b_s b_3 dn');
						list.css(WT.box([_pos.x,_pos.y+_pos.h,_pos.w,150].join(',')));
						var _select = new WT.UI.List_bs({
								p:$(list),
								ifIncr: false,
								ifCheckBox: false,
								items:_it.options,
								onClick: function(o) {
									$(selc).ht(o.txt);
									$(list).hide();
								}
							});

					selc.evt('click',function(){
						$(list).show();
						_select.render();
						_select.show();
					});
				}
				if(_it.type==='img'){
					var F_img = me.base.adElm('','div').ac('mt3');
					if(_it.span){F_img.adElm('','span').ac('c_25 fs14 w60 tar dib').h(_it.span+':')}
					var img = F_img.adElm('','img').attr('src',_it.src).css('height:'+_it.height+'px').css('width:'+_it.width+'px');
				}
				if(_it.type==='textarea'){
					var F_textarea = me.base.adElm('','div').ac('mt3');
					if(_it.span){F_textarea.adElm('','span').ac('c_25 fs14 w60 tar dib').h(_it.span+':')}
					F_textarea.adElm('','textarea').attr('cols',_it.cols).attr('rows',_it.rows).ac('bc_opt4 c_25 b_w1 b_s b_3').h(_it.val);
				}
				if(_it.type==='hr'){
					var F_hr = me.base.adElm('','div');
					F_hr.adElm('','hr');
				}
			}
		}
		me.setVal = function(i,j,v){
					var _elem = me.base.chr(i).chr(j);
					_elem.value = v;
		}
		me.getVal = function(){
			var val = [];
			for (var i = 0, l = me.items.length; i < l; i++) {
				var _it = me.items[i];
					me.selElm = {
						elm: _it.type,
						idx: _it.idx,
						val: me.base.chr(i).chr(1).value || _it.val
					}
					val.push(me.selElm);
			}
			return val;
		}
		me.init = function(){
			me.render();
		}
		me.init();
//		return me;
}




WT.UI.F_plusminus = function(j) {
	var me = this;
	me.comType = 'F_plusminus';
	WT.ext(me, WT.Util);
	var _args = {
		p: $DB,
		val: 0,
		step: 1,
		max: 100,
		min: 0
	}
	me.args = me.initArgs(j, _args);
	var min = me.get('min');
	var max = me.get('max');
	var step = me.get('step');
	var plus, minus;
	me.setInput = function(val) {
		if (+val >= min && +val <= max) {
			me.input.val(val);
			return me.set('val', +val);
		}
	}
	me.getVal = function() {
		return me.get('val');
	}
	var up = function() {
		var _v = +me.input.val();
		_v = (_v + step) > max ? max : (_v + step);
		return me.set('val', _v);
	}
	var down = function() {
		var _v = +me.input.val();
		_v = (_v - step) < min ? min : (_v - step);
		return me.set('val', _v);
	}
	var layout = function() {
		var _elm = me.base = me.get('p').adElm('', 'div');
		minus = _elm.adElm('', 'button');
		minus.adElm('', 'span').cn('fa fa-minus');
		me.input = _elm.adElm('', 'input');
		plus = _elm.adElm('', 'button');
		plus.adElm('', 'span').cn('fa fa-plus');
	}
	var eventBind = function() {
		minus.evt('click', function() {
			me.input.val(down(+me.input.val()));
		})
		plus.evt('click', function() {
			me.input.val(up(+me.input.val()));
		})
		me.input.evt('keyup', function(e) {
			var e = WT.e.fix(e),
				_e = e.t;
			_e.val(_e.val().replace(/[^0-9]/g, ''));
		});
	}
	me.init = function() {
		layout();
		eventBind();
		me.input.val(me.get('val'));

	}
	if (arguments.length) {
		me.init();
	}
	return me;
}

WT.UI.F_keyPan = function(j) {
	/*
	{
	    type: "KeyPanel",
	    desc: "键盘面板",
	    args: {
	        p: { desc: '父容器', defVal: $DB, dataType: 'DOM' },
	        keys: { desc: '键值', defVal: '1,2,3,C,4,5,6,←,7,8,9,-,0,.', dataType:'string' },
	        banKeys: { desc: '不启用的键', defVal: '', dataType: 'DOM' },
	        onClick: { desc: '回调每个键的Click事件', defVal: function (){}, dataType: 'function' }
	    }
	}
	*/
	var me = this;
	me.comType = 'F_keyPan';
	WT.ext(me, WT.Util);
	var base;
	var _args = {
		p: $DB,
		keys: '1,2,3,C,4,5,6,←,7,8,9,-,0,.',
		banKeys: '',
		onClick: me._fn
	};
	me.args = me.initArgs(j, _args);

	function layout() {
		me.base = base = me.get('p').adElm('', 'div').cn('KeyPanel');
		base.appendChild(toHtml());

		base.onselectstart = function() {
			return false;
		}
	}

	var eventBind = function() {
		base.evt('click', function(e) {
			var e = WT.e.fix(e),
				_e = e.t;
			e.stop();
			if (!_e.cn().ec('disabled') && _e.tagName === 'A') {
				me.get('onClick')(_e.ht());
			}
		});
	}

	function toHtml() {
		var _a = me.get('keys').split(','),
			_n = parseInt(Math.sqrt(_a.length) + 1);
		var sObj = {},
			_dKeys = me.get('banKeys').split(',');
		for (var i = 0, _len = _dKeys.length; i < _len; i++) {
			sObj[_dKeys[i]] = 1;
		}
		var _w = me.get('p').csn('width') / _n - 10,
			_h = me.get('p').csn('height') / _n - 5;
		var fg = $Fg(),
			_css = 'height:{0}px;line-height:{0}px;width:{1}px;';
		_a.ec(function(i) {
			var _v = this[i];
			var _key = fg.adElm('', 'a').h(_v).css(_css.format(_h, _w));
			if (sObj[_v]) {
				_key.ac('disabled');
			}
		});
		return fg;
	}
	me.resize = function() {
		base.h('').appendChild(toHtml());
		return me;
	}
	me.init = function(j) {
		layout(j);
		eventBind();
	}
	if (arguments.length) {
		me.init(j);
	}
	return me;
}

WT.UI.F_calendar = function(j) {
	var me = this;
	me.comType = 'F_calendar';
	WT.ext(me, WT.Util);
	//--------------------
	//NOTICE:getNyear()函数必须放在此处，不然有错误
	//获取年份数组，f前f年(包括当年)，n后n年
	var getNyear = function(f,n,dStr){
		var _year = [];
		var _d=dStr?new Date(dStr[0],dStr[1],dStr[2]):new Date();
		var _nYear = _d.getFullYear();
		var _upYear = _nYear-f;
		for(var i=0; i<f+n; i++){
			_year.push({idx:i,text:++_upYear})
		}
		return _year;
	}
	var yearMin = 2;
	var yearMax = 2;
	var itemsYear = getNyear(yearMin,yearMax,[2016,8,2]);
	var today = new Date();
	var todayY = today.getFullYear();
	var todayM = today.getMonth()+1;
	//-------------------
	var _args = {
		p: $DB,
		defDate:(new Date().date2Str()).split(' ')[0],//2016-1-2 10:12:32
		computeM:todayM,
		computeY:todayY,
		dateHead:['日','一','二','三','四','五','六'],
		month:[{idx:1,text:1},{idx:2,text:2},{idx:3,text:3},{idx:4,text:4},{idx:5,text:5},{idx:6,text:6},{idx:7,text:7},{idx:8,text:8},{idx:9,text:9},{idx:10,text:10},{idx:11,text:11},{idx:12,text:12}],
		year:itemsYear,
		headClick: me._fn,
		bodyClick: me._fn
	}
	me.args = me.initArgs(j, _args);
	var c_date, _baseDiv,_body;

	me.computDate = me.get('defDate');
	me.setTime = me.get('defDate');
	//设置年份，dStr：日期（2016-1-1）；min：相对于dstr的前min年；max：后max年
	me.setDate =function(dStr,min,max){
		me.setTime = dStr;
		var _a=dStr?dStr.split('-'):me.get('defDate').split('-');
		me.args.year = getNyear(min,max,_a);
		me.args.computeM = _a[1];
		me.args.computeY = _a[0];
		me.computDate = _a;
		_baseDiv.head.h(laytpl(WT.UI.Temp.calendar_head.help()).render(me.args));
		drawMonth(dStr);
	}

	var layout = function() {
		var _b = me.base = me.get('p').adElm('', 'div');
		_b = _b.adElm('', 'div').cn('h300 w300 pa ml5 b_18 mt3');
		_baseDiv = new WT.UI.BaseDiv({
			p: _b,
			head_h: 50,
			foot_h: 0
		})
		_baseDiv.head.adElm('', 'div').h(laytpl(WT.UI.Temp.calendar_head.help()).render(me.args));
		_body = _baseDiv.body.ac('mt5');
		drawMonth();
	}
	//画月份
	var drawMonth = function(dStr){
		var _a=dStr?dStr.split('-'):me.get('defDate').split('-');
		dStr=(_a[0]+'-'+_a[1]+'-'+'1');
		me.computDate = (_a[0]+'-'+_a[1]+'-'+_a[2]);
		var _d1=new Date(dStr);
		var _day = new Date(dStr).getDay();
		_d1.setDate(_d1.getDate()-_day-1);
		var _month=new Date(dStr).getMonth();
		var dTmp='<div class="dib"><span dStr={4} class="dib cp tac pt10 {3}" isDisabled={5} isTody={6} isSelect={7} style="height:{0}px;width:{1}px">{2}</span></div>';
		var _dateAry=[];
		var _h = (_body.csn('height')-4)/6-10;
		var _w = (_body.csn('width')-4)/7;

		for(var i=0;i<42;i++){
			_d1.setDate(_d1.getDate()+1);
			if(today.date2Str().split(' ')[0] === _d1.date2Str().split(' ')[0]) {//今天
				_dateAry.push(dTmp.format(_h,_w,_d1.getDate(),'bc_17',_d1.date2Str().split(' ')[0],(_month==_d1.getMonth())? 0 : 1,1,0))
			}else if(me.selElm && me.selElm.attr('dstr')===_d1.date2Str().split(' ')[0]){//选中
				_dateAry.push(dTmp.format(_h,_w,_d1.getDate(),'bc_18',_d1.date2Str().split(' ')[0],(_month==_d1.getMonth())? 0 : 1,0,1))
			}else{//其他
				_dateAry.push(dTmp.format(_h,_w,_d1.getDate(),(_month==_d1.getMonth())?'c_10 F_calendar':'c_17 cna',_d1.date2Str().split(' ')[0],(_month==_d1.getMonth())? 0 : 1,0,0))
			}
		}
		_body.h(_dateAry.join(''));
	}
	//参数：1加一个月 -1 减一个月
	var monthDo = function(n){
		var _d1= new Date(me.computDate);
		_d1.setMonth(_d1.getMonth()+1*n);
		drawMonth(_d1.date2Str().split(' ')[0]);
		me.computDate=_d1.date2Str().split(' ')[0];
		var _computeD = me.computDate.split('-');
		me.args.computeM=_computeD[1];
		me.args.computeY=_computeD[0];
		return 1;
	}
	var eventBind = function() {
		me.base.evt('click',function(e){
			var e = WT.e.fix(e),_e = e.t;
			e.stop();
			if(_e.attr('opt') == 'head_month'){//月
				_e.evt('change',function(e){
					var _d1= new Date(me.computDate);
					_d1.setMonth(+_e.value-1);
					drawMonth(_d1.date2Str().split(' ')[0]);
					me.computDate=_d1.date2Str().split(' ')[0];
				})
			}else if(_e.attr('opt') === 'head_year'){//年
				_e.evt('change',function(e){
					var _d1= new Date(me.computDate);
					_d1.setYear(+_e.value);
					drawMonth(_d1.date2Str().split(' ')[0]);
					me.computDate=_d1.date2Str().split(' ')[0];
				})
			}else if(_e.attr('opt') === 'left'){//左TODO:向左添加月份约束
				if ((+(me.setTime.split('-')[0])-yearMin+1) <= +me.computDate.split('-')[0]){
					monthDo(-1) && _baseDiv.head.h(laytpl(WT.UI.Temp.calendar_head.help()).render(me.args));
					//console.log(me.computDate);
				}
				else
					alert('不在区间内');
			}else if(_e.attr('opt') === 'right'){//右TODO:向右添加月份约束
				if ((+(me.setTime.split('-')[0])+yearMax) >= +me.computDate.split('-')[0]){
					monthDo(1) && _baseDiv.head.h(laytpl(WT.UI.Temp.calendar_head.help()).render(me.args));
					//console.log(me.computDate);
				}
				else
					alert('不在区间内');
			}else if(_e.tagName === 'SPAN' && _e.attr('isDisabled') === "0"){//选中日期，显示在input中
				if (me.selElm) {
					me.selElm.dc('bc_18');
					me.selElm.attr('isSelect',"0");
					if ( _e.attr('isTody') !== "0") {
						me.selElm.ac('F_calendar');
					}
				}
				me.selElm = _e;
				_e.dc('F_calendar');
				_e.ac('bc_18');
				me.selElm.attr('isSelect',"1");
				me.get('bodyClick')(_e);//点击日期后的回调函数，参数： _e.attr('dStr')即获取的日期
			}
		})
	}
	me.init = function() {
		layout();
		eventBind();
	}
	if (arguments.length) {
		me.init();
	}
	return me;
}

WT.UI.F_D_calendar = function(j){
	var me = this;
	me.comType = 'F_D_calendar';
	WT.ext(me, WT.Util);

	var _args = {
		p: $DB,
		DateF:(new Date().date2Str()).split(' ')[0],//2016-1-2 10:12:32
		DateT:(new Date().date2Str()).split(' ')[0],//2016-1-2 10:12:32
		applyClick: me._fn,
		cancleClick: me._fn
	}
	me.args = me.initArgs(j, _args);
	var _applyBtn,_cancelBtn,_dFrom,_dTo,_from,_to,F_calendarFrom,F_calendarTo;
	var layout = function() {
		var _b = me.base = me.get('p').adElm('', 'div');
		var _dMsg = _b.adElm('','div').cn('b_1 fl w350 h250 b_1');
		_dMsg.adElm('','div').cn('mt10').h(`
			 	<span class="ml70">选择时间段</span>
				`);
		_dFrom = _dMsg.adElm('','div').adElm('','input').cn('ml5 w100');
		_dTo = _dFrom.pn().adElm('','input').cn('w100');
		_applyBtn = _dMsg.adElm('','div').adElm('','button').cn('m15').ht('确定');
		_cancelBtn = _applyBtn.pn().adElm('','button').cn('m15').ht('取消');

		var cal_from = _b.adElm('','div').cn('fl w350 h250 b_1');
		var cal_to = _b.adElm('','div').cn('fl w350 h250 b_1');

		var argsF = {
			p:WT.$(cal_from),
			bodyClick:bodyClick_a
		}
		var argsT = {
			p:WT.$(cal_to),
			bodyClick:bodyClick_b
		}
		F_calendarFrom = new WT.UI.F_calendar(argsF);
		F_calendarTo = new WT.UI.F_calendar(argsT);
		WT.$(_dFrom).val(me.args.DateF);
		WT.$(_dTo).val(me.args.DateF);
	}
	var eventBind = function() {
		WT.$(_applyBtn).evt('click',function(e){
			var e = WT.e.fix(e),_e = e.t;
			_from = WT.$(_dFrom).val();
			_to = WT.$(_dTo).val();
			var _dt1 = new Date(_from);
			var _dt2 = new Date(_to);
			if (_dt1>_dt2) {
				var _tp = _from;
				_from = _to;
				_to = _tp;
			}
			console.log(_from,_to)
			me.get('applyClick')(_from,_to);//点击apply按钮的回调函数，_from,_to记录了开始和结束时间
		})
		WT.$(_cancelBtn).evt('click',function(e){
			var e = WT.e.fix(e),_e = e.t;
			$(_dFrom).val(me.args.DateF);
			$(_dTo).val(me.args.DateF);
			me.get('cancleClick')(_from,_to);//取消按钮回调函数，_from,_to记录了开始和结束时间
		})
	}
	function bodyClick_a(_e){
		WT.$(_dFrom).val(_e.attr("dstr"));
	}
	function bodyClick_b(_e){
		WT.$(_dTo).val(_e.attr("dstr"));
	}
	me.init = function() {
		layout();
		eventBind();
	}
	if (arguments.length) {
		me.init();
	}
	return me;
}

/*************tab_upgrade******************/
WT.UI.tab_upgrade = function(j) {
	var me = this;
	me.comType = 'tab_upgrade';
	WT.ext(me, WT.Util);
	var _args = {
		p: $DB,
		items: [{
			opt: "tab1",
			text: "tab框1",
			disable: 0,
			content:"111111",
			visibled:1
		}, {
			opt: "tab2",
			text: "tab框2",
			disable: 0,
			content:"22222",
			visibled:1
		},{
			opt: "tab3",
			text: "tab框3",
			disable: 0,
			content:"3333333",
			visibled:0
		},{
			opt: "home_right1",
			text: "没有权限1",
			disable: 1,
			content:"444444",
			visibled:1
		}, {
			opt: "home_right2",
			text: "没有权限2",
			disable: 1,
			content:"555555",
			visibled:0
		}],
		css:{
			tab:{
				head:"tab",
				default:"tabDefault",
				disable:"tabDisable",
				focus:"tabDefault_focus"
			},
			tabPop:{
				head:"tabPop",
				default:"tabPopDefault",
				disable:"tabPopDisable",
				focus:"tabPopDefault_focus"
			}
		},
		skin:"skin1",
		selItem:1,
		onItemClick: me._fn
	}
	me.args = me.initArgs(j, _args);

	me.items = me.args.items;
	var css = me.args.css;
	var Layout = function(head,_def,disable,focus) {
		me.base = me.get('p').adElm('', 'div');
		var elm = me.base;
		me.head = elm.adElm('', "div").cn("fs14").adElm('', "ul").cn(head);
		me.content = me.head.pn().adElm("", "div");
		me.body = me.content;
		var _a = [];
		for(var i=0; i<me.args.items.length; i++){//将属性visible为1添加至数组
			if (+me.args.items[i].visibled === 1) {
				_a.push(me.args.items[i]);
			}
		}
		//显示顺序跟item元素数组位置对应
		if (me.args.skin === "skin1" || !me.args.skin) {//FIX:"me.content.adElm('','div')..."6句重复代码
			for (var i = 0; i < _a.length; i++) {
				if (+_a[i].disable === 0) {
					me.head.adElm("", "li").attr("opt", _a[i].opt).attr("itemIdx", i).attr("disable", "0").cn(_def).h(_a[i].text);
					me.content.adElm('','div').attr("conIdx", i).cn('b_1 dn').h(_a[i].content);
				}else {
					me.head.adElm("", "li").attr("opt", _a[i].opt).attr("itemIdx", i).attr("disable", "1").cn(disable).h(_a[i].text);
					me.content.adElm('','div').attr("conIdx", i).cn('b_1 dn').h(_a[i].content);
				}
			}
		}else if (me.args.skin === "skin2") {
			for (var i = 0; i < _a.length - 1; i++) {
				if (+_a[i].disable === 0) {
					me.head.adElm("", "li").attr("opt", _a[i].opt).attr("itemIdx", i).attr("disable", "0").cn(_def).css("width:" + Math.floor(100 / _a.length) + "%;").h(_a[i].text)
					me.content.adElm('','div').attr("conIdx", i).cn('b_1 dn').h(_a[i].content);
				} else {
					me.head.adElm("", "li").attr("opt", _a[i].opt).attr("itemIdx", i).attr("disable", "1").attr("disable", "1").cn(disable).css("width:" + Math.floor(100 / _a.length) + "%;").h(_a[i].text)
					me.content.adElm('','div').attr("conIdx", i).cn('b_1 dn').h(_a[i].content);
				}
			}
			if (_a[_a.length - 1].disable === 0) {
				me.head.adElm("", "li").attr("opt", _a[i].opt).attr("itemIdx", i).cn(_def).attr("disable", "0").css("width:" + parseInt(Math.floor(100 / _a.length) + (100 % _a.length)) + "%;").h(_a[i].text)
				me.content.adElm('','div').attr("conIdx", i).cn('b_1 dn').h(_a[i].content);
			} else {
				me.head.adElm("", "li").attr("opt", _a[i].opt).attr("itemIdx", i).attr("disable", "1").attr("disable", "1").cn(disable).css("width:" + parseInt(Math.floor(100 / _a.length) + (100 % _a.length)) + "%;").h(_a[i].text)
				me.content.adElm('','div').attr("conIdx", i).cn('b_1 dn').h(_a[i].content);
			}
		}
		me.selItem = me.head.chr(+me.args.selItem-1).dc(_def).ac(focus);
		me.selContent = me.content.chr(+me.args.selItem-1).dc('dn');
	}

	var eventBind = function(focus,_def){
		me.head.evt("click", function(e) {
			var e = WT.e.fix(e),
				_e = e.t;
			if (_e.tagName === "LI" && _e.attr("disable")==='0') {
					if (me.selItem) {
						me.selItem.dc(focus).ac(_def);
						me.selContent.ac('dn');
					}
					_e.dc(_def).ac(focus);
					me.selItem = _e;
					me.selItemIdx = _e.attr("itemIdx");
					me.selContent = me.content.chr(me.selItemIdx).dc('dn');
					//点击tab时，回调函数
					me.get('onItemClick')(me.selItem);
				}else if(_e.tagName === "LI" && _e.attr("disable")==='1'){
					me.get('onItemClick')(me.selItem);
			}
		})
	}
	//重新设置items,可以设置皮肤样式（不输入skin为tab默认样式）
	me.setItems = function(items,skin){
		me.args.items = items;
		if (!skin)
			me.setSkin(me.args.skin);
		else
			me.setSkin(skin);
	}
	//设置skin，参数（"skin1","skin2"）,不输入参数为skin1
	me.setSkin = function(skin){
		me.base.r();
		if (skin === "skin1" || !skin) {
			me.args.skin = "skin1";
			Layout(css.tab.head,css.tab.default,css.tab.disable,css.tab.focus);
			eventBind(css.tab.focus,css.tab.default);
		}else if (skin === "skin2") {
			me.args.skin = "skin2";
			Layout(css.tabPop.head,css.tabPop.default,css.tabPop.disable,css.tabPop.focus);
			eventBind(css.tabPop.focus,css.tabPop.default);
		}
	}
	me.init = function() {
		if (me.args.skin === "skin1" || !me.args.skin) {
			Layout(css.tab.head,css.tab.default,css.tab.disable,css.tab.focus);
			eventBind(css.tab.focus,css.tab.default);
		}else if(me.args.skin === "skin2"){
			Layout(css.tabPop.head,css.tabPop.default,css.tabPop.disable,css.tabPop.focus);
			eventBind(css.tabPop.focus,css.tabPop.default);
		}
	}
	if (arguments.length) {
		me.init();
	}
	return me;
}

WT.UI.List_bs2 = function(j) {
	var $ = WT.$;
	var me = this;
	me.selElm = null;
	me.items = null;
	me.comType = 'List_bs2'; //增加反射
	me.chkAry = [];//checkbox选中的元素
	WT.ext(me, WT.Util);
	var _args = {
		p: $DB,
		ifIncr: false, //是否有自增列
		ifCheckBox: false, //是否有选择checkbox
		headOption: {
			txt: '',
			w: null
		},
		items: [],
		defHead:[{
			txt: '',
			type: 'incr',
			w: 0
		}, {
			txt: '',
			type: 'checkbox',
			w: 0
		}],
		width:0,
		onChkAry: me._fn,
		onSelElm: me._fn
	};
	me.args = me.initArgs(j, _args);
	me.items = me.get('items');
	if (me.get('width'))
		me.base = me.get('p').adElm('', 'div').cn('grid fl h400 oa').css('width:'+me.get('width')+'px;');
	else
		me.base = me.get('p').adElm('', 'div').cn('grid fl h400 oa');
	me.ajaxData = function(apiName, param, cbFn) {}
	me.loadData = function() {}
	me.render = function(a) {
		a = (a instanceof Array) ? a : me.items;
		me.base.h('');
		var _tbody = me.base.adElm('', 'table').ac('fs14 c_63');
		var _cg = _tbody.adElm('', 'colgroup');

		if (me.get('ifIncr')) _cg.adElm('', 'col').attr('width', me.args.defHead[0].w + 'px;');
		if (me.get('ifCheckBox')) _cg.adElm('', 'col').attr('width', me.args.defHead[1].w + 'px');

		for (var i = 0, l = a.length; i < l; i++) { //循环TD
			var _it = a[i];
			var _tr = WT.$(_tbody.insertRow(i));
			_tr.attr('idx', _it.idx) //.attr('tabindex',1);
			var _tdAry = [];
			if (me.get('ifIncr')) {
				_tdAry.push('<td>' + (i + 1) + '</td>');
			}
			if (me.get('ifCheckBox')) {
				_tdAry.push('<td><input type="checkbox" opt="chk" ' + (_it.ifSelect ? 'checked' : '') + '/></td>');
			}
			_tdAry.push('<td opt="item" txt='+_it.txt+' val='+_it.val+'>' + _it.txt + '</td>');
			_tr.h(_tdAry.join(''));
		}

		_tbody.evt('click', function(e) {
			var e = WT.e.fix(e),_e = e.t;
			e.stop();
			if (_e.attr('opt') === 'chk') {
				_e = _e.pn(2)
				var rIdx = _e.rowIndex;
				if (a[rIdx].ifSelect) {
					a[rIdx].ifSelect = false;
					var _pop = {
						elm: _e,
						idx: +_e.attr('idx'),
						val: a[rIdx].val,
						txt: a[rIdx].txt,
						x: _e.cellIndex,
						y: rIdx
					}
					for(var i=0; i<me.chkAry.length; i++){
						if (me.chkAry[i].idx === _pop.idx) {
							me.chkAry.splice(i,1);//数组指定元素位置删除
						}
					}
				}else{
					a[rIdx].ifSelect = true;
					var _push = {
						elm: _e,
						idx: +_e.attr('idx'),
						val: a[rIdx].val,
						txt: a[rIdx].txt,
						x: _e.cellIndex,
						y: rIdx
					}
					me.chkAry.push(_push);
				}
				me.get('onChkAry')(me.chkAry);
				me.render();
			}else if (_e.attr('opt') === 'item') {
				if (me.selElm) {
					changeTrColor(me.selElm.elm.pn(), _e.pn());

				} else {
					changeTrColor({}, _e.pn());
				}
				var _txt = _e.attr('txt');
				var _lev = _e.attr('val');

				me.selElm = {
					elm: _e,
					idx: +_e.pn().attr('idx'),
					val: _lev,
					txt: _txt
				};
				me.get('onSelElm')(me);
			}
		});
	}
	var changeTrColor = function(tr1, tr2) {
		for (var i in tr1.cells) {
			if (tr1.cells[i].tagName === 'TD') WT.$(tr1.cells[i]).dc('bc_65');
		}
		for (var i in tr2.cells) {
			if (tr2.cells[i].tagName === 'TD') WT.$(tr2.cells[i]).ac('bc_65');
		}
	}
	var fliterFn = function() {}
	me.init = function() {
		me.render();
	}
	if (arguments.length) {
		me.init();
	}
}

//取色器
WT.UI.ColorSelector = function (j) {
    var me = this;
	me.comType = 'F_D_calendar';
	WT.ext(me, WT.Util);
	var _args = {
		p: $DB,
		value: '#76f317',
		onChange: me._fn
	}
    var eventListeners = [], rgb, hsv;
    var preP, inputP, allP, allColorImg, allSelectorImg, satP, satValImg, crossImg;
    me.args = me.initArgs(j, _args);
    function layout() {
    	me.base = me.get('p').adElm('', 'div');
        me.owner = me.base.cn('ColorSelector');
        me.owner.h('<div class="scolor1"><img class="img1" src="imgs/color/sv.png" /><img class="img2" src="imgs/color/crosshairs.png" /></div><div class="scolor2"><img class="img1" src="imgs/color/h.png" /><img class="img2" src="imgs/color/position.png" /></div><div class="scolor3"><span></span><input type="text" class="color-value" value="#FFFF00" /></div>');
        satP = me.owner.fc(); satValImg = satP.fc(); crossImg = satValImg.ns();
        allP = satP.ns(); allColorImg = allP.fc(); allSelectorImg = allColorImg.ns();
        preP = allP.ns().fc(); inputP = preP.ns();
        trackDrag(satP, satValDragged); trackDrag(allP, allDragged);
        me.setValue(me.args.value);
    }
    function bindEvent() { }
    function colorChanged() {
        var hex = rgbToHex(rgb.r, rgb.g, rgb.b);
        var hueRgb = hsvToRgb(hsv.h, 1, 1);
        var hueHex = rgbToHex(hueRgb.r, hueRgb.g, hueRgb.b);
        preP.css('background-color:' + hex + ';');
        inputP.value = hex;
        satP.css('background-color:' + hex + ';');
        crossImg.css('left:' + ((hsv.v * 199) - 10).toString() + 'px;top:' + (((1 - hsv.s) * 199) - 10).toString() + 'px;');
        allSelectorImg.css('top:' + ((hsv.h * 199) - 5).toString() + 'px;');
        me.args.onChange(hex);
    }
    function rgbChanged() { hsv = rgbToHsv(rgb.r, rgb.g, rgb.b); colorChanged(); }
    function hsvChanged() { rgb = hsvToRgb(hsv.h, hsv.s, hsv.v); colorChanged(); }
    function satValDragged(x, y) { hsv.s = 1 - (y / 199); hsv.v = (x / 199); hsvChanged(); }
    function allDragged(x, y) { hsv.h = y / 199; hsvChanged(); }
    me.setValue = function (value) { rgb = hexToRgb(value, { r: 0, g: 0, b: 0 }); rgbChanged(); }
    function hexToRgb(hex_string, default_) {
        if (default_ == undefined) { default_ = null; };
        if (hex_string.substr(0, 1) == '#') { hex_string = hex_string.substr(1); };
        var r, g, b;
        if (hex_string.length == 3) {
            r = hex_string.substr(0, 1); r += r;
            g = hex_string.substr(1, 1); g += g;
            b = hex_string.substr(2, 1); b += b;
        }
        else if (hex_string.length == 6) {
            r = hex_string.substr(0, 2);
            g = hex_string.substr(2, 2);
            b = hex_string.substr(4, 2);
        }
        else {
            return default_;
        }
        r = parseInt(r, 16); g = parseInt(g, 16); b = parseInt(b, 16);
        if (isNaN(r) || isNaN(g) || isNaN(b)) {
            return default_;
        }
        else {
            return { r: r / 255, g: g / 255, b: b / 255 };
        }
    }
    function rgbToHex(r, g, b, includeHash) {
        if (includeHash == undefined) { includeHash = true; }
        r = Math.round(r * 255).toString(16);
        g = Math.round(g * 255).toString(16);
        b = Math.round(b * 255).toString(16);
        if (r.length == 1) { r = '0' + r; }
        if (g.length == 1) { g = '0' + g; }
        if (b.length == 1) { b = '0' + b; }
        return ((includeHash ? '#' : '') + r + g + b).toUpperCase();
    }

    function hsvToRgb(hue, saturation, value) {
        var red, green, blue;
        if (value == 0.0) {
            red = 0; green = 0; blue = 0;
        } else {
            var i = Math.floor(hue * 6);
            var f = (hue * 6) - i;
            var p = value * (1 - saturation);
            var q = value * (1 - (saturation * f));
            var t = value * (1 - (saturation * (1 - f)));
            switch (i) {
                case 1: red = q; green = value; blue = p; break;
                case 2: red = p; green = value; blue = t; break;
                case 3: red = p; green = q; blue = value; break;
                case 4: red = t; green = p; blue = value; break;
                case 5: red = value; green = p; blue = q; break;
                case 6: // fall through
                case 0: red = value; green = t; blue = p; break;
            }
        }
        return { r: red, g: green, b: blue };
    }
    function rgbToHsv(red, green, blue) {
        var max = Math.max(Math.max(red, green), blue);
        var min = Math.min(Math.min(red, green), blue);
        var hue;
        var saturation;
        var value = max;
        if (min == max) {
            hue = 0; saturation = 0;
        } else {
            var delta = (max - min);
            saturation = delta / max;
            if (red == max) {
                hue = (green - blue) / delta;
            }
            else if (green == max) {
                hue = 2 + ((blue - red) / delta);
            }
            else {
                hue = 4 + ((red - green) / delta);
            }
            hue /= 6;
            if (hue < 0) { hue += 1; }
            if (hue > 1) { hue -= 1; }
        }
        return { h: hue, s: saturation, v: value };
    }
    function pageCoords(node) {
        var x = node.offsetLeft;
        var y = node.offsetTop;
        var parent = node.offsetParent;
        while (parent != null) {
            x += parent.offsetLeft;
            y += parent.offsetTop;
            parent = parent.offsetParent;
        }
        return { x: x, y: y };
    }
    function trackDrag(node, handler) {
        function fixCoords(x, y) {
            var nodePageCoords = pageCoords(node);
            x = (x - nodePageCoords.x) + document.documentElement.scrollLeft;
            y = (y - nodePageCoords.y) + document.documentElement.scrollTop;
            if (x < 0) x = 0;
            if (y < 0) y = 0;
            if (x > node.offsetWidth - 1) x = node.offsetWidth - 1;
            if (y > node.offsetHeight - 1) y = node.offsetHeight - 1;
            return { x: x, y: y };
        }
        function mouseDown(ev) {
            var coords = fixCoords(ev.clientX, ev.clientY);
            var lastX = coords.x;
            var lastY = coords.y;
            handler(coords.x, coords.y);

            function moveHandler(ev) {
                var coords = fixCoords(ev.clientX, ev.clientY);
                if (coords.x != lastX || coords.y != lastY) {
                    lastX = coords.x;
                    lastY = coords.y;
                    handler(coords.x, coords.y);
                }
            }
            function upHandler(ev) {
                myRemoveEventListener(document, 'mouseup', upHandler);
                myRemoveEventListener(document, 'mousemove', moveHandler);
                myAddEventListener(node, 'mousedown', mouseDown);
            }
            myAddEventListener(document, 'mouseup', upHandler);
            myAddEventListener(document, 'mousemove', moveHandler);
            myRemoveEventListener(node, 'mousedown', mouseDown);
            if (ev.preventDefault) ev.preventDefault();
        }
        myAddEventListener(node, 'mousedown', mouseDown);
        node.onmousedown = function (e) { return false; };
        node.onselectstart = function (e) { return false; };
        node.ondragstart = function (e) { return false; };
    }
    function findEventListener(node, event, handler) {
        var i;
        for (i in eventListeners) {
            if (eventListeners[i].node == node && eventListeners[i].event == event
         && eventListeners[i].handler == handler) {
                return i;
            }
        }
        return null;
    }
    function myAddEventListener(node, event, handler) {
        if (findEventListener(node, event, handler) != null) {
            return;
        }

        if (!node.addEventListener) {
            node.attachEvent('on' + event, handler);
        }
        else {
            node.addEventListener(event, handler, false);
        }

        eventListeners.push({ node: node, event: event, handler: handler });
    }
    function removeEventListenerIndex(index) {
        var eventListener = eventListeners[index];
        delete eventListeners[index];

        if (!eventListener.node.removeEventListener) {
            eventListener.node.detachEvent('on' + eventListener.event,
                                       eventListener.handler);
        }
        else {
            eventListener.node.removeEventListener(eventListener.event,
                                               eventListener.handler, false);
        }
    }
    function myRemoveEventListener(node, event, handler) {
        removeEventListenerIndex(findEventListener(node, event, handler));
    }
    function cleanupEventListeners() {
        var i;
        for (i = eventListeners.length; i > 0; i--) {
            if (eventListeners[i] != undefined) {
                removeEventListenerIndex(i);
            }
        }
    }
    me.evt = function (key, fn) { me.set(key, fn); return me; }
    me.init = function (j) { me.initArgs(j, _args); layout(); bindEvent(); return me; }
    if (arguments.length) { me.init(j); }
    return me;
}

