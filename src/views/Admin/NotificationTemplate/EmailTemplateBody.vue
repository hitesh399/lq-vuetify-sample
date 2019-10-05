<template>
    <div>    
        <title-layout >
            <v-layout row wrap>
                <v-flex md12>
                    <go-back :to="{name: 'notification.template.list'}" />
                </v-flex>
            </v-layout>
        </title-layout>
        <EmailLayoutForm data-key="EMAIL_BODY" name="email_template_body"  />
    </div>
</template>
<script>
import EmailLayoutForm from './EmailCommonLayoutForm'

export default {
    name: 'email.template.body.page',
    components: { EmailLayoutForm }
}
</script>