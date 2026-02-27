const { geocodeAddress, requestPoster } = require("../../utils/api");

Page({
  data: {
    address: "",
    latitude: 31.2304,
    longitude: 121.4737,
    scale: 12,
    posterWidth: 1200,
    posterHeight: 1600,
    styles: [
      { label: "深色细线", value: "dark-lines" },
      { label: "浅色细线", value: "light-lines" },
      { label: "黑白高对比", value: "mono-contrast" },
      { label: "蓝色霓虹", value: "neon-blue" }
    ],
    styleIndex: 0,
    markers: [],
    posterUrl: "",
    loading: false,
    errorMessage: "",
  },

  onAddressInput(e) {
    this.setData({ address: e.detail.value });
  },

  onScaleChange(e) {
    this.setData({ scale: Number(e.detail.value) });
  },

  onWidthChange(e) {
    this.setData({ posterWidth: Number(e.detail.value) });
  },

  onHeightChange(e) {
    this.setData({ posterHeight: Number(e.detail.value) });
  },

  onStyleChange(e) {
    this.setData({ styleIndex: Number(e.detail.value) });
  },

  onLocate() {
    wx.getLocation({
      type: "gcj02",
      success: (res) => {
        this.updateCenter(res.latitude, res.longitude);
      },
      fail: () => {
        this.setData({ errorMessage: "无法获取当前位置，请检查定位权限" });
      },
    });
  },

  onSearch() {
    const { address } = this.data;
    if (!address) {
      this.setData({ errorMessage: "请输入城市或地点" });
      return;
    }

    this.setData({ loading: true, errorMessage: "" });
    geocodeAddress(address)
      .then((location) => {
        this.updateCenter(location.lat, location.lng);
      })
      .catch((err) => {
        this.setData({ errorMessage: err.message || "搜索失败" });
      })
      .finally(() => {
        this.setData({ loading: false });
      });
  },

  updateCenter(latitude, longitude) {
    this.setData({
      latitude,
      longitude,
      markers: [
        {
          id: 1,
          latitude,
          longitude,
          width: 24,
          height: 24,
        },
      ],
      errorMessage: "",
    });
  },

  onGenerate() {
    const {
      latitude,
      longitude,
      scale,
      posterWidth,
      posterHeight,
      styles,
      styleIndex,
    } = this.data;

    this.setData({ loading: true, errorMessage: "", posterUrl: "" });

    requestPoster({
      center: { lat: latitude, lng: longitude },
      zoom: scale,
      width: posterWidth,
      height: posterHeight,
      style: styles[styleIndex].value,
    })
      .then((url) => {
        this.setData({ posterUrl: url });
      })
      .catch((err) => {
        this.setData({ errorMessage: err.message || "生成失败" });
      })
      .finally(() => {
        this.setData({ loading: false });
      });
  },

  onPreview() {
    const { posterUrl } = this.data;
    if (!posterUrl) {
      return;
    }
    wx.previewImage({
      urls: [posterUrl],
    });
  },
});
