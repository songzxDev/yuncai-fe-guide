# 1.如何进行个性化开发
关于如何开展前端个性化开发，具体可以参见之前写过的文章[《云采前端个性化功能开发文档》](https://github.com/yonyouyc/yuncai-fe-guide/blob/master/tutorial/customrule/readme.md)

# 2.个性化配置命名规范
> 个性化配置每一项均需是自解释的，即通过看配置项描述就能够大致了解到这项配置项的含义

## 2.1 正确的命名

```
// 此配置项表明 询价单（buyoffer）的物料子表（materialList）的自定义项1（field1）需要根据后端个性化配置进行显示隐藏
{
    billType: 'buyoffer',
    field: 'field1',
    dataInfo: 'materialList',
    customType: 'visible'
}

```
## 2.2 错误的命名

```
// 以下这个是错误的命名, 代码无法自解释，看不出来配置项是什么意思
{
   billType: '',
   field: '',
   dataInfo: 'yy_index_progress_09_13',
   customType: 'visible'
}
```
# 3.本地开发规范
## 3.1 如何引入
### cpu-portal-fe中

```
直接调用Common.getCustomValue
var isField1Enanble = Common.getCustomValue({
    billType: 'buyoffer',
    field: 'field1',
    dataInfo: 'materialList',
    customType: 'visible'
})
```
### 其他使用webpack的工程中

```
import {getCustomValue} from 'ko-bindinghandler'
var customValue = getCustomValue({
    billType: 'project',
    dataInfo: 'editable',
    field: 'defProjectPsnName',
    customType: 'customdata'
})
```
## 3.2 如何规范配置代码
统一将个性化配置涉及的代码放到一个通用方法initCustomValue之中，然后在页面入口函数中统一调用initCustomValue

```
methods: {
    initCustomValue: function () {
        // 个性化1 每个配置项建议都加上中文描述加以补充说明
        var xxx = getCustomValue({xxxx})
        xxx
        ...
        // 个性化2
        ...
    }
},
mounted () {
    this.initCustomValue()
}


```
这样每个页面的个性化代码都能统一在一个方法里管理，更易于大家理解代码

# 4.自测规范
- 规范1 先使用个性化租户进行验证
- 规范2 再使用不配置个性化的租户进行验证

> **以上两点缺一不可，需保证个性化配置本身生效，且个性化配置不影响标准产品，尤其遇到一些必填项、非通用校验规则的时候**

# 5.线上个性化配置规范
- 1.配置项备注字段必填，必须准确描述出该配置项的作用
- 2.一条配置项对应一个规则，多个规则请拆分到多个配置（如显示自定义项1，且自定义项1保存时校验必填，切勿进行合并）
- 3.每次有新增条目配置晚上线后，请邮件通知songhlc@yonyou.com,方便后续更新预置数据（预置数据规范后续会添加）
- 4.A环境和B环境底层数据库是同步的，配置一套即可，配置完需要另一套生效可以在浏览器中手动调用'https://yc.yonyoucloud.com/yuncai/custom/clearRuleCache?enterpriseId=' + enterpriseId , 修改对应的租户id清除redis缓存，然后注销后重新登录即可生效