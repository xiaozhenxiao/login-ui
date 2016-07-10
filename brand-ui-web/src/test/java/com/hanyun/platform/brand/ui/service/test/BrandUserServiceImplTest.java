package com.hanyun.platform.brand.ui.service.test;

import com.hanyun.platform.brand.ui.domain.BrandUser;
import com.hanyun.platform.brand.ui.domain.request.BrandLoginRequest;
import com.hanyun.platform.brand.ui.service.BrandUserService;
import com.hanyun.platform.ground.util.json.JsonUtil;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import javax.annotation.Resource;

import static org.junit.Assert.*;

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
 * Time: 20:40
 *
 * @author heroin.nee@gmail.com
 */
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration("classpath:spring-config.xml")
public class BrandUserServiceImplTest {

    @Resource
    private BrandUserService brandUserService;

    @Test
    public void login() throws Exception {
        BrandLoginRequest entity = new BrandLoginRequest();
        entity.setUsername("0000001");
        entity.setPassword("admin");
        String result = brandUserService.login(entity);
        System.err.println(result);
    }

    @Test
    public void check() throws Exception {
        String value = "585f79aa24a11e18f14beaa47bd3b5c4a6a03a140e2accd5224995a2331185349e6cf89edf761e9b87aea25e6bf8fc7f509acf4fbc0cdaeda131dddfdf9448ad49f57c79321b32a4b36bbad02aacd661892c6dfa00933d05fb6fb859bbc3ad280f2c033d4c87c91b07b192f47fb4c49cb34d1cf6c82c84e03aedbbb2e3b571463d185316e78d67e4c1b191aea12f3908e71efb23540a95fe94cefc3ec7d6b8771425db173bafa3803abbe34e509e41107e8085aaa038765bb3cc33028fcdb9fade720ab04bb8e33341d334a0139d24388eee116f8bb791440d46740ef4348419";
        BrandUser user = brandUserService.check(value);
        System.err.println(JsonUtil.toJson(user));
    }
}