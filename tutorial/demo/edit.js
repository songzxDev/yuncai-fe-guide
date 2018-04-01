define(["jquery",
  'knockout',
  "baseview",
  "text!pages/demo/edit.html",
  "common","ycloud"], function ($, ko, Baseview, template, Common, ycloud) {
    var self = null
    var view = Baseview.extend({
      setTemplate: function () {
        this.el.html(template)
        self = this
      },
      viewmodel: {
        el: '#demoedit',
        model: {
          name: ko.observable(),
          sex: ko.observable(),
          identity: ko.observable(),
          isDanyuan: ko.observable()
        },
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
          console.log(ko.toJS(self.viewmodel.model))
          // 发ajax到服务器端
          setTimeout(function () {
            alert('save 成功')
            window.location.href = '#/pages/demo/index'
          })
        }
      },
      fireEvents: function () {
      }
    })
    return view
})