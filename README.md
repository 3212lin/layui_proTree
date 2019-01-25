# layui_proTree插件

## 使用方法
```
<script>
layui.config({
  base: '../../../layui_exts/' //配置 layui 第三方扩展组件存放的基础目录
}).extend({
  protree: 'proTree/protree'
}).use(['protree'], function(){
  var protree = layui.protree;
  //后台传入的 标题列表
  var arr = [{
      id: 1,
      name: "一级标题",
      pid: 0
    }, {
      id: 2,
      name: "二级标题",
      pid: 0
    }, {
      id: 3,
      name: "2.1级标题",
      pid: 2
    }, {
      id: 4,
      name: "2.2级标题",
      pid: 2
    }, {
      id: 5,
      name: "1.1级标题",
      pid: 1
    }, {
      id: 6,
      name: "1.2级标题",
      pid: 1
    }, {
      id: 7,
      name: "1.21级标题",
      pid: 6
    }, {
      id: 8,
      name: "三级标题",
      pid: 0
    }, {
      id: 9,
      name: "1.22级标题",
      pid: 6
    }, {
      id: 10,
      name: "1.221级标题",
      pid: 9
    }, {
      id: 11,
      name: "1.2211级标题",
      pid: 10
    }, {
      id: 12,
      name: "1.2212级标题",
      pid: 10
    }

  ];
  //执行示例
  protree.init('.innerUl',{
    arr: arr,
    close:true,
    simIcon: "fa fa-file-o",
    mouIconOpen: "fa fa-folder-open-o",
    mouIconClose:"fa fa-folder-o",
    callback: function(id,name) {
      alert("你选择的id是" + id + "，名字是" + name);
    }
  });   
});
</script>
```
