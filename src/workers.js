export const workerActions = [
  {
    message: 'count_per_user',
    func: (data) => {
      let arr = []
      for (let i in data) {
        arr.push({
          "account": data[i].key,
          "消息数量": data[i].doc_count,
          "图片、表情数量": data[i].image_count.value
        })
      }
      return arr
    }
  }, {
    message: 'punch',
    func: (data) => {
      let arr = []
      for (let i in data) {
        for (let j in data[i].result.buckets) {
          arr.push({
            "weekday": data[i].key,
            "hour": data[i].result.buckets[j].key,
            "count": data[i].result.buckets[j].doc_count
          })
        }
      }
      return arr
    }
  }, {
    message: "active_day",
    func: (data) => {
      let arr = []
      for (let i in data) {
        arr.push({
          "账号": data[i].key,
          "天数": data[i].result.value
        })
      }
      return arr
    }
  }, {
    message: "message",
    func: (data) => {
      let arr = []
      for (let i in data) {
        arr.push({
          "account": data[i].key,
          "count": data[i].doc_count
        })
      }
      return arr
    }
  }, {
    message: 'image_count',
    func: (data) => {
      let arr = []
      for (let i in data) {
        arr.push({
          "value": data[i].doc_count,
          "name": data[i].key
        })
      }
      return arr
    }
  }, {
    message: 'image_count_user',
    func: (data) => {
      let arr = []
      for (let i in data) {
        for (let j in data[i].result.buckets) {
          arr.push({
            "name": parseInt(i) + 1,
            "username": data[i].result.buckets[j].key,
            "count": data[i].result.buckets[j].doc_count,
          })
        }
      }
      return arr
    }
  }, {
    message: 'relation_at',
    func: (data) => {
      let nodeObj = {}
      let links = []
      let id = 0
      for (let i in data) {
        if (!nodeObj[data[i]._source.number]) {
          nodeObj[data[i]._source.number] = {id: data[i]._source.number, value: 1}
          id++
        } else {
          nodeObj[data[i]._source.number] = {
            id: nodeObj[data[i]._source.number].id,
            value: nodeObj[data[i]._source.number].value + 1
          }
        }
        if (!nodeObj[data[i]._source.at]) {
          nodeObj[data[i]._source.at] = {id: data[i]._source.at, value: 1}
          id++
        } else {
          nodeObj[data[i]._source.at] = {
            id: nodeObj[data[i]._source.at].id,
            value: nodeObj[data[i]._source.at].value + 1
          }
        }
        links.push({
          source: nodeObj[data[i]._source.number].id,
          target: nodeObj[data[i]._source.at].id
        })
      }
      let nodes = []
      for (let k in nodeObj) {
        nodes.push({
          id: nodeObj[k].id,
          name: k,
          value: nodeObj[k].value
        })
      }
      return {nodes, links}
    }
  }, {
    message: 'message_habit',
    func: (data) => {
      let arr = []
      for (let i in data) {
        for (let j in data[i].result.buckets) {
          arr.push({
            account: data[i].key,
            interval: data[i].result.buckets[j].key,
            message: data[i].result.buckets[j].result.value
          })
        }
      }
      return arr
    }
  }
]
