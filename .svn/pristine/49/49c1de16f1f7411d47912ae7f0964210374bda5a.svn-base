<%@ page contentType="text/html;charset=UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"  %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<script> 
window.onload = function(){
	var userName = $("#userNameVal").text();
	if ("admin" != userName) {
	}
}
</script>
<input type="hidden" value="${navname}" id="currentMeum">
<span id="userNameVal" style="display: none;"><shiro:principal property="username"/></span> 
<c:set var="ctx" value="${pageContext.request.contextPath}" />
<!-- BEGIN SIDEBAR -->
<div class="page-sidebar-wrapper">
	<div class="page-sidebar navbar-collapse collapse">
<shiro:user>
		<ul id="nav-bar" class="page-sidebar-menu page-sidebar-menu-hover-submenu1 page-sidebar-menu-fixed" data-keep-expanded="false" data-auto-scroll="false" style="margin-top: -20px;">
		<shiro:hasAnyRoles name="ROOT, COMMON,YUNNANDIANSHI">
			<li class="heading">
				<h3>通用</h3>
			</li>
			<%--超级管理用户 --%>
			<shiro:hasAnyRoles name="ROOT,COMMON">
			<li<c:if test="${navname eq 'people' || navname eq 'feedback' ||  navname eq 'softDownloadInfo'}"> class="active"</c:if> rel="two">
				<a href="javascript:;">
					<i class="icon-user"></i>
					<span class="title">用户中心</span>
					<span class="arrow "></span>
				</a>
				<ul class="sub-menu">
					<li>
						<a data-pjax href="${ctx}/people/">用户列表</a>
					</li>
					<li>
						<a data-pjax href="${ctx}/feedback/">意见反馈</a>
					</li>
					<li>
						<a data-pjax  href="${ctx}/softDownloadInfo/screen">下载次数统计</a>
					</li>
				</ul>
			</li>
			</shiro:hasAnyRoles>
			
			<shiro:hasAnyRoles name="ROOT,COMMON">
			<li<c:if test="${navname eq 'information'}"> class="active"</c:if> rel="one">
				<a  data-pjax href="${ctx}/information/personalInformation/">
					<i class="icon-user"></i>
					<span class="title">作者管理</span>
				</a>
			</li>
			</shiro:hasAnyRoles>
			
			 <shiro:hasAnyRoles name="ROOT,COMMON">
			<li<c:if test="${navname eq 'banners' || navname eq 'prizeList' || navname eq 'prizeDesc' || navname eq 'signPrize'}"> class="active"</c:if>  id="hzdw" rel="two">
				<a href="javascript:;">
					<i class="icon-grid"></i>
					<span class="title">活动管理</span>
					<span class="arrow "></span>
				</a>
				<ul class="sub-menu">
				     <li>
						<a  data-pjax href="${ctx}/banners/">Banners管理</a>
					</li>
					 <li>
						<a  data-pjax href="${ctx}/prizeList/">中奖名单导入</a>
					</li>
					 <li>
						<a data-pjax href="${ctx}/prizeDesc/">中奖结果描述</a>
					</li> 
					<li>
						<a data-pjax href="${ctx}/signPrize/">签到中奖管理</a>
					</li> 
					<li>
						<a data-pjax href="${ctx}/prizeInformation/">中奖信息导入</a>
					</li>
					 
				</ul>
			</li>
	   </shiro:hasAnyRoles>
	   
	      	<shiro:hasAnyRoles name="ROOT,COMMON,YUNNANDIANSHI">
			<li<c:if test="${navname eq 'dnMiss'}"> class="active"</c:if> rel="one">
				<a  data-pjax href="${ctx}/dnMiss/">
					<i class="icon-puzzle"></i>
					<span class="title">专题管理</span>
				</a>
			</li>
			</shiro:hasAnyRoles>
	    
			<shiro:hasAnyRoles name="ROOT,COMMON">
			<li<c:if test="${navname eq 'welcome' || navname eq 'hotSearch' || navname eq 'sensitiveWord' || navname eq 'relateWord'|| navname eq 'countryCity'}"> class="active"</c:if>  id="hzdw" rel="two">
				<a href="javascript:;">
					<i class="icon-grid"></i>
					<span class="title">客户端管理</span>
					<span class="arrow "></span>
				</a>
				<ul class="sub-menu">
				     <li>
						<a  data-pjax href="${ctx}/welcome/">欢迎页管理</a>
					</li>
					 <li>
						<a  data-pjax href="${ctx}/hotSearch/">热门搜索管理</a>
					</li>
					<li>
					    <a  data-pjax href="${ctx}/sensitiveWord/">敏感词管理</a>
					</li>
					 <li>
						<a  data-pjax href="${ctx}/relateWord/">关联文字管理</a>
					</li> 
					<li>
						<a  data-pjax href="${ctx}/countryCity/">全国城市管理</a>
					</li> 
					 
				</ul>
			</li>
	      </shiro:hasAnyRoles>
	      
			<shiro:hasAnyRoles name="ROOT,COMMON">
			<li<c:if test="${navname eq 'searchRecommend'}"> class="active"</c:if> rel="one">
				<a  data-pjax href="${ctx}/searchRecommend/">
					<i class="icon-grid"></i>
					<span class="title">搜索推荐管理</span>
				</a>
			</li>
			</shiro:hasAnyRoles>
			
			<shiro:hasAnyRoles name="ROOT,COMMON,YUNNANDIANSHI">
			<li<c:if test="${navname eq 'view'}"> class="active"</c:if> rel="two" id="hzdw">
				<a href="javascript:;">
					<i class="icon-grid"></i>
					<span class="title">风景管理</span>
					<span class="arrow "></span>
				</a>
				<ul class="sub-menu">
					<li>
					<a data-pjax href="${ctx}/view4GoYN/">风景总库</a>
					</li>
				   <%--  <li>
					<a data-pjax href="${ctx}/view4GoYN/fj">风景之旅</a>
					</li>  --%>
					<li>
					<a data-pjax href="${ctx}/view4GoYN/screen4BD">本地人景点</a>
					</li>
					<li>
					<a  data-pjax href="${ctx}/view4GoYN/screen4BDD">必游榜单</a>
					</li>
					<li>
					<a  data-pjax href="${ctx}/view4GoYN/smallView">小景点</a>
					</li>
					<li>
					<a  data-pjax href="${ctx}/bigDataView/">大数据景点</a>
					</li>
					<li>
					<a  data-pjax href="${ctx}/historyStory/">历史故事</a>
					</li>
					
				</ul>
			</li>
			</shiro:hasAnyRoles>
			
			<shiro:hasAnyRoles name="ROOT,COMMON,YUNNANDIANSHI">
			<li<c:if test="${navname eq 'food' || navname eq 'restaurant'}"> class="active"</c:if> id="hzdw" rel="two">
				<a href="javascript:;">
					<i class="icon-grid"></i>
					<span class="title">美食管理</span>
					<span class="arrow "></span>
				</a>
				<ul class="sub-menu">
					<li>
					 <a data-pjax href="${ctx}/food/">美食总库</a>
					</li>
					<li>
					 <a data-pjax href="${ctx}/food/foodTS/">特色美食</a>
					</li>
					<li>
					<a data-pjax href="${ctx}/food/musteat/">必吃榜单</a>
					</li>
					<li rel="two">
					<a  data-pjax href="${ctx}/restaurant/">餐厅总库</a>
					</li>
					<li rel="two">
					<a data-pjax href="${ctx}/restaurant/bd">本地人餐厅</a>
					</li>
					<li rel="two">
					<a data-pjax href="${ctx}/restaurant/littleRestaurant">小餐厅</a>
					</li>
					<%-- <li>
					<a data-pjax href="${ctx}/restaurant/bdd">本地人带你吃餐厅</a>
					</li> --%>
				</ul>
			</li>
			</shiro:hasAnyRoles>
														   <%-- <shiro:hasAnyRoles name="ROOT,COMMON">
															<li<c:if test="${navname eq 'show'}"> class="active"</c:if> rel="two">
																<a href="javascript:;">
																	<i class="icon-grid"></i>
																	<span class="title">演出管理</span>
																	<span class="arrow "></span>
																</a>
																<ul class="sub-menu">
																	<li>
																		<a data-pjax href="${ctx}/show/">演出总库</a>
																	</li>
																	<li>
																		<a data-pjax href="${ctx}/show/bd">本地人演出</a>
																	</li>
																	<li>
																		<a data-pjax href="${ctx}/show/bdd">本地人带你看演出</a>
																	</li>
																</ul>
															</li>
															</shiro:hasAnyRoles> --%>
															<%-- <shiro:hasAnyRoles name="ROOT,COMMON">
															<li<c:if test="${navname eq 'travelNotes'}"> class="active"</c:if> rel="two">
																<a href="javascript:;">
																	<i class="icon-grid"></i>
																	<span class="title">游记管理</span>
																	<span class="arrow "></span>
																</a>
																<ul class="sub-menu">
																	<li>
																		<a data-pjax href="${ctx}/travelNotes/">游记总库</a>
																	</li>
																	<li>
																		<a data-pjax href="${ctx}/travelNotes/fj">风景之旅的游记</a>
																	</li>
																	<li>
																		<a data-pjax href="${ctx}/travelNotes/bd">本地人游记</a>
																	</li>
																	<li>
																		<a data-pjax href="${ctx}/travelNotes/jp">精品游记</a>
																	</li>
																</ul>
															</li>
															</shiro:hasAnyRoles> --%>
			
			<shiro:hasAnyRoles name="ROOT,COMMON,YUNNANDIANSHI">
			<li<c:if test="${navname eq 'specialty' || navname eq 'store'}"> class="active"</c:if> rel="two">
				<a href="javascript:;">
					<i class="icon-grid"></i>
					<span class="title">商店管理</span>
					<span class="arrow "></span>
				</a>
				<ul class="sub-menu">
				     <li>
						<a data-pjax href="${ctx}/store/">商店总库</a>
					</li>
					 <li>
						<a data-pjax href="${ctx}/store/littleStore">小店铺</a>
					</li>
				    <li>
						<a data-pjax href="${ctx}/specialty/">特产总库</a>
					</li>
					
				</ul>
			</li>
	      </shiro:hasAnyRoles>
			
			<shiro:hasAnyRoles name="ROOT,COMMON,YUNNANDIANSHI">
			<li<c:if test="${navname eq 'route' || navname eq 'cityRoute' || navname eq 'themeRouteRecommend'|| navname eq 'cityRouteRecommend' || navname eq 'viewRouteRecommend'}"> class="active"</c:if> rel="two">
				<a href="javascript:;">
					<i class="icon-grid"></i>
					<span class="title">行程管理</span>
					<span class="arrow "></span>
				</a>   
				<ul class="sub-menu">
					<li>
						<a data-pjax href="${ctx}/newRoute/">行程总库</a>
					</li>
					 <li>
						<a data-pjax href="${ctx}/route/cityRoute/">行程助手备选</a>
					</li>
					 <li>
						<a data-pjax href="${ctx}/route/routePush">行程推送</a>
					</li>
					<li>
						<a data-pjax href="${ctx}/newRoute/travelNotesRoute/">最佳行程安排</a>
					</li>
					<li>
						<a data-pjax href="${ctx}/recommendRoute/">推荐线路</a>
					</li>
					<li>
						<a data-pjax href="${ctx}/route/">行程总库(旧)</a>
					</li>
					<li>
						<a data-pjax href="${ctx}/route/themeRouteRecommend/">主题游推荐(旧)</a>
					</li>
					<li>
						<a data-pjax href="${ctx}/routeRecommend/">城市行程推荐(旧)</a>
					</li>
					<li>
						<a data-pjax href="${ctx}/routeRecommend/indexView/">景点行程推荐(旧)</a>
					</li>
					 
				</ul>
			</li>
	      </shiro:hasAnyRoles>
			
		<shiro:hasAnyRoles name="ROOT,COMMON,YUNNANDIANSHI">
			<li<c:if test="${navname eq 'strategy'}"> class="active"</c:if> rel="two">
				<a href="javascript:;">
					<i class="icon-grid"></i>
					<span class="title">城市级攻略管理</span>
					<span class="arrow "></span>
				</a>
				<ul class="sub-menu">
				   <li>
				        <a  data-pjax href="${ctx}/cityImage/">城市名片</a>
				   </li>
					 <li>
				        <a  data-pjax href="${ctx}/travelAll/">玩转云南</a>
					</li>
					<li>
					<a data-pjax href="${ctx}/destinationStrategy/destinationGeneralSituation">目的地概况</a>
					</li>
					<li>
					<a data-pjax href="${ctx}/destinationStrategy/destinationShopping">购物与出行贴士</a>
					</li>
					<li>
					<a data-pjax href="${ctx}/destinationStrategy/destinationTrafficStrategy">目的地交通攻略</a>
					</li>
					<li>
						<a data-pjax href="${ctx}/region/">地区数据导入</a>
					</li>
				</ul>
			</li>
			</shiro:hasAnyRoles>
			<shiro:hasAnyRoles name="ROOT,COMMON,YUNNANDIANSHI">
			<li<c:if test="${navname eq 'viewStrategy' || navname eq 'viewPoint'}"> class="active"</c:if> rel="two">
				<a href="javascript:;">
					<i class="icon-grid"></i>
					<span class="title">景点级攻略管理</span>
					<span class="arrow "></span>
				</a>
				<ul class="sub-menu">
					 <li>
						<a data-pjax href="${ctx}/viewPoint/">看点</a>
					</li>
					<li>
					<a data-pjax href="${ctx}/scenicStrategy/scenicGeneralSituation">景点概况</a>
					</li>
					<li>
					<a data-pjax href="${ctx}/scenicStrategy/scenicTicketStrategy">票价与小贴士</a>
					</li>
					<li>
					<a data-pjax href="${ctx}/scenicStrategy/scenicTrafficStrategy">景点交通攻略</a>
					</li>
				</ul>
			</li>
			</shiro:hasAnyRoles>
			
				<shiro:hasAnyRoles name="ROOT,COMMON,YUNNANDIANSHI">
			<li<c:if test="${navname eq 'audiotour' || navname eq 'vrTours' || navname eq 'music'}"> class="active"</c:if> rel="two">
				<a href="javascript:;">
					<i class="icon-grid"></i>
					<span class="title">伴你游管理</span>
					<span class="arrow "></span>
				</a>
				<ul class="sub-menu">
					<li>
						<a  data-pjax href="${ctx}/audiotour/">语音导览</a>
					</li>
					 <li>
						<a  data-pjax href="${ctx}/vrTours/">全景导游</a>
					</li>
					<li>
					    <a data-pjax href="${ctx}/music/">随声听</a>
					</li>
					
				</ul>
			</li>
			</shiro:hasAnyRoles>
			
			
			 <shiro:hasAnyRoles name="ROOT,COMMON">  
			<li rel="one">
				<a  data-pjax href="${ctx}/circleLine/">
					<i class="icon-puzzle"></i>
					<span class="title">环线管理</span>
				</a>
			</li>
	   </shiro:hasAnyRoles>  
	   <shiro:hasAnyRoles name="ROOT,COMMON,YUNNANDIANSHI">  
			<li rel="one">
				<a  data-pjax href="${ctx}/traffic/">
					<i class="icon-puzzle"></i>
					<span class="title">交通管理</span>
				</a>
			</li>
	  </shiro:hasAnyRoles>
			
			<shiro:hasAnyRoles name="ROOT,COMMON,YUNNANDIANSHI">
			<li<c:if test="${navname eq 'nation'}"> class="active"</c:if> id="hzdw" rel="two">
				<a href="javascript:;">
					<i class="icon-grid"></i>
					<span class="title">文化管理</span>
					<span class="arrow "></span>
				</a>
				<ul class="sub-menu">
					<li>
					<a data-pjax href="${ctx}/specialtie/nations">民族</a>
					</li>
					<li>
					<a  data-pjax href="${ctx}/specialtie/culture">节日</a>
					</li>
					<li>
					<a data-pjax href="${ctx}/specialtie/art">民俗瑰宝</a>
					</li>
				</ul>
			</li>
			</shiro:hasAnyRoles>
			
			<shiro:hasAnyRoles name="ROOT,COMMON">
			<li<c:if test="${navname eq 'nation'}"> class="active"</c:if> rel="two">
				<a href="javascript:;">
					<i class="icon-grid"></i>
					<span class="title">界面布局</span>
					<span class="arrow "></span>
				</a>
				<ul class="sub-menu">
					<li>
					<a data-pjax href="${ctx}/interfaceLayout/worthBuy">卡片管理</a>
					</li>
					<li>
					<a data-pjax href="${ctx}/interfaceLayout/historyCulture">人文历史</a>
					</li>
					<li>
					<a data-pjax href="${ctx}/interfaceLayout/themeManage">主题管理</a>
					</li>
					<li>
					<a data-pjax href="${ctx}/interfaceLayout/moduleSort">模块排序</a>
					</li>
					<li>
					<a data-pjax href="${ctx}/interfaceLayout/topLine">头条</a>
					</li>
					<li>
					<a data-pjax href="${ctx}/interfaceLayout/iconManage">图标管理</a>
					</li>
				</ul>
			</li>
			</shiro:hasAnyRoles>
			
			<shiro:hasAnyRoles name="ROOT,COMMON">
			<li<c:if test="${navname eq 'topicComment'}"> class="active"</c:if> rel="one">
				<a  data-pjax href="${ctx}/topicComment/">
					<i class="icon-grid"></i>
					<span class="title">评论管理</span>
				</a>
			</li>
			</shiro:hasAnyRoles>
			
			<shiro:hasAnyRoles name="ROOT,COMMON">
			<li<c:if test="${navname eq 'scenicStrategy'}"> class="active"</c:if> rel="two">
				<a href="javascript:;">
					<i class="icon-grid"></i>
					<span class="title">景点攻略(旧)</span>
					<span class="arrow "></span>
				</a>
				<ul class="sub-menu">
					<li>
						<a data-pjax href="${ctx}/viewStrategy/">攻略手册(旧)</a>
					</li>
				</ul>
			</li>
			</shiro:hasAnyRoles>
			
			<shiro:hasAnyRoles name="ROOT,COMMON">
			<li<c:if test="${navname eq 'destinationStrategy'}"> class="active"</c:if> rel="two">
				<a href="javascript:;">
					<i class="icon-grid"></i>
					<span class="title">目的地攻略(旧)</span>
					<span class="arrow "></span>
				</a>
				<ul class="sub-menu">
					<li>
						<a data-pjax href="${ctx}/route/travelNotesRoute/">精品游记(旧)</a>
					</li>
					<li>
						<a data-pjax href="${ctx}/travelBefore/">行前须知(旧)</a>
					</li>
					<li>
						<a data-pjax href="${ctx}/travelBefore/travelGuide/">游玩指南(旧)</a>
					</li>
					<li>
						<a data-pjax href="${ctx}/travelBefore/travelEntertain/">娱乐活动(旧)</a>
					</li>
					<li>
						<a data-pjax href="${ctx}/travelBefore/travelFoodBuy/">美食购物指南(旧)</a>
					</li>
					<li>
						<a data-pjax href="${ctx}/themeRecommend/">景点主题推荐(旧)</a>
					</li>
					 <li>
						<a data-pjax href="${ctx}/foodThemeRecommend/">美食主题推荐(旧)</a>
					</li>
					<li>
			            <a  data-pjax href="${ctx}/goWhere/">去哪玩(旧)</a>
			         </li>
					<li>
						<a data-pjax href="${ctx}/famous/">最有名(旧)</a>
					</li>
				</ul>
			</li>
			</shiro:hasAnyRoles>
			
															<%-- <shiro:hasAnyRoles name="ROOT,COMMON">
															<li<c:if test="${navname eq 'nation'}"> class="active"</c:if> id="hzdw" rel="two">
																<a href="javascript:;">
																	<i class="icon-grid"></i>
																	<span class="title">话题管理</span>
																	<span class="arrow "></span>
																</a>
																<ul class="sub-menu">
																	<li>
																	<a data-pjax href="${ctx}/topic/label/">上传热门话题标签</a>
																	</li>
																	<li>
																	<a  data-pjax href="${ctx}/topic/">话题列表</a>
																	</li>
																	<li>
																	<a  data-pjax href="${ctx}/topic/labelTop10/">用户编辑标签统计</a>
																	</li>
																	
																</ul>
															</li>
															</shiro:hasAnyRoles> --%>
			
			
			
			
																		<%-- <shiro:hasAnyRoles name="ROOT,COMMON">
																		<li rel="one">
																			<a  data-pjax href="${ctx}/specialRecomms/">
																				<i class="icon-puzzle"></i>
																				<span class="title">今日推荐</span>
																			</a>
																		</li>
																		</shiro:hasAnyRoles> --%>
																		<%-- <shiro:hasAnyRoles name="ROOT,COMMON">  
																		<li rel="one">
																			<a  data-pjax href="${ctx}/yunnanexp/">
																				<i class="icon-puzzle"></i>
																				<span class="title">云南速览</span>
																			</a>
																		</li>
																		</shiro:hasAnyRoles> --%>
			
																<%--  <shiro:hasAnyRoles name="ROOT,COMMON">  
																<li rel="one">
																	<a  data-pjax href="${ctx}/push/">
																		<i class="icon-puzzle"></i>
																		<span class="title">推送管理</span>
																	</a>
																</li>
																</shiro:hasAnyRoles>  --%>
															 <%-- <shiro:hasAnyRoles name="ROOT,COMMON">  
																<li rel="one">
																	<a  data-pjax href="${ctx}/city/">
																		<i class="icon-puzzle"></i>
																		<span class="title">城市</span>
																	</a>
																</li>
																</shiro:hasAnyRoles>   --%>
		
			
																<%-- 	<shiro:hasAnyRoles name="ROOT,COMMON">
																	<li<c:if test="${navname eq 'travelAll'}"> class="active"</c:if> rel="two">
																		<a href="javascript:;">
																			<i class="icon-grid"></i>
																			<span class="title">目的地管理</span>
																			<span class="arrow "></span>
																		</a>
																		<ul class="sub-menu">
																		    <li>
																		        <a  data-pjax href="${ctx}/travelAll/">玩转云南</a>
																			</li>
																	         <li>
																	            <a  data-pjax href="${ctx}/goWhere/">去哪玩</a>
																	         </li>
																			
																		</ul>
																	</li>
																	</shiro:hasAnyRoles> --%>
			
			
			
			
			
	
	  
																		    <%--  <shiro:hasAnyRoles name="ROOT,COMMON">
																				<li<c:if test="${navname eq 'routeNotes'}"> class="active"</c:if> rel="two">
																					<a href="javascript:;">
																						<i class="icon-grid"></i>
																						<span class="title">游记管理</span>
																						<span class="arrow "></span>
																					</a>
																					<ul class="sub-menu">
																						 <li>
																							<a  data-pjax href="${ctx}/itineraryNotes/">游记管理4.0</a>
																						</li>
																						
																						
																					</ul>
																				</li>
																		   </shiro:hasAnyRoles> --%>
	   
	    
	 
	   
																	   <%-- <shiro:hasAnyRoles name="ROOT,COMMON">
																			<li<c:if test="${navname eq 'routes'}"> class="active"</c:if> rel="two">
																				<a href="javascript:;">
																					<i class="icon-grid"></i>
																					<span class="title">行程管理</span>
																					<span class="arrow "></span>
																				</a>
																				<ul class="sub-menu">
																					<li>
																						<a  data-pjax href="${ctx}/itinerary/">行程线路4.0</a>
																					</li>
																				
																					
																				</ul>
																			</li>
																	  </shiro:hasAnyRoles> --%>
																	   
																	   
																	   
																	   
																	   
																	   
																	    <%-- <shiro:hasAnyRoles name="ROOT,COMMON">  
																			<li rel="one">
																				<a  data-pjax href="${ctx}/prizeList/">
																					<i class="icon-puzzle"></i>
																					<span class="title">中奖数据管理</span>
																				</a>
																			</li>
																	   </shiro:hasAnyRoles>   --%>
	   
																	   	<%-- <shiro:hasAnyRoles name="ROOT,COMMON">
																						<li rel="one"><a data-pjax href="${ctx}/fileUpLoad/"> <i  
																								class="icon-puzzle"></i> <span class="title">文件上传</span>
																						</a></li>
																		</shiro:hasAnyRoles> --%>
	   
	   </shiro:hasAnyRoles>
	   
	   
	   
		<shiro:hasRole name="ROOT">
			<li class="heading">
				<h3>系统</h3>
			</li>
			<li<c:if test="${navname eq 'user'}"> class="active"</c:if>>
				<a data-pjax href="${ctx}/user/">
					<i class="icon-emoticon-smile"></i>
					<span class="title">后台账号</span>
				</a>
			</li>
			<li<c:if test="${navname eq 'role'}"> class="active"</c:if>>
				<a data-pjax href="${ctx}/role/">
					<i class="icon-emoticon-smile"></i>
					<span class="title">角色权限</span>
				</a>
			</li>
			<li<c:if test="${navname eq 'sysParameter'}"> class="active"</c:if>>
				<a data-pjax href="${ctx}/sysParameter/">
					<i class="icon-emoticon-smile"></i>
					<span class="title">系统参数管理</span>
				</a>
			</li>
			<%-- <li<c:if test="${navname eq 'prizeDesc'}"> class="active"</c:if>>
				<a data-pjax href="${ctx}/prizeDesc/">
					<i class="icon-emoticon-smile"></i>
					<span class="title">中奖结果描述</span>
				</a>
			</li>  --%>
			<%-- <li<c:if test="${navname eq 'softDownload'}"> class="active"</c:if>>
				<a data-pjax href="${ctx}/softDownloadInfo/">
					<i class="icon-emoticon-smile"></i>
					<span class="title">下载次数统计</span>
				</a>
			</li> --%>
		</shiro:hasRole>
		
		<shiro:hasRole name="SOFTWARE">
			<li class="heading">
				<h3>软件管理</h3>
			</li>
			<li<c:if test="${navname eq 'software'}"> class="active"</c:if>>
				<a data-pjax href="${ctx}/software/">
					<i class="icon-puzzle"></i>
					<span class="title">App软件管理</span>
				</a>
			</li>
		</shiro:hasRole>
	</ul>
	</shiro:user>
		<!-- END FOOTER -->
		<!-- END SIDEBAR MENU -->
	</div>
</div>

<!-- END SIDEBAR -->