export default {
    name: 'dropzone',
    props: {
        action: {
            required: true,
            type: String
        },
        fileName: {
            required: true,
            type: String
        },
        message: {
            type: String,
            default: () => 'Drop File Here'
        },
        multiple: {
            type: Boolean,
            default: () => false
        },
        rules: Object
    },
    render(h) {
        const _self = this;
        return h(
            'lq-v-form',
            {
                props: {
                    name: this.fileName,
                    rules: this.rules ? { [this.fileName]: { file: this.rules } } : null,
                }
            },
            [
                h(
                    'lq-v-file-upload',
                    {
                        props: {
                            uploadUrl: this.action,
                            flexProps: { md2: true, sm2: true, xs12: true },
                            allwaysShowSelector: false,
                            multiple: this.multiple,
                            id: this.fileName,
                            itemClass: ['dropzone-item'],
                            wrapperClass: 'dropzone',
                            rowClass: ['drop-zone-row'],
                            clickEveryWhere: true,
                            hideItemError: true,
                            showChangeBtn: false,
                            uploadFnc: function () { uploadFile.call(this, _self.fileName) }
                        },
                        on: {
                            'upload-completed': () => this.$emit('upload-completed')
                        },
                        scopedSlots: {
                            top: this.dropZone
                        }
                    }
                )
            ]
        )
    },
    methods: {
        dropZone() {
            return this.$createElement(
                'div',
                {
                    class: ['drop-zone-message'],
                },
                [
                    this.$createElement('v-icon', 'file_upload'),
                    this.message
                ]
            )
        }
    }
}

async function uploadFile(fileName) {
    if (this.uploading) { return false }
    if (this.error && !this.isOnlyUploadError()) { return false }
    this.lqForm.ready(false);
    this.uploadProcess = 0
    const values = {
        [fileName]: this.file,
    };
    const formData = this.$helper.objectToFormData(values)
    await this.uploadFileOnServer(formData)
    const id = this.fileIndex ? this.lqFile.id + '.' + this.fileIndex : this.lqFile.id;
    this.lqForm.remove(id);
}