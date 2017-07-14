import temp from './hello.html'
import './hello.scss'

export default {
    name: 'hello',
    param: {
        url: '/hello',
        template: temp,
        controller: controller
    }
}

controller.$inject = ['$scope']
function controller ($scope) {
    console.log("controller ready")
}