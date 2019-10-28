<template>
    <div>
        <title-layout>
            <template>
                <title-row>
                    <v-flex md4 sm4 xs12>
                        <v-layout justify-end>
                            <v-btn color="primary" dark @click.stop="() => showFormPopup()">
                                Create
                                <v-icon>add</v-icon>
                            </v-btn>
                            <go-back :to="{name: 'admin.list'}" />
                        </v-layout>
                    </v-flex>
                </title-row>
            </template>
        </title-layout>
        <v-container fluid grid-list-md>
            <lq-list action="/user-address" name="user_address" :static-data="{user_id: $route.params.id}">
                <template v-slot:default="{items}">
                    <v-layout row wrap>
                        <v-flex
                            xl4
                            lg4
                            md4
                            sm6
                            xs12
                            v-for="item in items"
                            :key="`user_address${item.id}`"
                        >
                            <v-fade-transition mode="out-in">
                                <address-card :address="item" />
                            </v-fade-transition>
                        </v-flex>
                    </v-layout>
                    <v-layout row wrap>
                        <no-record-found />
                        <load-more />
                    </v-layout>
                </template>
            </lq-list>
        </v-container>
    </div>
</template>
<script>
import AddressCard from './AddressCard';
import ShowPopup from './ShowPopupMixin';

export default {
    name: 'user-address-list.page',
    components: { AddressCard },
    mixins: [ShowPopup]
};
</script>