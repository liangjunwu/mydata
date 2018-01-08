<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    <%@include file="../public/top.jsp" %>
<script type="text/javascript">
	$(function(){
		//上一页 、下一页
		$("a[page]").click(function(){
			var gotoPage = $(this).attr("page");
			$("#pageTo").val(gotoPage);
			$("#form").submit();
			return false;
		});
		
		//首页
		$("#fristPage").click(function(){
			$("#pageTo").val(1);
			$("#gotoPage").val(1);
			$("#form").submit();
			return false;
		});
		
		//尾页
		$("#lastPage").click(function(){
			var lastpage = ${requestScope.pagebean.totalPage };
			$("#pageTo").val(lastpage);
			$("#form").submit();
			return false;
		});
			
			
		
		$("#gotoPage").click(function(){
			var reg = /^[1-9]\d*$/;
			var gotoPage = $("#pageTo").val();
			if(!reg.test(gotoPage)){
				alert("请输入合法的数字");
				return false;
			}
			$("#form").submit();
			return false;
		});
		
		$("#clearBtn").click(function(){
			$("#accountName").value("");
			$("#platform > option:eq(0)").prop("selected",true);
			$("#payType > option:eq(0)").prop("selected",true);
			$("input[name='beginTime']").val("");
			$("input[name='endTime']").val("");
			return false;
		});
		
		$("#searchBtn").click(function(){
			$("#pageTo").val(1);
			$("#form").submit();
			return false;
		});
		
	});

</script>
	<div id="right" style="margin: 20px auto 0;">
		<h1>mytest</h1>
	</div>
<%@ include file="../public/bottom.jsp" %>
