export default {
    name: 'delete-action',
    methods: {
        async confirmAndAction (url, {confirmMsg, waitMsg, method, data, title}) {
            let msg = confirmMsg ? confirmMsg : 'Are you sure you want to delete?';
            if( await this.$root.$confirm(title ? title : 'Delete?', msg, { color: 'red' }) ) {
                this.$root.$dialogLoader.show(waitMsg ? waitMsg : 'deleting...', {
                    showProcessBar: true
                })
                return this.axios({
                    url: url,
                    method: method ? method : 'delete',
                    data: data
                }).then((response) => {
                        this.$root.$dialogLoader.showSnackbar(
                            response.message, 
                            { color: 'success' } 
                        );
                        this.$root.$dialogLoader.hide();
                        return response;
                    }).catch((response) => {
                        this.$root.$dialogLoader.hide(true);
                        return Promise.reject(response)
                    })
            } else {
                this.$root.$dialogLoader.hide(true);
                return Promise.reject('cancle')
            }
        }
    }
}