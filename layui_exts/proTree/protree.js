layui.define('jquery',function(exports){
    var $ = layui.jquery;
    var obj = {
        init: function(dom,options) {
            this.element = $(dom);
            this.JSONArr = options.arr;
            this.simIcon = options.simIcon || "";
            this.close = options.close || false;
            this.mouIconOpen = options.mouIconOpen || "fa fa-folder-open-o";
            this.mouIconClose = options.mouIconClose || "fa fa-folder-o";
            this.callback = options.callback || function() {};
            var _this = this;
            this.JSONTreeArr = this.proJSON(this.JSONArr, 0);
            this.treeHTML = this.proHTML(this.JSONTreeArr);
            this.element.append(this.treeHTML);
            this.addCssByLink();
            if (this.close) {
                this.element.children(".menuUl").find("li").children(".menuUl").hide();
                var i_arr = this.element.children(".menuUl").find("li").find('i');
                i_arr.each(function(index, item) {
                    if ($(item).attr('ischek')) {
                        $(item).attr("ischek", 'false');
                        $(item).removeClass(_this.mouIconOpen).addClass(_this.mouIconClose);
                    }
                })
            }
            this.bindEvent();
        },
        addCssByLink: function () { 
            var doc=document; 
            var link=doc.createElement("link"); 
            link.setAttribute("rel", "stylesheet"); 
            link.setAttribute("type", "text/css"); 
            link.setAttribute("href", 'https://cdn.bootcss.com/font-awesome/4.7.0/css/font-awesome.css'); 
            var heads = doc.getElementsByTagName("head"); 
            if(heads.length) { 
                heads[0].appendChild(link); 
            } else { 
                doc.documentElement.appendChild(link);  
            }
        },  
        proJSON:function(oldArr, pid) {
            var newArr = [];
            var self = this;
            oldArr.map(function(item) {
                if (item.pid == pid) {
                    var obj = {
                        id: item.id,
                        name: item.name
                    }
                    var child = self.proJSON(oldArr, item.id);
                    if (child.length > 0) {
                        obj.child = child
                    }
                    newArr.push(obj)
                }
            }) 
            return newArr;
        },
        proHTML: function(arr) {
            var ulHtml = "<ul class='menuUl' style='margin-left:20px;'>";
            var self = this;
            arr.map(function(item) {
                var lihtml = "<li>";
                if (item.child && item.child.length > 0) {
                    lihtml += "<i ischek='true' class='" + self.mouIconOpen + "'></i>" + "<span id='" + item.id + "'>" + item.name + "</span>"
                    var _ul = self.proHTML(item.child);
                    lihtml += _ul + "</li>";
                } else {
                    lihtml += "<i class='" + self.simIcon + "'></i>" + "<span id='" + item.id + "'>" + item.name + "</span>";
                }
                ulHtml += lihtml;
            }) 
            ulHtml += "</ul>";
            return ulHtml;
        },
        bindEvent: function() {
            var self = this;
            this.element.find(".menuUl li i").click(function() {
                var ischek = $(this).attr("ischek");
                if (ischek == 'true') {
                    var menuUl = $(this).closest("li").children(".menuUl");
                    $(this).removeClass(self.mouIconOpen).addClass(self.mouIconClose);
                    menuUl.hide();
                    $(this).attr("ischek", 'false');
                } else if (ischek == 'false') {
                    var menuUl = $(this).closest("li").children(".menuUl");
                    menuUl.show();
                    $(this).removeClass(self.mouIconClose).addClass(self.mouIconOpen);
                    $(this).attr("ischek", 'true');
                }
            });
            this.element.find(".menuUl li span").click(function() {
                var id = $(this).attr("id");
                var name = $(this).text();
                self.callback(id, name)
            })
        }
    };
    //输出protree接口
    exports('protree', obj);
}); 