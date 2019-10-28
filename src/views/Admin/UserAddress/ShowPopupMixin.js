
import AddressForm from './Form';

export default {
    methods: {
        showFormPopup(id) {
            this.$confirm(
                '',
                { 
                    title: 'Create New Address', 
                    icon: 'account_balance', 
                    color: 'primary', 
                    buttonTrueText: 'Save', 
                    width: 550,
                    componentProps: { id: id } 
                },
                AddressForm,
                ({ destroy, myComponent, busy, relax }) => {
                    busy();
                    myComponent
                        .submit(parseInt(this.$route.params.id))
                        .then(() => {
                            destroy();
                            this.$lqTable.refresh('user_address', true);
                        })
                        .catch(() => relax());
                }
            );
        }
    }
}