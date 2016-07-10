package com.hanyun.platform.brand.ui.handler;

import com.hanyun.platform.brand.ui.domain.BrandUser;
import com.hanyun.platform.brand.ui.service.BrandUserService;
import com.hanyun.platform.brand.ui.util.CookieUtil;
import org.apache.commons.lang.StringUtils;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.net.URLEncoder;

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
 * Time: 16:07
 *
 * @author heroin.nee@gmail.com
 */
public class PrivilegeInterceptor extends HandlerInterceptorAdapter {

    @Resource
    private BrandUserService brandUserService;

    public final boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        String token = CookieUtil.getCookieValue(request);
        if (StringUtils.isNotBlank(token)) {
            BrandUser user = brandUserService.check(token);
            if (user != null) {
                request.setAttribute("REMOTE_USER", user);
                return true;
            }
        }
        response.sendRedirect("/login?ref=" + URLEncoder.encode(String.valueOf(request.getRequestURL()), "UTF-8"));
        return false;
    }
}
