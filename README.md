# youdao-node
有道智云非官方Node.js SDK，API官方文档: http://ai.youdao.com/doc.s#docs


## 功能

- 文本翻译
- 图片文字识别翻译（支持base64或图片Url）


## 安装

```bash
$ yarn add youdao-node
```


## 引入
```js
import youdao from 'youdao-node';
```

## 配置
```js
youdao.config({
    appKey: <your appkey>,
    appSecret: <your appSecret>
});
```
注意: 需要到官网创建应用获取appKey和appSecret，并为服务添加相应的实例

## 主要功能

#### 文本翻译

###### 参数

- `content` (String): 需要翻译的文本内容
- `from` (String): 源语言(可设置为auto，默认为auto)
- `to` (String): 目标(可设置为auto，默认为auto)

可翻译语言列表参考：http://ai.youdao.com/docs/doc-trans-api.s#p07


###### 示例代码
```js
const res = await youdao.translate({
    content: '你好',
    from: 'zh-CHS',
    to: 'EN'
});

```

---

#### 图片文字识别翻译

###### 参数
- `img` (String): 需要翻译的图片base64或图片链接字符串
- `langType` (String): 目前支持英文：en，和中英混合：zh-en，默认为zh-en

###### 示例代码
```js
const res = await youdao.ocr({
    img: <base64> || <imageUrl>
});
```


## License

MIT
