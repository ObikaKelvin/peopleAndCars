const formatPrice = value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')

export default formatPrice