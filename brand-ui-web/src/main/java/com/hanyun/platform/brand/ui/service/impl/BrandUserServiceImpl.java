package com.hanyun.platform.brand.ui.service.impl;

import com.hanyun.platform.brand.ui.dao.BrandUserDao;
import com.hanyun.platform.brand.ui.domain.BrandUser;
import com.hanyun.platform.brand.ui.domain.request.BrandLoginRequest;
import com.hanyun.platform.brand.ui.service.BrandUserService;
import com.hanyun.platform.ground.util.json.JsonUtil;
import com.hanyun.platform.ground.util.security.AESEncoder;
import com.hanyun.platform.ground.util.security.MD5Util;
import org.apache.commons.lang.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import javax.crypto.BadPaddingException;
import javax.crypto.IllegalBlockSizeException;
import javax.crypto.NoSuchPaddingException;
import java.io.IOException;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;

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
 * Time: 15:57
 *
 * @author heroin.nee@gmail.com
 */
@Service
public class BrandUserServiceImpl implements BrandUserService {

    private static final Logger LOG = LoggerFactory.getLogger(BrandUserServiceImpl.class);

    private static final String AES_KEY = "d24f1480b623fef3";

    @Resource
    private BrandUserDao brandUserDao;

    public String login(BrandLoginRequest entity) {
        BrandUser query = new BrandUser();
        query.setUsername(entity.getUsername());
        query.setPassword(MD5Util.md5Hex(entity.getPassword()));
        BrandUser user = null;
        try {
            user = brandUserDao.select(query);
        } catch (RuntimeException e) {
            LOG.error("查询数据库出错 ", e);
        }
        if (user != null) {
            try {
                String userJson = JsonUtil.toJson(user);
                return AESEncoder.encrypt(userJson, AES_KEY);
            } catch (IOException e) {
                LOG.error("解析json出错 ", e);
                return null;
            } catch (NoSuchPaddingException | NoSuchAlgorithmException | InvalidKeyException | IllegalBlockSizeException | BadPaddingException e) {
                LOG.error("AES 加密出错 ", e);
                return null;
            }
        } else {
            return null;
        }
    }

    public BrandUser check(String value) {
        // 解密
        String json = AESEncoder.decrypt(value, AES_KEY);
        if (StringUtils.isNotBlank(json)) {
            BrandUser query = null;
            try {
                query = JsonUtil.fromJson(json, BrandUser.class);
            } catch (IOException e) {
                LOG.error("解析json出错 ", e);
            }
            if (query != null) {
                try {
                    return brandUserDao.select(query);
                } catch (RuntimeException e) {
                    LOG.error("查询数据库出错 ", e);
                }
            }
        }
        return null;
    }
}
