export default {
    name: 'services',
    type: 'factory',
    children: [], //需要的模块，未实现
    fn: services
}

services.$inject = ['$window']

function services ($window) {

    return {
       
    }
}