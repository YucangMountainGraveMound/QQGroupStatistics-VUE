export default {
  /**
   * @return {string}
   */
  WeekNumToString(num) {
    num = parseInt(num)
    let s = '周'
    switch (num) {
      case 1:
        s += "一"
        break
      case 2:
        s += "二"
        break
      case 3:
        s += "三"
        break
      case 4:
        s += "四"
        break
      case 5:
        s += "五"
        break
      case 6:
        s += "六"
        break
      case 7:
        s += "日"
        break
    }
    return s
  }
}
