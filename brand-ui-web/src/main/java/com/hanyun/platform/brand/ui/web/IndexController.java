package com.hanyun.platform.brand.ui.web;

import com.hanyun.platform.brand.ui.util.CookieUtil;
import org.apache.commons.lang.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;

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
 * Date: 16/7/10
 * Time: 14:02
 *
 * @author heroin.nee@gmail.com
 */
@Controller
@RequestMapping(value = "/")
public class IndexController {

    private static final Logger LOG = LoggerFactory.getLogger(IndexController.class);

    @RequestMapping(value = "/", method = RequestMethod.GET)
    public void index(HttpServletResponse response) throws IOException {
        response.sendRedirect("/index.html");
    }

    @RequestMapping(value = "/login", method = RequestMethod.GET)
    public String index(@RequestParam(name = "ref", required = false) String ref, HttpServletRequest request, Model model) {

        if (StringUtils.isNotBlank(ref)) {
            try {
                model.addAttribute("ref", URLDecoder.decode(ref, "UTF-8"));
            } catch (UnsupportedEncodingException e) {
                LOG.error("decode ERROR ", e);
            }
        }
        return "index";
    }

    @RequestMapping(value = "/logout", method = RequestMethod.GET)
    public void logout(HttpServletRequest request, HttpServletResponse response) throws IOException {
        CookieUtil.deleteCookie(request, response);
        response.sendRedirect("/login");
    }

    @RequestMapping(value = "/current-user", method = RequestMethod.GET)
    @ResponseBody
    public Object currentUser(HttpServletRequest request) throws IOException {
        return request.getAttribute("REMOTE_USER");
    }
}
