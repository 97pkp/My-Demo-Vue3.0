
/** 表格自动滚动 */
export const tableAutoScroll = (table) => {
    table.bodyWrapper.scrollTop = 100
    return
    // 获取表格中承载数据的div元素
    const divData = table.bodyWrapper;
    console.log(table);
    
    console.log(divData);
    
    let scrollInterval; // 定义滚动间隔变量
    
   
    // 鼠标移入，停止滚动
    divData.onmouseover = () => {
      clearInterval(scrollInterval);
    };
   
    // 鼠标移出，继续滚动
    divData.onmouseout = () => {
      startScroll();
    };
   
    // 开始滚动函数
    function startScroll() {
        console.log(divData.clientHeight , divData.scrollHeight);
        
      // 如果数据少于表格高度，则停止滚动
    //   if (divData.clientHeight >= divData.scrollHeight) {
    //     return;
    //   }
   
      // 设置滚动间隔为100毫秒
      scrollInterval = setInterval(() => {
        // 元素自增距离顶部1像素
        divData.scrollTop += 1;
        // // 判断是否滚动到底部
        // if (divData.clientHeight + divData.scrollTop === divData.scrollHeight) {
        //   // 重置table距离顶部距离
        //   divData.scrollTop = 0;
        // }
        
        console.log(divData.scrollTop);
        
      }, 100);
    }
   
    // 初始启动滚动
    startScroll();
  };