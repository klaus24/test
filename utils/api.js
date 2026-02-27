const config = require("./config");

function geocodeAddress(address) {
  if (!config.tencentMapKey) {
    return Promise.reject(new Error("请先在 utils/config.js 中配置腾讯位置服务 Key"));
  }

  return new Promise((resolve, reject) => {
    wx.request({
      url: "https://apis.map.qq.com/ws/geocoder/v1/",
      data: {
        address,
        key: config.tencentMapKey,
      },
      success(res) {
        if (res.data && res.data.status === 0) {
          resolve(res.data.result.location);
        } else {
          reject(new Error(res.data?.message || "地理编码失败"));
        }
      },
      fail(err) {
        reject(err);
      },
    });
  });
}

function requestPoster(payload) {
  if (!config.posterServiceUrl) {
    return Promise.reject(new Error("请先在 utils/config.js 中配置 maptoposter 服务地址"));
  }

  return new Promise((resolve, reject) => {
    wx.request({
      url: `${config.posterServiceUrl}/api/poster`,
      method: "POST",
      data: payload,
      success(res) {
        if (res.statusCode === 200 && res.data?.url) {
          resolve(res.data.url);
        } else {
          reject(new Error(res.data?.message || "生成线条图失败"));
        }
      },
      fail(err) {
        reject(err);
      },
    });
  });
}

module.exports = {
  geocodeAddress,
  requestPoster,
};
