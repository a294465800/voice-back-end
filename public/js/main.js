/**
 * Created by Administrator on 2017/8/3.
 */

$(function () {

	//所有数据
	var data = {

		//区小程序列表
		App_list : [
			{
				name: '小程序一',
				id: '216546415154641611'
			},
			{
				name: '小程序二',
				id: '216546415154641611'
			},
			{
				name: '小程序三',
				id: '216546415154641611'
			},
		]
	}

	//函数部分
	var func = {

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
		}
	}

	//区小程序切换
	func.appSwitch()
})