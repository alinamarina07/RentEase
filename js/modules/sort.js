export function inStock(arr) {
    return arr.filter((item) =>item.productQuantity>0  )
  
  }
  
  export function priceSorting (arr, min, max) { 
    return arr.filter((item) =>Number(item.productPrice)>=Number(min) && Number(item.productPrice)<=Number(max) && Number(min)<Number(max))
  
  }
  
  
  
  export function dateSorting (arr, min, max) { 
    return arr.filter((item) =>{
      const itemDate = new Date(item.productDate)
      const minDate = new Date(min)
      const maxDate= new Date(max)
  
      return itemDate.getTime() >= minDate.getTime() && itemDate.getTime() <= maxDate.getTime()
  
    } )
  
  }