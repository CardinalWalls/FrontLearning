const x = localStorage.getItem('x')
const xObject = JSON.parse(x)
const hashMap = xObject || [
    {logo: 'A', url: 'https://www.acfun.cn'},
    {logo: 'B', url: 'https://www.bilibili.com'}
  ]
  

const render = () => {
    hashMap.forEach((node, index) => {
      const $li = $(
        `<li>
        <div class="site">
          <div class="logo">${node.logo}</div>
          <div class="link">${simplifyUrl(node.url)}</div>
          <div class="close">
            <svg class="icon">
              <use xlink:href="#icon-close"></use>
            </svg>
          </div>
        </div>
        </li>`).insertBefore($lastLi)//没有必要搞链表
      $li.on('click', () => {
        window.open(node.url)
      })
      $li.on('click', '.close', (e) => {
        e.stopPropagation() // 阻止冒泡
        hashMap.splice(index, 1)
        render()
      })
    })
  }      
                                    
  render()

  window.onbeforeunload = () => {
    const string = JSON.stringify(hashMap)
    localStorage.setItem('x', string)
  }
  