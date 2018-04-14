define(["jquery",
  'knockout',
  "baseview",
  "text!pages/demo/index.html",
  "common","ycloud", "pages/demo/component/referSupply"], function ($, ko, Baseview, template, Common, ycloud) {
    var self = null
    var view = Baseview.extend({
      setTemplate: function () {
        this.el.html(template)
        self = this
      },
      viewmodel: {
        el: '#demo',
        modalvisible: ko.observable(false),
        searchValue: ko.observable(''),
        columns: [
          {
            title: 'id',
            field: 'id'
          }, {
            title: 'name',
            field: 'name'
          }, {
            type: 'operation',
            operationList: [
              {
                title: '操作1',
                click: function (row, evt) {
                  debugger
                  row._disabled(true)
                  return false
                },
                visible: function (row) {
                  return !row._disabled()
                }
              }, {
                title: '操作2',
                click: function (row, evt) {
                  row._disabled(false)
                  return false
                }
              }, {
                title: '操作3',
                click: function (row, evt) {
                  return false
                }
              }, {
                title: '操作4',
                click: function (row, evt) {
                  alert('操作4')
                }
              }
            ]
          }
        ],
        rows: ko.observableArray([])
      },
      events: {
        modalShow: function () {
          self.viewmodel.modalvisible(true)
        },
        onOk: function (row) {
          self.viewmodel.modalvisible(false)
          alert(JSON.stringify(row))
        },
        handleAdd: function () {
          window.location.href = '#/pages/demo/edit'
        },
        onIconClick: function () {
          alert('search me')
        },
        loadData: function () {
          //模拟后台ajax 请求
          setTimeout(function () {
            self.viewmodel.rows([
              {
                id: 1,
                name: 'name'
              },
              {
                id: 2,
                name: 'name2'
              }
            ])
          }, 1000)
        }
      },
      fireEvents: function () {
        debugger
        var user = Common.userContext()
        // 1.Common.wrapajax
        // Common.wrapajax({
        //   url: '/yuncai',
        //   type: 'post',
        //   success: function (data) {
        //     {
        //       status: 1/0
        //       data: data
        //     }
        //   }
        // })
        // 2.Common.ajax

        console.log(user)
        self.viewmodel.loadData()
      }
    })
    return view
})