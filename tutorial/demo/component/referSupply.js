define([
  'knockout',
  "text!pages/demo/component/referSupply.html",
  "common","ycloud"], function (ko, template, Common, ycloud) {
  ko.components.register('demo-refer-supply', {
    viewModel: function (params) {
      debugger
      this.modalvisible = params.modalvisible
      this.referColumns = [
        {
          title: '供应商名称',
          field: 'name'
        }, {
          title: '供应商编码',
          field: 'code'
        }
      ]
      this.referRows = ko.observableArray([])
      this.onReferSelect = params.onOk
      // 第一次组件加载的时候到服务器端加载数据
      setTimeout(function () {
        this.referRows([{
          name: '供应商A',
          code: 'codeA',
          id: '1'
        }, {
          name: '供应商B',
          code: 'codeA',
          id: '2'
        }, {
          name: '供应商C',
          code: 'codeC',
          id: '3'
        }])
      }.bind(this))
    },
    template: template
  })
})