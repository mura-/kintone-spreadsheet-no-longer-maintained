(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

jQuery.noConflict();

(function ($, PLUGIN_ID) {

  var arrColumnConfig = function arrColumnConfig(config) {
    return Object.keys(config).map(function (key) {
      if (key.substring(0, 6) === "column") {
        return config[key];
      }
    });
  };

  var config = kintone.plugin.app.getConfig(PLUGIN_ID);
  var fields = [];

  $(document).ready(function () {
    kintone.api(kintone.api.url('/k/v1/preview/form', true), 'GET', {
      'app': kintone.app.getId()
    }, function (resp) {
      fields = [];
      Object.keys(resp.properties).forEach(function (i, key) {
        if ('code' in resp.properties[key]) {
          fields.push(resp.properties[key].code);
        }
      });
      console.dir(fields);
      var options = fields.map(function (i, key) {
        return { text: fields[key], value: fields[key] };
      });

      window.vue = new Vue({
        el: '#form',
        data: {
          options: options,
          columns: arrColumnConfig(config)
        },
        methods: {
          delColumn: function delColumn(index) {
            this.columns.splice(index, 1);
          },
          addColumn: function addColumn(index) {
            this.columns.splice(index, 0, this.options[0]);
          },
          registConfig: function registConfig() {
            var config = {};
            this.columns.forEach(function (column, i) {
              config['columns' + i] = column;
            });
            kintone.plugin.app.setConfig(config);
          },
          cancel: function cancel() {
            history.back();
          }
        }
      });
    });
  });

  // config = {
  //   "column0": "レコード番号",
  //   "column1": "会社名",
  //   "column2": "先方担当者名",
  //   "column3": "見込み時期",
  //   "column4": "確度",
  //   "column5": "製品名",
  //   "column6": "単価",
  //   "column7": "ユーザー数",
  //   "column8": "小計"
  // };

  // kintone.plugin.app.setConfig(config);
})(jQuery, kintone.$PLUGIN_ID);

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvanMvY29uZmlnLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNBQSxPQUFPLFVBQVA7O0FBRUEsQ0FBQyxVQUFDLENBQUQsRUFBSSxTQUFKLEVBQWtCOztBQUVqQixNQUFJLGtCQUFrQixTQUFsQixlQUFrQixDQUFDLE1BQUQsRUFBWTtBQUNoQyxXQUFPLE9BQU8sSUFBUCxDQUFZLE1BQVosRUFBb0IsR0FBcEIsQ0FBd0IsVUFBQyxHQUFELEVBQVM7QUFDdEMsVUFBSSxJQUFJLFNBQUosQ0FBYyxDQUFkLEVBQWlCLENBQWpCLE1BQXdCLFFBQXhCLEVBQWtDO0FBQ3BDLGVBQU8sT0FBTyxHQUFQLENBQVAsQ0FEb0M7T0FBdEM7S0FENkIsQ0FBL0IsQ0FEZ0M7R0FBWixDQUZMOztBQVdqQixNQUFJLFNBQVMsUUFBUSxNQUFSLENBQWUsR0FBZixDQUFtQixTQUFuQixDQUE2QixTQUE3QixDQUFULENBWGE7QUFZakIsTUFBSSxTQUFTLEVBQVQsQ0FaYTs7QUFjakIsSUFBRSxRQUFGLEVBQVksS0FBWixDQUFrQixZQUFNO0FBQ3RCLFlBQVEsR0FBUixDQUFZLFFBQVEsR0FBUixDQUFZLEdBQVosQ0FBZ0Isb0JBQWhCLEVBQXNDLElBQXRDLENBQVosRUFBeUQsS0FBekQsRUFBZ0U7QUFDOUQsYUFBTyxRQUFRLEdBQVIsQ0FBWSxLQUFaLEVBQVA7S0FERixFQUVHLFVBQUMsSUFBRCxFQUFVO0FBQ1gsZUFBUyxFQUFULENBRFc7QUFFWCxhQUFPLElBQVAsQ0FBWSxLQUFLLFVBQUwsQ0FBWixDQUE2QixPQUE3QixDQUFxQyxVQUFDLENBQUQsRUFBSSxHQUFKLEVBQVk7QUFDL0MsWUFBSSxVQUFVLEtBQUssVUFBTCxDQUFnQixHQUFoQixDQUFWLEVBQWdDO0FBQ2xDLGlCQUFPLElBQVAsQ0FBWSxLQUFLLFVBQUwsQ0FBZ0IsR0FBaEIsRUFBcUIsSUFBckIsQ0FBWixDQURrQztTQUFwQztPQURtQyxDQUFyQyxDQUZXO0FBT1gsY0FBUSxHQUFSLENBQVksTUFBWixFQVBXO0FBUVgsVUFBSSxVQUFVLE9BQU8sR0FBUCxDQUFXLFVBQUMsQ0FBRCxFQUFJLEdBQUosRUFBWTtBQUNuQyxlQUFPLEVBQUMsTUFBTSxPQUFPLEdBQVAsQ0FBTixFQUFtQixPQUFPLE9BQU8sR0FBUCxDQUFQLEVBQTNCLENBRG1DO09BQVosQ0FBckIsQ0FSTzs7QUFZWCxhQUFPLEdBQVAsR0FBYSxJQUFJLEdBQUosQ0FBUTtBQUNuQixZQUFJLE9BQUo7QUFDQSxjQUFNO0FBQ0osbUJBQVMsT0FBVDtBQUNBLG1CQUFTLGdCQUFnQixNQUFoQixDQUFUO1NBRkY7QUFJQSxpQkFBUztBQUNQLHdDQUFVLE9BQU87QUFDZixpQkFBSyxPQUFMLENBQWEsTUFBYixDQUFvQixLQUFwQixFQUEyQixDQUEzQixFQURlO1dBRFY7QUFJUCx3Q0FBVSxPQUFPO0FBQ2YsaUJBQUssT0FBTCxDQUFhLE1BQWIsQ0FBb0IsS0FBcEIsRUFBMkIsQ0FBM0IsRUFBOEIsS0FBSyxPQUFMLENBQWEsQ0FBYixDQUE5QixFQURlO1dBSlY7QUFPUCxnREFBZTtBQUNiLGdCQUFJLFNBQVMsRUFBVCxDQURTO0FBRWIsaUJBQUssT0FBTCxDQUFhLE9BQWIsQ0FBcUIsVUFBQyxNQUFELEVBQVMsQ0FBVCxFQUFlO0FBQ2xDLGlDQUFpQixDQUFqQixJQUF3QixNQUF4QixDQURrQzthQUFmLENBQXJCLENBRmE7QUFLYixvQkFBUSxNQUFSLENBQWUsR0FBZixDQUFtQixTQUFuQixDQUE2QixNQUE3QixFQUxhO1dBUFI7QUFjUCxvQ0FBUztBQUNQLG9CQUFRLElBQVIsR0FETztXQWRGO1NBQVQ7T0FOVyxDQUFiLENBWlc7S0FBVixDQUZILENBRHNCO0dBQU4sQ0FBbEI7Ozs7Ozs7Ozs7Ozs7OztDQWRELENBQUQsQ0F3RUcsTUF4RUgsRUF3RVcsUUFBUSxVQUFSLENBeEVYO0FBQW1CIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImpRdWVyeS5ub0NvbmZsaWN0KCk7XG5cbigoJCwgUExVR0lOX0lEKSA9PiB7XG5cbiAgdmFyIGFyckNvbHVtbkNvbmZpZyA9IChjb25maWcpID0+IHtcbiAgICByZXR1cm4gT2JqZWN0LmtleXMoY29uZmlnKS5tYXAoKGtleSkgPT4ge1xuICAgICAgaWYgKGtleS5zdWJzdHJpbmcoMCwgNikgPT09IFwiY29sdW1uXCIpIHtcbiAgICAgICAgcmV0dXJuIGNvbmZpZ1trZXldO1xuICAgICAgfVxuICAgIH0pO1xuXG4gIH1cblxuICB2YXIgY29uZmlnID0ga2ludG9uZS5wbHVnaW4uYXBwLmdldENvbmZpZyhQTFVHSU5fSUQpO1xuICB2YXIgZmllbGRzID0gW107XG5cbiAgJChkb2N1bWVudCkucmVhZHkoKCkgPT4ge1xuICAgIGtpbnRvbmUuYXBpKGtpbnRvbmUuYXBpLnVybCgnL2svdjEvcHJldmlldy9mb3JtJywgdHJ1ZSksICdHRVQnLCB7XG4gICAgICAnYXBwJzoga2ludG9uZS5hcHAuZ2V0SWQoKVxuICAgIH0sIChyZXNwKSA9PiB7XG4gICAgICBmaWVsZHMgPSBbXTtcbiAgICAgIE9iamVjdC5rZXlzKHJlc3AucHJvcGVydGllcykuZm9yRWFjaCgoaSwga2V5KSA9PiB7XG4gICAgICAgIGlmICgnY29kZScgaW4gcmVzcC5wcm9wZXJ0aWVzW2tleV0pIHtcbiAgICAgICAgICBmaWVsZHMucHVzaChyZXNwLnByb3BlcnRpZXNba2V5XS5jb2RlKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICBjb25zb2xlLmRpcihmaWVsZHMpO1xuICAgICAgdmFyIG9wdGlvbnMgPSBmaWVsZHMubWFwKChpLCBrZXkpID0+IHtcbiAgICAgICAgcmV0dXJuIHt0ZXh0OiBmaWVsZHNba2V5XSwgdmFsdWU6IGZpZWxkc1trZXldfTtcbiAgICAgIH0pO1xuICAgICAgIFxuICAgICAgd2luZG93LnZ1ZSA9IG5ldyBWdWUoe1xuICAgICAgICBlbDogJyNmb3JtJyxcbiAgICAgICAgZGF0YToge1xuICAgICAgICAgIG9wdGlvbnM6IG9wdGlvbnMsXG4gICAgICAgICAgY29sdW1uczogYXJyQ29sdW1uQ29uZmlnKGNvbmZpZylcbiAgICAgICAgfSxcbiAgICAgICAgbWV0aG9kczoge1xuICAgICAgICAgIGRlbENvbHVtbihpbmRleCkge1xuICAgICAgICAgICAgdGhpcy5jb2x1bW5zLnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgICAgfSxcbiAgICAgICAgICBhZGRDb2x1bW4oaW5kZXgpIHtcbiAgICAgICAgICAgIHRoaXMuY29sdW1ucy5zcGxpY2UoaW5kZXgsIDAsIHRoaXMub3B0aW9uc1swXSk7XG4gICAgICAgICAgfSxcbiAgICAgICAgICByZWdpc3RDb25maWcoKSB7XG4gICAgICAgICAgICB2YXIgY29uZmlnID0ge307XG4gICAgICAgICAgICB0aGlzLmNvbHVtbnMuZm9yRWFjaCgoY29sdW1uLCBpKSA9PiB7XG4gICAgICAgICAgICAgIGNvbmZpZ1tgY29sdW1ucyR7aX1gXSA9IGNvbHVtbjtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAga2ludG9uZS5wbHVnaW4uYXBwLnNldENvbmZpZyhjb25maWcpO1xuICAgICAgICAgIH0sXG4gICAgICAgICAgY2FuY2VsKCkge1xuICAgICAgICAgICAgaGlzdG9yeS5iYWNrKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgfSk7XG4gICAgfSlcbiAgfSk7XG5cblxuICAvLyBjb25maWcgPSB7XG4gIC8vICAgXCJjb2x1bW4wXCI6IFwi44Os44Kz44O844OJ55Wq5Y+3XCIsXG4gIC8vICAgXCJjb2x1bW4xXCI6IFwi5Lya56S+5ZCNXCIsXG4gIC8vICAgXCJjb2x1bW4yXCI6IFwi5YWI5pa55ouF5b2T6ICF5ZCNXCIsXG4gIC8vICAgXCJjb2x1bW4zXCI6IFwi6KaL6L6844G/5pmC5pyfXCIsXG4gIC8vICAgXCJjb2x1bW40XCI6IFwi56K65bqmXCIsXG4gIC8vICAgXCJjb2x1bW41XCI6IFwi6KO95ZOB5ZCNXCIsXG4gIC8vICAgXCJjb2x1bW42XCI6IFwi5Y2Y5L6hXCIsXG4gIC8vICAgXCJjb2x1bW43XCI6IFwi44Om44O844K244O85pWwXCIsXG4gIC8vICAgXCJjb2x1bW44XCI6IFwi5bCP6KiIXCJcbiAgLy8gfTtcblxuICAvLyBraW50b25lLnBsdWdpbi5hcHAuc2V0Q29uZmlnKGNvbmZpZyk7XG5cbn0pKGpRdWVyeSwga2ludG9uZS4kUExVR0lOX0lEKTtcblxuIl19
