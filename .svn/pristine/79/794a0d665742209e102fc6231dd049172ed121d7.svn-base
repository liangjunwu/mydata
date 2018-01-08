package com.ljw.ssme.service.impl;

import java.util.List;

import javax.annotation.Resource;
import javax.jws.WebService;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ljw.ssme.beans.Emp;
import com.ljw.ssme.dao.EmpDao;
import com.ljw.ssme.service.EmpService;

@Service
@Transactional
public class EmpServiceImpl implements EmpService{

	@Resource
	private EmpDao empDao;
	
	public List<Emp> getEmpList() {
		return empDao.getEmpList();
	}

}
