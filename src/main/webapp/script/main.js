console.log('欢迎来到Vambad的后台！');
var editCacheTime = 5000;//编辑页面缓存间隔 单位 ms
/*
 *菜单样式附加 
 */
 $(function() {
	 	var ctx="${ctx}";
	 	var sessionid = "<%=pageContext.getSession().getId()%>";
	 	var firstExpend = false;
	 	var checkedMune ;
//		默认不选择
		$(".sub-menu").hide();
		$("li[rel=two]").removeClass("active").removeClass("open");
	 
//		获取当前菜单初始化菜单选中
	var $ul = $("#nav-bar");
	var $firstMeums = $ul.find("li[rel]");
	var subMenus = $(".sub-menu li");
	var currentMeum = $(".portlet-title span").attr("muenName")||$(".portlet-title span").html();//获取当前页面对应菜单内容
	console.log(currentMeum);
	var isOneMeum = false;
//	一级菜单匹配
	$firstMeums.each(function(){
		var $this = $(this);
		if($this.find(".title").html()==currentMeum){
			//当前菜单
			console.log("当前菜单为1级菜单："+currentMeum);
			isOneMeum = true;
			$this.addClass("active");
			return false;
		}
	});
//	一级菜单没匹配上 匹配二级菜单
	if(!isOneMeum){
		subMenus.each(function(){
			var $this = $(this);
			if($this.find("a").html()==currentMeum){
				//当前菜单
				console.log("当前菜单为2级菜单："+currentMeum);
				$this.addClass("active");
				$this.parent(".sub-menu").show();
				$(this).parents("li").addClass("active");
				checkedMune = $(this).parents("li");
				return false;
			}
		});
	}
	
	console.log("菜单匹配结束---------")
	

	
//	二级菜单添加事件
	$(".sub-menu li").click(function(){
		
//		清空页面缓存，关闭编辑页面定时器
		localStorage.form = "";
		//clearInterval(cacheThread);
		
		$(".sub-menu li").removeClass("active");
		$(this).addClass("active");
		$(this).parent("li").addClass("active").siblings().removeClass("active");
	});

//	单级菜单事件
	$("li[rel=one]").click(function(){
	
		$(this).addClass("active").siblings().removeClass("active");
		$(".sub-menu").hide();
		$("li[rel=two],.sub-menu li").removeClass("active").removeClass("open");
	});
//	2级菜单事件
	$("li[rel=two]").click(function(){
	
		$("li[rel=one]").removeClass("active");
		if($(this).find("li.active").length<1){
			$(".sub-menu li").removeClass("active");
			$("li[rel=two]").removeClass("active");
			if(!firstExpend){
				if(typeof checkedMune!="undefined"){
					checkedMune.find(".sub-menu").hide();
				}
				firstExpend = true;
			}
//			$(".sub-menu").hide();
		}
	});
	
	
	
	
})



/*==============页面数据缓存开始================
console.log("+++++++++++++++页面重载（刷新）+++++++++++++++++");
var currentEditPage = $("span[muenname]");//当前表单编辑页
var cacheThread;//页面缓存定时器
if(currentEditPage.length<1){
	localStorage.form = "";
}else{
	var fieldsStr = localStorage.form;
	if(typeof fieldsStr!="undefined"&&fieldsStr!=""){
		var fieldsArray = JSON.parse(fieldsStr);
		jQuery.each( fieldsArray, function(i, field){
			console.log(field.name+":"+field.value);
//			input读取缓存数据
			$("#main-container").find("input[type='text'][name='"+field.name+"']").val(field.value);
//			select读取缓存数据
			$("#main-container").find("select[name='"+field.name+"']").val(field.value);
		});
	}
//	编辑页面每10s缓存一次本页数据
	cacheThread = setInterval(function(){
		if($("span[muenname]").length<1){
			localStorage.form = "";
			clearInterval(cacheThread);
		}else{
			localStorage.form  = JSON.stringify($("#main-container form").serializeArray());
		}
	},editCacheTime);
}*/
/*==============页面数据缓存结束==============*/

// $.ajaxSettings.traditional = true;

function glClearForm($form) {
	$form.find("input,select,textarea").each(function(index, item) {
		var $item = $(item);

		if ($item.is(":disabled")) {
			return true; // continue 'each' loop
		}

		var type = item.type;
		var tag = item.tagName.toLowerCase();
		if (
			type == "text" || type == "password" || tag == "textarea" || 
			// HTML5
			type == "email" || type == "url" || type == "number" || type == "range" || type == "date" || type == "month" || type == "week" || type == "time" || type == "datetime" || type == "datetime-local" || type == "search" || type == "color" || 
			// default
			tag == "") {
			item.value = "";
			$item.trigger("change");
		} else if (type == "checkbox" || type == "radio") {
			item.checked = false;
			$item.trigger("change");
		} else if (tag == "select") {
			item.selectedIndex = 0;
			$item.trigger("change");
		}
	});
}


$(function() {
	initMain();
});

