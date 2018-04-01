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
        submit: function () {
          // 做一些基本的客户端校验
          // xxx字段required
          console.log(Common.getSimpleData(self.viewmodel.model))
          // 发ajax到服务器端
          setTimeout(function () {
            alert('save 成功')
            window.location.href = '#/pages/demo/index'
          })
        },
        getDataById: function (id) {
          // Common.wrapajax
          setTimeout(function () {
            var data = [{
              name: 'ttt',
              sex: '1',
              identity: '1',
              isDanyuan: true
            }]
            Common.setSimpleData(self.viewmodel.model, data)
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
          self.viewmodel.model.setRowSelect(0)
        }
      }
    })
    return view
})