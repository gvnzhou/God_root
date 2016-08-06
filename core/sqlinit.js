var config = require('../config');

var sRootTreeTbl = 'root_main_tree';
var sRootUsersTbl = 'root_users';
var initAdmin = 'admin';
var	initPwd = '123456';

var sqlInit = {
	'isExistTable':`select TABLE_NAME from INFORMATION_SCHEMA.TABLES where TABLE_SCHEMA='${config.root.mysql}' and TABLE_NAME='${sRootTreeTbl}'`,
	'initDBTable':
		`
		DROP TABLE IF EXISTS ${sRootTreeTbl};
		CREATE TABLE ${sRootTreeTbl} (
			id int(8) NOT NULL AUTO_INCREMENT COMMENT 'ID',
			pid int(8) unsigned DEFAULT '0' COMMENT '父ID',
			name varchar(255) DEFAULT '' COMMENT '名字',
			lev int(8) DEFAULT '1' COMMENT '级别',
			order_num int(8) DEFAULT '0' COMMENT '排序，默认自己的ID',
			rights varchar(255) DEFAULT '' COMMENT '规则',
			sons int(8) unsigned DEFAULT '0' COMMENT '第一个子的ID',
			parentpath varchar(255) DEFAULT '' COMMENT '父ID+父的parentpath',
			code varchar(12) DEFAULT '' COMMENT '编码',
			description varchar(255) DEFAULT '' COMMENT '描述',
			type int(8) DEFAULT '1' COMMENT '类型:(1:""2:""3:"商品名称",4:"菜单分类",5:"数据字典",6:"角色类型")',
			role_rights varchar(255) DEFAULT '' COMMENT '角色权限',
			is_rights varchar(255) DEFAULT '',
			json_string varchar(255) DEFAULT '{}',
			color varchar(255) DEFAULT '' COMMENT '颜色',
			accuracy tinyint(3) DEFAULT '0',
			del_flag tinyint(4) DEFAULT NULL,
			create_time timestamp NULL DEFAULT CURRENT_TIMESTAMP,
			update_time timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
			status tinyint(4) DEFAULT NULL,
			PRIMARY KEY (id)
		) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COMMENT='项目管理及指标信息';
		DROP TABLE IF EXISTS ${sRootUsersTbl};
		CREATE TABLE ${sRootUsersTbl} (
		  id bigint(20) NOT NULL AUTO_INCREMENT,
		  acct_id bigint(15) DEFAULT '0',
		  name varchar(50) DEFAULT NULL,
		  cell varchar(11) DEFAULT NULL COMMENT '手机号',
		  type tinyint(3) DEFAULT '1' COMMENT '用户类型：1、用户 2、会员 3、经纪商 4、系统运营人员 5、角色 6、逻辑组 等',
		  card_id varchar(18) DEFAULT NULL COMMENT '身份证',
		  pid int(10) unsigned zerofill DEFAULT NULL COMMENT '父用户',
		  back_pid int(10) DEFAULT NULL,
		  path_level tinyint(3) DEFAULT NULL COMMENT '层级',
		  parentPath varchar(300) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT ',0,' COMMENT '父路径：,1,2,6,',
		  pwd varchar(50) DEFAULT NULL COMMENT '出入金密码',
		  status tinyint(3) unsigned DEFAULT NULL COMMENT '用户状态：active frozen applying',
		  ip varchar(15) DEFAULT NULL COMMENT '最后一次登录',
		  email varchar(30) DEFAULT NULL COMMENT 'email',
		  create_time datetime DEFAULT NULL COMMENT '创建日期',
		  update_time datetime DEFAULT NULL COMMENT '更新时间',
		  rights longtext COMMENT '正权限',
		  no_rights varchar(150) DEFAULT NULL COMMENT '否权限',
		  role_id varchar(255) DEFAULT NULL COMMENT '角色模板',
		  note longtext,
		  del_flag tinyint(3) DEFAULT '0' COMMENT '删除标志',
		  json_string text,
		  PRIMARY KEY (id),
		  KEY acctIdx (acct_id) USING BTREE,
		  KEY delIdx (del_flag)
		) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COMMENT='会员';
		`,
	'initDBTableData':`
		INSERT INTO ${sRootTreeTbl} VALUES (1, 0, 'Admin', 1, 1, '', 61, ',0,', '1001', '', '1', ',0,', ',0,', '{}', null, 0,null, null, null, null);
		INSERT INTO ${sRootTreeTbl} VALUES (2, 1, '菜单分类', 2, 2, '', 52, ',0,1,', '1002', '', '1', ',0,', ',0,', '{}', null, 0,null, null, null, null);
		INSERT INTO ${sRootTreeTbl} VALUES (3, 1, '数字字典', 2, 2, '', 52, ',0,1,', '1002', '', '1', ',0,', ',0,', '{}', null, 0,null, null, null, null);
		INSERT INTO ${sRootTreeTbl} VALUES (4, 1, '角色类型', 2, 2, '', 52, ',0,1,', '1002', '', '1', ',0,', ',0,', '{}', null, 0,null, null, null, null);
		INSERT INTO ${sRootTreeTbl} VALUES (5, 2, 'tree操作', 2, 2, '', 52, ',0,1,', '1002', '', '1', ',0,', ',0,', '{}', null, 0,null, null, null, null);
		INSERT INTO ${sRootTreeTbl} VALUES (6, 2, '日志管理', 2, 2, '', 52, ',0,1,', '1002', '', '1', ',0,', ',0,', '{}', null, 0,null, null, null, null);
		INSERT INTO ${sRootTreeTbl} VALUES (7, 2, '用户管理', 2, 2, '', 52, ',0,1,', '1002', '', '1', ',0,', ',0,', '{}', null, 0,null, null, null, null);
		INSERT INTO ${sRootTreeTbl} VALUES (8, 2, '后台运行模块', 2, 2, '', 52, ',0,1,', '1002', '', '1', ',0,', ',0,', '{}', null, 0,null, null, null, null);
		INSERT INTO ${sRootTreeTbl} VALUES (9, 2, 'Api生成', 2, 2, '', 52, ',0,1,', '1002', '', '1', ',0,', ',0,', '{}', null, 0,null, null, null, null);


		INSERT INTO ${sRootUsersTbl} VALUES ('1', '10000000', '${initAdmin}', '000', '1', '0000', '0000000000', null, '1', ',0,', '${initPwd}', null, null, 'fgdfg', '2016-04-08 13:41:56', '2016-04-08 13:41:56', null, null, null, null, '0', null);
		`
}

module.exports = sqlInit;