function initMain() {
	$(document).pjax('a[data-pjax]', '#main-container', {
		show : 'fade', 
		cache: true, 
        storage: true
	});
	
	Decimal.config({
		errors : false, 
		modulo : Decimal.ROUND_HALF_UP
	});
	
	toastr.options.closeButton = true;
	
	var $mainContainer = $('#main-container');
	var isLoading = false;
	
	var editorFonts = [
		'黑体', '宋体', '微软雅黑', '楷体', 
		'Arial', 'Arial Black', 'Comic Sans MS', 'Courier New',
		'Helvetica Neue', 'Impact', 'Lucida Grande',
		'Tahoma', 'Times New Roman', 'Verdana'
	];
	
	$(document).on('pjax:send', function() {
		console.debug( 'pjax:send' );
		isLoading = true;
		setTimeout(function() {
			if (isLoading) {
				Metronic.blockUI({
		            target: $mainContainer,
		            animate: true,
		            overlayColor: 'none'
		        });
			}
		}, 800);
	});
	$(document).on('pjax:complete', function() {
		console.debug( 'pjax:complete' );
		isLoading = false;
		Metronic.unblockUI( $mainContainer );
	});
	$(document).on('pjax:timeout', function(event) {
		console.debug( 'pjax:timeout' );
		// Prevent default timeout redirection behavior
		event.preventDefault();
	});
	$(document).on('pjax:success', function() {
		console.debug( 'pjax:success' );
		initApp();
	});
	
	/*$("#nav-bar > li").click(function(){
		var $this = $(this);
		
		var cl = $this.attr("class");
		
		if(cl=="active open"){
			$this.removeClass("active")
		}else{ 
		  $this.removeClass("active").addClass("active open").siblings().removeClass("active");
		}
		
		$this.addClass("active open").siblings().removeClass("active");
		 
	});*/
	
	function checkBox(chkallStr, chkoneStr) {
		var $chkall = $(!chkallStr ? "#main-container .chkall" : chkallStr);
		var $chkone = $(!chkoneStr ? "#main-container .chkone" : chkoneStr);
		if (!$chkall.length || !$chkone.length) {
			return;
		}
		
		var isAllChkBoxChecked = true;
		$chkone.each(function(){
			if (!this.checked) {
				isAllChkBoxChecked = false;
				return false; // -> break;
			}
		});
		
		if (isAllChkBoxChecked) {
			$chkall[0].checked = true;
		} else {
			$chkall[0].checked = false;
		}
		
		$chkall.click(function(){
			if (this.checked == true) {
				$chkone.each(function(){
					this.checked = true;
				}).trigger('change');
				$.uniform.update( $chkone );
			} else {
				$chkone.each(function(){
					this.checked = this.checked ? false : true;
				}).trigger('change');
				$.uniform.update( $chkone );
			}
		});
	};
	
	var $deleteConfirm = $("#delete-confirm");
	function multiDelete() {
		var $trigger = $("#main-container .todelete");
		if (!$trigger.length) {
			return;
		}

		$trigger.click(function(){
			var $this = $(this);
			var ids = new Array();
			$("#main-container .chkone:checked").each(function(index, item){
		    	ids.push( item.value );
		    });
			if (ids.length) {
				var url = $trigger.data("url");
				$deleteConfirm.find('#delete-form')
					.attr('action', url)
					.find('input[name="ids"]').val( ids );
				$deleteConfirm.find('#confirm-tag').html( $this.html() );
				$deleteConfirm.modal('show');
			} else {
				toastr.warning( '请选择有效数据进行删除~' );
			}
		});
	};
	
	initApp();
	
	Layout.init(); // init layout
	function initApp() {
		Metronic.init(); // init metronic core componets
	   	checkBox();
	   	multiDelete();
	   	
	   
		
	   	var $dataFormBox = $("#data-form-box");
		if ($dataFormBox.length) {
			var $dataForm = $("#data-form");
			var $dataCreateBtn = $("#data-create");
			var $dataOperationTag = $("#data-op-tag");
			var $dataNameTag = $("#data-name-tag");
			
			$dataCreateBtn.click(function(){
				var currDataName = $("#data-tab li.active").text();
				$dataOperationTag.html( $(this).html() );
				$dataNameTag.text( currDataName );
				
				$dataFormBox.modal('show');
			});
			
			var $dataTable = $("#data-table");
			$dataTable.find(".data-edit").click(function(){
				var $parent = $(this).parent();
				var id = $parent.siblings(":eq(0)").find("input").val();
				
				var object = $dataForm.find('input[name="object"]').val();
				
				if (object == "subType") {
					var parentId = $parent.siblings(":eq(1)").find(".data-parent-id").text();
					var name = $parent.siblings(":eq(2)").find(".data-name").text();
					$dataForm.find('input[name="id"]').val( id );
					$dataForm.find('select[name="parentId"]').val( parentId );
					$dataForm.find('input[name="name"]').val( name );
					
					var currDataName = $("#data-tab li.active").text();
					$dataOperationTag.html( $(this).html() );
					$dataNameTag.text( currDataName );
				} else {
					var name = $parent.siblings(":eq(1)").find(".data-name").text();
					$dataForm.find('input[name="id"]').val( id );
					$dataForm.find('input[name="name"]').val( name );
					
					var currDataName = $("#data-tab li.active").text();
					$dataOperationTag.html( $(this).html() );
					$dataNameTag.text( currDataName );
				}
				
				$dataFormBox.modal('show');
			});
			
			$("#menu-nav .todelete").click(function(){
				var $deleteForm = $("#delete-form");
				var $objectInput = $dataFormBox.find('input[name="object"]').clone();
				$deleteForm.find('input[name="object"]').remove();
				$deleteForm.prepend( $objectInput );
			});
		} // end data
		
		/*function initMerchantSection() {
			var $merchantSection = $("#merchant-section");
			if ($merchantSection.length) {
				var $merchantBaseForm = $("#merchant-base-form");
				var $selectSubType = $('select[name="subType.id"]', $merchantBaseForm);
				var $selectType = $('select[name="type.id"]', $merchantBaseForm).change(function(){
					var typeId = $(this).val();
					if (typeId && typeId.length == 24) {
						$.getJSON(
							ctx+"/merchant/form/subType/" + typeId, 
							{ t : new Date().getTime() }, 
							function(json){
								var optionList = '<option value="">- 选择子类型 -</option>';
								for (var i = 0; i < json.length; i++) {
									optionList += '<option value="' + json[i].id + '">' + json[i].name + '</option>';
								}
								$selectSubType.html( optionList );
							}
						);
					}
				});
				
				var $selectZone = $('select[name="zone.id"]', $merchantBaseForm);
				var $selectCity = $('select[name="city.id"]', $merchantBaseForm).change(function(){
					var cityId = $(this).val();
					if (cityId && cityId.length == 24) {
						$.getJSON(
							ctx+"/merchant/form/zone/" + cityId, 
							{ t : new Date().getTime() }, 
							function(json){
								var optionList = '<option value="">- 选择区县 -</option>';
								for (var i = 0; i < json.length; i++) {
									optionList += '<option value="' + json[i].id + '">' + json[i].name + '</option>';
								}
								$selectZone.html( optionList );
							}
						);
					}
				});
				var $selectProvince = $('select[name="province.id"]', $merchantBaseForm).change(function(){
					var provinceId = $(this).val();
					if (provinceId && provinceId.length == 24) {
						$.getJSON(
							ctx+"/merchant/form/city/" + provinceId, 
							{ t : new Date().getTime() }, 
							function(json){
								var optionList = '<option value="">- 选择地市 -</option>';
								for (var i = 0; i < json.length; i++) {
									optionList += '<option value="' + json[i].id + '">' + json[i].name + '</option>';
								}
								$selectCity.html( optionList );
							}
						);
					}
				});
				
				var $merchantStoreSection = $("#merchant-store-section");
				if ($merchantStoreSection.length) {
					$("#contractbegintime,#contractendtime", $merchantStoreSection).datetimepicker({
				        format: "yyyy-mm-dd hh:ii",
				        autoclose: true,
				        todayBtn: true,
				        language: 'zh-CN', 
				        minuteStep: 10
				    });
				}
				
				// TODO isUploading这个要排个队列
				var isUploading = false;
				var uploadParam = {
					"swf" 				: ctx +"/jslibs/uploadify/uploadify.swf",
					"uploader" 			: ctx +"/merchant/import", 
					"buttonText" 		: "<i class='fa fa-upload'></i> 选择文件", 
					"fileObjName" 		: "file", 
					"removeCompleted" 	: true, 
					"multi" 			: false, 
					"fileSizeLimit" 	: "10MB", 
					"fileTypeDesc" 		: "Excel2003或2007文件", 
					"fileTypeExts" 		: "*.xls; *.xlsx", 
					onSelect 			: function(file){
						isUploading = true;
					}, 
					onCancel 			: function(file){
						toastr.error( '文件[' + file.name + ']上传取消！' );
						isUploading = false;
					}, 
					onUploadError 		: function(file, errorCode, errorMsg, errorString){
						toastr.error( '文件[' + file.name + ']上传错误：' + errorString );
						isUploading = false;
					}
				};
				
				$("#excelMerchant").uploadify( $.extend({
					"formData" : { paramName : "file" }, 
					onUploadSuccess : function(file, data, response){
						var fileSize = Math.round( file.size / 1024 );
						toastr.success( '文件[' + file.name + '] - ' + fileSize + 'KB 上传成功！' );
						isUploading = false;
						$("#merchant-container").html( data );
						initMerchantSection();
					}
				}, uploadParam) );
			}
		}; initMerchantSection(); // end merchant section
		*/
		/*var $commoditySection = $("#commodity-section");
		if ($commoditySection.length) {
			var $commodityBaseForm = $("#commodity-base-form");
			var $selectSubType = $('select[name="subType.id"]', $commodityBaseForm);
			var $selectType = $('select[name="type.id"]', $commodityBaseForm).change(function(){
				var typeId = $(this).val();
				if (typeId && typeId.length == 24) {
					$.getJSON(
						ctx+"/merchant/form/subType/" + typeId, 
						{ t : new Date().getTime() }, 
						function(json){
							var optionList = '<option value="">- 选择子类型 -</option>';
							for (var i = 0; i < json.length; i++) {
								optionList += '<option value="' + json[i].id + '">' + json[i].name + '</option>';
							}
							$selectSubType.html( optionList );
						}
					);
				}
			});*/
			
//			$("#expireTime", $commodityBaseForm).datetimepicker({
//		        format: "yyyy-mm-dd hh:ii",
//		        autoclose: true,
//		        todayBtn: true,
//		        language: 'zh-CN', 
//		        minuteStep: 10
//		    });
			
		
	/*	var $peopleIndex = $("#people-index");
		if ($peopleIndex.length) {
			// 注册
			$("#test1").click(function(){
				$.post(
					ctx+"/people/register/", 
					{ mobileno : "13759182570", password : "123456" }, 
					function(json){
						console.info( JSON.stringify(json) );
						if (json.state == "ok") {
							// done
						} else if (json.state == "error") {
							if (json.mobileno) {
								// mobileno := 手机号必填 | 手机号重复
							}
							if (json.password) {
								// password := 密码必填
							}
							if (json.message) {
								// message := 参数错误
							}
						}
					}, 
					"json"
				);
				return false;
			});
			
			*//**
			 * 删除
			 *//*
			var $peopleIndex = $("#people-index");
			if ($peopleIndex.length) {
				$("#people-active").click(function(){
					var $this = $(this);
					var ids = new Array();
					$("#main-container .chkone:checked").each(function(index, item){
						ids.push( item.value );
					});
					
					if (ids.length) {
						var url = $this.data("url");
						$deleteConfirm.find('#delete-form')
							.attr('action', url)
							.find('input[name="ids"]').val( ids );
						$deleteConfirm.find('#confirm-tag').html( $this.html() );
						$deleteConfirm.modal('show');
					} else {
						toastr.warning( '请选择有效数据进行操作~' );
					}
				});
			} // end people index
			
			
			// 完善
			$("#test2").click(function(){
				$.post(
					ctx+"/people/maintain/", 
					{ mobileno : "13759182570", nickname : "发条橘子", gender : "male", sign : "这家伙很懒。。。" }, 
					function(json){
						console.info( JSON.stringify(json) );
						if (json.state == "ok") {
							// done
						} else if (json.state == "error") {
							if (json.mobileno) {
								// mobileno := 手机号必填 | 找不到该用户
							}
							if (json.message) {
								// message := 参数错误
							}
						}
					}, 
					"json"
				);
				return false;
			});
			
			// 修改密码
			$("#test3").click(function(){
				$.post(
					ctx+"/people/maintain/", 
					{ mobileno : "13759182570", password : "123456" }, 
					function(json){
						console.info( JSON.stringify(json) );
						if (json.state == "ok") {
							// done
						} else if (json.state == "error") {
							if (json.mobileno) {
								// mobileno := 手机号必填 | 找不到该用户
							}
							if (json.message) {
								// message := 参数错误
							}
						}
					}, 
					"json"
				);
				return false;
			});
			
			// 收货地址
			$("#test4").click(function(){
				$.post(
					ctx+"/api/maintain/", 
					{
						id : "553a11451229ef1f98734e87",
						
						"addressList[0].consignee" : "周某",
						"addressList[0].mobileno" : "123",
						"addressList[0].province.id" : "552e4e125286e639b07494a1", // 云南
						"addressList[0].city.id" : "552e4e125286e639b07494a2", // 昆明
						"addressList[0].zone.id" : "552e4e125286e639b07494a4", // 五华区
						"addressList[0].address" : "人民路12号",
						"addressList[0].zipcode" : "650000",
						"addressList[0].tag" : "家", // 可选项
						"addressList[0].isDefault" : true, // 必填
						
						"addressList[1].consignee" : "范某某",
						"addressList[1].mobileno" : "45600",
						"addressList[1].province.id" : "552e4e125286e639b07494a1", // 云南
						"addressList[1].city.id" : "552e4e125286e639b07494a2", // 昆明
						"addressList[1].zone.id" : "552e4e125286e639b07494a4", // 五华区
						"addressList[1].address" : "滇池路12号",
						"addressList[1].zipcode" : "650000",
						"addressList[1].tag" : "公司" // 可选项
					}, 
					function(json){
						console.info( JSON.stringify(json) );
						if (json.state == "ok") {
							// done
						} else if (json.state == "error") {
							if (json.mobileno) {
								// mobileno := 手机号必填 | 找不到该用户
							}
							if (json.message) {
								// message := 参数错误
							}
						}
					}, 
					"json"
				);
				
				$.post(
					ctx+"/api/address/", 
					{
						id : "553a11451229ef1f98734e87",
						idx : 1, 
						
						"consignee" : "范某",
						"mobileno" : "456",
						"province.id" : "552e4e125286e639b07494a1", // 云南
						"city.id" : "552e4e125286e639b07494a2", // 昆明
						"zone.id" : "552e4e125286e639b07494a4", // 五华区
						"address" : "滇池路12号",
						"zipcode" : "650000",
						"tag" : "公司", // 可选项
						"isDefault" : true
					}, 
					function(json){
						console.info( JSON.stringify(json) );
						if (json.state == "ok") {
							// done
						} else if (json.state == "error") {
							if (json.mobileno) {
								// mobileno := 手机号必填 | 找不到该用户
							}
							if (json.message) {
								// message := 参数错误
							}
						}
					}, 
					"json"
				);
				
				$.post(
					ctx+"/api/address/delete/", 
					{
						id : "553a11451229ef1f98734e87",
						idx : 1
					}, 
					function(json){
						console.info( JSON.stringify(json) );
						if (json.state == "ok") {
							// done
						} else if (json.state == "error") {
							if (json.mobileno) {
								// mobileno := 手机号必填 | 找不到该用户
							}
							if (json.message) {
								// message := 参数错误
							}
						}
					}, 
					"json"
				);
				
				$.post(
					ctx+"/api/order/add/", 
					{
						"commodity.id" : "5535f8d0eae2671fe8c50728", // 商品ID
						"purchaser.id" : "553a11451229ef1f98734e87", // 用户ID
						"priceStr" : "0.01", // 价格
						"num" : "1" // 数量
					}, 
					function(json){
						console.info( JSON.stringify(json) );
						if (json.state == "ok") {
							// done
						} else if (json.state == "error") {
							
						}
					}, 
					"json"
				);
				return false;
			});
			
			// 登录
			$("#test5").click(function(){
				$.post(
					ctx+"/people/check/", 
					{ mobileno : "13759182570", password : "123" }, 
					function(json){
						console.info( JSON.stringify(json) );
						if (json.state == "ok") {
							// done
						} else if (json.state == "error") {
							if (json.mobileno) {
								// mobileno := 手机号必填 | 找不到该用户
							}
							if (json.password) {
								// password := 密码必填 | 密码错误
							}
							if (json.message) {
								// message := 参数错误
							}
						}
					}, 
					"json"
				);
				return false;
			});
		} // end people index
		*/
		var $sceneryAdvSection = $("#scenery-adv-section");
		if ($sceneryAdvSection.length) {
			$("textarea[id^='sceneryDesc']").summernote({
				height: 500, 
				lang: 'zh-CN', 
				fontNames: editorFonts, 
				onImageUpload: function(files, editor, welEditable) {
					var data = new FormData();
					data.append("file", files[0]);
					$.ajax({
						data : data,
						dataType : "json", 
						type : "POST",
						url : ctx+"/resource/upload",
						cache : false,
						contentType : false,
						processData : false,
						success : function(json) {
							editor.insertImage(welEditable, ctx+json.src);
						}
					});
		        }
			});
			
			
			$("#endTime,#startTime,#endDate,#issueDate,#createDate", $sceneryAdvSection).datetimepicker({
		        format: "yyyy-mm-dd hh:ii",
		        autoclose: true,
		        todayBtn: true,
		        language: 'zh-CN', 
		        minuteStep: 10
		    });
			// TODO isUploading这个要排个队列
			var isUploading = false;
                //			图片 
			var uploadParam = {
				"swf" 				: ctx+"/jslibs/uploadify/uploadify.swf",
				"uploader" 			: ctx+"/resource/upload", 
				"buttonText" 		: "<i class='fa fa-upload'></i> 选择文件", 
				"fileObjName" 		: "file", 
				"removeCompleted" 	: true, 
				"multi" 			: false, 
				"fileSizeLimit" 	: "10MB", 
				"fileTypeDesc" 		: "图片、文件扫描件", 
				"fileTypeExts" 		: "*.jpg;*.jpeg; *.gif; *.png",
				onSelect 			: function(file){
					isUploading = true;
				}, 
				onCancel 			: function(file){
					toastr.error( '文件[' + file.name + ']上传取消！' );
					isUploading = false;
				}, 
				onUploadError 		: function(file, errorCode, errorMsg, errorString){
					toastr.error( '文件[' + file.name + ']上传错误：' + errorString );
					isUploading = false;
				}
			};
			
			function uploadOver(file, data, response) {
				var json = JSON.parse(data);
				var fileSize = Math.round( file.size / 1024 );
				toastr.success( '文件[' + file.name + '] - ' + fileSize + 'KB 上传成功！' );
				isUploading = false;
				
				return json;
			};
			var uploadParam2 = {
					"swf" 				: ctx+"/jslibs/uploadify/uploadify.swf",
					"uploader" 			: ctx+"/resource/upload", 
					"buttonText" 		: "<i class='fa fa-upload'></i> 选择视频", 
					"fileObjName" 		: "file", 
					"removeCompleted" 	: true, 
					"multi" 			: false, 
					"fileSizeLimit" 	: "100MB", 
					"fileTypeDesc" 		: "视频文件", 
//					"fileTypeExts" 		: "*.jpg; *.gif; *.png", 
					onSelect 			: function(file){
						isUploading = true;
					}, 
					onCancel 			: function(file){
						toastr.error( '文件[' + file.name + ']上传取消！' );
						isUploading = false;
					}, 
					onUploadError 		: function(file, errorCode, errorMsg, errorString){
						toastr.error( '文件[' + file.name + ']上传错误：' + errorString );
						isUploading = false;
					}
				};
			var uploadParam3 = {
					"swf" 				: ctx+"/jslibs/uploadify/uploadify.swf",
					"uploader" 			: ctx+"/resource/upload", 
					"buttonText" 		: "<i class='fa fa-upload'></i> 选择音乐", 
					"fileObjName" 		: "file", 
					"removeCompleted" 	: true, 
					"multi" 			: false, 
					"fileSizeLimit" 	: "100MB", 
					"fileTypeDesc" 		: "音乐文件", 
//					"fileTypeExts" 		: "*.jpg; *.gif; *.png", 
					onSelect 			: function(file){
						isUploading = true;
					}, 
					onCancel 			: function(file){
						toastr.error( '文件[' + file.name + ']上传取消！' );
						isUploading = false;
					}, 
					onUploadError 		: function(file, errorCode, errorMsg, errorString){
						toastr.error( '文件[' + file.name + ']上传错误：' + errorString );
						isUploading = false;
					}
				};
			
			
			
		} // end scenery adv section
		
		var $activityIndex = $("#activity-index");
		if ($activityIndex.length) {
			$("#activity-active").click(function(){
				var $this = $(this);
				var ids = new Array();
				$("#main-container .chkone:checked").each(function(index, item){
					ids.push( item.value );
				});
				
				if (ids.length) {
					var url = $this.data("url");
					$deleteConfirm.find('#delete-form')
						.attr('action', url)
						.find('input[name="ids"]').val( ids );
					$deleteConfirm.find('#confirm-tag').html( $this.html() );
					$deleteConfirm.modal('show');
				} else {
					toastr.warning( '请选择有效数据进行操作~' );
				}
			});
			$("#activity-againactive").click(function(){
				var $this = $(this);
				var ids = new Array();
				$("#main-container .chkone:checked").each(function(index, item){
					ids.push( item.value );
				});
				
				if (ids.length) {
					var url = $this.data("url");
					$deleteConfirm.find('#delete-form')
						.attr('action', url)
						.find('input[name="ids"]').val( ids );
					$deleteConfirm.find('#confirm-tag').html( $this.html() );
					$deleteConfirm.modal('show');
				} else {
					toastr.warning( '请选择有效数据进行操作~' );
				}
			});
			
			$("#activity-stopActive").click(function(){
				var $this = $(this);
				var ids = new Array();
				$("#main-container .chkone:checked").each(function(index, item){
					ids.push( item.value );
				});
				
				if (ids.length) {
					var url = $this.data("url");
					$deleteConfirm.find('#delete-form')
						.attr('action', url)
						.find('input[name="ids"]').val( ids );
					$deleteConfirm.find('#confirm-tag').html( $this.html() );
					$deleteConfirm.modal('show');
				} else {
					toastr.warning( '请选择有效数据进行操作~' );
				}
			});
			
			
			
		} // end activity index
		
		
		var $restaurantIndex = $("#restaurant-index");
		if ($restaurantIndex.length) {
			$("#activity-active").click(function(){
				var $this = $(this);
				var ids = new Array();
				$("#main-container .chkone:checked").each(function(index, item){
					ids.push( item.value );
				});
				if (ids.length) {
					var url = $this.data("url");
					$deleteConfirm.find('#delete-form')
					.attr('action', url)
					.find('input[name="ids"]').val( ids );
					$deleteConfirm.find('#confirm-tag').html( $this.html() );
					$deleteConfirm.modal('show');
				} else {
					toastr.warning( '请选择有效数据进行操作~' );
				}
			});
		} // end activity index
		var $viewIndex = $("#view-index");
		if ($viewIndex.length) {
			$("#activity-active").click(function(){
				var $this = $(this);
				var ids = new Array();
				$("#main-container .chkone:checked").each(function(index, item){
					ids.push( item.value );
				});
				
				if (ids.length) {
					var url = $this.data("url");
					$deleteConfirm.find('#delete-form')
					.attr('action', url)
					.find('input[name="ids"]').val( ids );
					$deleteConfirm.find('#confirm-tag').html( $this.html() );
					$deleteConfirm.modal('show');
				} else {
					toastr.warning( '请选择有效数据进行操作~' );
				}
			});
		} // end activity index
		
		// 美食发布
		var $foodIndex = $("#food-index");
		if ($foodIndex.length) {
			$("#food-active").click(function(){
				var $this = $(this);
				var ids = new Array();
				$("#main-container .chkone:checked").each(function(index, item){
					ids.push( item.value );
				});
				
				if (ids.length) {
					var url = $this.data("url");
					$deleteConfirm.find('#delete-form')
						.attr('action', url)
						.find('input[name="ids"]').val( ids );
					$deleteConfirm.find('#confirm-tag').html( $this.html() );
					$deleteConfirm.modal('show');
				} else {
					toastr.warning( '请选择有效数据进行操作~' );
				}
			});
			
			$("#food-stopactive").click(function(){
				var $this = $(this);
				var ids = new Array();
				$("#main-container .chkone:checked").each(function(index, item){
					ids.push( item.value );
				});
				
				if (ids.length) {
					var url = $this.data("url");
					$deleteConfirm.find('#delete-form')
						.attr('action', url)
						.find('input[name="ids"]').val( ids );
					$deleteConfirm.find('#confirm-tag').html( $this.html() );
					$deleteConfirm.modal('show');
				} else {
					toastr.warning( '请选择有效数据进行操作~' );
				}
			});
		}
		
		// 风景之旅游记发布
		var $travelNotes4FJIndex = $("#travelNotes4FJ-index");
		if ($travelNotes4FJIndex.length) {
			$("#active4FJ-active").click(function(){
				var $this = $(this);
				var ids = new Array();
				$("#main-container .chkone:checked").each(function(index, item){
					ids.push( item.value );
				});
				
				if (ids.length) {
					var url = $this.data("url");
					$deleteConfirm.find('#delete-form')
						.attr('action', url)
						.find('input[name="ids"]').val( ids );
					$deleteConfirm.find('#confirm-tag').html( $this.html() );
					$deleteConfirm.modal('show');
				} else {
					toastr.warning( '请选择有效数据进行操作~' );
				}
			});
		}
		
		
		// 本地人游记发布
		var $travelNotes4BDIndex = $("#travelNotes4BD-index");
		if ($travelNotes4BDIndex.length) {
			$("#active4BD-active").click(function(){
				var $this = $(this);
				var ids = new Array();
				$("#main-container .chkone:checked").each(function(index, item){
					ids.push( item.value );
				});
				
				if (ids.length) {
					var url = $this.data("url");
					$deleteConfirm.find('#delete-form')
					.attr('action', url)
					.find('input[name="ids"]').val( ids );
					$deleteConfirm.find('#confirm-tag').html( $this.html() );
					$deleteConfirm.modal('show');
				} else {
					toastr.warning( '请选择有效数据进行操作~' );
				}
			});
		}
		
		
		// 本地人演出发布
		var $show4BDIndex = $("#show4BD-index");
		if ($show4BDIndex.length) {
			$("#active4BD-active").click(function(){
				var $this = $(this);
				var ids = new Array();
				$("#main-container .chkone:checked").each(function(index, item){
					ids.push( item.value );
				});
				
				if (ids.length) {
					var url = $this.data("url");
					$deleteConfirm.find('#delete-form')
					.attr('action', url)
					.find('input[name="ids"]').val( ids );
					$deleteConfirm.find('#confirm-tag').html( $this.html() );
					$deleteConfirm.modal('show');
				} else {
					toastr.warning( '请选择有效数据进行操作~' );
				}
			});
		}
		
		// 本地人带你看演出发布
		var $show4BDDIndex = $("#show4BDD-index");
		if ($show4BDDIndex.length) {
			$("#active4BDD-active").click(function(){
				var $this = $(this);
				var ids = new Array();
				$("#main-container .chkone:checked").each(function(index, item){
					ids.push( item.value );
				});
				
				if (ids.length) {
					var url = $this.data("url");
					$deleteConfirm.find('#delete-form')
					.attr('action', url)
					.find('input[name="ids"]').val( ids );
					$deleteConfirm.find('#confirm-tag').html( $this.html() );
					$deleteConfirm.modal('show');
				} else {
					toastr.warning( '请选择有效数据进行操作~' );
				}
			});
		}
		
		// 精品游记发布
		var $travelNotes4JPIndex = $("#travelNotes4JP-index");
		if ($travelNotes4JPIndex.length) {
			$("#active4JP-active").click(function(){
				var $this = $(this);
				var ids = new Array();
				$("#main-container .chkone:checked").each(function(index, item){
					ids.push( item.value );
				});
				
				if (ids.length) {
					var url = $this.data("url");
					$deleteConfirm.find('#delete-form')
					.attr('action', url)
					.find('input[name="ids"]').val( ids );
					$deleteConfirm.find('#confirm-tag').html( $this.html() );
					$deleteConfirm.modal('show');
				} else {
					toastr.warning( '请选择有效数据进行操作~' );
				}
			});
		}
		
		// 风景之旅的风景发布
		var $view4FJIndex = $("#view4FJ-index");
		if ($view4FJIndex.length) {
			$("#active4FJ-active").click(function(){
				var $this = $(this);
				var ids = new Array();
				$("#main-container .chkone:checked").each(function(index, item){
					ids.push( item.value );
				});
				
				if (ids.length) {
					var url = $this.data("url");
					$deleteConfirm.find('#delete-form')
					.attr('action', url)
					.find('input[name="ids"]').val( ids );
					$deleteConfirm.find('#confirm-tag').html( $this.html() );
					$deleteConfirm.modal('show');
				} else {
					toastr.warning( '请选择有效数据进行操作~' );
				}
			});
		}
		//欢迎页启用
		var $activityIndex = $("#activity-index");
		if ($activityIndex.length) {
			$("#welcome-active").click(function(){
				var $this = $(this);
				var ids = new Array();
				var checkCount = $("#main-container .chkone:checked").length;
				if (checkCount > 1) {
					toastr.warning( '只能选择一条记录~' );
				} else {
					$("#main-container .chkone:checked").each(function(index, item){
						ids.push( item.value );
					});
					
					if (ids.length) {
						var url = $this.data("url");
						$deleteConfirm.find('#delete-form')
							.attr('action', url)
							.find('input[name="ids"]').val( ids );
						$deleteConfirm.find('#confirm-tag').html( $this.html() );
						$deleteConfirm.modal('show');
					} else {
						toastr.warning( '请选择有效数据进行操作~' );
					}
			}
			});
		} 
		// 本地人风景发布
		var $view4BDIndex = $("#view4BD-index");
		if ($view4BDIndex.length) {
			$("#active4BD-active").click(function(){
				var $this = $(this);
				var ids = new Array();
				$("#main-container .chkone:checked").each(function(index, item){
					ids.push( item.value );
				});
				
				if (ids.length) {
					var url = $this.data("url");
					$deleteConfirm.find('#delete-form')
					.attr('action', url)
					.find('input[name="ids"]').val( ids );
					$deleteConfirm.find('#confirm-tag').html( $this.html() );
					$deleteConfirm.modal('show');
				} else {
					toastr.warning( '请选择有效数据进行操作~' );
				}
			});
		}
		
		// 本地人带你玩发布
		var $view4BDDIndex = $("#view4BDD-index");
		if ($view4BDDIndex.length || $view4BDIndex.length) {
			$("#active4BDD-active").click(function(){
				var $this = $(this);
				var ids = new Array();
				$("#main-container .chkone:checked").each(function(index, item){
					ids.push( item.value );
				});
				
				if (ids.length) {
					var url = $this.data("url");
					$deleteConfirm.find('#delete-form')
					.attr('action', url)
					.find('input[name="ids"]').val( ids );
					$deleteConfirm.find('#confirm-tag').html( $this.html() );
					$deleteConfirm.modal('show');
				} else {
					toastr.warning( '请选择有效数据进行操作~' );
				}
			});
			
			$("#active4BDD2-active").click(function(){
				var $this = $(this);
				var ids = new Array();
				$("#main-container .chkone:checked").each(function(index, item){
					ids.push( item.value );
				});
				
				if (ids.length) {
					var url = $this.data("url");
					$deleteConfirm.find('#delete-form')
					.attr('action', url)
					.find('input[name="ids"]').val( ids );
					$deleteConfirm.find('#confirm-tag').html( $this.html() );
					$deleteConfirm.modal('show');
				} else {
					toastr.warning( '请选择有效数据进行操作~' );
				}
			});
		}
		
		// 本地人餐厅发布
		var $restaurant4BDIndex = $("#restaurant4BD-index");
		if ($restaurant4BDIndex.length) {
			$("#active4BD-active").click(function(){
				var $this = $(this);
				var ids = new Array();
				$("#main-container .chkone:checked").each(function(index, item){
					ids.push( item.value );
				});
				
				if (ids.length) {
					var url = $this.data("url");
					$deleteConfirm.find('#delete-form')
					.attr('action', url)
					.find('input[name="ids"]').val( ids );
					$deleteConfirm.find('#confirm-tag').html( $this.html() );
					$deleteConfirm.modal('show');
				} else {
					toastr.warning( '请选择有效数据进行操作~' );
				}
			});
		}
		
		
		// 本地人带你吃餐厅发布
		var $restaurant4BDDIndex = $("#restaurant4BDD-index");
		if ($restaurant4BDDIndex.length) {
			$("#active4BDD-active").click(function(){
				var $this = $(this);
				var ids = new Array();
				$("#main-container .chkone:checked").each(function(index, item){
					ids.push( item.value );
				});
				
				if (ids.length) {
					var url = $this.data("url");
					$deleteConfirm.find('#delete-form')
					.attr('action', url)
					.find('input[name="ids"]').val( ids );
					$deleteConfirm.find('#confirm-tag').html( $this.html() );
					$deleteConfirm.modal('show');
				} else {
					toastr.warning( '请选择有效数据进行操作~' );
				}
			});
		}
		
		//行程添加到板块
		var $routeIndex = $("#activity-index");
		if ($routeIndex.length) {
			$("#typeSubmit").click(function(){
				var $this = $(this);
				var ids = new Array();
				$("#main-container .chkone:checked").each(function(index, item){
					ids.push( item.value );
				});
				
				var types = "";
				$("#type-form .checkbox-type:checked").each(function(index, item){
					if (types != "") {
						types += ",";
					}
					types += item.value;
				});
				if (types.length) {
					if (ids.length) {
						var url = $this.data("url");
						url += "?types="+types;
						$deleteConfirm.find('#delete-form')
						.attr('action', url)
						.find('input[name="ids"]').val( ids );
						//.find('input[name="types"]').val( types )
						$deleteConfirm.find('#confirm-tag').html( "放入" );
						$deleteConfirm.modal('show');
					} else {
						toastr.warning( '请选择有效数据进行操作~' );
					}
				} else {
					toastr.warning( '请选择有效版块类型进行操作~' );
				}
				
			});
		}
		
		
		
		// 游记添加版块
		var $travelNotesIndex = $("#travelNotes-index");
		if ($travelNotesIndex.length) {
			$("#typeSubmit").click(function(){
				var $this = $(this);
				var ids = new Array();
				$("#main-container .chkone:checked").each(function(index, item){
					ids.push( item.value );
				});
				
				var types = "";
				$("#type-form .checkbox-type:checked").each(function(index, item){
					if (types != "") {
						types += ",";
					}
					types += item.value;
				});
				if (types.length) {
					if (ids.length) {
						var url = $this.data("url");
						url += "?types="+types;
						$deleteConfirm.find('#delete-form')
						.attr('action', url)
						.find('input[name="ids"]').val( ids );
//						.find('input[name="types"]').val( types )
						$deleteConfirm.find('#confirm-tag').html( "放入" );
						$deleteConfirm.modal('show');
					} else {
						toastr.warning( '请选择有效数据进行操作~' );
					}
				} else {
					toastr.warning( '请选择有效版块类型进行操作~' );
				}
				
			});
		}
		// 餐厅添加版块
		var $restaurantIndex = $("#restaurant-index");
		if ($restaurantIndex.length) {
			$("#typeSubmit").click(function(){
				var $this = $(this);
				var ids = new Array();
				$("#main-container .chkone:checked").each(function(index, item){
					ids.push( item.value );
				});
				
				var types = "";
				$("#type-form .checkbox-type:checked").each(function(index, item){
					if (types != "") {
						types += ",";
					}
					types += item.value;
				});
				if (types.length) {
					if (ids.length) {
						var url = $this.data("url");
						url += "?types="+types;
						$deleteConfirm.find('#delete-form')
						.attr('action', url)
						.find('input[name="ids"]').val( ids );
//						.find('input[name="types"]').val( types )
						$deleteConfirm.find('#confirm-tag').html( "放入" );
						$deleteConfirm.modal('show');
					} else {
						toastr.warning( '请选择有效数据进行操作~' );
					}
				} else {
					toastr.warning( '请选择有效版块类型进行操作~' );
				}
				
			});
		}
		// 美食添加版块
		var $foodIndex = $("#food-index");
		if ($foodIndex.length) {
			$("#typeSubmit").click(function(){
				var $this = $(this);
				var ids = new Array();
				$("#main-container .chkone:checked").each(function(index, item){
					ids.push( item.value );
				});
				
				var types = "";
				$("#type-form .checkbox-type:checked").each(function(index, item){
					if (types != "") {
						types += ",";
					}
					types += item.value;
				});
				if (types.length) {
					if (ids.length) {
						var url = $this.data("url");
						url += "?types="+types;
						$deleteConfirm.find('#delete-form')
						.attr('action', url)
						.find('input[name="ids"]').val( ids );
//						.find('input[name="types"]').val( types )
						$deleteConfirm.find('#confirm-tag').html( "放入" );
						$deleteConfirm.modal('show');
					} else {
						toastr.warning( '请选择有效数据进行操作~' );
					}
				} else {
					toastr.warning( '请选择有效版块类型进行操作~' );
				}
				
			});
		}
		// 风景添加版块
		var $viewIndex = $("#view-index");
		if ($viewIndex.length) {
			$("#typeSubmit").click(function(){
				var $this = $(this);
				var ids = new Array();
				$("#main-container .chkone:checked").each(function(index, item){
					ids.push( item.value );
				});
				
				var types = "";
				$("#type-form .checkbox-type:checked").each(function(index, item){
					if (types != "") {
						types += ",";
					}
					types += item.value;
				});
				if (types.length) {
					if (ids.length) {
						var url = $this.data("url");
						url += "?types="+types;
						$deleteConfirm.find('#delete-form')
						.attr('action', url)
						.find('input[name="ids"]').val( ids );
//						.find('input[name="types"]').val( types )
						$deleteConfirm.find('#confirm-tag').html( "放入" );
						$deleteConfirm.modal('show');
					} else {
						toastr.warning( '请选择有效数据进行操作~' );
					}
				} else {
					toastr.warning( '请选择有效版块类型进行操作~' );
				}
				
			});
		}
		
		// 演出添加版块
		var $showIndex = $("#show-index");
		if ($showIndex.length) {
			$("#typeSubmit").click(function(){
				var $this = $(this);
				var ids = new Array();
				$("#main-container .chkone:checked").each(function(index, item){
					ids.push( item.value );
				});
				
				var types = "";
				$("#type-form .checkbox-type:checked").each(function(index, item){
					if (types != "") {
						types += ",";
					}
					types += item.value;
				});
				if (types.length) {
					if (ids.length) {
						var url = $this.data("url");
						url += "?types="+types;
						$deleteConfirm.find('#delete-form')
						.attr('action', url)
						.find('input[name="ids"]').val( ids );
//						.find('input[name="types"]').val( types )
						$deleteConfirm.find('#confirm-tag').html( "放入" );
						$deleteConfirm.modal('show');
					} else {
						toastr.warning( '请选择有效数据进行操作~' );
					}
				} else {
					toastr.warning( '请选择有效版块类型进行操作~' );
				}
				
			});
		}
		
		
		
		
		// 行程发布
		var $journeyIndex = $("#journey-index");
		
			$("#activity-toTop").click(function(){
				var $this = $(this);
				var ids = new Array();
				$("#main-container .chkone:checked").each(function(index, item){
					ids.push( item.value );
				});
				
				if (ids.length) {
					var url = $this.data("url");
					$deleteConfirm.find('#delete-form')
						.attr('action', url)
						.find('input[name="ids"]').val( ids );
					$deleteConfirm.find('#confirm-tag').html( $this.html() );
					$deleteConfirm.modal('show');
				} else {
					toastr.warning( '请选择有效数据进行操作~' );
				}
			});
			
			$("#activity-cancelTop").click(function(){
				var $this = $(this);
				var ids = new Array();
				$("#main-container .chkone:checked").each(function(index, item){
					ids.push( item.value );
				});
				
				if (ids.length) {
					var url = $this.data("url");
					$deleteConfirm.find('#delete-form')
						.attr('action', url)
						.find('input[name="ids"]').val( ids );
					$deleteConfirm.find('#confirm-tag').html( $this.html() );
					$deleteConfirm.modal('show');
				} else {
					toastr.warning( '请选择有效数据进行操作~' );
				}
			});
		
		
		// 置顶
		var $activityTopIndex = $("#activity-top");
		if ($activityTopIndex.length) {
			$("#activity-top").click(function(){
				var $this = $(this);
				var ids = new Array();
				var checkCount = $("#main-container .chkone:checked").length;
				if (checkCount > 1) {
					toastr.warning( '只能选择一条记录~' );
				} else {
					$("#main-container .chkone:checked").each(function(index, item){
						ids.push( item.value );
					});
					if (ids.length) {
						var url = $this.data("url");
						$deleteConfirm.find('#delete-form')
							.attr('action', url)
							.find('input[name="ids"]').val( ids );
						$deleteConfirm.find('#confirm-tag').html( $this.html() );
						$deleteConfirm.modal('show');
					} else {
						toastr.warning( '请选择有效数据进行操作~' );
					}
				}
			});
		} // end activity index
		
		
		// 上移 
		var $activityUpIndex = $("#activity-up");
		if ($activityUpIndex.length) {
			$("#activity-up").click(function(){
				var $this = $(this);
				console.log($this);
				var ids = new Array();
				var checkCount = $("#main-container .chkone:checked").length;
				if (checkCount > 1) {
					toastr.warning( '只能选择一条记录~' );
				} else {
					var tre=$("#main-container .chkone:checked");
					$("#main-container .chkone:checked").each(function(index, item){
						ids.push( item.value );
					});
					var lastId = $("#main-container .chkone:checked").parents("tr[role='row']").prev().find("input").val();
					if (lastId != null && lastId != "") {
						ids.push(lastId);
					}
					if (ids.length) {
						var url = $this.data("url");
						$deleteConfirm.find('#delete-form')
							.attr('action', url)
							.find('input[name="ids"]').val( ids );
						$deleteConfirm.find('#confirm-tag').html( $this.html() );
						$deleteConfirm.modal('show');
					} else {
						toastr.warning( '请选择有效数据进行操作~' );
					}
				}
			});
		} // end activity index
		
		
		// 下移
		var $activityDownIndex = $("#activity-down");
		if ($activityDownIndex.length) {
			$("#activity-down").click(function(){
				var $this = $(this);
				var ids = new Array();
				var checkCount = $("#main-container .chkone:checked").length;
				if (checkCount > 1) {
					toastr.warning( '只能选择一条记录~' );
				} else {
					$("#main-container .chkone:checked").each(function(index, item){
						ids.push( item.value );
					});
					var nextId = $("#main-container .chkone:checked").parents("tr[role='row']").next().find("input").val();
					if (nextId != null && nextId != "") {
						ids.push(nextId);
					}
					if (ids.length) {
						var url = $this.data("url");
						$deleteConfirm.find('#delete-form')
							.attr('action', url)
							.find('input[name="ids"]').val( ids );
						$deleteConfirm.find('#confirm-tag').html( $this.html() );
						$deleteConfirm.modal('show');
					} else {
						toastr.warning( '请选择有效数据进行操作~' );
					}
				}
			});
		} // end activity index
		//本地人景点的移动
		// 上移 
		var $viewTopUp = $("#viewTop-up");
		if ($viewTopUp.length) {
			$("#viewTop-up").click(function(){
				var $this = $(this);
				
				var ids = new Array();
				var checkCount = $("#main-container .chkone:checked").length;
				if (checkCount > 1) {
					toastr.warning( '只能选择一条记录~' );
				} else {
						//这条
					var $tds = $("#main-container .chkone:checked").parents("tr[role='row']").find("input[name=isTop]").val();
					//上条
					var $tds0 = $("#main-container .chkone:checked").parents("tr[role='row']").prev().find("input[name=isTop]").val();
					
					if($tds >"0"){
						$("#main-container .chkone:checked").each(function(index, item){
							ids.push( item.value );
						});
						var lastId = $("#main-container .chkone:checked").parents("tr[role='row']").prev().find("input").val();
						
						if (lastId != null && lastId != "") {
							ids.push(lastId);
						}
						if (ids.length) {
							var url = $this.data("url");
							$deleteConfirm.find('#delete-form').attr('action', url).find('input[name="ids"]').val( ids );
							$deleteConfirm.find('#confirm-tag').html( $this.html() );
							$deleteConfirm.modal('show');
						} else {
							toastr.warning( '请选择有效数据进行操作~' );
						}
					}else{
							toastr.warning( '请先置顶此条数据' );
					}
				}
					
			});
		} // end activity index
		// 下移
		var $viewTopDown = $("#viewTop-down");
		if ($viewTopDown.length) {
			$("#viewTop-down").click(function(){
				var $this = $(this);
				var ids = new Array();
				var checkCount = $("#main-container .chkone:checked").length;
				if (checkCount > 1) {
					toastr.warning( '只能选择一条记录~' );
				} else {
					//这条
					var $tds = $("#main-container .chkone:checked").parents("tr[role='row']").find("input[name=isTop]").val();
					//下条
					var $tds1 = $("#main-container .chkone:checked").parents("tr[role='row']").next().find("input[name=isTop]").val();
					
					if($tds >"0"){
						if($tds1 =="0"){
							toastr.warning( '请先置顶下条数据' );
						}else{
							$("#main-container .chkone:checked").each(function(index, item){
								ids.push( item.value );
							});
							var nextId = $("#main-container .chkone:checked").parents("tr[role='row']").next().find("input").val();
							if (nextId != null && nextId != "") {
								ids.push(nextId);
							}
							if (ids.length) {
								var url = $this.data("url");
								$deleteConfirm.find('#delete-form').attr('action', url).find('input[name="ids"]').val( ids );
								$deleteConfirm.find('#confirm-tag').html( $this.html() );
								$deleteConfirm.modal('show');
							} else {
								toastr.warning( '请选择有效数据进行操作~' );
							}
						}
					}else{
							toastr.warning( '请先置顶此条数据' );
					}
				}
			});
		} // end activity index
		
		
		
		//只有发布状态的数据才能移动
		//必游 必吃 start   置顶
		var $activityTopIndexNum = $("#activityNum-top");
		if ($activityTopIndexNum.length) {
			$("#activityNum-top").click(function(){
				var $this = $(this);
				var ids = new Array();
				var checkCount = $("#main-container .chkone:checked").length;
				if (checkCount > 1) {
					toastr.warning( '只能选择一条记录~' );
				} else {
					var $tds = $("#main-container .chkone:checked").parents("tr[role='row']").find("input[name=state]").val();
					if($tds >"0"){
						$("#main-container .chkone:checked").each(function(index, item){
							ids.push( item.value );
						});
						if (ids.length) {
							var url = $this.data("url");
							$deleteConfirm.find('#delete-form')
								.attr('action', url)
								.find('input[name="ids"]').val( ids );
							$deleteConfirm.find('#confirm-tag').html( $this.html() );
							$deleteConfirm.modal('show');
						} else {
							toastr.warning( '请选择有效数据进行操作~' );
						}
					}else {
						toastr.warning( '请先发布或推送此条数据' );
					}
				}
			});
		} // end activity index
		// 上移 
		var $activityUpIndexNum = $("#activityNum-up");
		if ($activityUpIndexNum.length) {
			$("#activityNum-up").click(function(){
				var $this = $(this);
				var ids = new Array();
				var checkCount = $("#main-container .chkone:checked").length;
				if (checkCount > 1) {
					toastr.warning( '只能选择一条记录~' );
				} else {
						//这条
					var $tds = $("#main-container .chkone:checked").parents("tr[role='row']").find("input[name=state]").val();
					//上条
					var $tds0 = $("#main-container .chkone:checked").parents("tr[role='row']").prev().find("input[name=state]").val();
					
					if($tds >"0"){
						$("#main-container .chkone:checked").each(function(index, item){
							ids.push( item.value );
						});
						var lastId = $("#main-container .chkone:checked").parents("tr[role='row']").prev().find("input").val();
						
						if (lastId != null && lastId != "") {
							ids.push(lastId);
						}
						if (ids.length) {
							var url = $this.data("url");
							$deleteConfirm.find('#delete-form')
								.attr('action', url)
								.find('input[name="ids"]').val( ids );
							$deleteConfirm.find('#confirm-tag').html( $this.html() );
							$deleteConfirm.modal('show');
						} else {
							toastr.warning( '请选择有效数据进行操作~' );
							
						}
						
					}else{
							toastr.warning( '请先发布或推送此条数据' );
					}
				}
					
			});
		} // end activity index
		// 下移
		var $activityDownIndexNum = $("#activityNum-down");
		if ($activityDownIndexNum.length) {
			$("#activityNum-down").click(function(){
				var $this = $(this);
				var ids = new Array();
				var checkCount = $("#main-container .chkone:checked").length;
				if (checkCount > 1) {
					toastr.warning( '只能选择一条记录~' );
				} else {
					//这条
					var $tds = $("#main-container .chkone:checked").parents("tr[role='row']").find("input[name=state]").val();
					//下条
					var $tds1 = $("#main-container .chkone:checked").parents("tr[role='row']").next().find("input[name=state]").val();
					
					if($tds >"0"){ 
						if($tds1 =="0"){
							toastr.warning( '请先发布或推送下条数据' );
						}else{
							$("#main-container .chkone:checked").each(function(index, item){
								ids.push( item.value );
							});
							var nextId = $("#main-container .chkone:checked").parents("tr[role='row']").next().find("input").val();
							if (nextId != null && nextId != "") {
								ids.push(nextId);
							}
							if (ids.length) {
								var url = $this.data("url");
								$deleteConfirm.find('#delete-form')
									.attr('action', url)
									.find('input[name="ids"]').val( ids );
								$deleteConfirm.find('#confirm-tag').html( $this.html() );
								$deleteConfirm.modal('show');
							} else {
								toastr.warning( '请选择有效数据进行操作~' );
							}
						}
						
						
					}else{
							toastr.warning( '请先发布或推送此条数据' );
					}
				}
			});
		} // end activity index
		//必游 必吃   end
		
		
		
		var $partnerIndex = $("#partner-active");
		if ($partnerIndex.length) {
			$("#partner-active").click(function(){
				var $this = $(this);
				var ids = new Array();
				$("#main-container .chkone:checked").each(function(index, item){
					ids.push( item.value );
				});
				
				if (ids.length) {
					var url = $this.data("url");
					$deleteConfirm.find('#delete-form')
						.attr('action', url)
						.find('input[name="ids"]').val( ids );
					$deleteConfirm.find('#confirm-tag').html( $this.html() );
					$deleteConfirm.modal('show');
				} else {
					toastr.warning( '请选择有效数据进行操作~' );
				}
			});
		} // end partner index
		
		
		// 后台用户注销
		var $menuNav = $("#bs-collapse");
		if ($menuNav.length) {
			$("#user-cancel").click(function(){
				var $this = $(this);
				var ids = new Array();
				$("#main-container .chkone:checked").each(function(index, item){
					ids.push( item.value );
				});
			/*	var userid=$("input[id='userid']").val();
				ids.push( userid );*/
				if (ids.length) {
					var url = $this.data("url");
					$deleteConfirm.find('#delete-form')
						.attr('action', url)
						.find('input[name="ids"]').val( ids );
					$deleteConfirm.find('#confirm-tag').html( $this.html() );
					$deleteConfirm.modal('show');
				} else {
					toastr.warning( '请选择有效数据进行操作~' );
				}
			});
		} // end user-cancel
		
		// 后台用户激活
		var $menuNav = $("#bs-collapse");
		if ($menuNav.length) {
			$("#user-active").click(function(){
				var $this = $(this);
				var ids = new Array();
				$("#main-container .chkone:checked").each(function(index, item){
					ids.push( item.value );
				});
				/*var userid=$("input[id='userid']").val();
				ids.push( userid );*/
				if (ids.length) {
					var url = $this.data("url");
					$deleteConfirm.find('#delete-form')
						.attr('action', url)
						.find('input[name="ids"]').val( ids );
					$deleteConfirm.find('#confirm-tag').html( $this.html() );
					$deleteConfirm.modal('show');
				} else {
					toastr.warning( '请选择有效数据进行操作~' );
				}
			});
		} // end user-active
		
		// 用户筛选时重置 
		var $menuNav = $("#bs-collapse");
		if ($menuNav.length) {
			$("#user-search-clear").click(function(){
				$("#user-form").find("input").each(function(){
					$(this).val("");
				});
			});
		}
		
		// 后台用户冻结
		var $menuNav = $("#bs-collapse");
		if ($menuNav.length) {
			$("#user-freeze").click(function(){
				var $this = $(this);
				var ids = new Array();
				$("#main-container .chkone:checked").each(function(index, item){
					ids.push( item.value );
				});
				/*var userid=$("input[id='userid']").val();
				ids.push( userid );*/
				if (ids.length) {
					var url = $this.data("url");
					$deleteConfirm.find('#delete-form')
						.attr('action', url)
						.find('input[name="ids"]').val( ids );
					$deleteConfirm.find('#confirm-tag').html( $this.html() );
					$deleteConfirm.modal('show');
				} else {
					toastr.warning( '请选择有效数据进行操作~' );
				}
			});
		} // end user-freeze
		
		
		var $sceneryIndex = $("#scenery-index");
		if ($sceneryIndex.length) {
			$("#scenery-active").click(function(){
				var $this = $(this);
				var ids = new Array();
				$("#main-container .chkone:checked").each(function(index, item){
					ids.push( item.value );
				});
				
				if (ids.length) {
					var url = $this.data("url");
					$deleteConfirm.find('#delete-form')
						.attr('action', url)
						.find('input[name="ids"]').val( ids );
					$deleteConfirm.find('#confirm-tag').html( $this.html() );
					$deleteConfirm.modal('show');
				} else {
					toastr.warning( '请选择有效数据进行操作~' );
				}
			});
		} // end scenery index
		
		
		var $cultureIndex = $("#culture-index");
		if ($cultureIndex.length) {
			$("#culture-active").click(function(){
				var $this = $(this);
				var ids = new Array();
				$("#main-container .chkone:checked").each(function(index, item){
					ids.push( item.value );
				});
				
				if (ids.length) {
					var url = $this.data("url");
					$deleteConfirm.find('#delete-form')
						.attr('action', url)
						.find('input[name="ids"]').val( ids );
					$deleteConfirm.find('#confirm-tag').html( $this.html() );
					$deleteConfirm.modal('show');
				} else {
					toastr.warning( '请选择有效数据进行操作~' );
				}
			});
		} // end culture index
		
		
		
		var $travelIndex = $("#travel-index");
		if ($travelIndex.length) {
			$("#travel-active").click(function(){
				var $this = $(this);
				var ids = new Array();
				$("#main-container .chkone:checked").each(function(index, item){
					ids.push( item.value );
				});
				
				if (ids.length) {
					var url = $this.data("url");
					$deleteConfirm.find('#delete-form')
						.attr('action', url)
						.find('input[name="ids"]').val( ids );
					$deleteConfirm.find('#confirm-tag').html( $this.html() );
					$deleteConfirm.modal('show');
				} else {
					toastr.warning( '请选择有效数据进行操作~' );
				}
			});
		} // end travel index
	
	};
}
