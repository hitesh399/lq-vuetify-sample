<template>
    <v-fade-transition mode="out-in">
        <router-view :key="$route.fullPath" />
    </v-fade-transition >
</template>
