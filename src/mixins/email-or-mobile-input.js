export default {
	name: 'email-or-mobile-input',

	methods: {
		isAEmailOrBlank: function (formName, inputName) {
			let emailValue = this.$helper.getProp(this.$store.state.form, `${formName}.values.${inputName}`);
			emailValue = emailValue ? emailValue : '';
			let slashIndex = emailValue.indexOf('-');
			if (slashIndex === -1 && !this.$helper.isInteger(emailValue)) return true;
			let mobile_number = emailValue.substr(slashIndex + 1, emailValue.length);
			if (!mobile_number) {
				this.$lqForm.setElementVal(formName, inputName, null);
				return true;
			} else if (!this.$helper.isInteger(mobile_number)) {
				this.$lqForm.setElementVal(formName, inputName, mobile_number);
				return true;
			}
		}
	}
}