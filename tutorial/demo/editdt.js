define(["jquery",
  'knockout',
  "baseview",
  "text!pages/demo/editdt.html",
  "common","ycloud"], function ($, ko, Baseview, template, Common, ycloud) {
    var self = null
    var view = Baseview.extend({
      setTemplate: function () {
        this.el.html(template)
        self = this
        window.vm = self
      },
      viewmodel: {
        el: '#demoedit',
        model: new $.DataTable({
          meta: {
            name: {},
            sex: {},
            identity: {},
            isDanyuan: {}
          }
        }),
        detailColumn: [
          {
            field: 'mname',
            title: '组合列',
            width: '30%',
            type: 'render', // 用自定义的html片段
            renderFn: function (row) {
              var result = (row.ref('mname')() ? row.ref('mname')() : '')  + ':' + row.ref('mcode')() + row.ref('mspec')()
              return result
            }
          }, {
          field: 'mname',
          title: '姓名',
          width: '30%',
          type: 'component',
          compFn: function (row) {
            return {
              name: 'y-input',
              params: {
                value: row.ref('mname')
              }
            }
          }
        }, {
          field: 'mcode',
          title: 'code',
          width: '30%',
          type: 'component',
          compFn: function (row) {
            return {
              name: 'y-input',
              params: {
                value: row.ref('mcode')
              }
            }
          }
        }, {
          field: 'mspec',
          title: 'spec',
          width: '40%',
          type: 'component',
          compFn: function (row) {
            return {
              name: 'y-input',
              params: {
                value: row.ref('mspec')
              }
            }
          }
        }],
        // 物料子表
        detailList: new $.DataTable({
          meta: {
            mname: {},
            mcode: {},
            mspec: {}
          }
        }),
        identityList: [
          {
            value: '1',
            label: '初级'
          }, {
            value: '2',
            label: '中级'
          }
        ],
        sexList: [
          {
            value: '1',
            label: '男'
          }, {
            value: '0',
            label: '女'
          }
        ],
      },
      events: {
        addDetailList: function () {
          self.viewmodel.detailList.createEmptyRow()
        },
        submit: function () {
          // 做一些基本的客户端校验
          // xxx字段required
          // console.log(Common.getSimpleData(self.viewmodel.model))
          var mainData = Common.getSimpleData(self.viewmodel.model)[0]
          var detailData = Common.getSimpleData(self.viewmodel.detailList)
          mainData.materialList = detailData
          console.log(mainData)
          // 发ajax到服务器端
          debugger
          setTimeout(function () {
            alert('save 成功')
            window.location.href = '#/pages/demo/index'
          })
        },
        getDataById: function (id) {
          // Common.wrapajax
          setTimeout(function () {
            var data = {
              name: 'ttt',
              sex: '1',
              identity: '1',
              isDanyuan: true,
              materialList: [{
                mname: '物资1',
                mcode: 'AVD',
                mspec: 'ERTYUI',
                mxxcode: 'VBNM'
              }, {
                mname: '物资2',
                mcode: 'AVD2',
                mspec: 'ERTYUI2',
                mxxcode: 'VBNM2'
              }, {
                mname: '物资3',
                mcode: 'AVD3',
                mspec: 'ERTYUI3',
                mxxcode: 'VBNM4'
              }]
            }
            // 子表
            var _detailList = data.materialList
            // 主表
            var _mainModel = data
            data.materialList = []
            Common.setSimpleData(self.viewmodel.model, [_mainModel])
            Common.setSimpleData(self.viewmodel.detailList, _detailList)
            self.viewmodel.model.setRowSelect(0)
          })
        }
      },
      fireEvents: function () {
        var id = Common.getRequest()["id"];
        if (id) {
          // 调用后台服务查询数据
          self.viewmodel.getDataById(id)
        } else {
          self.viewmodel.model.createEmptyRow()
          self.viewmodel.model.setRowSelect(0)// 关键
        }
      },
      bindEvents: function () {
        self.viewmodel.detailList.on('mcode.valueChange', function (obj, row) {
          var _row =  vm.viewmodel.detailList.getRowByRowId(obj.rowId)
          _row.setValue('mspec', obj.newValue)
          // do anything you want
        })
      }
    })
    return view
})