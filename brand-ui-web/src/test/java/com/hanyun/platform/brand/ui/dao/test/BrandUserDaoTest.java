package com.hanyun.platform.brand.ui.dao.test;

import com.hanyun.platform.brand.ui.dao.BrandUserDao;
import com.hanyun.platform.brand.ui.domain.BrandUser;
import com.hanyun.platform.ground.util.json.JsonUtil;
import com.hanyun.platform.ground.util.security.MD5Util;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import javax.annotation.Resource;
import java.util.UUID;

/**
 * <pre>
 * ━━━━━━神兽出没━━━━━━
 * 　　　┏┓　　　┏┓
 * 　　┏┛┻━━━┛┻┓
 * 　　┃　　　　　　　┃
 * 　　┃　　　━　　　┃
 * 　　┃　┳┛　┗┳　┃
 * 　　┃　　　　　　　┃
 * 　　┃　　　┻　　　┃
 * 　　┃　　　　　　　┃
 * 　　┗━┓　　　┏━┛
 * 　　　　┃　　　┃神兽保佑, 永无BUG!
 * 　　　　┃　　　┃Code is far away from bug with the animal protecting
 * 　　　　┃　　　┗━━━┓
 * 　　　　┃　　　　　　　┣┓
 * 　　　　┃　　　　　　　┏┛
 * 　　　　┗┓┓┏━┳┓┏┛
 * 　　　　　┃┫┫　┃┫┫
 * 　　　　　┗┻┛　┗┻┛
 * ━━━━━━感觉萌萌哒━━━━━━
 * </pre>
 * <p>
 * Date: 16/7/5
 * Time: 19:53
 *
 * @author heroin.nee@gmail.com
 */
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration("classpath:spring-config.xml")
public class BrandUserDaoTest {

    @Resource
    private BrandUserDao brandUserDao;

    @Test
    public void insertSelective() throws Exception {
        BrandUser user = new BrandUser();
        user.setBrandId(UUID.randomUUID().toString());
        user.setBrandUserId(UUID.randomUUID().toString());
        user.setUsername("0000001");
        user.setPassword(MD5Util.md5Hex("admin"));
        user.setContacts("admin");
        user.setContactsPhone("18611053629");
        user.setContactsMail("nixiang@hanyun.com");
        System.err.println(brandUserDao.insertSelective(user));
    }

    @Test
    public void select() throws Exception {
        BrandUser user = new BrandUser();
        user.setUsername("0000001");
        user.setPassword(MD5Util.md5Hex("admin"));
        System.err.println(JsonUtil.toJson(brandUserDao.select(user)));
    }

    @Test
    public void updateByPrimaryKeySelective() throws Exception {

    }
}