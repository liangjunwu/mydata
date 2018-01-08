<%@ page contentType="text/html;charset=UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"  %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<c:set var="ctx" value="${pageContext.request.contextPath}" />
<%
if (!"true".equals( request.getHeader( "x-pjax" ) )) {
%>
<%@ include file="/WEB-INF/layouts/top.jsp"%>
<%
}
%>
<c:set var="navname" value="index" scope="session" />

<%
if (!"true".equals( request.getHeader( "x-pjax" ) )) {
%>
<%@ include file="/WEB-INF/layouts/bottom.jsp"%>
<%
}
%>