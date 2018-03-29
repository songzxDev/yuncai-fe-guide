var model = {
  inputValue: '2',
  inputValue2: ''
}
var complexModel = {}
var listData = [
  {
    name: 1,
    value: 2
  }, {
    name: 2,
    value: 3
  }
]
var viewModel = {
  inputValue: ko.observable(model.inputValue),
  inputValue2: ko.observable(),
  handleSave: function () {
    // 保存方法
    model.inputValue = viewModel.inputValue()
    model.inputValue2 = viewModel.inputValue2()
    // 调用ajax方法
    console.log(model)
  },
  complexVm: {
    name: ko.observable(),
    text: ko.observable(),
    field: ko.observable()
  },
  handleSubmit: function () {
    var data = ko.toJS(viewModel.complexVm)
    debugger
  },
  list: ko.observableArray([]),
  visible: ko.observable(false),
  currency: ko.observable('$'),
  amout:ko.observable('2000.00')
}
viewModel.amountDisplay = ko.computed(function () {
  // 计算属性需要return最终的计算值
  return viewModel.currency() + viewModel.amout()
})
viewModel.inputValue.subscribe(function (val) {
  console.log(val)
})

ko.applyBindings(viewModel)

viewModel.list(listData)