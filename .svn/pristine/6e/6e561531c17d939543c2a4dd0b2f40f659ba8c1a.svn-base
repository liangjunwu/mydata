package com.ljw.ssme.controller;

import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.ljw.ssme.beans.Emp;
import com.ljw.ssme.service.EmpService;

@Controller
@RequestMapping("emp/")
public class EmpController {
	
	@Resource
	private EmpService empService;
	
	@RequestMapping("list")
	//@ResponseBody
	public String getEmpList(HttpServletRequest request){
		List<Emp> list = empService.getEmpList();
		for(Emp emp : list){
			System.out.println(emp.getEname());
		}
		request.setAttribute("empList", list);
		return "/orders/list";
	}
	
}
