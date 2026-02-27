# WeChat Map Line Poster Mini Program

这是一个微信小程序前端，用于用户指定城市或搜索位置后调整地图缩放范围与画布尺寸，选择线条图风格，并调用后端生成高清线条海报（可对接 [maptoposter](https://github.com/originalankur/maptoposter)）。

## 功能概览

- 搜索城市/地点并自动定位到地图中心
- 通过滑块调整地图缩放级别、海报宽高
- 选择线条图风格并调用后端生成高清海报
- 在小程序内预览并放大查看生成结果

## 快速开始

1. 打开微信开发者工具并导入本项目目录。
2. 在 `utils/config.js` 中配置：
   - `tencentMapKey`：腾讯位置服务 Key（用于地理编码）
   - `posterServiceUrl`：后端生成线条图服务地址（可基于 maptoposter 搭建）
3. 在小程序中输入城市或地点进行搜索，调整参数并生成线条海报。

## 后端建议

可使用 [maptoposter](https://github.com/originalankur/maptoposter) 构建后端服务，并在服务中提供 `POST /api/poster` 接口，响应格式示例：

```json
{
  "url": "https://your-domain/path/to/poster.png"
}
```

## 目录结构

```
app/
  app.js
  app.json
  app.wxss
pages/
  index/
utils/
  api.js
  config.js
```
