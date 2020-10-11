- [Vue warn]: Property or method "openActionSheet" is not defined on the instance but referenced during render. Make sure that this property is reactive, either in the data option, or for class-based components, by initializing the property.

```
openActionSheet 命名有冲突， 换个其他变量名解决。
```

- core-js

```
These dependencies were not found:

* core-js/modules/es.array-buffer.constructor in ./node_modules/@dcloudio/uni-h5/dist/index.umd.min.js
* core-js/modules/es.array-buffer.slice in ./node_modules/@dcloudio/uni-h5/dist/index.umd.min.js
* core-js/modules/es.array.concat in ./node_modules/@dcloudio/uni-h5/dist/index.umd.min.js
// ...

// core-js/library/fn/object/assign in ./node_modules/babel-runtime/core-js/object/assign.js

// 重装core-js@3.6.5后恢复正常 (和element-ui有冲突)
```

- vscode vue 格式化问题, 安装以下插件， 相关配置参考`.vscode`

```
1)ESlint
2)vetur
3)Prettier - Code formatter
4)Manta’s Stylus Supremacy
```

- chunk-vendors.js:49854 GET http://localhost/sockjs-node/info?t=1602146951108 net::ERR_CONNECTION_REFUSED

```
https://www.cnblogs.com/sichaoyun/p/10178080.html
```

- uni-app 中 onLoad 不起作用

```
https://www.cnblogs.com/suihang/p/10998997.html
```

- `uni-ui`无法导入

```
https://github.com/dcloudio/uni-ui/issues/64
# 在node_modules/@dcloudio/uni-ui/lib/下添加index.js, 内容如下：
import uniBadge from "@dcloudio/uni-ui/lib/uni-badge/uni-badge.vue";
import uniCalendar from "@dcloudio/uni-ui/lib/uni-calendar/uni-calendar.vue";
import uniCard from "@dcloudio/uni-ui/lib/uni-card/uni-card.vue";
import uniCollapse from "@dcloudio/uni-ui/lib/uni-collapse/uni-collapse.vue";
import uniCollapseItem from "@dcloudio/uni-ui/lib/uni-collapse-item/uni-collapse-item.vue";
import uniCountDown from "@dcloudio/uni-ui/lib/uni-count-down/uni-count-down.vue";
import uniDrawer from "@dcloudio/uni-ui/lib/uni-drawer/uni-drawer.vue";
import uniFab from "@dcloudio/uni-ui/lib/uni-fab/uni-fab.vue";
import uniFav from "@dcloudio/uni-ui/lib/uni-fav/uni-fav.vue";
import uniGoodsNav from "@dcloudio/uni-ui/lib/uni-goods-nav/uni-goods-nav.vue";
import uniGrid from "@dcloudio/uni-ui/lib/uni-grid/uni-grid.vue";
import uniGridItem from "@dcloudio/uni-ui/lib/uni-grid-item/uni-grid-item.vue";
import uniIcons from "@dcloudio/uni-ui/lib/uni-icons/uni-icons.vue";
import uniIndexedList from "@dcloudio/uni-ui/lib/uni-indexed-list/uni-indexed-list.vue";
import uniList from "@dcloudio/uni-ui/lib/uni-list/uni-list.vue";
import uniListItem from "@dcloudio/uni-ui/lib/uni-list-item/uni-list-item.vue";
import uniLoadMore from "@dcloudio/uni-ui/lib/uni-load-more/uni-load-more.vue";
import uniNavBar from "@dcloudio/uni-ui/lib/uni-nav-bar/uni-nav-bar.vue";
import uniNoticeBar from "@dcloudio/uni-ui/lib/uni-notice-bar/uni-notice-bar.vue";
import uniNumberBox from "@dcloudio/uni-ui/lib/uni-number-box/uni-number-box.vue";
import uniPagination from "@dcloudio/uni-ui/lib/uni-pagination/uni-pagination.vue";
import uniPopup from "@dcloudio/uni-ui/lib/uni-popup/uni-popup.vue";
import uniRate from "@dcloudio/uni-ui/lib/uni-rate/uni-rate.vue";
import uniSearchBar from "@dcloudio/uni-ui/lib/uni-search-bar/uni-search-bar.vue";
import uniSegmentedControl from "@dcloudio/uni-ui/lib/uni-segmented-control/uni-segmented-control.vue";
import uniStatusBar from "@dcloudio/uni-ui/lib/uni-status-bar/uni-status-bar.vue";
import uniSteps from "@dcloudio/uni-ui/lib/uni-steps/uni-steps.vue";
import uniSwipeAction from "@dcloudio/uni-ui/lib/uni-swipe-action/uni-swipe-action.vue";
import uniSwiperDot from "@dcloudio/uni-ui/lib/uni-swiper-dot/uni-swiper-dot.vue";
import uniTag from "@dcloudio/uni-ui/lib/uni-tag/uni-tag.vue";
import uniTitle from "@dcloudio/uni-ui/lib/uni-title/uni-title.vue";

export {
uniBadge,
uniCalendar,
uniCard,
uniCollapse,
uniCollapseItem,
uniCountDown,
uniDrawer,
uniFab,
uniFav,
uniGoodsNav,
uniGrid,
uniGridItem,
uniIcons,
uniIndexedList,
uniList,
uniListItem,
uniLoadMore,
uniNavBar,
uniNoticeBar,
uniNumberBox,
uniPagination,
uniPopup,
uniRate,
uniSearchBar,
uniSegmentedControl,
uniStatusBar,
uniSteps,
uniSwipeAction,
uniSwiperDot,
uniTag,
uniTitle,
};
```
