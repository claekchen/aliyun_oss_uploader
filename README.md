# What's This

一个用于上传文件至阿里云OSS的简易插件，在上传后会直接显示文件链接，方便用于图床、个人文件分享等用途。

# Usage

在根目录下新建一个config.json文件，参照你的阿里云配置，填入以下内容：

```
{
  "region": "oss-cn-beijing",
  "accessKeyId": "@#！#！#！！",
  "accessKeySecret": "！#！#！@#！#",
  "bucket": "myimage"
}
```

然后在命令行中运行
```
npm install
webpack
```

最后在开发者模式下，将本文件夹安装为chrome插件即可。

