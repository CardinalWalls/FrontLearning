const $siteList = $('.siteList')
const x = localStorage.getItem('x')
const xObject = JSON.parse(x)
const hashMap = xObject || [
    {icon: 'A', url: 'https://www.acfun.cn'},
    {icon: 'B', url: 'https://www.bilibili.com'}
  ]
  
const simplifyUrl = (url) => {
  return url.replace('https://', '')
    .replace('http://', '')
    .replace('www.', '')
    .replace(/\/.*/, '') // 删除 / 开头的内容
}
  
const render = () => {
  $siteList.find('.tile').remove()
  let count = 0;
  console.log(hashMap)
  
  hashMap.forEach((node, index) => {   
    count ++;   
    let $tempNode = $(
      `
      <div class="tile">
        <div class="icon">${node.icon}</div>
        <div class="link">${simplifyUrl(node.url)}</div>
        <div class="remove">
          X
        </div>
      </div>
      `
    );
    $siteList.append($tempNode)
    $tempNode.on('click', () => {
      window.open(node.url)
    })
    $tempNode.on('click', '.remove', (e) => {
      e.stopPropagation() // 阻止冒泡
      hashMap.splice(index, 1)
      render()
    })


  })

  if(count < 7){
    $siteList.append(
      `
      <div id="addButton" class="tile">
        <div class="icon">+</div>
        <div class="link">add a new link</div>
      </div>
      `
    )
    $('#addButton').on('click', () => {
      let url = window.prompt('请问你要添加的网址是啥？')
      if (url.indexOf('http') !== 0) {
        url = 'https://' + url
      }
      console.log(url)
      hashMap.push({
        icon: simplifyUrl(url)[0].toUpperCase(),
        url: url
      })
      render()
    })
    
    
  }
  
  }      
                                    
  render()

  window.onbeforeunload = () => {
    const string = JSON.stringify(hashMap)
    localStorage.setItem('x', string)
  }
  