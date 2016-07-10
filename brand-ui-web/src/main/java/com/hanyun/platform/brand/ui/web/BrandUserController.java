package com.hanyun.platform.brand.ui.web;

import com.hanyun.platform.brand.ui.domain.request.BrandLoginRequest;
import com.hanyun.platform.brand.ui.service.BrandUserService;
import com.hanyun.platform.brand.ui.util.CookieUtil;
import org.apache.commons.lang.StringUtils;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

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
 * Time: 16:53
 *
 * @author heroin.nee@gmail.com
 */
@Controller
@RequestMapping(value = "/brand")
public class BrandUserController {

    @Resource
    private BrandUserService brandUserService;

    @RequestMapping(value = "/login", method = RequestMethod.POST)
    public void login(HttpServletRequest request, HttpServletResponse response,
                      BrandLoginRequest entity) throws IOException {
        String token = brandUserService.login(entity);
        if (StringUtils.isNotBlank(token)) {
            if (entity.getRemember()) {
                CookieUtil.setCookie(request, response, token, 31 * 24 * 60 * 60);
            } else {
                CookieUtil.setCookie(request, response, token, -1);
            }
            if (StringUtils.isNotBlank(entity.getRef())) {
                response.sendRedirect(entity.getRef());
            } else {
                response.sendRedirect("/");
            }
        } else {
            if (StringUtils.isNotBlank(entity.getRef())) {
                response.sendRedirect(entity.getRef());
            } else {
                response.sendRedirect("/login");
            }
        }
    }
}
