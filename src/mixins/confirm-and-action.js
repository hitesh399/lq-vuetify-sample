export default {
    name: 'delete-action',
    methods: {
        async confirmAndAction(url, { confirmMsg, waitMsg, method, data, title }) {
            let msg = confirmMsg ? confirmMsg : 'Are you sure you want to delete?';
            if (await this.$confirm(msg, {
                title: title ? title : 'Delete?'
            })) {
                const processbar = this.$processbar(waitMsg ? waitMsg : 'Deleting...');

                return this.axios({
                    url: url,
                    method: method ? method : 'delete',
                    data: data
                }).then((response) => {
                    this.$message.success( response.message );
                    processbar.hide()
                    return response;
                }).catch((response) => {
                    processbar.hide()
                    return Promise.reject(response)
                })
            } else {
                return Promise.reject(null)
            }
        }
    }
}