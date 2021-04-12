window.jQuery = function(selectorsOrArray){
    let elements
    if(typeof selectorsOrArray === 'string'){
        elements = document.querySelectorAll(selectorsOrArray)
    }
    else if(selectorsOrArray instanceof Array){
        elements = selectorsOrArray
    }
    //const elements = document.querySelectorAll(selectors)
    
    return {
        oldApi: selectorsOrArray.oldApi,
        find(selector){
            let array = []
            for(let i = 0;i < elements.length;i ++){
                const result = Array.from(elements[i].querySelectorAll(selector))
                array = array.concat(result)
            }
            array.oldApi = this; // this is oldApi
            console.log(array)
            return jQuery(array)
        },
        
       
        addClass(className){
            for(let i = 0;i < elements.length;i++){
                elements[i].classList.add(className)
            }
            return this
        },
        end(){
            return this.oldApi   // this is new api
        },
    }
    
}