<template>
    <v-card>
        <v-img
            class="white--text"
            height="100px"
            :src="`${$helper.getProp(address, 'address_proof.path', 'https://cdn.vuetifyjs.com/images/cards/docks.jpg')}`"
        >
        </v-img>
        <v-card-title>
            <div>
                <span class="grey--text">Country: {{$helper.getProp(address, 'country.name', 'N/A')}}</span>
                <br />
                <span>Region: {{$helper.getProp(address, 'region.name', 'N/A')}}</span>
                <br />
               <span>City: {{$helper.getProp(address, 'city.name', 'N/A')}}</span>
                <br />
               <span>Postal Code: {{address.postal_code}}</span>
               <br />
               <span>Address Line 1: {{address.address_line_1}}</span>
               <br />
               <span>Address Line 2: {{address.address_line_2}}</span>
            </div>
        </v-card-title>
        <v-card-actions>
            <v-btn flat @click.stop="() => showFormPopup(address.id)" color="primary">Edit</v-btn>
            <v-btn flat color="primary">Explore</v-btn>
        </v-card-actions>
    </v-card>
</template>
<script>
import ShowPopup from './ShowPopupMixin'
export default {
    name: 'user-address-card',
    mixins: [ShowPopup],
    props: {
        address: Object
    }
};
</script>