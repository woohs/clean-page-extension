// 要删除的节点
var _targetSelectors = ".css-f5odvb";

// 删除节点
function deleteTargetElement(selectors) {
  var element = document.querySelector(selectors);
  if (element) {
    element.remove();
    return true;
  }
  return false;
}

// 节流
function throttle(func, wait) {
  let timer = null;
  return function () {
    const arg = arguments;
    const context = this;
    if (!timer) {
      timer = setTimeout(() => {
        func.apply(context, arg);
        clearTimeout(timer);
        timer = null;
      }, wait);
    }
  };
}

// 观察器的配置
const observerConfig = { characterData: true, childList: true, subtree: true };

// 当观察到变动时执行的回调函数
const observerCallback = function (mutationsList) {
  for (let mutation of mutationsList) {
    if (mutation.type === "childList") {
      // 节点有更新，尝试删除节点
      deleteTargetElement(_targetSelectors);
      // if (res) {
      //   // 删除成功，停止观察
      //   observer.disconnect();
      // }
    }
  }
};

// 创建一个观察器实例并传入回调函数
const observer = new MutationObserver(throttle(observerCallback, 50));

document.addEventListener("DOMContentLoaded", function () {
  // 选择需要观察变动的节点
  const targetNode = document.body;
  // 以上述配置开始观察目标节点
  observer.observe(targetNode, observerConfig);
});

// window.addEventListener("load", function () {
//   // 页面已加载完毕，关闭观察器
//   observer.disconnect();
// });
