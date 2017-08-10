/**
 * Created by Administrator on 2017/8/10.
 */
$(function () {
	var uploadData = {

		//文件上传地址
		host: 'http://webuploader.duapp.com/server/fileupload.php',

		//swf文件地址
		swf: '../public/build/webuploader/Uploader.swf',

		//允许的文件类型
		accept: {
			title: 'Images',
			extensions: 'gif,jpg,jpeg,bmp,png',
			mimeTypes: 'image/gif,image/jpeg,image/jpg,image/png,image/bmp'
		}
	}

	var uploadObject = {
		/**
		 * 初始化webUploader，对应的参数为： （上传按钮ID，预览区域ID, 按钮文本， input的name值）
		 */
		init: function (pickerID,  preID, innerHTML, valName) {
			this.pickerID = pickerID
			this.innerHTML = innerHTML
			this.valName = valName
			var uploader = this.create();
			this.bindEvent(uploader, preID);
			return uploader;
		},

		/**
		 * 创建webuploader对象
		 */
		create: function () {
			var that = this,
				webUploader = WebUploader.create({
					auto: true,
					pick: {
						id: '#' + that.pickerID,
						multiple: false,// 只上传一个
						innerHTML: that.innerHTML
					},
					//文件上传的name
					fileVal: that.valName,
					// accept: uploadData.accept,
					swf: uploadData.swf,
					disableGlobalDnd: true,
					duplicate: true,
					server: uploadData.host,

				});

			return webUploader;
		},

		/**
		 * 绑定事件
		 */
		bindEvent: function (bindedObj, preID) {
			bindedObj.on('fileQueued', function (file) {
				var $preList = $("#" + preID)

				$preList.html('')
				$preList.append( '<div id="' + file.id + '" class="item">' +
					'<h4 class="info">' + file.name + '</h4>' +
					'<p class="state">等待上传...</p>' +
					'</div>' )
			});

			// 文件上传成功，给item添加成功class, 用样式标记上传成功。
			bindedObj.on('uploadSuccess', function (file, response) {
				$('#' + file.id).addClass('upload-state-done');
			});


			// 文件上传失败，显示上传出错。
			bindedObj.on('uploadError', function (file) {
				$( '#'+file.id ).find('p.state').text('上传出错')
			});

			// 完成上传完了，成功或者失败，先删除进度条。
			bindedObj.on('uploadComplete', function (file) {
				$('#' + file.id).find('.progress').remove();
			});

			// 文件上传过程中创建进度条实时显示。
			bindedObj.on('uploadProgress', function (file, percentage) {
				var $li = $('#' + file.id),
					$percent = $li.find('.progress .progress-bar');

				// 避免重复创建
				if (!$percent.length) {
					$percent = $('<div class="progress progress-striped active">' +
						'<div class="progress-bar" role="progressbar" style="width: 0%">' +
						'</div>' +
						'</div>').appendTo($li).find('.progress-bar');
				}

				$li.find('p.state').text('上传中');

				$percent.css('width', percentage * 100 + '%');
			});

		}
	}

	var uploadFunc = {
		init: function () {
			this.fileOne()
			this.fileTwo()
			this.fileThree()
		},


		fileOne: function () {
			uploadObject.init('file_1', 'file_1_list', '选择文件', 'file')
		},

		fileTwo: function () {
			uploadObject.init('file_2', 'file_2_list', '选择文件', 'file')
		},

		fileThree: function () {
			uploadObject.init('file_3', 'file_3_list', '选择文件', 'file')
		}
	}

	uploadFunc.init()
})