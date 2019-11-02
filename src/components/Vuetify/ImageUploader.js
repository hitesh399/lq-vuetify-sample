import Vue from 'vue'

export default Vue.extend({
    name: 'image-uploader',
    props: {
        fileName: {
            required: true,
            type: String
        },
        otherData: Object,
        thumb: {
            type: Object,
            default: () => {
                return { width: 600, height: 600 }
            }
        }
    },
    data() {
        return {
            rules: {
                file: {
                    message: {
                        acceptedFiles: '^Please select only image.',
                        maxFileSize: '^Image size should be less than 1 MB.'
                    },
                    acceptedFiles: 'image/*',
                    maxFileSize: 1, //MB
                    minImageDimensions: this.thumb
                }
            },
            requesting: false,
            processbar: null
        }
    },
    render(h) {
        return h(
            'lq-single-upload-file',
            {
                props: {
                    id: this.fileName,
                    rules: this.rules,
                    thumb: this.thumb,
                    otherData: this.otherData,
                   
                },
                attrs: {
                    hideDetails: true,
                    layoutProps: {},
                    layoutTag: 'span',
                    rotateRightIcon: 'rotate_right',
                    rotateLeftIcon: 'rotate_left',
                    allwaysShowSelector: true,
                    ...this.$attrs
                },
                on: {
                    uploading: this.uploading,
                    'server-success': this.success,
                    'server-error': this.error,
                    'local-error': this.localError,
                    ...this.$listeners
                },
                scopedSlots: this.$scopedSlots
            },
            this.$slots
        )
    },
    methods: {
        uploading() {
            this.processbar = this.$processbar('Uploading...');
        },
        hideProcessBar() {
            if(this.processbar) {
                this.processbar.hide()
            }
        },
        success(respone) {
            // this.$root.$dialogLoader.hide(true);
            this.hideProcessBar()
            this.$emit('image-uploaded', respone)

        },
        error(respone) {
            this.hideProcessBar()
            const msg = this.$helper.getProp(respone, 'response.data.message')
            if (msg) {
                this.$message.error(msg)
            } else {
                this.$message.error('There is some problem to upload image, Please try again.')
            }
            this.$emit('server-error', respone)
        },
        localError(error) {
            this.hideProcessBar()
            const msg = this.$helper.getProp(error, [this.fileName, '0'])
            if (msg) {
                this.$message.error(msg)
            }
            this.$emit('local-error', error)
        }
    }
})