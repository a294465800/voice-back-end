/**
 * Created by Administrator on 2017/8/3.
 */

$(function () {

	//所有数据
	var globalData = {
		host: 'https://sennkisystem.cn/api'
	}

	//中间件
	var octopus = {

		init: function () {
			funcCommon.init()
			funcUser.init()
		}
	}

	//通用函数部分
	var funcCommon = {

		init: function () {
			this.appSwitch()
			this.navSwitch()
		},

		//区小程序切换
		appSwitch: function () {
			var $app_list = $('#app_list'),
				$switch_app = $('#switch_app')
			$app_list.css('bottom', -($app_list.height() + 14) + 'px')

			$switch_app.on('click', function () {
				var state = $app_list.css('display')
				if(state === 'block'){
					$switch_app.css('color','#fff')
					$app_list.hide()
				}else {
					$switch_app.css('color','#1ccca9')
					$app_list.show()
				}
			})
		},

		//导航切换
		navSwitch: function () {
			var $nav_show = $('#nav_show'),
				$nav_hide = $('#nav_hide'),
				$index_nav = $('#index_nav'),
				$index_nav_hide = $('#index_nav_hide')

			$nav_show.on('click',function () {
				$index_nav.show()
				$index_nav_hide.hide()
			})

			$nav_hide.on('click',function () {
				$index_nav_hide.show()
				$index_nav.hide()
			})
		},

	}

	//管理函数
	var funcUser = {
		//初始化
		init: function () {
			this.userBan()
			this.userAll()
			this.userAllBan()
			this.userAllBanCancel()
			this.userCheckPass()
			this.userCheckReject()
			this.userCheckAll()
			this.allCheckPast()
			this.allCheckReject()
			this.deletePast()
			this.infoAll()
		},

		//用户禁言
		userBan: function () {
			var $user_ban = $('.user-ban')
			$user_ban.on('click', function () {
				var $father = $(this).parents('tr'),
					$state_text = $father.find('.status'),
					data = $father.data()

				//1是正常，2是禁言
				if(data.status === 1){
					/**
					* 发起请求
					* */
					/*$.ajax({
						url: globalData.host,
						method: 'POST',
						data: {
							id: data.id
						},
						success: function () {

						}
					})*/
					if(confirm('确定禁言吗？')){
						$state_text.html('禁言中')
						$state_text.addClass('ban')
						$father.data('status', 2)
						$(this).html('取消')
					}
				}else if(data.status === 2){
					if(confirm('确定取消禁言吗？')){
						$state_text.html('正常')
						$state_text.removeClass('ban')
						$father.data('status', 1)
						$(this).html('禁言')
					}
				}
				return false
			})
		},
		
		//用户列表全选
		userAll: function () {
			var $user_all = $('#user_all'),
				$checkbox = $user_all.find("input[type='checkbox']"),
				$user_name = $('.user-name')

			$user_all.on('click', function () {
				var checked = $checkbox.prop('checked')
				if(checked){
					$checkbox.prop('checked', false)
					$user_name.prop('checked', false)
				}else {
					$checkbox.prop('checked', true)
					$user_name.prop('checked', true)
				}
			})
		},

		//禁言函数
		userAllBanFunc: function (target, ban) {
			var data = []

			if(ban){
				for(var i = 0; i < target.length; i++){
					var checked = $(target[i]).prop('checked'),
						$father = $(target[i]).parents('tr'),
						tmp = $father.data()
					if(checked && tmp.status === 1){
						$father.data('status', 2)
						$father.find('.status').html('禁言中')
						$father.find('.status').addClass('ban')
						$father.find('a').html('取消')
						data.push(tmp.id)
					}
				}
			}else {
				for(var i = 0; i < target.length; i++){
					var checked = $(target[i]).prop('checked'),
						$father = $(target[i]).parents('tr'),
						tmp = $father.data()
					if(checked && tmp.status === 2){
						console.log(tmp)
						$father.data('status', 1)
						$father.find('.status').html('正常')
						$father.find('.status').removeClass('ban')
						$father.find('a').html('禁言')
						data.push(tmp.id)
					}
				}
			}

			return data
		},

		//全选后禁言
		userAllBan: function () {
			var $user_ban_all = $('#user_ban_all'),
				data = []

			$user_ban_all.on('click', function () {
				var $user_name = $('.user-name')
				if (confirm('确定全部禁言吗？')){
					data = funcUser.userAllBanFunc($user_name, true)
					if(data.length){
						/**
						 * 发起请求
						 * */
						/*$.ajax({
						 url: globalData.host,
						 method: 'POST',
						 data: data,
						 success: function () {

						 }
						 })*/
					}
				}
			})
		},

		//全选取消禁言
		userAllBanCancel: function () {
			var $user_ban_all_cancel = $('#user_ban_all_cancel'),
				data = []

			$user_ban_all_cancel.on('click', function () {
				var $user_name = $('.user-name')
				if (confirm('确定全部取消禁言吗')){
					data = funcUser.userAllBanFunc($user_name, false)

					if(data.length){
						/**
						 * 发起请求
						 * */
						/*$.ajax({
						 url: globalData.host,
						 method: 'POST',
						 data: data,
						 success: function () {

						 }
						 })*/
					}
				}
			})
		},

		//单条审核通过
		userCheckPass: function () {
			var $check_pass = $('.check-pass')

			$check_pass.on('click', function () {
				var $father = $(this).parents('.check-item'),
					kind = $father.data()
				/*$.ajax({
					url: globalData.host,
					data: {
						id: kind.id,
						type: kind.type
					},
					success: function () {

					}
				})*/
				$father.remove()
			})
		},

		//单条审核拒绝
		userCheckReject: function () {
			var $check_pass = $('.check-pass')

			$check_pass.on('click', function () {
				var $father = $(this).parents('.check-item'),
					kind = $father.data()
				/*$.ajax({
				 url: globalData.host,
				 data: {
				 id: kind.id
				 type: kind.type
				 },
				 success: function () {

				 }
				 })*/
				$father.remove()
			})
		},

		//获取审核id
		getCheckID: function (target) {
			var data = []

			for (var i = 0; i < target.length; i++){
				data.push($(target[i]).data().id)
			}
			return data
		},

		//全选通过
		allCheckPast: function () {
			var $check_all_past = $('#check_all_past')

			$check_all_past.on('click', function () {
				var kind = $('#check_all').data()
				if (1 === kind.status){
					return false
				}else if (2 === kind.status){
					var $all_item = $('.check-item'),
						data = funcUser.getCheckID($all_item)
					if (confirm('确定通过所有信息？')){
						/**
						 * 发送请求
						 * */
						/*$.ajax({
						 url: globalData.host,
						 method: 'POST',
						 data: {
						 id: data,
						 type: kind.type
						 },
						 success: function () {

						 }
						 })*/

						//重载页面
						window.location.reload()
					}
				}
			})
		},

		//全选拒绝
		allCheckReject: function () {
			var $check_all_reject = $('#check_all_reject')

			$check_all_reject.on('click', function () {
				var kind = $('#check_all').data()

				if (1 === kind.status){
					return false
				}else if (2 === kind.status){
					var $all_item = $('.check-item'),
						data = funcUser.getCheckID($all_item)
					if ('确定拒绝所有信息？'){
						/**
						 * 发送请求
						 * */
						/*$.ajax({
						 url: globalData.host,
						 method: 'POST',
						 data: {
						 id: data,
						 type: kind.type
						 },
						 success: function () {

						 }
						 })*/
						window.location.reload()
					}
				}
			})
		},

		//审核全选
		userCheckAll: function () {
			var $check_all = $('#check_all')

			$check_all.on('click', function () {
				var $all_item = $('.check-item'),
					status = $(this).data('status')
				//1代表未选中，2代表选中
				if (1 === status){
					$(this).html('取消')
					$all_item.addClass('active')
					status = $(this).data('status', 2)
				}else if (2 === status){
					$(this).html('全选')
					$all_item.removeClass('active')
					status = $(this).data('status', 1)
				}
			})
		},

		//删除已通过信息
		deletePast: function () {
			var del_btn = $('.user-past-del')

			del_btn.on('click', function () {
				if (confirm('确定删除该信息吗')){
					var $father = $(this).parents('table'),
						id = $(this).data('id')

					/**
					 * 发送请求
					 * */
					/*$.ajax({
						url: globalData.host,
						data: {
							id: id
						},
						success: function () {

						}
					})*/
					$father.remove()
					return false
				}
			})
		},

		//全选信息
		infoAll: function () {
			var $info_all_btn = $('#info_all'),
				$checkbox = $info_all_btn.find("input[type='checkbox']"),
				$info_all = $('.past-content')

			$info_all_btn.on('click', function () {
				var check = $checkbox.prop('checked')
				if (check){
					$checkbox.prop('checked', false)
					$info_all.prop('checked', false)
				}else {
					$checkbox.prop('checked', true)
					$info_all.prop('checked', true)
				}
			})
		}

		//用户审核阅读全文
		/*userCheckReadAll: function () {
			var $read_all = $('.check-read-all')
			$read_all.on('click', function () {

				//status为1是缩略模式，status为2是展开模式
				var status = $(this).data('status'),
					$icon = $(this).find('.glyphicon'),
					$text = $(this).find('.check-read-all-text'),
					$content = $(this).siblings('.check-item-content-part')

				if(status === 1){
					$(this).data('status', 2)
					$content.addClass('active')
					$icon.removeClass('glyphicon-chevron-down')
					$icon.addClass('glyphicon-chevron-up')
					$text.html('收起')
				}else if(status === 2){
					$(this).data('status', 1)
					$content.removeClass('active')
					$icon.removeClass('glyphicon-chevron-up')
					$icon.addClass('glyphicon-chevron-down')
					$text.html('阅读全文')
				}
			})
		},*/
	}

	//启动程序
	octopus.init()
})