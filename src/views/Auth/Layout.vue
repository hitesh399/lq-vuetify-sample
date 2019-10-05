<template>
    <v-container fill-height>
        <v-layout align-center justify-center row fill-height>
            <v-flex md6 sm8 xs12 lg6>
                <v-layout row wrap>
                    <v-flex md12 sm12 xs12 lg12 text-xs-center>
                        <img src="@/assets/logo.png" alt="Logo" style="max-height: 50px" />
                    </v-flex>
                    <v-flex md12 sm12 xs12 lg12>
                        <v-card class="elevation-1">
                            <v-container grid-list-md>
                                <v-layout row wrap>
                                    <v-flex xs12>
                                        <slot name="title" />
                                        <slot>RIght</slot>
                                    </v-flex>
                                </v-layout>
                            </v-container>
                        </v-card>
                    </v-flex>
                    <v-flex md12 sm12 xs12 lg12>
                        <slot name="bottom" />
                    </v-flex>
                </v-layout>
            </v-flex>
        </v-layout>
    </v-container>
</template>
