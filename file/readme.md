概述：单据开发中经常会遇到主表附件和子表附件的使用场景，本文会对附件的原理予以介绍，并指导大家该如何使用附件。

# 1.原理
附件设计原理是和相应单据解耦，不把附件数据存储在业务数据中，而由统一的附件组件来进行附件的管理。

## 1.1 单据如何与附件关联
- 单据id
- 组名groupname

组名是一个抽象的概念，一般是开发层面约定的一个用于描述单据唯一性的一个字符串。
比如：假设当前附件是用于询价单实体主表，可以把groupname定义成：buyoffer;如果是询价单实体子表，可以定义成：buyoffer_body。
本质上只要代表唯一的单据即可。

## 1.2 跨租户附件的概念
存在以下场景，采购商A发布询价单附件，供应商在报价的时候需要查询到。此时，就需要指定enterpriseId,如上面提到的询价单主表附件，供应商B在看采购商A发布的询价单的附件的时候，就需要传入三个参数

- 询价单的id
- groupname（前面定义好的buyoffer）
- enterpriseId(这里传入采购商A的租户id，通常从单据是实体里会记录)

## 1.3 本租户附件
默认如果是要看本租户的附件，则无需传入enterpriseId

# 2.如何使用

```
<ko-fileupload params="
    groupname:'quotation_info',
    id:model.buyofferid"></ko-fileupload>
```
model.buyofferid表示单据相应的id字段。
以上默认会在页面展现一个可上传的附件

## 2.1 只读附件

下游单据读取上游单据的附件通常是只读的
```
params中添加readonly:true即可
```
## 2.2 子表附件
使用：ko-fileupload-intable
```
<ko-fileupload-intable params="
filesize: row.ref('isUpload'), 
groupname: 'supply_apply', 
index: $index,
id: row.ref('sublineid')></ko-fileupload-intable>
```
注：子表中需要补充一个index参数，通常是子表的行索引，另外id需要为子表id非主表id

## 3.注意事项

一些新增单据的时候单据id以及子表id通常为空，所以要保证保存接口返回的当前当前的数据中id是you'zhi有值的（组件会自动触发接口更新附件关联的单据id）

## 4.其他参数
- 组件支持filesize参数，是一个ko对象，可用于辅助判断附件是否必填
- id请设置成ko对象（无论主表子表，或者使用ko.computed来动态生成也可以）

