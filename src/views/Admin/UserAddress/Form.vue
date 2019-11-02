<template>
    <lq-v-form
        :request-method="id ? 'PUT': 'POST'"
        :disbaled="disabled"
        name="address"
        ref="_form"
        :action="id ? `/user-address/${id}`: '/user-address'"
        :rules="rules"
    >
        <template v-slot:default="{model}">
            <v-container fluid grid-list-xl style="padding:0">
                <v-layout raw wrap>
                    <v-flex xs4>
                        <label class="hint">Address Proof</label>
                        <lq-v-file-upload
                            show-view-btn
                            id="address_proof"
                            label="Addresss"
                            reset-on-delete
                        />
                        
                    </v-flex>
                    <v-flex xs8>
                        <lq-v-autocomplete
                            id="country"
                            action="/country"
                            browser-autocomplete="new-password"
                            label="Country"
                            :static-data="{page_size: -1}"
                            :master-of="['region', 'city']"
                            clearable
                        />
                        <lq-v-autocomplete
                            :master-of="['city']"
                            browser-autocomplete="new-password"
                            :fetch-on-load="false"
                            :fetch-on-search="true"
                            v-if="(!$helper.getProp(model, 'country.id') || $helper.getProp(model, 'country.have_region') === 'Y')"
                            id="region"
                            :disabled="!Boolean($helper.getProp(model, 'country.id'))"
                            action="/region"
                            label="Region"
                            clearable
                        />
                        <lq-v-autocomplete
                            browser-autocomplete="new-password"
                            :fetch-on-load="false"
                            :fetch-on-search="true"
                            id="city"
                            :disabled="(!Boolean($helper.getProp(model, 'region.id')) && $helper.getProp(model, 'country.have_region') === 'Y') || !Boolean($helper.getProp(model, 'country.id'))"
                            action="/city"
                            label="City"
                            clearable
                        />
                    </v-flex>
                </v-layout>
                <v-layout raw wrap>
                    <v-flex xs6>
                        <lq-v-text-field id="landmark" label="Landmark" />
                    </v-flex>
                    <v-flex xs6>
                        <lq-v-text-field type="number" id="postal_code" label="Postal Code" />
                    </v-flex>
                </v-layout>
                <lq-v-text-field id="address_line_1" label="Address Line 1" />
                <lq-v-text-field id="address_line_2" label="Address Line 2" />
            </v-container>
        </template>
    </lq-v-form>
</template>
<script>
export default {
    name: 'address-form',
    props: {
        id: Number
    },
    data() {
        return {
            rules: {
                country: { presence: true },
                city: { presence: true },
                postal_code: { presence: true },
                landmark: { presence: true },
                address_line_1: { presence: true },
                address_proof: {
                    presence: true,
                    file: {
                        required: true,
                        acceptedFiles: 'image/*',
                        maxFileSize: 1
                    }
                }
            },
            disabled: false
        };
    },
    created() {
        if (this.id) {
            this.disabled = true;
            this.$axios(`user-address/${this.id}`)
                .then(response => {
                    const data = this.$helper.getProp(
                        response,
                        'data.address',
                        {}
                    );
                    this.$lqForm.initializeValues(
                        'address',
                        data,
                        response.current_permission
                    );
                    this.disabled = false;
                })
                .catch(() => (this.disabled = false));
        }
    },
    methods: {
        submit(user_id) {
            console.log('I am sdjsjgsjhfh', user_id, this.$refs._form.name)
            return this.$refs._form.submit({ user_id }, false);
        }
    }
};
</script>