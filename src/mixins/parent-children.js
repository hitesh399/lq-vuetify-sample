export default {
    name: 'parent.children',
    methods: {
        getNestedChildren(arr, parent_id) {
            var out = []
            for(var i in arr) {
                if(arr[i].parent_id == parent_id) {
                    var children = this.getNestedChildren(arr, arr[i].id)
        
                    if(children.length) {
                        arr[i].children = children
                    } else {
                        arr[i].children = []
                    }
                    out.push(arr[i])
                }
            }
            return out
        }
    }
}